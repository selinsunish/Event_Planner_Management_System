import React from 'react';
import { Sparkles, Heart, Cake, Users, DollarSign, MapPin, Compass, Smile } from 'lucide-react';

export default function EventForm({ formData, onChange, onSubmit, loading }) {
  const estCostPerGuest = Math.round(formData.budget / (formData.guestCount || 1));
  const scaleText = formData.guestCount > 150 ? 'Grand Festival' : formData.guestCount > 50 ? 'Signature Gathering' : 'Intimate Vibe';

  return (
    <section className="glass-panel" style={{ padding: '1.75rem', height: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #fbcfe8 0%, #fed7aa 100%)',
            padding: '7px',
            borderRadius: '10px',
            display: 'flex'
          }}>
            <Sparkles size={18} color="#db2777" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Event Vision</h2>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Customize your dream celebration</span>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        <div>
          <label style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.45rem' }}>
            <span>Occasion Category</span>
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {[
              { id: 'wedding', label: 'Wedding', icon: '💍', bg: '#ffe4e6', border: '#fecdd3', text: '#e11d48' },
              { id: 'birthday', label: 'Birthday', icon: '🎂', bg: '#fed7aa', border: '#fed7aa', text: '#ea580c' },
              { id: 'community', label: 'Community', icon: '🎪', bg: '#ddd6fe', border: '#ddd6fe', text: '#7c3aed' }
            ].map(item => {
              const isSelected = formData.eventType === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => onChange({ target: { name: 'eventType', value: item.id } })}
                  style={{
                    background: isSelected ? item.bg : '#ffffff',
                    border: isSelected ? `2px solid ${item.text}` : '1px solid #e2e8f0',
                    color: isSelected ? item.text : '#475569',
                    borderRadius: '12px',
                    padding: '0.65rem 0.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    boxShadow: isSelected ? `0 4px 12px ${item.bg}` : 'none'
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
          <div>
            <label style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
              Guest Count 👥
            </label>
            <input
              type="number"
              name="guestCount"
              value={formData.guestCount}
              onChange={onChange}
              min="5"
              max="10000"
              style={{
                width: '100%',
                padding: '0.7rem 0.9rem',
                borderRadius: '12px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                color: '#1e293b',
                fontSize: '0.92rem',
                fontWeight: 600
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
              Budget ($ USD) 💵
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={onChange}
              step="500"
              style={{
                width: '100%',
                padding: '0.7rem 0.9rem',
                borderRadius: '12px',
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                color: '#1e293b',
                fontSize: '0.92rem',
                fontWeight: 600
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
            Theme & Palette 🎨
          </label>
          <input
            type="text"
            name="theme"
            value={formData.theme}
            onChange={onChange}
            placeholder="e.g. Pastel Sunset, Bohemian Floral, Retro Neon"
            style={{
              width: '100%',
              padding: '0.7rem 0.9rem',
              borderRadius: '12px',
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              color: '#1e293b',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
            Location or Venue 📍
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onChange}
            placeholder="e.g. Lavender Meadows or Coastal Lawn"
            style={{
              width: '100%',
              padding: '0.7rem 0.9rem',
              borderRadius: '12px',
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              color: '#1e293b',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>
            Special Touches & Wishes ✨
          </label>
          <textarea
            name="specialRequests"
            rows="3"
            value={formData.specialRequests}
            onChange={onChange}
            placeholder="e.g. Fairy light canopy, matcha dessert bar, live acoustic duo..."
            style={{
              width: '100%',
              padding: '0.7rem 0.9rem',
              borderRadius: '12px',
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              color: '#1e293b',
              fontSize: '0.88rem',
              resize: 'vertical',
              lineHeight: 1.5
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '0.4rem',
            padding: '0.95rem 1.4rem',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #f43f5e 0%, #fb7185 35%, #ec4899 70%, #8b5cf6 100%)',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '1rem',
            border: 'none',
            boxShadow: '0 8px 24px -4px rgba(244, 63, 94, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            opacity: loading ? 0.7 : 1,
            letterSpacing: '0.01em'
          }}
        >
          {loading ? (
            <>Weaving Magical Blueprint...</>
          ) : (
            <>
              <Sparkles size={19} />
              Generate AI Celebration Plan
            </>
          )}
        </button>
      </form>

      {/* Pastel Insights Card */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1.1rem',
        background: 'linear-gradient(135deg, #fff7ed 0%, #fdf2f8 50%, #f5f3ff 100%)',
        borderRadius: '16px',
        border: '1.5px dashed #fbcfe8'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
          <Smile size={16} color="#db2777" />
          <span style={{ fontSize: '0.75rem', color: '#db2777', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800 }}>
            Curated Insights
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem', marginBottom: '0.45rem' }}>
          <span style={{ color: '#64748b', fontWeight: 500 }}>Est. Spend / Guest:</span>
          <span style={{ fontWeight: 800, color: '#e11d48', background: '#ffe4e6', padding: '0.15rem 0.55rem', borderRadius: '8px' }}>
            ${estCostPerGuest}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.88rem' }}>
          <span style={{ color: '#64748b', fontWeight: 500 }}>Gathering Feel:</span>
          <span style={{ fontWeight: 700, color: '#7c3aed', background: '#ede9fe', padding: '0.15rem 0.55rem', borderRadius: '8px' }}>
            {scaleText}
          </span>
        </div>
      </div>
    </section>
  );
}
