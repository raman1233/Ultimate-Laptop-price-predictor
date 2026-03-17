from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import logging

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the model and dataframe
try:
    pipe = pickle.load(open('pipe.pkl', 'rb'))
    df = pickle.load(open('df.pkl', 'rb'))
    logger.info("Model and data loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    pipe = None
    df = None

# Route to get options for dropdowns
@app.route('/api/options', methods=['GET'])
def get_options():
    """Return all available options for the prediction form"""
    try:
        if df is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        options = {
            "companies": sorted(df['Company'].unique().tolist()),
            "types": sorted(df['TypeName'].unique().tolist()),
            "operating_systems": sorted(df['os'].unique().tolist()),
            "cpu_brands": sorted(df['Cpu brand'].unique().tolist()),
            "gpu_brands": sorted(df['Gpu brand'].unique().tolist()),
            "resolutions": ['1920x1080', '1366x768', '1600x900', '3840x2160', '3200x1800', '2880x1800', '2560x1600', '2560x1440', '2304x1440'],
            "ram_options": [2, 4, 6, 8, 12, 16, 24, 32, 64],
            "storage_options": [0, 8, 128, 256, 512, 1024, 2048]
        }
        return jsonify(options), 200
    except Exception as e:
        logger.error(f"Error fetching options: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Route to predict laptop price
@app.route('/api/predict', methods=['POST'])
def predict():
    """Predict laptop price based on specifications"""
    try:
        if pipe is None or df is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        data = request.get_json()
        
        # Extract and validate input
        company = data.get('company')
        type_name = data.get('type_name')
        ram = int(data.get('ram', 8))
        weight = float(data.get('weight', 1.5))
        touchscreen = int(data.get('touchscreen', 0))
        ips = int(data.get('ips', 0))
        cpu = data.get('cpu')
        hdd = int(data.get('hdd', 0))
        ssd = int(data.get('ssd', 0))
        gpu = data.get('gpu')
        os = data.get('os')
        resolution = data.get('resolution', '1920x1080')
        screen_size = float(data.get('screen_size', 15.6))
        
        # Calculate PPI
        X_res = int(resolution.split('x')[0])
        Y_res = int(resolution.split('x')[1])
        ppi = ((X_res**2) + (Y_res**2))**0.5 / screen_size
        
        # Create prediction query
        query = pd.DataFrame([[
            company, type_name, ram, weight, touchscreen, ips, ppi, cpu, hdd, ssd, gpu, os
        ]], columns=['Company', 'TypeName', 'Ram', 'Weight', 'Touchscreen', 'Ips', 'ppi', 'Cpu brand', 'HDD', 'SSD', 'Gpu brand', 'os'])
        
        # Get prediction
        prediction = np.exp(pipe.predict(query)[0])
        
        return jsonify({
            "success": True,
            "predicted_price": float(prediction),
            "currency": "INR",
            "specs_summary": {
                "company": company,
                "type": type_name,
                "ram": f"{ram}GB",
                "storage": f"SSD: {ssd}GB, HDD: {hdd}GB",
                "processor": cpu,
                "graphics": gpu,
                "os": os
            }
        }), 200
    
    except Exception as e:
        logger.error(f"Error making prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "model_loaded": pipe is not None}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
