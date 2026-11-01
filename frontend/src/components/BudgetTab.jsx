import React from 'react';
import { DollarSign } from 'lucide-react';

const PASTEL_BARS = [
  'linear-gradient(90deg, #f43f5e 0%, #fb7185 100%)',
  'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
  'linear-gradient(90deg, #0ea5e9 0%, #38bdf8 100%)',
  'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
  'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
  'linear-gradient(90deg, #ec4899 0%, #f472b6 100%)',
  'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
];

export default function BudgetTab({ budgetBreakdown, totalBudget, currencySymbol = '$' }) {
  const items = Array.isArray(budgetBreakdown) ? budgetBreakdown : [];

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', background: 'rgba(255, 255, 255, 0.85)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '1.2rem' }}>💰</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Smart Budget Distribution</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>Category-wise budget and percentages</p>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
          padding: '0.4rem 1rem',
          borderRadius: '12px',
          border: '1.5px solid #a7f3d0'
        }}>
          <span style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 700, display: 'block' }}>Total Budget</span>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#059669' }}>
            {currencySymbol}{Number(totalBudget || 0).toLocaleString()}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {items.map((item, index) => {
          const barColor = PASTEL_BARS[index % PASTEL_BARS.length];
          const amountFormatted = Number(item.amount || 0).toLocaleString();
          return (
            <div key={index} style={{
              background: '#ffffff',
              padding: '1.1rem 1.25rem',
              borderRadius: '14px',
              border: '1.5px solid #f1f5f9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.55rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.98rem', color: '#1e293b' }}>
                  {item.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#64748b',
                    background: '#f1f5f9',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '6px'
                  }}>
                    {item.percentage}%
                  </span>
                  <span style={{ fontWeight: 800, color: '#1e293b', fontSize: '1.05rem' }}>
                    {currencySymbol}{amountFormatted}
                  </span>
                </div>
              </div>

              {/* Colorful Progress Bar */}
              <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                <div style={{
                  width: `${Math.min(item.percentage, 100)}%`,
                  height: '100%',
                  background: barColor,
                  borderRadius: '999px'
                }} />
              </div>

              {item.notes && (
                <div style={{ fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>💡</span>
                  <span style={{ fontStyle: 'italic' }}>{item.notes}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
