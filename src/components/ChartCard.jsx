import React from 'react';
import './components.css';

/**
 * A titled container for a chart. Pass any chart (Recharts <ResponsiveContainer>
 * etc.) as children so every chart on the dashboards shares the same frame,
 * padding, and heading style.
 *
 * Props:
 *  - title: string
 *  - subtitle: string (optional)
 *  - children: the chart itself
 */
export default function ChartCard({ title, subtitle, children }) {
  return (
    <div className="chart-card">
      <div className="chart-card__header">
        <h3 className="chart-card__title">{title}</h3>
        {subtitle && <p className="chart-card__subtitle">{subtitle}</p>}
      </div>
      <div className="chart-card__body">{children}</div>
    </div>
  );
}
