from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

FRED_API_KEY = '91b1db2792683229e62446ac2fa278c4'
FRED_BASE_URL = 'https://api.stlouisfed.org/fred/series/observations'

# --- Coffee Series ID ---
COFFEE_SERIES_ID = 'APU0000717311'
# --- Egg Series ID ---
EGG_SERIES_ID = 'APU0000708111'

# Helper function to fetch latest value
def get_latest_price(series_id):
    params = {
        'series_id': series_id,
        'api_key': FRED_API_KEY,
        'file_type': 'json',
        'sort_order': 'desc',
        'limit': 1
    }
    response = requests.get(FRED_BASE_URL, params=params)
    response.raise_for_status()
    obs = response.json()['observations'][0]
    return {
        "date": obs['date'],
        "price": float(obs['value'])
    }

# Helper function to fetch price change
def get_price_change(series_id):
    params = {
        'series_id': series_id,
        'api_key': FRED_API_KEY,
        'file_type': 'json',
        'sort_order': 'desc',
        'limit': 2
    }
    response = requests.get(FRED_BASE_URL, params=params)
    response.raise_for_status()
    observations = response.json()['observations']
    if len(observations) < 2:
        raise ValueError("Not enough data to compute change")
    
    latest = float(observations[0]['value'])
    previous = float(observations[1]['value'])
    change = round(latest - previous, 3)
    percent = round((change / previous) * 100, 2)
    
    return {
        "latest_date": observations[0]['date'],
        "previous_date": observations[1]['date'],
        "latest_price_usd": latest,
        "previous_price_usd": previous,
        "price_change_usd": change,
        "percentage_change": percent
    }

# --- Coffee endpoints ---
@app.route('/api/coffee/price')
def coffee_price():
    try:
        data = get_latest_price(COFFEE_SERIES_ID)
        return jsonify({
            "date": data["date"],
            "average_coffee_price_usd_per_pound": data["price"],
            "estimated_price_per_cup_usd": round(data["price"] * (10 / 453.6), 3)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/coffee/changeInPrice')
def coffee_price_change():
    try:
        return jsonify(get_price_change(COFFEE_SERIES_ID))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- Egg endpoints ---
@app.route('/api/eggs/price')
def egg_price():
    try:
        data = get_latest_price(EGG_SERIES_ID)
        return jsonify({
            "date": data["date"],
            "average_egg_price_usd_per_dozen": data["price"]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/eggs/changeInPrice')
def egg_price_change():
    try:
        return jsonify(get_price_change(EGG_SERIES_ID))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
