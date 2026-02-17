#  Support Ticket System Assessment 

##  **Live Demo Screenshots**

### **1. Complete Working Application**

*✅ React UI + Stats Dashboard + New Ticket Form + Ticket List*

### **2. Backend Terminal - Django Server**
```
[PASTE YOUR BACKEND TERMINAL SS HERE]
Django version 6.0.2 → http://127.0.0.1:8000/
```

### **3. Frontend Terminal - Vite Dev Server** 
```
[PASTE YOUR FRONTEND TERMINAL SS HERE]
VITE v5.x.x → http://localhost:5173/
```

### **4. API Endpoints Test**
```
[PASTE YOUR http://localhost:8000/api/tickets/ SS HERE]
✅ http://localhost:8000/api/tickets/ → []
✅ http://localhost:8000/api/tickets/stats/ → {"total_tickets":0}
```

### **5. Ticket Creation Flow**
```
[PASTE YOUR TICKET CREATED SS HERE]
✅ Title + Description → AI Classify → Submit → List Update
```

##  **Quick Start Guide** *(2 Minutes Setup)*

### **Terminal 1 - Backend (Django + SQLite)**
```powershell
cd backend
.\venv\Scripts\Activate.ps1
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```
**→ http://localhost:8000/api/tickets/**

### **Terminal 2 - Frontend (React + Vite)**
```powershell
cd frontend
npm install --legacy-peer-deps
npm run dev
```
**→ http://localhost:5173**

##  **Features Implemented** *(All Assessment Requirements ✓)*

| Feature | Status | Screenshot |
|---------|--------|------------|
| ✅ **5 API Endpoints** | `CRUD + classify + stats` | 
| ✅ **AI Classification** | `Dummy LLM fallback` | 
| ✅ **Real-time Stats** | `Django ORM Count` |  
| ✅ **Ticket Filtering** | `Status + Category + Priority` |  
| ✅ **Responsive UI** | `React 18 + Tailwind` |  
| ✅ **DB Constraints** | `Choices + Validations` | 

##  **Production Tech Stack**
```
🔹 Backend: Django 6.0.2 + DRF 3.16 + SQLite
🔹 Frontend: React 18 + Vite 5.4 + TailwindCSS
🔹 Deployment: Docker Compose Ready
🔹 Database: SQLite (Zero Setup)
🔹 AI: Graceful LLM Fallback
```

##  **API Documentation**

```bash
GET    /api/tickets/                 # List all tickets
POST   /api/tickets/                 # Create ticket
GET    /api/tickets/stats/           # Dashboard analytics
POST   /api/tickets/classify/        # AI classification
PATCH  /api/tickets/{id}/            # Update ticket
```

**Sample Stats Response:**
```json
{
  "total_tickets": 0,
  "open_tickets": 0,
  "avg_tickets_per_day": 0,
  "priority_breakdown": {"low":0,"medium":0,"high":0},
  "category_breakdown": {"technical":0,"billing":0}
}
```

##  **User Experience Flow**
```
1. User → New Ticket Form → AI Auto-classify
2. Submit → Instant List Update + Stats Refresh  
3. Filter/Search → Real-time Results
4. Status Update → Live Dashboard Metrics
```

