import React from 'react';
import { 
  Sparkles, Heart, Cake, Users, ArrowRight, Star, 
  Calendar, CheckCircle, ShieldCheck, Flame, Compass, Gift
} from 'lucide-react';

export default function HomeDashboard({ onSelectEvent }) {
  const eventCards = [
    {
      id: 'wedding',
      title: 'Weddings & Engagements',
      subtitle: 'Timeless Romance',
      badge: 'Most Popular',
      badgeColor: '#ec4899',
      badgeBg: '#fdf2f8',
      description: 'Dream ceremony orchestration, guest seating charts, curated floral aesthetics, catering tastings, and fairy-tale send-offs.',
      icon: '💍',
      tag: 'From ceremony to grand exit',
      gradient: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 50%, #ffffff 100%)',
      border: '#fecdd3',
      accentColor: '#db2777',
      features: ['Venue & Seating Layouts', 'Catering & Cocktail Hours', 'Photography & Timeline', 'Audio Guestbook Ideas']
    },
    {
      id: 'birthday',
      title: 'Birthdays & Milestones',
      subtitle: 'Vibrant Celebrations',
      badge: 'High Energy',
      badgeColor: '#ea580c',
      badgeBg: '#fff7ed',
      description: 'Milestone bashes, personalized surprise agendas, dessert bars, interactive 360 photo moments, and vibrant DJ playlists.',
      icon: '🎂',
      tag: 'Milestone moments & fun',
      gradient: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 50%, #ffffff 100%)',
      border: '#fed7aa',
      accentColor: '#ea580c',
      features: ['Custom Themed Decor', 'Signature Cake & Bites', 'Interactive Booths & Trivia', 'Curated DJ Setlists']
    },
    {
      id: 'community',
      title: 'Community & Festivals',
      subtitle: 'Neighborhood Magic',
      badge: 'Crowd Pleaser',
      badgeColor: '#7c3aed',
      badgeBg: '#f5f3ff',
      description: 'Local fairs, charity galas, block parties, vendor permit tracking, volunteer assignments, and community engagement.',
      icon: '🎪',
      tag: 'Bringing neighbors together',
      gradient: 'linear-gradient(135deg, #f5f3ff 0%, #ddd6fe 50%, #ffffff 100%)',
      border: '#ddd6fe',
      accentColor: '#7c3aed',
      features: ['Permits & City Guidelines', 'Food Trucks & Sanitation', 'Live Stage Lineup', 'Volunteer & Safety Teams']
    }
  ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '3.5rem', paddingBottom: '3rem' }}>
      
      {/* Hero Showcase Section Matching Demo Layout */}
      <section style={{
        position: 'relative',
        borderRadius: '32px',
        padding: '3.5rem 2.5rem',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 242, 248, 0.8) 50%, rgba(245, 243, 255, 0.9) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.9)',
        boxShadow: '0 20px 45px -15px rgba(236, 72, 153, 0.15)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        alignItems: 'center',
        gap: '2.5rem'
      }}>
        {/* Decorative soft pastel bubbles */}
        <div style={{
          position: 'absolute',
          top: '-80px',
          left: '25%',
          width: '280px',
          height: '280px',
          background: 'radial-gradient(circle, rgba(253, 164, 175, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-60px',
          right: '-40px',
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(196, 181, 253, 0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Left Hero Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.95rem',
            borderRadius: '999px',
            background: '#ffffff',
            border: '1.5px solid #fbcfe8',
            boxShadow: '0 4px 12px rgba(236, 72, 153, 0.1)',
            marginBottom: '1.25rem'
          }}>
            <Sparkles size={15} color="#ec4899" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#db2777', letterSpacing: '0.02em' }}>
              Planning A Party Has Never Been Easier
            </span>
          </div>

          <h1 style={{
            fontSize: '3.4rem',
            lineHeight: 1.12,
            letterSpacing: '-0.03em',
            margin: '0 0 1.15rem 0',
            fontWeight: 800,
            color: '#1e1b4b'
          }}>
            <span className="serif-headline" style={{ color: '#db2777' }}>Plan.</span>{' '}
            <span className="serif-headline" style={{ color: '#ec4899' }}>Create.</span><br />
            <span className="serif-headline" style={{ color: '#7c3aed' }}>Celebrate.</span>
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: '#64748b',
            lineHeight: 1.6,
            maxWidth: '520px',
            margin: '0 0 1.85rem 0',
            fontWeight: 500
          }}>
            Leave the details to us! Let our GenAI planner take the stress out of organizing the perfect party.
            Spend more time celebrating and less time worrying.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => onSelectEvent('wedding')}
              style={{
                background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 50%, #8b5cf6 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '0.95rem 1.85rem',
                borderRadius: '16px',
                fontSize: '1rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.45)',
                letterSpacing: '0.01em'
              }}
            >
              <span>✨ Plan My Event</span>
              <ArrowRight size={17} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.86rem', fontWeight: 600 }}>
              <div style={{ display: 'flex', color: '#f59e0b' }}>
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span>Loved by 10,000+ hosts</span>
            </div>
          </div>
        </div>

        {/* Right Decorative Visual Circle Matching Demo with Floating Badges */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          {/* Main Round Blush Portal */}
          <div style={{
            width: '340px',
            height: '340px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #fce7f3 0%, #fbcfe8 50%, #f472b6 100%)',
            boxShadow: '0 20px 45px -10px rgba(236, 72, 153, 0.35)',
            border: '8px solid rgba(255, 255, 255, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <span style={{ fontSize: '4.5rem', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))' }}>🍾</span>
            <div style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              padding: '0.4rem 1.1rem',
              borderRadius: '999px',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#db2777',
              marginTop: '0.5rem',
              boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
            }}>
              Instant AI Blueprint
            </div>
          </div>

          {/* Floating Pill Badges (Matching Demo Image) */}
          <div 
            onClick={() => onSelectEvent('wedding')}
            className="float-pill" 
            style={{
              position: 'absolute',
              top: '12px',
              left: '10px',
              background: '#ffffff',
              padding: '0.55rem 1rem',
              borderRadius: '999px',
              boxShadow: '0 8px 20px rgba(236, 72, 153, 0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#1e1b4b',
              cursor: 'pointer',
              border: '1px solid #fecdd3'
            }}
          >
            <span>💍</span>
            <span>Weddings</span>
          </div>

          <div 
            onClick={() => onSelectEvent('birthday')}
            className="float-pill-delayed" 
            style={{
              position: 'absolute',
              top: '30px',
              right: '-10px',
              background: '#ffffff',
              padding: '0.55rem 1.1rem',
              borderRadius: '999px',
              boxShadow: '0 8px 20px rgba(234, 88, 12, 0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#1e1b4b',
              cursor: 'pointer',
              border: '1px solid #fed7aa'
            }}
          >
            <span>🎂</span>
            <span>Birthdays</span>
          </div>

          <div 
            onClick={() => onSelectEvent('community')}
            className="float-pill" 
            style={{
              position: 'absolute',
              bottom: '15px',
              left: '20px',
              background: '#ffffff',
              padding: '0.55rem 1.1rem',
              borderRadius: '999px',
              boxShadow: '0 8px 20px rgba(124, 58, 237, 0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#1e1b4b',
              cursor: 'pointer',
              border: '1px solid #ddd6fe'
            }}
          >
            <span>🎪</span>
            <span>Community</span>
          </div>

          <div 
            onClick={() => onSelectEvent('wedding')}
            className="float-pill-delayed" 
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '0px',
              background: '#ffffff',
              padding: '0.55rem 1rem',
              borderRadius: '999px',
              boxShadow: '0 8px 20px rgba(219, 39, 119, 0.18)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: '#1e1b4b',
              cursor: 'pointer',
              border: '1px solid #fbcfe8'
            }}
          >
            <span>🎉</span>
            <span>Celebrations</span>
          </div>
        </div>
      </section>

      {/* THREE EVENT SELECTION CARDS (The core requested section) */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.85rem',
            borderRadius: '999px',
            background: '#ffe4e6',
            color: '#e11d48',
            fontSize: '0.8rem',
            fontWeight: 800,
            marginBottom: '0.6rem'
          }}>
            <span>✨ SELECT YOUR OCCASION</span>
          </div>
          <h2 style={{
            fontSize: '2.4rem',
            fontWeight: 800,
            color: '#1e1b4b',
            letterSpacing: '-0.02em',
            margin: '0 0 0.5rem 0'
          }}>
            Parties <span className="serif-headline" style={{ color: '#db2777' }}>We Plan</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
            Choose an event type to launch your custom AI orchestrator with tailored budgets, schedules & checklists.
          </p>
        </div>

        {/* The 3 Main Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.75rem'
        }}>
          {eventCards.map((card) => {
            return (
              <div
                key={card.id}
                onClick={() => onSelectEvent(card.id)}
                className="glass-panel"
                style={{
                  padding: '2rem 1.85rem',
                  background: card.gradient,
                  border: `2px solid ${card.border}`,
                  borderRadius: '26px',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 12px 30px -8px rgba(236, 72, 153, 0.1)'
                }}
              >
                <div>
                  {/* Top Badge & Emoji Icon */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '18px',
                      background: '#ffffff',
                      border: `1.5px solid ${card.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      boxShadow: '0 8px 18px rgba(0,0,0,0.05)'
                    }}>
                      {card.icon}
                    </div>

                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      padding: '0.35rem 0.75rem',
                      borderRadius: '999px',
                      background: card.badgeBg,
                      color: card.badgeColor,
                      border: `1px solid ${card.border}`,
                      letterSpacing: '0.02em'
                    }}>
                      {card.badge}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.78rem', color: card.accentColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {card.subtitle}
                  </span>

                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#1e1b4b',
                    margin: '0.25rem 0 0.85rem 0'
                  }}>
                    {card.title}
                  </h3>

                  <p style={{
                    fontSize: '0.92rem',
                    color: '#475569',
                    lineHeight: 1.6,
                    marginBottom: '1.4rem'
                  }}>
                    {card.description}
                  </p>

                  {/* Bullet features */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    padding: '1rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.9)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem'
                  }}>
                    {card.features.map((feat, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.83rem', color: '#334155', fontWeight: 600 }}>
                        <CheckCircle size={14} color={card.accentColor} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <button
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '14px',
                    background: '#ffffff',
                    border: `2px solid ${card.accentColor}`,
                    color: card.accentColor,
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
                  }}
                >
                  <span>Build {card.id.charAt(0).toUpperCase() + card.id.slice(1)} Plan</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Testimonial / Social Proof Strip (matching demo "Hear what our hosts say") */}
      <section style={{
        background: '#ffffff',
        borderRadius: '24px',
        padding: '2rem 2.5rem',
        border: '1.5px solid #f1f5f9',
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.04)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
          <div style={{ fontSize: '1.8rem' }}>💫</div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 0.25rem 0' }}>
              Automated Budget Balancer
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
              Never overspend. GenAI precisely weights venue, food, and decor based on guest loads.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
          <div style={{ fontSize: '1.8rem' }}>⏱️</div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 0.25rem 0' }}>
              Hour-by-Hour Run of Show
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
              Smooth transitions with zero chaos from prep and welcome to toasts and final dance.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
          <div style={{ fontSize: '1.8rem' }}>💡</div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e1b4b', margin: '0 0 0.25rem 0' }}>
              Viral & Memorable Ideas
            </h4>
            <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
              Custom concepts like rotary phone audio guestbooks, live painters, and taco truck arrivals.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

