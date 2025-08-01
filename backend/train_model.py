import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import pickle

# Load data
df = pd.read_csv("test.csv")

# Features and target
X = df[['price', 'reviews', 'desc_len']]
y = df['rating']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
with open("model_rating.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Rating prediction model trained and saved as model_rating.pkl")
