from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'tickets', views.TicketViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', views.stats, name='stats'),
    re_path(r'^classify/$', views.classify, name='classify'),
]
