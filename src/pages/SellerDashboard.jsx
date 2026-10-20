import React, { useMemo, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
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
  const { user, logout } = useAuth();
  const [category, setCategory] = useState('All Categories');
  const [dateFrom, setDateFrom] = useState('2026-09-01');
  const [dateTo, setDateTo] = useState('2026-09-06');
  const [orders, setOrders] = useState(highRiskOrders);
  const [simulatorOrders, setSimulatorOrders] = useState(5000);
  const [savingsData, setSavingsData] = useState({
    netSavings: 31875,
    returnsPrevented: 188,
    flaggedOrders: 750
  });

  // Fetch live orders from Flask SQLite backend
  useEffect(() => {
    async function fetchLiveOrders() {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/orders');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setOrders(data);
          }
        }
      } catch (e) {
        console.warn('Backend offline, using fallback orders:', e);
      }
    }
    fetchLiveOrders();
  }, []);

  // Update savings simulator
  useEffect(() => {
    async function updateSavings() {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/savings-simulator?total_orders=${simulatorOrders}&flagged_percent=15&success_rate=25&cost_per_return=180`);
        if (res.ok) {
          const data = await res.json();
          setSavingsData(data);
          return;
        }
      } catch (e) {}
      // Client calculation fallback
      const flagged = Math.round(simulatorOrders * 0.15);
      const prevented = Math.round(flagged * 0.25);
      const net = Math.round(prevented * 180 - flagged * 2.5);
      setSavingsData({ netSavings: net, returnsPrevented: prevented, flaggedOrders: flagged });
    }
    updateSavings();
  }, [simulatorOrders]);

  async function handleAction(orderId, actionType) {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/orders/${orderId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionType })
      });
      if (res.ok) {
        setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: 'Intervention Active' } : o));
        alert(`Intervention '${actionType}' triggered for order ${orderId}! Status updated.`);
        return;
      }
    } catch (e) {
      console.warn("Could not record action on backend:", e);
    }
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: 'Intervention Active' } : o));
    alert(`Intervention '${actionType}' sent for order ${orderId}!`);
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesCategory = category === 'All Categories' || order.category === category;
      const matchesDate = !order.date || (order.date >= dateFrom && order.date <= dateTo);
      return matchesCategory && matchesDate;
    });
  }, [orders, category, dateFrom, dateTo]);

  return (
    <div className="seller-theme">
      <div className="top-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="brand">ReturnLess</span>
          <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: '12px', fontWeight: '600' }}>
            🏪 Seller: {user?.id || 'seller'}
          </span>
          <span style={{ fontSize: '11px', background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '8px' }}>
            ⚡ XGBoost (Recall: 87.5%)
          </span>
        </div>
        <button onClick={logout} className="exit-link seller-exit-link" style={{ cursor: 'pointer', background: 'transparent' }}>
          Log out
        </button>
      </div>

      <div className="container">
        <div className="stat-grid">
          <StatCard label="Total orders" value={sellerStats.totalOrders.toLocaleString()} />
          <StatCard label="Return rate" value={`${sellerStats.returnRate}%`} tone="warning" />
          <StatCard
            label="High-risk orders today"
            value={sellerStats.highRiskOrdersToday}
            subtext="Flagged pre-dispatch"
            tone="warning"
          />
        </div>

        {/* Savings Simulator Section */}
        <div style={{ background: '#ffffff', border: '1px solid #dde6f2', borderRadius: '10px', padding: '18px 24px', margin: '20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '16px', color: '#1e293b' }}>
                💰 Return Cost Savings Simulator
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>
                Estimated monthly savings based on pre-dispatch intervention (Assumes ₹180 avg return logistics cost & 25% intervention success)
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', color: '#334155' }}>Monthly Orders: {simulatorOrders}</label>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={simulatorOrders}
                onChange={(e) => setSimulatorOrders(Number(e.target.value))}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginTop: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>High-Risk Orders Flagged</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{savingsData.flaggedOrders}</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Returns Prevented</div>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#2563eb' }}>{savingsData.returnsPrevented}</div>
            </div>
            <div style={{ background: '#ecfdf5', padding: '12px', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
              <div style={{ fontSize: '12px', color: '#065f46' }}>Net Monthly Savings</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#059669' }}>₹{Number(savingsData.netSavings).toLocaleString()}</div>
            </div>
          </div>
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

        <h2 className="section-heading">Pre-Dispatch High-Risk Orders Ledger</h2>

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
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.orderId}>
                  <td><strong>{order.orderId}</strong></td>
                  <td>{order.product}</td>
                  <td>{order.size}</td>
                  <td>{order.shopper}</td>
                  <td>{order.category}</td>
                  <td>{order.date}</td>
                  <td>
                    <span className="risk-pill">{order.riskPercent}%</span>
                  </td>
                  <td>
                    <span style={{
                      fontSize: '11.5px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontWeight: '600',
                      background: order.status === 'Intervention Active' ? '#ecfdf5' : '#fff7ed',
                      color: order.status === 'Intervention Active' ? '#065f46' : '#c2410c'
                    }}>
                      {order.status || 'Flagged'}
                    </span>
                  </td>
                  <td>
                    {order.status === 'Intervention Active' ? (
                      <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '500' }}>✓ Sent</span>
                    ) : (
                      <button
                        onClick={() => handleAction(order.orderId, 'Size/Address Check')}
                        style={{
                          background: '#2563eb',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '5px 10px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          fontWeight: '500'
                        }}
                      >
                        ⚡ Intervene
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={9} className="orders-table__empty">
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
