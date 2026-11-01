import React from 'react';
import { Sparkles, Share2, Heart, ArrowLeft, Home } from 'lucide-react';

export default function Header({ currentView, onGoHome }) {
  return (
    <header style={{
      borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
      padding: '0.85rem 2.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.8)',
      boxShadow: '0 4px 20px -5px rgba(236, 72, 153, 0.08)'
    }}>
      <div 
        onClick={onGoHome}
        style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
      >
        <div style={{
          background: 'linear-gradient(135deg, #fb7185 0%, #ec4899 50%, #a855f7 100%)',
          padding: '9px',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 18px -4px rgba(236, 72, 153, 0.45)'
        }}>
          <Sparkles size={22} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <h1 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#1e293b' }}>
              PlanCraft <span className="gradient-text">GenAI</span>
            </h1>
            <span style={{
              background: '#ffe4e6',
              color: '#e11d48',
              fontSize: '0.68rem',
              fontWeight: 800,
              padding: '0.15rem 0.5rem',
              borderRadius: '999px',
              border: '1px solid #fecdd3'
            }}>
              PRO
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0, fontWeight: 500 }}>
            Curate magical weddings, birthdays & community celebrations ✨
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {currentView === 'planner' ? (
          <button
            onClick={onGoHome}
            style={{
              background: '#ffffff',
              border: '1.5px solid #fbcfe8',
              color: '#db2777',
              padding: '0.55rem 1rem',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 2px 8px rgba(236, 72, 153, 0.08)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: '#fdf2f8',
            padding: '0.4rem 0.85rem',
            borderRadius: '999px',
            border: '1px solid #fbcfe8',
            fontSize: '0.82rem',
            color: '#db2777',
            fontWeight: 700
          }}>
            <Heart size={14} fill="#db2777" color="#db2777" />
            <span>AI Event Suite</span>
          </div>
        )}

        <button style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          color: '#334155',
          padding: '0.55rem 1rem',
          borderRadius: '12px',
          fontSize: '0.85rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
        }}>
          <Share2 size={15} color="#ec4899" />
          <span>Export Blueprint</span>
        </button>
      </div>
    </header>
  );
}
