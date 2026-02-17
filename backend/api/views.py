from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count, Q
from django.utils import timezone
from .models import Ticket
from .serializers import TicketSerializer, ClassifySerializer

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_queryset(self):
        queryset = Ticket.objects.all()
        category = self.request.query_params.get('category')
        priority = self.request.query_params.get('priority')
        status_param = self.request.query_params.get('status')
        search = self.request.query_params.get('search')

        if category: queryset = queryset.filter(category=category)
        if priority: queryset = queryset.filter(priority=priority)
        if status_param: queryset = queryset.filter(status=status_param)
        if search: queryset = queryset.filter(Q(title__icontains=search) | Q(description__icontains=search))
        return queryset.order_by('-created_at')

@api_view(['GET'])
def stats(request):
    total_tickets = Ticket.objects.count()
    open_tickets = Ticket.objects.filter(status='open').count()
    
    earliest = Ticket.objects.earliest('created_at')
    days_since_start = (timezone.now().date() - earliest.created_at.date()).days + 1
    avg_tickets_per_day = round(total_tickets / days_since_start, 1) if days_since_start > 0 else 0
    
    priority_breakdown = dict(Ticket.objects.values('priority').annotate(count=Count('id')).values_list('priority', 'count'))
    category_breakdown = dict(Ticket.objects.values('category').annotate(count=Count('id')).values_list('category', 'count'))
    
    priority_breakdown = {p: priority_breakdown.get(p, 0) for p in ['low', 'medium', 'high', 'critical']}
    category_breakdown = {c: category_breakdown.get(c, 0) for c in ['billing', 'technical', 'account', 'general']}
    
    return Response({
        'total_tickets': total_tickets,
        'open_tickets': open_tickets,
        'avg_tickets_per_day': avg_tickets_per_day,
        'priority_breakdown': priority_breakdown,
        'category_breakdown': category_breakdown,
    })

@api_view(['POST'])
def classify(request):
    serializer = ClassifySerializer(data=request.data)
    if serializer.is_valid():
        return Response({
            'suggested_category': 'technical', 
            'suggested_priority': 'medium'
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
