import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './components.css';

const RISK_COLOR = {
  Low: '#2f7a4d',
  Moderate: '#c98a1f',
  High: '#c14343',
};

/**
 * Modal shown after a shopper checks a product's return risk.
 *
 * Props:
 *  - report: { productId, size, riskPercent, riskLabel, explanation, reasonBreakdown[] }
 *  - productName: string — shown in the popup header
 *  - onClose: () => void
 */
export default function RiskPopup({ report, productName, onClose }) {
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    // Animate the gauge from 0 to the real value on mount.
    const raf = requestAnimationFrame(() => setAnimatedPercent(report.riskPercent));
    return () => cancelAnimationFrame(raf);
  }, [report.riskPercent]);

  const color = RISK_COLOR[report.riskLabel] || '#2f7a4d';

  // Circular gauge geometry
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedPercent / 100) * circumference;

  return (
    <div className="risk-popup__overlay" role="dialog" aria-modal="true" aria-label="Return risk report">
      <div className="risk-popup">
        <button className="risk-popup__close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <h2 className="risk-popup__title">{productName}</h2>
        <p className="risk-popup__size">Size {report.size}</p>

        <div className="risk-popup__gauge-wrap">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#e7e7e2"
              strokeWidth="12"
            />
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 70 70)"
              style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)' }}
            />
            <text x="70" y="66" textAnchor="middle" fontSize="26" fontWeight="700" fill="#1c1c1c">
              {report.riskPercent}%
            </text>
            <text x="70" y="86" textAnchor="middle" fontSize="12" fill="#6b6b66">
              {report.riskLabel} risk
            </text>
          </svg>
        </div>

        <p className="risk-popup__explanation">{report.explanation}</p>
        {report.suggestedAction && (
          <div style={{ margin: '10px 0 16px', padding: '10px 12px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13px', color: '#1e293b', textAlign: 'left', lineHeight: '1.4' }}>
            <span style={{ fontWeight: '600', color: '#0f172a' }}>🎯 Prescriptive Action: </span>
            {report.suggestedAction}
          </div>
        )}

        <h4 className="risk-popup__breakdown-title">Why this score</h4>
        <div className="risk-popup__chart">
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={report.reasonBreakdown} layout="vertical" margin={{ left: 10, right: 20 }}>
              <XAxis type="number" domain={[0, 60]} hide />
              <YAxis
                type="category"
                dataKey="reason"
                width={110}
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, 'Share of risk']}
                cursor={{ fill: 'rgba(0,0,0,0.04)' }}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={16}>
                {report.reasonBreakdown.map((entry, index) => (
                  <Cell key={entry.reason} fill={color} fillOpacity={1 - index * 0.22} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
