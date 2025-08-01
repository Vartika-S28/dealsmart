from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from scraper import extract_amazon_data

app = Flask(__name__)
CORS(app)

# Load the trained ML model
with open("model_rating.pkl", "rb") as f:
    model = pickle.load(f)

# Smart Deal Score function
def compute_smart_deal_score(pred_rating, actual_rating, price, avg_price, total_reviews):
    rating_diff = abs(pred_rating - actual_rating)
    rating_score = max(0, 1 - rating_diff / 5)
    price_score = 1 if price <= avg_price else max(0, 1 - ((price - avg_price) / avg_price))
    review_score = min(total_reviews / 10000, 1)
    final_score = (0.4 * rating_score + 0.3 * price_score + 0.3 * review_score) * 10
    return round(final_score, 2)

@app.route("/predict", methods=["POST"])
def predict_rating():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    product = extract_amazon_data(url)

    if not product:
        return jsonify({"error": "Failed to extract product details"}), 500

    try:
        price = float(product.get("price", 0))
        reviews = int(product.get("total_reviews", 0))
        desc_len = len(product.get("description", "").split())
        actual_rating = float(product.get("actual_rating", 0))

        # Predict using model
        X = np.array([[price, reviews, desc_len]])
        pred_rating = model.predict(X)[0]

        # Optional boost
        if reviews > 10000:
            pred_rating = min(pred_rating + 0.2, 5.0)

        # Compute smart score
        avg_price = 300  # can be made dynamic later
        smart_score = compute_smart_deal_score(pred_rating, actual_rating, price, avg_price, reviews)

        return jsonify({
            "name": product["title"],
            "price": price,
            "reviews": reviews,
            "desc_len": desc_len,
            "predicted_rating": round(pred_rating, 2),
            "actual_rating": actual_rating,
            "description": product["description"],
            "smart_score": smart_score
        })

    except Exception as e:
        return jsonify({"error": f"Processing failed: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
