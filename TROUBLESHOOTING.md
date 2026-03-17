# Troubleshooting Guide

Solutions to common issues when running the Laptop Price Predictor.

## Backend Issues

### Issue: Flask not starting

**Error:** `ModuleNotFoundError: No module named 'flask'`

**Solution:**
```bash
# Install dependencies
pip install -r requirements.txt

# Or install Flask directly
pip install flask flask-cors
```

### Issue: Model files not found

**Error:** `FileNotFoundError: [Errno 2] No such file or directory: 'pipe.pkl'`

**Solution:**
- Ensure `pipe.pkl` and `df.pkl` exist in the project root
- Check file names are spelled correctly (case-sensitive on Linux/Mac)
- Run from the correct directory containing these files

```bash
# Check if files exist
ls -la pipe.pkl df.pkl
```

### Issue: Port 5000 already in use

**Error:** `OSError: [Errno 98] Address already in use`

**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process (replace PID with the process ID)
kill -9 <PID>

# Or run Flask on a different port
python -c "
import os
os.environ['FLASK_ENV'] = 'production'
from api import app
app.run(port=5001)
"
```

### Issue: CORS errors

**Error in browser console:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
- Ensure Flask-CORS is installed: `pip install flask-cors`
- Check that `CORS(app)` is called in `api.py`
- Verify frontend URL is allowed

```python
# In api.py, add specific CORS settings if needed:
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:3000", "http://localhost:3001"]
    }
})
```

### Issue: Model predictions failing

**Error:** `ValueError: X has X features but this model was trained with Y features`

**Solution:**
- Ensure feature order matches training data
- Check `df.pkl` contains correct column names
- Verify input data types (strings should be strings, numbers should be numbers)

## Frontend Issues

### Issue: Dependencies not installing

**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Install with legacy peer deps flag
npm install --legacy-peer-deps

# Or use yarn instead
yarn install
```

### Issue: Port 3000 already in use

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or run on different port
npm run dev -- -p 3001
```

### Issue: API connection fails

**Error:** `Failed to get prediction. Make sure the API is running on port 5000.`

**Solutions:**

1. **Check Flask is running:**
   - Open http://localhost:5000/api/health in browser
   - Should see `{"status": "healthy", "model_loaded": true}`

2. **Check environment variable:**
   ```bash
   # In .env.local
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. **Check CORS:**
   - Look for CORS errors in browser console (F12 → Console)
   - Ensure Flask-CORS is installed

4. **Check firewall:**
   - Ensure port 5000 is not blocked
   - Try connecting from terminal: `curl http://localhost:5000/api/health`

### Issue: Form not loading options

**Error:** Options dropdown appears empty or disabled

**Solution:**
1. Open browser console (F12)
2. Check for fetch errors
3. Verify API endpoint: `curl http://localhost:5000/api/options`
4. Should return list of options

### Issue: TypeScript errors

**Error:** `Type 'X' is not assignable to type 'Y'`

**Solution:**
```bash
# Rebuild TypeScript
npm run build

# Or run TypeScript check
npx tsc --noEmit
```

### Issue: Tailwind styles not applying

**Error:** Styles missing or not working

**Solutions:**

1. **Restart dev server** (often fixes this)
   ```bash
   # Ctrl+C to stop
   # Then restart
   npm run dev
   ```

2. **Check Tailwind config:**
   - Verify paths in `tailwind.config.js`
   - Ensure `app/**/*.{js,ts,jsx,tsx}` is included

3. **Clear cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

## Common Errors by Component

### SpecsForm.tsx Issues

**Problem:** Form dropdowns empty
- Check `/api/options` returns data
- Verify API URL in `.env.local`

**Problem:** Form values not updating
- Check console for state errors
- Verify form handlers are connected

### PriceDisplay.tsx Issues

**Problem:** Price not showing
- Verify prediction API response format
- Check for NaN in price calculation

**Problem:** Wrong currency format
- Verify locale in `formatPrice()` function
- Check browser language settings

### Header.tsx Issues

**Problem:** API status shows disconnected
- Check if Flask is actually running
- Verify health endpoint works

## Network & Browser Issues

### Issue: Localhost not resolving

**Error:** `This site can't be reached`

**Solution:**
```bash
# Use 127.0.0.1 instead
# http://127.0.0.1:3000 instead of http://localhost:3000
```

### Issue: Mixed content warning

**Error:** `Mixed Content: The page at 'https://...' was loaded over HTTPS, but requested an insecure XMLHttpRequest`

**Solution:**
- Use HTTPS for both frontend and backend in production
- Set `NEXT_PUBLIC_API_URL` to HTTPS URL

### Issue: CORS preflight requests failing

**Error:** `OPTIONS /api/predict 403 Forbidden`

**Solution:**
```python
# In api.py, ensure CORS is configured:
from flask_cors import CORS
CORS(app)

# Or with specific settings:
CORS(app, 
     methods=["GET", "POST", "OPTIONS"],
     allow_headers=["Content-Type"])
```

## Performance Issues

### Issue: Slow predictions

**Cause:** Large model or slow hardware

**Solutions:**
1. Check Flask logs for model load time
2. Ensure adequate RAM (at least 2GB)
3. Consider model optimization/compression

### Issue: Slow page loads

**Causes:** 
- Network latency
- Large bundle size
- Slow API response

**Solutions:**
```bash
# Check bundle size
npm run build
# Check .next folder size

# Optimize images if any
# Optimize CSS with Tailwind purging
```

## Development Tools

### Debug Mode

**Enable Flask debug mode:**
```python
# In api.py
if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

**Check logs:**
- Flask logs to console
- Next.js logs to console
- Browser console (F12 → Console)

### Testing API Endpoints

```bash
# Test GET /api/options
curl http://localhost:5000/api/options

# Test health check
curl http://localhost:5000/api/health

# Test POST /api/predict
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "company": "Dell",
    "type_name": "Gaming",
    "ram": 16,
    "weight": 2.0,
    "touchscreen": 0,
    "ips": 1,
    "cpu": "Intel",
    "hdd": 0,
    "ssd": 512,
    "gpu": "NVIDIA",
    "os": "Windows",
    "resolution": "1920x1080",
    "screen_size": 15.6
  }'
```

### Check Environment

```bash
# Check Python version
python --version  # Should be 3.8+

# Check Node version
node --version   # Should be 18+

# Check npm version
npm --version    # Should be 8+

# Check if ports are available
netstat -tuln | grep LISTEN
```

## File System Issues

### Issue: File permissions denied

**Error:** `Permission denied: 'pipe.pkl'`

**Solution:**
```bash
# Change file permissions
chmod 644 pipe.pkl df.pkl
```

### Issue: Wrong working directory

**Error:** Files not found when running commands

**Solution:**
```bash
# Ensure you're in project root
pwd
ls -la pipe.pkl df.pkl

# If not, navigate to correct directory
cd /path/to/laptop-price-predictor
```

## Getting Help

### Where to find logs

1. **Flask logs:** Check terminal running `python api.py`
2. **Next.js logs:** Check terminal running `npm run dev`
3. **Browser console:** F12 → Console tab
4. **Network errors:** F12 → Network tab

### Debug checklist

Before asking for help, check:

- [ ] Flask running on port 5000?
- [ ] Next.js running on port 3000?
- [ ] `.env.local` has correct API URL?
- [ ] `pipe.pkl` and `df.pkl` exist?
- [ ] Python dependencies installed? (`pip install -r requirements.txt`)
- [ ] Node dependencies installed? (`npm install`)
- [ ] Browser console shows errors? (F12 → Console)
- [ ] Network requests succeeding? (F12 → Network)

### Report an issue

If you still need help, provide:

1. **Error message** (exact text from console)
2. **Steps to reproduce**
3. **Terminal output**
4. **Browser console errors** (F12)
5. **Which file you were modifying** (if any)
6. **System info** (OS, Python version, Node version)

## Quick Fix Commands

```bash
# Reset everything
rm -rf node_modules .next
npm cache clean --force
npm install

# Kill all Node processes
pkill node

# Kill all Python processes
pkill -f python

# Clean Python cache
find . -type d -name __pycache__ -exec rm -r {} +
find . -type f -name "*.pyc" -delete

# Start fresh
python api.py &
npm run dev
```

---

**Still stuck?** Check:
- [PROJECT_SETUP.md](./PROJECT_SETUP.md) - Full documentation
- [QUICKSTART.md](./QUICKSTART.md) - Getting started
- [ARCHITECTURE.md](./ARCHITECTURE.md) - How things work
- GitHub Issues: https://github.com/raman1233/Ultimate-Laptop-price-predictor/issues
