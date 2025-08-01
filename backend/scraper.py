import requests
from bs4 import BeautifulSoup

def extract_amazon_data(url):
    # Clean URL
    url = url.split("?")[0]

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }

    res = requests.get(url, headers=headers)
    soup = BeautifulSoup(res.text, "html.parser")

    def get_text(selector):
        tag = soup.select_one(selector)
        return tag.get_text(strip=True) if tag else None

    # Extract data
    title = get_text("#productTitle") or "N/A"
    price = (get_text(".a-price .a-offscreen") or "₹0").replace("₹", "").replace(",", "")
    actual_rating = (get_text("i.a-icon-star span") or "0").split()[0]
    total_reviews = (get_text("#acrCustomerReviewText") or "0").split()[0].replace(",", "")
    description = get_text("#productDescription") or ""

    return {
        "title": title,
        "price": float(price) if price.replace('.', '', 1).isdigit() else 0,
        "total_reviews": int(total_reviews) if total_reviews.isdigit() else 0,
        "description": description,
        "actual_rating": float(actual_rating) if actual_rating.replace('.', '', 1).isdigit() else 0
    }
