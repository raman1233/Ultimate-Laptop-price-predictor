# Laptop Price Predictor - Setup Guide

A modern, full-stack machine learning application featuring a beautiful Next.js frontend and Flask API backend for predicting laptop prices.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles and design tokens
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── SpecsForm.tsx      # Input form component
│   └── PriceDisplay.tsx   # Price prediction display
├── api.py                 # Flask API backend
├── package.json           # Frontend dependencies
├── requirements.txt       # Python dependencies
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Tech Stack

### Frontend
- **Next.js 16** - React framework for production
- **React 19** - UI library
- **TailwindCSS 3.4** - Utility-first CSS
- **TypeScript** - Type safety

### Backend
- **Flask 2.3** - Python web framework
- **Scikit-Learn** - Machine learning model
- **Pandas & NumPy** - Data processing
- **Flask-CORS** - Cross-origin request handling

## Prerequisites

- Node.js 18+ (for frontend)
- Python 3.8+ (for backend)
- pip (Python package manager)
- npm or yarn (Node package manager)

## Setup Instructions

### 1. Backend Setup (Flask API)

```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the Flask API server
python api.py
```

The API will run on `http://localhost:5000`

**Available Endpoints:**
- `GET /api/health` - Health check
- `GET /api/options` - Get form options (companies, CPU types, etc.)
- `POST /api/predict` - Get price prediction

### 2. Frontend Setup (Next.js)

```bash
# Install dependencies
npm install
# or
yarn install

# Create .env.local file (already provided)
# NEXT_PUBLIC_API_URL=http://localhost:5000

# Start development server
npm run dev
# or
yarn dev
```

The frontend will run on `http://localhost:3000`

## Development

### Running Both Services

**Terminal 1 - Backend:**
```bash
python api.py
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

### Building for Production

**Backend:**
```bash
# No build step needed, just ensure dependencies are installed
pip install -r requirements.txt
```

**Frontend:**
```bash
npm run build
npm start
```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Update `NEXT_PUBLIC_API_URL` to your production API URL when deploying.

## Features

### Input Specifications
- **Brand** - Laptop manufacturer
- **Type** - Laptop category (Ultrabook, Gaming, etc.)
- **Processor** - CPU brand (Intel, AMD)
- **Graphics** - GPU brand (NVIDIA, AMD, etc.)
- **RAM** - Memory size (2-64GB)
- **Storage** - SSD and HDD capacity
- **Display** - Resolution and screen size
- **Features** - Touchscreen, IPS panel

### Output
- **Estimated Price** - Predicted market value in INR
- **Price Analysis** - Market insights and comparisons
- **Specification Summary** - Detailed specs breakdown

## API Documentation

### Get Form Options
```
GET /api/options

Response:
{
  "companies": ["Dell", "HP", "Lenovo", ...],
  "types": ["Ultrabook", "Gaming", ...],
  "operating_systems": ["Windows", "Linux", "MacOS"],
  "cpu_brands": ["Intel", "AMD"],
  "gpu_brands": ["NVIDIA", "AMD", "Intel"],
  "resolutions": ["1920x1080", ...],
  "ram_options": [2, 4, 6, 8, ...],
  "storage_options": [0, 128, 256, ...]
}
```

### Predict Price
```
POST /api/predict

Request Body:
{
  "company": "Dell",
  "type_name": "Gaming",
  "ram": 16,
  "weight": 2.0,
  "touchscreen": false,
  "ips": true,
  "cpu": "Intel",
  "hdd": 0,
  "ssd": 512,
  "gpu": "NVIDIA",
  "os": "Windows",
  "resolution": "1920x1080",
  "screen_size": 15.6
}

Response:
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

## Customization

### Styling
Edit `app/globals.css` to customize the design tokens:
- Colors (primary, secondary, accent)
- Typography
- Spacing and border radius

### API Configuration
Update the Flask API URL in `.env.local`:
```
NEXT_PUBLIC_API_URL=your-production-api-url
```

## Troubleshooting

### API Connection Error
- Ensure Flask server is running on port 5000
- Check that `NEXT_PUBLIC_API_URL` is correct in `.env.local`
- Check browser console for CORS errors

### Model Not Loading
- Verify `pipe.pkl` and `df.pkl` exist in the project root
- Check that all Python dependencies are installed
- Review Flask server logs for errors

### Port Already in Use
```bash
# Find process using port
lsof -i :5000  # Flask
lsof -i :3000  # Next.js

# Kill the process
kill -9 <PID>
```

## Deployment

### Vercel (Frontend)
1. Push to GitHub
2. Connect repository to Vercel
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Deploy

### Backend Deployment Options
- **Heroku** - Simple Flask deployment
- **AWS** - EC2 with Gunicorn
- **DigitalOcean** - Droplets or App Platform
- **Railway** - Simple Python hosting

## Future Enhancements

- Price comparison with market listings
- Historical price trends
- Laptop recommendations based on budget
- Export price reports as PDF
- User saved predictions history

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, visit the GitHub repository:
https://github.com/raman1233/Ultimate-Laptop-price-predictor
