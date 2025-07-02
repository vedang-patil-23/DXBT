import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './MoneyOutPieChart.css'; // Legend and pie chart styling

const COLORS = ['#111', '#A68E45', '#E5C97B', '#D3B574', '#EFE8D2', '#333', '#666'];

export default function MoneyOutPieChart({ moneyOutList }) {
  if (!moneyOutList || moneyOutList.length === 0) return null;
  // Aggregate by category
  const data = Object.values(
    moneyOutList.reduce((acc, txn) => {
      acc[txn.category] = acc[txn.category] || { name: txn.category, value: 0 };
      acc[txn.category].value += Number(txn.amount || 0);
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
            <span className="dxbt-legend-label" title={entry.name}>{entry.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
