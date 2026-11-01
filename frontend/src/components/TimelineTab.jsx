import React from 'react';
import { Clock } from 'lucide-react';

const MILESTONE_COLORS = {
  'Preparation': { bg: '#ffe4e6', text: '#e11d48', border: '#fecdd3' },
  'Photos': { bg: '#fef3c7', text: '#d97706', border: '#fde68a' },
  'Guest Welcome': { bg: '#e0f2fe', text: '#0284c7', border: '#bae6fd' },
  'Arrival': { bg: '#e0f2fe', text: '#0284c7', border: '#bae6fd' },
  'Ceremony': { bg: '#ede9fe', text: '#7c3aed', border: '#ddd6fe' },
  'Social': { bg: '#fce7f3', text: '#be185d', border: '#fbcfe8' },
  'Dinner': { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' },
  'Food': { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' },
  'Speeches': { bg: '#ffedd5', text: '#c2410c', border: '#fed7aa' },
  'Fun': { bg: '#ffedd5', text: '#c2410c', border: '#fed7aa' },
  'Party': { bg: '#f3e8ff', text: '#9333ea', border: '#e9d5ff' },
  'Dance': { bg: '#f3e8ff', text: '#9333ea', border: '#e9d5ff' },
  'Celebration': { bg: '#ffe4e6', text: '#e11d48', border: '#fecdd3' },
  'Farewell': { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' },
  'Setup': { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' },
  'Opening': { bg: '#e0f2fe', text: '#0284c7', border: '#bae6fd' },
  'Activities': { bg: '#fef3c7', text: '#d97706', border: '#fde68a' },
  'Music': { bg: '#fce7f3', text: '#be185d', border: '#fbcfe8' },
  'Awards': { bg: '#ede9fe', text: '#7c3aed', border: '#ddd6fe' },
  'Wrap-up': { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' }
};

export default function TimelineTab({ timeline }) {
  const slots = Array.isArray(timeline) ? timeline : [];

  return (
    <div className="glass-panel" style={{ padding: '1.75rem', background: 'rgba(255, 255, 255, 0.85)' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
          <span style={{ fontSize: '1.2rem' }}>🕒</span>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Run of Show & Agenda</h3>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>Chronological activities, timings and event flow</p>
      </div>

      <div style={{
        position: 'relative',
        paddingLeft: '1.75rem',
        borderLeft: '2.5px dashed #cbd5e1',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.35rem'
      }}>
        {slots.map((slot, index) => {
          const badgeStyle = MILESTONE_COLORS[slot.milestone] || { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' };

          return (
            <div key={index} style={{
              position: 'relative',
              background: '#ffffff',
              padding: '1.1rem 1.25rem',
              borderRadius: '14px',
              border: '1.5px solid #f1f5f9',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}>
              {/* Timeline Pin Node */}
              <div style={{
                position: 'absolute',
                left: '-2.42rem',
                top: '1.2rem',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '3px solid #fb7185',
                boxShadow: '0 0 0 3px #ffe4e6'
              }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    color: '#e11d48',
                    background: '#ffe4e6',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '8px'
                  }}>
                    {slot.time}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: '1.02rem', color: '#1e293b' }}>
                    {slot.title}
                  </span>
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  background: badgeStyle.bg,
                  color: badgeStyle.text,
                  border: `1px solid ${badgeStyle.border}`
                }}>
                  {slot.milestone}
                </span>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                {slot.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
