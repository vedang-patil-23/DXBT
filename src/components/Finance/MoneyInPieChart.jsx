import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#111', '#A68E45', '#E5C97B', '#D3B574', '#EFE8D2', '#333', '#666'];

export default function MoneyInPieChart({ transactions }) {
  if (!transactions || transactions.length === 0) return null;
  // Aggregate by certainty
  const data = Object.values(
    transactions.reduce((acc, txn) => {
      acc[txn.certainty] = acc[txn.certainty] || { name: txn.certainty, value: 0 };
      acc[txn.certainty].value += Number(txn.amount || 0);
      return acc;
    }, {})
  );
  return (
    <div style={{ width: '100%', maxWidth: 340, margin: '0 auto 2em auto' }}>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {/* Custom Legend Below Chart */}
      <ul className="dxbt-piechart-legend">
        {data.map((entry, idx) => (
          <li key={`legend-${idx}`} style={{ color: COLORS[idx % COLORS.length] }}>
            <span className="dxbt-legend-dot" style={{ background: COLORS[idx % COLORS.length] }}></span>
            <span
              className="dxbt-legend-label"
              title={entry.name}
            >
              {entry.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
