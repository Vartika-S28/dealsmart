import React from "react";
import { useNavigate } from "react-router-dom";

function ResultPage() {
  const navigate = useNavigate();
  const result = JSON.parse(localStorage.getItem("deal_result"));

  if (!result) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>No result found</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const scoreColor =
    result.smart_score >= 8 ? "#22c55e" :
    result.smart_score >= 5 ? "#facc15" :
    "#ef4444";

  return (
    <div style={{
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: '#f9fafb'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h2 style={{ marginBottom: '10px' }}>📦 {result.name}</h2>
        <p><strong>💰 Price:</strong> ₹{result.price}</p>
        <p><strong>🗣️ Reviews:</strong> {result.reviews}</p>
        <p><strong>📝 Description:</strong> {result.description}</p>
        <p><strong>🔮 Predicted Rating:</strong> ⭐ {result.predicted_rating}</p>
        <p><strong>⭐ Actual Rating:</strong> ⭐ {result.actual_rating}</p>

        <div style={{ marginTop: '25px' }}>
          <h3 style={{ marginBottom: '10px' }}>🧠 Smart Deal Score</h3>
          <input
            type="range"
            min="0"
            max="10"
            value={result.smart_score}
            disabled
            style={{
              width: '100%',
              accentColor: scoreColor,
              height: '8px',
              borderRadius: '4px'
            }}
          />
          <p style={{
            fontWeight: 'bold',
            fontSize: '1.2rem',
            color: scoreColor,
            marginTop: '8px'
          }}>
            {result.smart_score} / 10
          </p>
          <p style={{
            fontStyle: 'italic',
            fontSize: '0.9rem',
            color: '#6b7280'
          }}>
            Based on predicted vs actual rating, review count & price.
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: '25px',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#3b82f6',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
        >
          🔁 Try Another
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
