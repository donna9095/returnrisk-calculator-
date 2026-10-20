import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import { adminStats, activityLog } from '../mockData/mockData';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [retraining, setRetraining] = useState(false);

  // Non-functional by design (per spec) — just simulates a state change
  // so the button feels real. Wire this to POST /admin/retrain later.
  function handleRetrain() {
    setRetraining(true);
    setTimeout(() => setRetraining(false), 1800);
  }

  return (
    <div className="admin-theme">
      <div className="top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="brand">ReturnLess</span>
          <span style={{ fontSize: '12px', background: '#0f172a', color: '#ffffff', padding: '3px 10px', borderRadius: '12px', fontWeight: '600' }}>
            🛡️ Admin: {user?.id || 'admin'}
          </span>
        </div>
        <button onClick={logout} className="exit-link admin-exit-link" style={{ cursor: 'pointer', background: 'transparent' }}>
          Log out
        </button>
      </div>

      <div className="container">
        <div className="stat-grid">
          <StatCard label="Sellers on platform" value={adminStats.totalSellers} />
          <StatCard label="Registered shoppers" value={adminStats.totalShoppers.toLocaleString()} />
          <StatCard label="Platform return rate" value={`${adminStats.platformReturnRate}%`} />
          <StatCard label="Model accuracy" value={`${adminStats.modelAccuracy}%`} tone="good" />
        </div>

        <div className="model-panel">
          <div>
            <h3 className="model-panel__title">Return-risk model</h3>
            <p className="model-panel__meta">Last trained {adminStats.modelLastTrained}</p>
          </div>
          <button className="model-panel__retrain-btn" onClick={handleRetrain} disabled={retraining}>
            {retraining ? 'Retraining…' : 'Retrain model'}
          </button>
        </div>

        <h2 className="section-heading">Activity log</h2>
        <div className="activity-table-wrap">
          <table className="activity-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {activityLog.map((entry) => (
                <tr key={entry.id}>
                  <td className="activity-table__time">{entry.timestamp}</td>
                  <td>{entry.actor}</td>
                  <td>{entry.action}</td>
                  <td className="activity-table__detail">{entry.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
