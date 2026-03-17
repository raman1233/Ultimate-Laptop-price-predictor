# Quick Start Guide

Get your Laptop Price Predictor up and running in 2 minutes!

## Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

## 1. Start Backend (Terminal 1)

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start Flask API
python api.py
```

You should see:
```
* Running on http://127.0.0.1:5000
```

## 2. Start Frontend (Terminal 2)

```bash
# Install Node dependencies
npm install

# Start Next.js development server
npm run dev
```

You should see:
```
- Local:        http://localhost:3000
```

## 3. Open in Browser

Navigate to **http://localhost:3000** and start predicting laptop prices!

## Features

✨ **Beautiful Dark Theme** - Modern glassmorphism UI with gradient accents
⚡ **Fast Predictions** - ML-powered real-time price estimates
📊 **Detailed Analysis** - Market insights and price comparisons
📱 **Responsive Design** - Works great on desktop and mobile

## Troubleshooting

### Port Already in Use?
```bash
# Kill Flask (port 5000)
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Kill Next.js (port 3000)
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### API Connection Error?
- Ensure Flask is running on http://localhost:5000
- Check that `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:5000`
- Check browser console for CORS errors

### Missing Model Files?
- Ensure `pipe.pkl` and `df.pkl` exist in the project root
- These contain the trained ML model and feature data

## Next Steps

1. **Customize Styling** - Edit `app/globals.css`
2. **Add Features** - Modify components in `/components`
3. **Deploy** - Follow the deployment guide in `PROJECT_SETUP.md`

## File Structure

```
├── api.py                  # Flask backend
├── app/                    # Next.js frontend
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Styles
├── components/            # React components
│   ├── SpecsForm.tsx      # Input form
│   ├── PriceDisplay.tsx   # Results display
│   ├── PriceComparison.tsx # Market analysis
│   └── Header.tsx         # Navigation
└── pipe.pkl / df.pkl      # ML model files
```

## API Endpoints

- `GET /api/health` - Server health check
- `GET /api/options` - Get form dropdown options
- `POST /api/predict` - Get price prediction

For detailed API documentation, see `PROJECT_SETUP.md`

## Support

Issues? Check the full documentation in `PROJECT_SETUP.md` or visit:
https://github.com/raman1233/Ultimate-Laptop-price-predictor
