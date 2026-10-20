import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import RiskPopup from '../components/RiskPopup';
import { products, shopperScore, checkReturnRisk } from '../mockData/mockData';
import './ShopperDashboard.css';

export default function ShopperDashboard() {
  const { user, logout } = useAuth();
  const [activeReport, setActiveReport] = useState(null);
  const [activeProductName, setActiveProductName] = useState('');

  async function handleCheckRisk(product, size) {
    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          category: product.category,
          price: product.price,
          discountPercent: 35.0,
          size: size,
          paymentMode: 'COD',
          shopperEmail: user?.email || 'shopper.demo@mail.com'
        })
      });
      if (res.ok) {
        const report = await res.json();
        setActiveReport(report);
        setActiveProductName(product.name);
        return;
      }
    } catch (err) {
      console.warn("Backend /predict offline, using fallback", err);
    }
    const report = checkReturnRisk(product.id, size);
    setActiveReport(report);
    setActiveProductName(product.name);
  }

  return (
    <div className="shopper-theme">
      <div className="top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="brand">ReturnLess</span>
          <span style={{ fontSize: '12px', background: '#e2e8f0', color: '#166534', padding: '3px 10px', borderRadius: '12px', fontWeight: '500' }}>
            🛍️ Shopper: {user?.id || 'demo'}
          </span>
        </div>
        <button onClick={logout} className="exit-link shopper-exit-link" style={{ cursor: 'pointer', background: 'transparent' }}>
          Log out
        </button>
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
