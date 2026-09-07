import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import {
  sellerStats,
  returnsByCategory,
  returnReasonsBreakdown,
  highRiskOrders,
  categoryOptions,
} from '../mockData/mockData';
import './SellerDashboard.css';

const DONUT_COLORS = ['#2a5ea6', '#5b8fd6', '#8fb4e6', '#b9d0ef', '#dde8f7'];

export default function SellerDashboard() {
  const [category, setCategory] = useState('All Categories');
  const [dateFrom, setDateFrom] = useState('2026-09-01');
  const [dateTo, setDateTo] = useState('2026-09-06');

  const filteredOrders = useMemo(() => {
    return highRiskOrders.filter((order) => {
      const matchesCategory = category === 'All Categories' || order.category === category;
      const matchesDate = order.date >= dateFrom && order.date <= dateTo;
      return matchesCategory && matchesDate;
    });
  }, [category, dateFrom, dateTo]);

  return (
    <div className="seller-theme">
      <div className="top-bar">
        <span className="brand">ReturnLess</span>
        <Link to="/" className="exit-link seller-exit-link">
          Switch view
        </Link>
      </div>

      <div className="container">
        <div className="stat-grid">
          <StatCard label="Total orders" value={sellerStats.totalOrders.toLocaleString()} />
          <StatCard label="Return rate" value={`${sellerStats.returnRate}%`} tone="warning" />
          <StatCard
            label="High-risk orders today"
            value={sellerStats.highRiskOrdersToday}
            subtext="Flagged at checkout"
            tone="warning"
          />
        </div>

        <div className="chart-grid">
          <ChartCard title="Returns by category" subtitle="Last 30 days">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={returnsByCategory} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6ecf5" />
                <XAxis dataKey="category" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'rgba(42,94,166,0.06)' }} />
                <Bar dataKey="returns" fill="#2a5ea6" radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Return reasons" subtitle="Share of all returns">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={returnReasonsBreakdown}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {returnReasonsBreakdown.map((entry, index) => (
                    <Cell key={entry.name} fill={DONUT_COLORS[index % DONUT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  wrapperStyle={{ fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <h2 className="section-heading">High-risk orders</h2>

        <div className="filter-bar">
          <div className="filter-bar__field">
            <label htmlFor="dateFrom">From</label>
            <input
              id="dateFrom"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="filter-bar__field">
            <label htmlFor="dateTo">To</label>
            <input id="dateTo" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
          <div className="filter-bar__field">
            <label htmlFor="category">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categoryOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Product</th>
                <th>Size</th>
                <th>Shopper</th>
                <th>Category</th>
                <th>Date</th>
                <th>Risk</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.product}</td>
                  <td>{order.size}</td>
                  <td>{order.shopper}</td>
                  <td>{order.category}</td>
                  <td>{order.date}</td>
                  <td>
                    <span className="risk-pill">{order.riskPercent}%</span>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="orders-table__empty">
                    No high-risk orders match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
