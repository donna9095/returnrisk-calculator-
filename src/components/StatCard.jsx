import React from 'react';
import './components.css';

/**
 * A single metric tile: a big number, a label, and an optional trend/subtext.
 *
 * Props:
 *  - label: string — what the number represents
 *  - value: string | number — the headline figure (already formatted)
 *  - subtext: string — optional smaller line under the value
 *  - tone: 'default' | 'warning' | 'good' — tints the value color
 */
export default function StatCard({ label, value, subtext, tone = 'default' }) {
  return (
    <div className="stat-card">
      <div className="stat-card__label">{label}</div>
      <div className={`stat-card__value stat-card__value--${tone}`}>{value}</div>
      {subtext && <div className="stat-card__subtext">{subtext}</div>}
    </div>
  );
}
