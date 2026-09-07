import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import RiskPopup from '../components/RiskPopup';
import { products, shopperScore, checkReturnRisk } from '../mockData/mockData';
import './ShopperDashboard.css';

export default function ShopperDashboard() {
  const [activeReport, setActiveReport] = useState(null);
  const [activeProductName, setActiveProductName] = useState('');

  function handleCheckRisk(product, size) {
    // Swap this line for: fetch('/predict', { method: 'POST', body: ... })
    const report = checkReturnRisk(product.id, size);
    setActiveReport(report);
    setActiveProductName(product.name);
  }

  return (
    <div className="shopper-theme">
      <div className="top-bar">
        <span className="brand">ReturnLess</span>
        <Link to="/" className="exit-link shopper-exit-link">
          Switch view
        </Link>
      </div>

      <div className="container">
        <div className="shopper-score-card">
          <div>
            <div className="shopper-score-card__tier">{shopperScore.tier}</div>
            <div className="shopper-score-card__meta">
              {shopperScore.returnsLast90Days} return out of {shopperScore.ordersLast90Days} orders in the last 90 days
            </div>
          </div>
          <div className="shopper-score-card__score">
            {shopperScore.score}
            <span className="shopper-score-card__max">/{shopperScore.maxScore}</span>
          </div>
        </div>

        <h2 className="section-heading">Shop with confidence</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onCheckRisk={handleCheckRisk} />
          ))}
        </div>
      </div>

      {activeReport && (
        <RiskPopup
          report={activeReport}
          productName={activeProductName}
          onClose={() => setActiveReport(null)}
        />
      )}
    </div>
  );
}
