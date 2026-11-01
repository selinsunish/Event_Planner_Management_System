import React from 'react';
import { Lightbulb, Sparkles, Heart } from 'lucide-react';

const PASTEL_PALETTES = [
  { bg: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)', border: '#fecdd3', iconBg: '#fda4af', iconColor: '#e11d48', tag: 'Aesthetic Trend' },
  { bg: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', border: '#fed7aa', iconBg: '#fdba74', iconColor: '#c2410c', tag: 'Guest Experience' },
  { bg: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)', border: '#ddd6fe', iconBg: '#c4b5fd', iconColor: '#6d28d9', tag: 'Keepsake & Memory' },
  { bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', border: '#a7f3d0', iconBg: '#6ee7b7', iconColor: '#047857', tag: 'Midnight Surprise' }
];

export default function IdeasTab({ ideas }) {
  const recommendations = Array.isArray(ideas) ? ideas : [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem' }}>
      {recommendations.map((idea, index) => {
        const style = PASTEL_PALETTES[index % PASTEL_PALETTES.length];

        return (
          <div key={index} className="glass-panel" style={{
            padding: '1.5rem',
            background: style.bg,
            border: `1.5px solid ${style.border}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: style.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
              }}>
                <Lightbulb size={20} color={style.iconColor} />
              </div>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: style.iconColor,
                background: 'rgba(255, 255, 255, 0.7)',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                border: `1px solid ${style.border}`
              }}>
                {style.tag}
              </span>
            </div>

            <h4 style={{ fontSize: '1.08rem', fontWeight: 800, margin: 0, color: '#1e293b' }}>
              {idea.title}
            </h4>
            
            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
              {idea.desc}
            </p>
          </div>
        );
      })}
    </div>
  );
}
