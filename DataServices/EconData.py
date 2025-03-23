from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

FRED_API_KEY = '91b1db2792683229e62446ac2fa278c4' # my api key 
FRED_SERIES_ID = 'APU0000717311' # for the data tables from fred
FRED_API_URL = 'https://api.stlouisfed.org/fred/series/observations' # api for datat

GRAMS_PER_CUP = 10
GRAMS_PER_POUND = 453.6

# to get the laterst average price of coffee 
def get_latest_coffee_price():
    params = { # to put in api link
        'series_id': FRED_SERIES_ID,
        'api_key': FRED_API_KEY,
        'file_type': 'json',
        'sort_order': 'desc',
        'limit': 1
    }
    
    response = requests.get(FRED_API_URL, params=params) # request data
    response.raise_for_status()
    data = response.json()
    latest = data['observations'][0]
    #to calcualte the average price for a cup of coffee - rather than just for a pound
    price_per_pound = float(latest['value']) 
    price_per_cup = round(price_per_pound * (GRAMS_PER_CUP / GRAMS_PER_POUND), 3)
    #return the data so I can use it in app 
    return {
        "date": latest['date'],
        "average_coffee_price_usd_per_pound": price_per_pound,
        "estimated_price_per_cup_usd": price_per_cup
    }
# get the percent change from last week so it can show economic growth 
def get_price_change_from_last_week():
    params = {
        'series_id': FRED_SERIES_ID,
        'api_key': FRED_API_KEY,
        'file_type': 'json',
        'sort_order': 'desc',
        'limit': 2  # Get latest and previous week's prices
    }
    response = requests.get(FRED_API_URL, params=params)
    response.raise_for_status()
    data = response.json()
    observations = data['observations']

    if len(observations) < 2:
        raise ValueError("Not enough data to calculate change.")

    latest = float(observations[0]['value'])
    previous = float(observations[1]['value'])

    change = round(latest - previous, 3)
    percent_change = round((change / previous) * 100, 2)

    return {
        "latest_date": observations[0]['date'],
        "previous_date": observations[1]['date'],
        "latest_price_usd_per_pound": latest,
        "previous_price_usd_per_pound": previous,
        "price_change_usd_per_pound": change,
        "percentage_change": percent_change
    }
# define the routes. 
@app.route('/api/coffee/price', methods=['GET'])
def coffee_price():
    try:
        price_data = get_latest_coffee_price()
        return jsonify(price_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/coffee/changeInPrice', methods=['GET'])
def coffee_price_change():
    try:
        change_data = get_price_change_from_last_week()
        return jsonify(change_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)