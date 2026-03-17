# System Architecture

Complete overview of how the Laptop Price Predictor system works.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      USER BROWSER                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Requests
                              │ (React SPA)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND                             │
│              (http://localhost:3000)                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │             App Router                                   │  │
│  │  - page.tsx (Home Page)                                 │  │
│  │  - layout.tsx (Root Layout)                             │  │
│  │  - globals.css (Design System)                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         React Components                                │  │
│  │  - Header.tsx (Navigation)                              │  │
│  │  - SpecsForm.tsx (Input Form)                           │  │
│  │  - PriceDisplay.tsx (Results)                           │  │
│  │  - PriceComparison.tsx (Analysis)                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Technologies                                    │  │
│  │  - React 19 (Component library)                         │  │
│  │  - TypeScript (Type safety)                             │  │
│  │  - TailwindCSS (Styling)                                │  │
│  │  - Next.js 16 (Framework)                               │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ JSON API Calls
                              │ CORS Enabled
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FLASK BACKEND                               │
│              (http://localhost:5000)                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              API Endpoints                              │  │
│  │  GET  /api/health    - Server status                    │  │
│  │  GET  /api/options   - Form dropdown options            │  │
│  │  POST /api/predict   - Price prediction                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │          Business Logic (api.py)                        │  │
│  │  - CORS handling                                        │  │
│  │  - Input validation                                     │  │
│  │  - ML model invocation                                  │  │
│  │  - Error handling                                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │            ML Model Layer                               │  │
│  │  - pipe.pkl (Scikit-learn pipeline)                     │  │
│  │  - df.pkl (Feature reference data)                      │  │
│  │  - Predictions powered by trained model                 │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Dependencies                                    │  │
│  │  - Flask (Web framework)                                │  │
│  │  - Flask-CORS (CORS handling)                           │  │
│  │  - Pandas (Data manipulation)                           │  │
│  │  - NumPy (Numerical computing)                          │  │
│  │  - Scikit-Learn (ML predictions)                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### 1. Application Initialization

```
User visits http://localhost:3000
         │
         ▼
Next.js loads page.tsx
         │
         ▼
Header + SpecsForm render
         │
         ▼
SpecsForm useEffect() triggers
         │
         ▼
fetch GET /api/options
         │
         ▼
Flask returns dropdown options
         │
         ▼
Form populates with data
```

### 2. Prediction Flow

```
User fills form and clicks "Predict"
         │
         ▼
handlePredict() called
         │
         ▼
Collect form data (company, RAM, CPU, etc.)
         │
         ▼
fetch POST /api/predict with JSON payload
         │
         ▼
Flask /api/predict endpoint receives request
         │
         ▼
Parse and validate input data
         │
         ▼
Calculate PPI from resolution and screen size
         │
         ▼
Create pandas DataFrame with specs
         │
         ▼
pipe.predict() - ML model inference
         │
         ▼
np.exp() - Transform log prediction to price
         │
         ▼
Return JSON response with price + specs
         │
         ▼
React updates state with prediction
         │
         ▼
PriceDisplay component renders
         │
         ▼
User sees estimated price + analysis
```

## Component Interaction Map

```
┌─────────────────────────────────────────────────────────────┐
│                      page.tsx                               │
│              (Home Page - Main Layout)                      │
└──────────────┬──────────────────────────────────────────────┘
               │
       ┌───────┴─────────┐
       │                 │
       ▼                 ▼
   Header.tsx      SpecsForm.tsx
   - Logo          - Form Input
   - API Status    - API Fetching
   - GitHub Link   - State Management
                        │
                        ├─────────────────────┐
                        │                     │
                        ▼                     ▼
                   PriceDisplay        PriceComparison
                   - Price Display     - Market Analysis
                   - Spec Summary      - Price Ranges
                   - Insights          - Deal Quality
```

## State Management Flow

```
SpecsForm Component
     │
     ├─ formSpecs (State)
     │   ├─ company
     │   ├─ type_name
     │   ├─ ram
     │   ├─ weight
     │   ├─ touchscreen
     │   ├─ ips
     │   ├─ cpu
     │   ├─ hdd
     │   ├─ ssd
     │   ├─ gpu
     │   ├─ os
     │   ├─ resolution
     │   └─ screen_size
     │
     ├─ options (State)
     │   ├─ companies []
     │   ├─ types []
     │   ├─ operating_systems []
     │   ├─ cpu_brands []
     │   ├─ gpu_brands []
     │   ├─ resolutions []
     │   ├─ ram_options []
     │   └─ storage_options []
     │
     ├─ prediction (State)
     │   ├─ predicted_price
     │   ├─ currency
     │   └─ specs_summary {}
     │
     ├─ loading (State)
     │   └─ boolean
     │
     └─ error (State)
         └─ string | null
```

## API Request/Response Examples

### GET /api/options

**Request:**
```
GET http://localhost:5000/api/options
```

**Response:**
```json
{
  "companies": ["Acer", "Apple", "Asus", "Dell", "HP", ...],
  "types": ["Gaming", "Ultrabook", "Notebook", ...],
  "operating_systems": ["Windows", "Linux", "MacOS"],
  "cpu_brands": ["Intel", "AMD"],
  "gpu_brands": ["Intel", "NVIDIA", "AMD"],
  "resolutions": ["1920x1080", "1366x768", ...],
  "ram_options": [2, 4, 6, 8, 12, 16, 24, 32, 64],
  "storage_options": [0, 8, 128, 256, 512, 1024, 2048]
}
```

### POST /api/predict

**Request:**
```json
{
  "company": "Dell",
  "type_name": "Gaming",
  "ram": 16,
  "weight": 2.2,
  "touchscreen": 0,
  "ips": 1,
  "cpu": "Intel",
  "hdd": 0,
  "ssd": 512,
  "gpu": "NVIDIA",
  "os": "Windows",
  "resolution": "1920x1080",
  "screen_size": 15.6
}
```

**Response:**
```json
{
  "success": true,
  "predicted_price": 95000,
  "currency": "INR",
  "specs_summary": {
    "company": "Dell",
    "type": "Gaming",
    "ram": "16GB",
    "storage": "SSD: 512GB, HDD: 0GB",
    "processor": "Intel",
    "graphics": "NVIDIA",
    "os": "Windows"
  }
}
```

## Technology Stack

### Frontend Stack

```
Browser (User Interface)
    ↓
React 19 (UI Library)
    ├─ Components
    ├─ Hooks (useState, useEffect)
    └─ State Management
    ↓
TypeScript (Type Safety)
    ├─ Type Checking
    └─ IDE Intellisense
    ↓
TailwindCSS (Styling)
    ├─ Utility Classes
    └─ Design Tokens
    ↓
Next.js 16 (Framework)
    ├─ App Router
    ├─ Server/Client Components
    └─ Optimizations
```

### Backend Stack

```
Flask Application
    ├─ Route Handlers
    ├─ Request Processing
    └─ Error Handling
    ↓
Flask-CORS (CORS Support)
    └─ Cross-Origin Requests
    ↓
Python Data Processing
    ├─ Pandas (DataFrame)
    ├─ NumPy (Calculations)
    └─ Scikit-Learn (ML Model)
    ↓
ML Model (pipe.pkl)
    ├─ Feature Transformers
    ├─ Regression Model
    └─ Predictions
```

## Deployment Architecture

### Development
```
Local Machine
├─ Terminal 1: python api.py (port 5000)
├─ Terminal 2: npm run dev (port 3000)
└─ http://localhost:3000 (Browser)
```

### Production (Suggested)
```
Frontend (Vercel)
├─ Next.js on Vercel Edge
├─ Automatic deployments from GitHub
└─ Environment: NEXT_PUBLIC_API_URL = production API URL

Backend (AWS/Heroku/Digital Ocean)
├─ Flask app on server
├─ Gunicorn WSGI server
├─ Nginx reverse proxy
└─ PostgreSQL/MySQL (optional for scaling)
```

## Performance Considerations

### Frontend Optimization
- TailwindCSS (minimal CSS)
- Next.js image optimization
- Component code-splitting
- Client-side caching of options

### Backend Optimization
- Model loaded once at startup
- Feature validation
- Error handling
- Async request processing

### API Communication
- Single fetch call for options (cached)
- Minimal payload for predictions
- JSON serialization
- CORS headers optimized

## Security Considerations

### Frontend
- Environment variables for API URL
- CSRF protection via CORS
- Input validation

### Backend
- CORS whitelist (add in production)
- Input validation and sanitization
- Error message non-disclosure
- Rate limiting (implement in production)

### Data
- Model files in project root
- No sensitive data exposure
- Predictions not logged (optional)

---

## Summary

The architecture follows a **clean separation of concerns**:

1. **Frontend** handles UI/UX with React
2. **API Layer** handles HTTP communication
3. **Backend** handles business logic and ML predictions
4. **ML Model** provides price predictions

This modular design allows for:
- Independent frontend/backend scaling
- Easy frontend redesigns
- Backend API reuse
- Simple deployment to multiple platforms
