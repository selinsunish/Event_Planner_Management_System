import React from 'react';
import { Calendar, DollarSign, CheckCircle2, MapPin, Sparkles, ArrowRight, Clock, Users } from 'lucide-react';

export default function OverviewTab({ plan, formData, onNavigateTab }) {
  const completedVendors = plan?.vendorChecklist ? plan.vendorChecklist.filter(v => v.status === 'completed').length : 0;
  const totalVendors = plan?.vendorChecklist ? plan.vendorChecklist.length : 0;
  const sym = plan?.currencySymbol || '$';
  const totalBudget = plan?.totalBudget ?? formData?.totalBudget ?? formData?.budget ?? 0;
  const eventDate = plan?.eventDate || formData?.eventDate;
  const guestCount = plan?.guestCount || formData?.guestCount;
  const location = plan?.eventLocation || formData?.eventLocation || formData?.location || 'Curated Location';
  const venueType = plan?.venueType || formData?.venueType || 'hybrid';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
      
      {/* 1. Event Summary Blueprint Card */}
      <div className="glass-panel" style={{
        padding: '1.6rem',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, #fff1f2 100%)',
        border: '1.5px solid #fecdd3'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
          <div style={{
            background: '#ffe4e6',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex'
          }}>
            <Calendar size={18} color="#e11d48" />
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            Event Summary
          </h3>
        </div>

        <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.65', marginBottom: '1.2rem' }}>
          {plan?.overview}
        </p>

        <div style={{
          paddingTop: '1rem',
          borderTop: '1px dashed #fecdd3',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Destination:</span>
            <span style={{ fontWeight: 700, color: '#e11d48', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.86rem' }}>
              <MapPin size={14} color="#f43f5e" /> {location}
            </span>
          </div>

          {eventDate && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Event Date:</span>
              <span style={{ fontWeight: 700, color: '#334155', fontSize: '0.86rem' }}>
                {eventDate}
              </span>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Setting Style:</span>
            <span style={{
              fontWeight: 700, 
              color: '#db2777', 
              fontSize: '0.78rem',
              background: '#fdf2f8',
              padding: '0.15rem 0.5rem',
              borderRadius: '999px',
              border: '1px solid #fbcfe8'
            }}>
              {venueType.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Budget Snapshot */}
      <div className="glass-panel" style={{
        padding: '1.6rem',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, #ecfdf5 100%)',
        border: '1.5px solid #a7f3d0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
          <div style={{
            background: '#d1fae5',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex'
          }}>
            <DollarSign size={18} color="#059669" />
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            Budget Allocator
          </h3>
        </div>

        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#059669', letterSpacing: '-0.02em' }}>
          {sym}{Number(totalBudget).toLocaleString()}
        </div>
        <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.2rem', marginBottom: '1.2rem' }}>
          Distributed across {plan?.budgetBreakdown ? plan.budgetBreakdown.length : 0} category allocations.
        </p>

        <button 
          onClick={() => onNavigateTab('budget')} 
          style={{
            background: '#10b981',
            border: 'none',
            color: '#ffffff',
            padding: '0.55rem 0.95rem',
            borderRadius: '10px',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
          }}
        >
          <span>Examine Breakdown</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 3. Vendor Readiness */}
      <div className="glass-panel" style={{
        padding: '1.6rem',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, #f5f3ff 100%)',
        border: '1.5px solid #ddd6fe'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
          <div style={{
            background: '#ede9fe',
            padding: '8px',
            borderRadius: '10px',
            display: 'flex'
          }}>
            <CheckCircle2 size={18} color="#7c3aed" />
          </div>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
            Vendor Checklist
          </h3>
        </div>

        <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#7c3aed', letterSpacing: '-0.02em' }}>
          {completedVendors} <span style={{ fontSize: '1.3rem', color: '#a78bfa', fontWeight: 600 }}>/ {totalVendors}</span>
        </div>
        <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.2rem', marginBottom: '1.2rem' }}>
          Key contracts, deadlines & priorities tracked.
        </p>

        <button 
          onClick={() => onNavigateTab('vendors')}
          style={{
            background: '#8b5cf6',
            border: 'none',
            color: '#ffffff',
            padding: '0.55rem 0.95rem',
            borderRadius: '10px',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.25)'
          }}
        >
          <span>Open Checklist</span>
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
}
