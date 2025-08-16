# 🛒 DealSmart

Your intelligent shopping assistant powered by Machine Learning! DealSmart analyzes Amazon products to determine if they're a real deal or just fake hype.

## 🚀 Features

- **AI-Powered Analysis**: Uses machine learning to predict product ratings and assess deal quality
- **Smart Deal Scoring**: Calculates a comprehensive score based on multiple factors:
  - Predicted vs actual rating comparison
  - Price analysis against market average
  - Review count assessment
- **Amazon Product Scraping**: Automatically extracts product information from Amazon URLs
- **Modern Web Interface**: Clean, responsive React frontend with intuitive user experience
- **Real-time Processing**: Instant analysis with detailed results

## 🏗️ Architecture

This project consists of two main components:

### Backend (Flask API)
- **Flask** web server with CORS support
- **Machine Learning Model**: Pre-trained rating prediction model (`model_rating.pkl`)
- **Web Scraping**: Amazon product data extraction using BeautifulSoup
- **Smart Deal Algorithm**: Multi-factor scoring system

### Frontend (React App)
- **React 19** with modern hooks
- **React Router** for navigation
- **Axios** for API communication
- **Responsive Design** with modern CSS

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd dealsmart
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r ../requirements.txt
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install
```

## 🚀 Running the Application

### 1. Start the Backend Server
```bash
cd backend
# Activate virtual environment if not already activated
python app.py
```

The Flask server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server
```bash
cd frontend
npm start
```

The React app will start on `http://localhost:3000`

## 📖 Usage

1. **Open the Application**: Navigate to `http://localhost:3000` in your browser
2. **Paste Amazon URL**: Copy and paste any Amazon product URL into the input field
3. **Analyze**: Click "Analyze Deal" to process the product
4. **View Results**: See the detailed analysis including:
   - Product information (name, price, reviews)
   - Predicted vs actual rating
   - Smart Deal Score (0-10 scale)
   - Color-coded recommendations

## 🧠 How the Smart Deal Score Works

The Smart Deal Score is calculated using a weighted algorithm that considers:

- **Rating Score (40%)**: How close the predicted rating is to the actual rating
- **Price Score (30%)**: How the price compares to the market average
- **Review Score (30%)**: The credibility based on number of reviews

**Score Interpretation:**
- 🟢 **8-10**: Excellent deal - highly recommended
- 🟡 **5-7**: Good deal - worth considering
- 🔴 **0-4**: Poor deal - proceed with caution

## 🛠️ Technical Details

### Backend Dependencies
- **Flask**: Web framework
- **Flask-CORS**: Cross-origin resource sharing
- **BeautifulSoup4**: Web scraping
- **scikit-learn**: Machine learning
- **numpy**: Numerical computing
- **requests**: HTTP library

### Frontend Dependencies
- **React**: UI framework
- **React Router**: Navigation
- **Axios**: HTTP client

### API Endpoints
- `POST /predict`: Analyzes Amazon product URL and returns deal analysis

## 📁 Project Structure

```
dealsmart/
├── backend/
│   ├── app.py              # Flask API server
│   ├── scraper.py          # Amazon data extraction
│   ├── model_rating.pkl    # Trained ML model
│   └── venv/               # Python virtual environment
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.js    # Main landing page
│   │   │   └── ResultPage.js  # Results display
│   │   ├── App.js             # Main app component
│   │   └── App.css            # Styles
│   ├── package.json
│   └── public/
└── requirements.txt
```

