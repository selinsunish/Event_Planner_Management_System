import React from 'react';
import { Calendar, DollarSign, Clock, CheckSquare, Lightbulb, Sparkles, PartyPopper } from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Overview', icon: Calendar, color: '#f43f5e', bg: '#ffe4e6' },
  { id: 'budget', label: 'Budget Allocator', icon: DollarSign, color: '#059669', bg: '#ecfdf5' },
  { id: 'timeline', label: 'Run of Show', icon: Clock, color: '#2563eb', bg: '#eff6ff' },
  { id: 'vendors', label: 'Vendor Checklist', icon: CheckSquare, color: '#7c3aed', bg: '#f5f3ff' },
  { id: 'ideas', label: 'Curated Ideas', icon: Lightbulb, color: '#d97706', bg: '#fffbeb' }
];

export default function PlanHeader({ plan, activeTab, onTabChange }) {
  if (!plan) return null;

  return (
    <div className="glass-panel" style={{
      padding: '1.75rem',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(253,242,248,0.7) 100%)'
    }}>
      {/* Decorative Pastel Glows */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(253,164,175,0.35) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        right: '120px',
        width: '140px',
        height: '140px',
        background: 'radial-gradient(circle, rgba(196,181,253,0.3) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.35rem 0.85rem',
        borderRadius: '999px',
        background: 'linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)',
        border: '1px solid #fbcfe8',
        fontSize: '0.78rem',
        color: '#be185d',
        marginBottom: '0.85rem',
        fontWeight: 700
      }}>
        <PartyPopper size={14} color="#db2777" />
        Bespoke AI Architecture
      </div>
      
      <h2 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.45rem', color: '#1e293b', letterSpacing: '-0.02em' }}>
        {plan.title}
      </h2>
      <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: '1.4rem', fontWeight: 500 }}>
        {plan.tagline}
      </p>

      {/* Pastel Navigation Pills */}
      <div style={{
        display: 'flex',
        gap: '0.65rem',
        borderBottom: '1px solid #f1f5f9',
        paddingBottom: '0.75rem',
        overflowX: 'auto'
      }}>
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                background: isActive ? tab.bg : '#ffffff',
                border: isActive ? `2px solid ${tab.color}` : '1.5px solid #e2e8f0',
                color: isActive ? tab.color : '#64748b',
                padding: '0.55rem 1.05rem',
                borderRadius: '12px',
                fontSize: '0.88rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? `0 4px 14px -2px ${tab.bg}` : '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <Icon size={16} color={isActive ? tab.color : '#94a3b8'} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
