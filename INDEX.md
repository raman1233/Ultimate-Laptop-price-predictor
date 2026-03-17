# Project Files Index

A complete guide to every file in your Laptop Price Predictor project.

## Documentation Files

### 📖 [QUICKSTART.md](./QUICKSTART.md)
**Start here!** Get the project running in 2 minutes.
- Backend setup
- Frontend setup
- Troubleshooting tips

### 📚 [PROJECT_SETUP.md](./PROJECT_SETUP.md)
Complete documentation covering:
- Project structure overview
- Tech stack details
- Setup instructions
- API documentation
- Deployment guides
- Troubleshooting

### 🎯 [FRONTEND_BUILT.md](./FRONTEND_BUILT.md)
Summary of what was built:
- Component breakdown
- Design system details
- Statistics and metrics
- Improvements over Streamlit

### 📋 [README.md](./README.md)
Original project README with background info

## Backend (Python)

### 🔌 [api.py](./api.py) - **114 lines**
Flask REST API with ML model integration.

**Endpoints:**
- `GET /api/health` - Server health check
- `GET /api/options` - Get form options (companies, CPUs, etc.)
- `POST /api/predict` - Get price prediction

**Key Features:**
- CORS enabled for frontend
- Model loading from pickle files
- Error handling and logging
- Request validation

**Dependencies:**
- Flask 2.3
- Flask-CORS
- NumPy
- Pandas
- Scikit-Learn

### 🔧 [requirements.txt](./requirements.txt)
Python package dependencies for backend.

Includes:
- pandas==1.5.3
- numpy==1.24.3
- scikit-learn==1.3.0
- streamlit==1.28.0
- flask==2.3.2
- flask-cors==4.0.0

### 🔁 [app.py](./app.py) - Original Streamlit App
Original Streamlit interface (kept for reference/migration).

## Frontend (Next.js + React)

### 📄 [app/page.tsx](./app/page.tsx) - **66 lines**
Home page with hero section and main form.

**Content:**
- Hero headline and subheading
- Main prediction form
- Feature showcase cards
- Footer

### 🎨 [app/layout.tsx](./app/layout.tsx) - **37 lines**
Root layout wrapper for all pages.

**Features:**
- Metadata configuration (title, description, OG tags)
- Viewport settings
- Body wrapper

### 🌈 [app/globals.css](./app/globals.css) - **105 lines**
Global styles and design tokens.

**Includes:**
- Design token variables (colors, spacing)
- TailwindCSS directives
- Component utilities (glass-card, gradient-text, buttons)
- Custom styling (scrollbar, animations)

## React Components

### 🧩 [components/SpecsForm.tsx](./components/SpecsForm.tsx) - **371 lines**
Main input form with 3 sections.

**Sections:**
1. **Core Specifications** - Brand, type, CPU, GPU, OS
2. **Hardware Configuration** - RAM, weight, storage
3. **Display Configuration** - Resolution, screen size

**Features:**
- Dynamic form options from API
- Real-time state management
- Loading states
- Error handling
- Checkbox inputs (touchscreen, IPS)

### 💰 [components/PriceDisplay.tsx](./components/PriceDisplay.tsx) - **101 lines**
Results display after prediction.

**Displays:**
- Large predicted price
- Specification summary grid
- Market insights text
- Price comparison component

**Formatting:**
- Currency formatting (INR)
- Animated entrance effect
- Color-coded cards

### 📊 [components/PriceComparison.tsx](./components/PriceComparison.tsx) - **113 lines**
Market analysis and price comparison.

**Features:**
- Price range visualization
- Budget/Median/Premium tiers
- Deal quality badge
- Market insights

**Includes:**
- 85% discounted pricing
- 15% premium pricing
- Interactive price range slider

### 🔝 [components/Header.tsx](./components/Header.tsx) - **39 lines**
Navigation header.

**Features:**
- Logo and branding
- API connection indicator
- GitHub link
- Responsive design
- Sticky positioning

## Configuration Files

### 📦 [package.json](./package.json)
Node.js project configuration.

**Scripts:**
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

**Dependencies:**
- react@19.0.0
- next@16.0.0
- tailwindcss@3.4.1
- typescript@5.3.3

### ⚙️ [tailwind.config.js](./tailwind.config.js)
TailwindCSS configuration.

**Setup:**
- Custom colors (using CSS variables)
- Extended theme with design tokens
- Content paths for scanning

### 🏗️ [next.config.js](./next.config.js)
Next.js configuration.

**Settings:**
- React Strict Mode enabled
- SWC minification enabled

### 📝 [tsconfig.json](./tsconfig.json)
TypeScript configuration.

**Setup:**
- ES2020 target
- JSX configuration
- Strict mode enabled
- Path aliases (@/*)

### 🎨 [postcss.config.js](./postcss.config.js)
PostCSS configuration.

**Processors:**
- tailwindcss
- autoprefixer

## Environment Files

### 🔐 [.env.local](./env.local)
Local environment variables (development).

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 📋 [.env.example](/.env.example)
Template for environment variables.

Shows what variables to configure.

### 🚫 [.gitignore](./.gitignore)
Git ignore patterns.

**Excludes:**
- node_modules/
- __pycache__/
- .env
- .next/
- IDE files (.vscode, .idea)

## Data & ML Files

### 🤖 [pipe.pkl](./pipe.pkl)
Trained scikit-learn pipeline model.

Binary pickle file containing:
- Pre-trained regression model
- Feature transformers
- Model configuration

### 📊 [df.pkl](./df.pkl)
Pandas DataFrame with feature information.

Binary pickle file containing:
- Unique companies list
- Laptop types
- OS options
- CPU brands
- GPU brands

### 📈 [laptop_data.csv](./laptop_data.csv)
Original training dataset.

CSV file with laptop specifications and prices.

### 📔 [laptop_price_predictor.ipynb](./laptop_price_predictor.ipynb)
Original Jupyter notebook.

Contains:
- Data exploration
- Model training
- Feature engineering

---

## Quick Navigation

**Just Getting Started?**
1. Read: [QUICKSTART.md](./QUICKSTART.md)
2. Run: `python api.py` + `npm run dev`
3. Visit: http://localhost:3000

**Want Full Details?**
→ See [PROJECT_SETUP.md](./PROJECT_SETUP.md)

**Want to Understand the Code?**
→ Read [FRONTEND_BUILT.md](./FRONTEND_BUILT.md)

**Making Changes?**
- Backend: Edit [api.py](./api.py)
- Frontend: Edit files in `app/` and `components/`
- Styling: Edit [app/globals.css](./app/globals.css)

**Deploying?**
→ Check "Deployment" section in [PROJECT_SETUP.md](./PROJECT_SETUP.md)

---

## File Count Summary

| Category | Count | Lines |
|----------|-------|-------|
| Documentation | 4 | 700+ |
| Backend (Python) | 2 | 114 |
| Frontend (React/TS) | 4 | 577 |
| Configuration | 5 | 80 |
| Data & ML | 4 | - |
| Other | 1 | 53 |
| **Total** | **20** | **~1,500** |

---

Last Updated: 2024
