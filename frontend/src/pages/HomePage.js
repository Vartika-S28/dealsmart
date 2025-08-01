import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/predict", { url });
      // Store result in local storage (or state manager later)
      localStorage.setItem("deal_result", JSON.stringify(res.data));
      navigate("/result");
    } catch (err) {
      alert("Something went wrong. Try a different Amazon URL.");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <header className="hero">
        <h1>🛒 DealSmart</h1>
        <p>Your intelligent shopping assistant powered by Machine Learning!</p>
        <a href="#analyze" className="scroll-link">▼ Start Analyzing</a>
      </header>

      <section className="info">
        <h2>📌 About DealSmart</h2>
        <p>Analyze Amazon products with AI to check if they're a real deal or just fake hype.</p>
      </section>

      <section className="analyzer" id="analyze">
        <h2>🔍 Analyze a Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Paste Amazon Product URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Deal"}
          </button>
        </form>
      </section>

      <footer>
        <p>© 2025 DealSmart | Crafted with care using Flask & React</p>
      </footer>
    </div>
  );
}

export default HomePage;
