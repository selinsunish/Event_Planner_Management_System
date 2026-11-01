import React from 'react';
import { Check, Clock, Calendar, CheckSquare } from 'lucide-react';

export default function VendorTab({ vendorChecklist, onToggleStatus }) {
  const list = Array.isArray(vendorChecklist) ? vendorChecklist : [];
  const completedCount = list.filter(v => v.status === 'completed').length;
  const progressPercent = list.length > 0 ? Math.round((completedCount / list.length) * 100) : 0;

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', background: 'rgba(255, 255, 255, 0.85)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '1.2rem' }}>📋</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Vendor Master Checklist</h3>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>Vendor tasks, categories and deadline priorities</p>
        </div>

        {/* Progress pill */}
        <div style={{
          background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
          padding: '0.45rem 1rem',
          borderRadius: '12px',
          border: '1.5px solid #ddd6fe',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6d28d9', fontWeight: 700 }}>Completion</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#7c3aed' }}>
              {completedCount} / {list.length} ({progressPercent}%)
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {list.map((item) => {
          const isDone = item.status === 'completed';
          return (
            <div 
              key={item.id} 
              onClick={() => onToggleStatus(item.id)}
              style={{
                background: isDone ? '#f8fafc' : '#ffffff',
                border: isDone ? '1.5px solid #e2e8f0' : '1.5px solid #f1f5f9',
                padding: '1rem 1.25rem',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isDone ? 'none' : '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '8px',
                  border: isDone ? 'none' : '2px solid #cbd5e1',
                  background: isDone ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isDone ? '0 3px 8px rgba(16, 185, 129, 0.3)' : 'none'
                }}>
                  {isDone && <Check size={16} color="#ffffff" strokeWidth={3} />}
                </div>
                <div>
                  <div style={{
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    textDecoration: isDone ? 'line-through' : 'none',
                    color: isDone ? '#94a3b8' : '#1e293b'
                  }}>
                    {item.task}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', gap: '0.75rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, color: '#8b5cf6' }}>📁 {item.category}</span>
                    <span>⏳ Priority / Deadline: {item.deadline}</span>
                  </div>
                </div>
              </div>

              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                background: isDone ? '#ecfdf5' : '#fffbeb',
                color: isDone ? '#059669' : '#d97706',
                border: isDone ? '1px solid #a7f3d0' : '1px solid #fde68a',
                whiteSpace: 'nowrap'
              }}>
                {isDone ? 'Completed ✨' : 'Pending Action'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
