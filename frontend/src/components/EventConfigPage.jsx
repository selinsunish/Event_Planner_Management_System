import React, { useState } from 'react';
import { 
  Sparkles, Calendar, DollarSign, MapPin, Users, Heart, 
  ArrowLeft, CheckCircle, AlertCircle, Utensils, Palette, 
  FileText, Sun, CloudRain
} from 'lucide-react';

export default function EventConfigPage({ eventType, onBack, onGeneratePlan, loading }) {
  // Pre-fill smart defaults based on eventType
  const getInitialState = (type) => {
    if (type === 'wedding') {
      return {
        eventName: 'Sophia & Alexander’s Dream Wedding',
        eventType: 'wedding',
        eventDate: '2026-12-18',
        eventLocation: 'Napa Valley Rose Vineyard, CA',
        guestCount: '120',
        totalBudget: '25000',
        currency: 'USD',
        theme: 'Bohemian Garden Romance & Fairy Lights',
        venueType: 'hybrid', // 'indoor' | 'outdoor' | 'hybrid'
        foodPreferences: 'Organic Farm-to-Table, Plated 3-Course, Vegan & Gluten-Free Friendly, Signature Champagne Cocktails',
        decorationPreferences: 'Blush floral arches, fairy light ceiling canopy, wooden rustic tables, candlelit centerpieces',
        additionalRequirements: 'Acoustic violin for ceremony, vintage audio guestbook, pet-friendly ring bearer access'
      };
    } else if (type === 'birthday') {
      return {
        eventName: 'Liam’s 30th Milestone Glow Gala',
        eventType: 'birthday',
        eventDate: '2026-11-28',
        eventLocation: 'Skyline Penthouse Lounge, New York',
        guestCount: '65',
        totalBudget: '7500',
        currency: 'USD',
        theme: 'Neon Cyber-Retro & Disco Chic',
        venueType: 'indoor',
        foodPreferences: 'Gourmet slider bar, artisanal taco truck bites, signature mocktails, tiered midnight velvet cake',
        decorationPreferences: 'Custom LED neon sign with name, chrome balloon arches, UV party lighting, mirrored selfie wall',
        additionalRequirements: '360 slow-mo video booth, live house DJ, custom branded hangover kits for guests'
      };
    } else {
      return {
        eventName: 'Greenwood Eco-Heritage Street Carnival',
        eventType: 'community',
        eventDate: '2026-12-05',
        eventLocation: 'Riverside Community Memorial Park',
        guestCount: '350',
        totalBudget: '16000',
        currency: 'USD',
        theme: 'Eco-Friendly Heritage & Community Harvest',
        venueType: 'outdoor',
        foodPreferences: 'Local artisan food trucks, subsidized family vouchers, hydration refill stations, allergy labels',
        decorationPreferences: 'Recycled eco-bunting banners, wooden stage risers, chalk path signage, solar fairy lanterns',
        additionalRequirements: 'City permit coordination, zero-waste sanitation stations, first aid volunteer tent'
      };
    }
  };

  const [form, setForm] = useState(getInitialState(eventType));
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.eventName.trim()) {
      newErrors.eventName = 'Please provide an event name.';
    } else if (form.eventName.trim().length < 3) {
      newErrors.eventName = 'Event name should be at least 3 characters.';
    }

    if (!form.eventDate) {
      newErrors.eventDate = 'Please select your target event date.';
    }

    if (!form.eventLocation.trim()) {
      newErrors.eventLocation = 'Please specify an event venue or city.';
    }

    const guests = parseInt(form.guestCount, 10);
    if (!form.guestCount || isNaN(guests) || guests < 2) {
      newErrors.guestCount = 'Guest count must be at least 2.';
    }

    const budget = parseFloat(form.totalBudget);
    if (!form.totalBudget || isNaN(budget) || budget <= 0) {
      newErrors.totalBudget = 'Please enter a valid budget amount.';
    }

    if (!form.theme.trim()) {
      newErrors.theme = 'Please provide a theme or atmosphere vibe.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onGeneratePlan(form);
    }
  };

  const currencies = [
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
    { code: 'INR', symbol: '₹', label: 'INR (₹)' },
    { code: 'CAD', symbol: '$', label: 'CAD ($)' },
    { code: 'AUD', symbol: '$', label: 'AUD ($)' }
  ];

  const currencySymbol = currencies.find(c => c.code === form.currency)?.symbol || '$';
  const perGuest = Math.round(Number(form.totalBudget || 0) / (Number(form.guestCount) || 1));

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Navigation & Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <button
          onClick={onBack}
          style={{
            background: '#ffffff',
            border: '1.5px solid #fbcfe8',
            color: '#db2777',
            padding: '0.6rem 1.1rem',
            borderRadius: '14px',
            fontSize: '0.88rem',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 2px 8px rgba(236, 72, 153, 0.08)'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Event Selection</span>
        </button>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'linear-gradient(135deg, #fff1f2 0%, #fdf2f8 100%)',
          padding: '0.45rem 1rem',
          borderRadius: '999px',
          border: '1.5px solid #fecdd3',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#e11d48'
        }}>
          <Sparkles size={15} color="#ec4899" />
          <span>Step 2: Event Parameters & Tailoring</span>
        </div>
      </div>

      {/* Main Glassmorphic Form Card */}
      <div className="glass-panel" style={{
        padding: '2.5rem',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(254, 242, 242, 0.65) 50%, rgba(250, 245, 255, 0.9) 100%)',
        border: '2px solid rgba(255, 255, 255, 0.9)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Soft pastel ambient spheres */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(254, 205, 211, 0.35) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: '#1e1b4b',
            letterSpacing: '-0.02em',
            margin: '0 0 0.4rem 0'
          }}>
            Configure Your <span className="serif-headline" style={{ color: '#db2777' }}>
              {form.eventType === 'wedding' ? 'Wedding' : form.eventType === 'birthday' ? 'Birthday' : 'Community Event'}
            </span>
          </h2>
          <p style={{ fontSize: '0.96rem', color: '#64748b', margin: 0, fontWeight: 500 }}>
            Fine-tune the essentials so our GenAI engine creates your realistic budget breakdown, timeline & checklist.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {/* SECTION 1: CORE BASICS */}
          <div style={{
            background: '#ffffff',
            padding: '1.75rem',
            borderRadius: '20px',
            border: '1.5px solid #f1f5f9',
            boxShadow: '0 4px 16px -4px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <span style={{ fontSize: '1.2rem' }}>✨</span> Core Event Details
            </h3>

            {/* Event Name */}
            <div>
              <label style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                Event Name <span style={{ color: '#e11d48' }}>*</span>
              </label>
              <input
                type="text"
                name="eventName"
                value={form.eventName}
                onChange={handleChange}
                placeholder="e.g. Mia & Ethan's Floral Vineyard Wedding"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: errors.eventName ? '1.5px solid #f43f5e' : '1.5px solid #e2e8f0',
                  background: '#ffffff',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  color: '#1e293b'
                }}
              />
              {errors.eventName && (
                <div style={{ color: '#e11d48', fontSize: '0.78rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                  <AlertCircle size={13} /> {errors.eventName}
                </div>
              )}
            </div>

            {/* Event Type & Event Date in 2 columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    background: '#f8fafc',
                    fontSize: '0.94rem',
                    fontWeight: 600,
                    color: '#1e293b'
                  }}
                >
                  <option value="wedding">💍 Wedding Celebration</option>
                  <option value="birthday">🎂 Birthday Bash</option>
                  <option value="community">🎪 Community Gathering / Festival</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  Target Event Date <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: errors.eventDate ? '1.5px solid #f43f5e' : '1.5px solid #e2e8f0',
                    background: '#ffffff',
                    fontSize: '0.94rem',
                    fontWeight: 600,
                    color: '#1e293b'
                  }}
                />
                {errors.eventDate && (
                  <div style={{ color: '#e11d48', fontSize: '0.78rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                    <AlertCircle size={13} /> {errors.eventDate}
                  </div>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                Event Location / City <span style={{ color: '#e11d48' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="eventLocation"
                  value={form.eventLocation}
                  onChange={handleChange}
                  placeholder="e.g. San Francisco Bay Lawn or Grand Ballroom"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.4rem',
                    borderRadius: '12px',
                    border: errors.eventLocation ? '1.5px solid #f43f5e' : '1.5px solid #e2e8f0',
                    background: '#ffffff',
                    fontSize: '0.94rem',
                    fontWeight: 600,
                    color: '#1e293b'
                  }}
                />
                <MapPin size={16} color="#ec4899" style={{ position: 'absolute', left: '12px', top: '15px' }} />
              </div>
              {errors.eventLocation && (
                <div style={{ color: '#e11d48', fontSize: '0.78rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                  <AlertCircle size={13} /> {errors.eventLocation}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 2: GUEST LOAD, BUDGET & CURRENCY */}
          <div style={{
            background: '#ffffff',
            padding: '1.75rem',
            borderRadius: '20px',
            border: '1.5px solid #f1f5f9',
            boxShadow: '0 4px 16px -4px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <span style={{ fontSize: '1.2rem' }}>💰</span> Scale, Budget & Currency
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {/* Number of guests */}
              <div>
                <label style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  Number of Guests <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    name="guestCount"
                    value={form.guestCount}
                    onChange={handleChange}
                    min="2"
                    max="10000"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.4rem',
                      borderRadius: '12px',
                      border: errors.guestCount ? '1.5px solid #f43f5e' : '1.5px solid #e2e8f0',
                      background: '#ffffff',
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      color: '#1e293b'
                    }}
                  />
                  <Users size={16} color="#8b5cf6" style={{ position: 'absolute', left: '12px', top: '15px' }} />
                </div>
                {errors.guestCount && (
                  <div style={{ color: '#e11d48', fontSize: '0.78rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                    <AlertCircle size={13} /> {errors.guestCount}
                  </div>
                )}
              </div>

              {/* Total Budget */}
              <div>
                <label style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  Total Budget <span style={{ color: '#e11d48' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    name="totalBudget"
                    value={form.totalBudget}
                    onChange={handleChange}
                    step="100"
                    min="100"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem 0.75rem 2.4rem',
                      borderRadius: '12px',
                      border: errors.totalBudget ? '1.5px solid #f43f5e' : '1.5px solid #e2e8f0',
                      background: '#ffffff',
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      color: '#1e293b'
                    }}
                  />
                  <DollarSign size={16} color="#059669" style={{ position: 'absolute', left: '12px', top: '15px' }} />
                </div>
                {errors.totalBudget && (
                  <div style={{ color: '#e11d48', fontSize: '0.78rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                    <AlertCircle size={13} /> {errors.totalBudget}
                  </div>
                )}
              </div>

              {/* Currency */}
              <div>
                <label style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  Currency
                </label>
                <select
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1.5px solid #e2e8f0',
                    background: '#ffffff',
                    fontSize: '0.94rem',
                    fontWeight: 700,
                    color: '#1e293b'
                  }}
                >
                  {currencies.map(c => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Live Math Pill */}
            <div style={{
              background: 'linear-gradient(135deg, #fff7ed 0%, #fdf2f8 100%)',
              padding: '0.85rem 1.1rem',
              borderRadius: '12px',
              border: '1px solid #fed7aa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <span style={{ fontSize: '0.84rem', color: '#7c2d12', fontWeight: 600 }}>
                💡 Estimated Allocation per Guest:
              </span>
              <span style={{ fontWeight: 800, color: '#ea580c', fontSize: '1rem', background: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '8px', border: '1px solid #fed7aa' }}>
                {currencySymbol}{perGuest} / guest
              </span>
            </div>
          </div>

          {/* SECTION 3: THEME, SETTING & PREFERENCES */}
          <div style={{
            background: '#ffffff',
            padding: '1.75rem',
            borderRadius: '20px',
            border: '1.5px solid #f1f5f9',
            boxShadow: '0 4px 16px -4px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
              <span style={{ fontSize: '1.2rem' }}>🎨</span> Theme & Atmosphere Styling
            </h3>

            {/* Theme */}
            <div>
              <label style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                Event Theme & Aesthetic Vibe <span style={{ color: '#e11d48' }}>*</span>
              </label>
              <input
                type="text"
                name="theme"
                value={form.theme}
                onChange={handleChange}
                placeholder="e.g. Pastel Sunset, Tuscan Vineyard, Cyberpunk 80s..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: errors.theme ? '1.5px solid #f43f5e' : '1.5px solid #e2e8f0',
                  background: '#ffffff',
                  fontSize: '0.94rem',
                  fontWeight: 600,
                  color: '#1e293b'
                }}
              />
              {errors.theme && (
                <div style={{ color: '#e11d48', fontSize: '0.78rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
                  <AlertCircle size={13} /> {errors.theme}
                </div>
              )}
            </div>

            {/* Indoor / Outdoor Preference */}
            <div>
              <label style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                Setting & Venue Style
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {[
                  { id: 'indoor', label: 'Indoor Hall', icon: '🏛️', desc: 'Ballroom, lounge, hotel' },
                  { id: 'outdoor', label: 'Open-Air Outdoor', icon: '🌿', desc: 'Garden, beach, park' },
                  { id: 'hybrid', label: 'Indoor / Outdoor Hybrid', icon: '✨', desc: 'Terrace, glass patio' }
                ].map((venue) => {
                  const isSelected = form.venueType === venue.id;
                  return (
                    <button
                      type="button"
                      key={venue.id}
                      onClick={() => setForm(prev => ({ ...prev, venueType: venue.id }))}
                      style={{
                        background: isSelected ? '#fdf2f8' : '#ffffff',
                        border: isSelected ? '2px solid #db2777' : '1.5px solid #e2e8f0',
                        color: isSelected ? '#db2777' : '#475569',
                        padding: '0.75rem 0.5rem',
                        borderRadius: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.25rem',
                        boxShadow: isSelected ? '0 4px 12px rgba(219, 39, 119, 0.12)' : 'none'
                      }}
                    >
                      <span style={{ fontSize: '1.4rem' }}>{venue.icon}</span>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>{venue.label}</span>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{venue.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Food Preferences */}
            <div>
              <label style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                Food & Beverage Preferences 🍽️
              </label>
              <textarea
                name="foodPreferences"
                rows="2"
                value={form.foodPreferences}
                onChange={handleChange}
                placeholder="e.g. Vegetarian/Vegan stations, grazing table, signature mocktails, 3-tier red velvet cake..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: '1.5px solid #e2e8f0',
                  background: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#1e293b',
                  lineHeight: 1.5,
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Decoration Preferences */}
            <div>
              <label style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                Floral & Decoration Styling 🌸
              </label>
              <textarea
                name="decorationPreferences"
                rows="2"
                value={form.decorationPreferences}
                onChange={handleChange}
                placeholder="e.g. Pastel floral centerpieces, neon signs, fairy lights, balloon garland..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: '1.5px solid #e2e8f0',
                  background: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#1e293b',
                  lineHeight: 1.5,
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Additional Requirements */}
            <div>
              <label style={{ fontSize: '0.86rem', color: '#334155', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                Special Requirements & Notes 📝
              </label>
              <textarea
                name="additionalRequirements"
                rows="2"
                value={form.additionalRequirements}
                onChange={handleChange}
                placeholder="e.g. Wheelchair accessible, pet-friendly, drone videography, live jazz quartet..."
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  border: '1.5px solid #e2e8f0',
                  background: '#ffffff',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#1e293b',
                  lineHeight: 1.5,
                  resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '1.1rem 2rem',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 40%, #8b5cf6 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.15rem',
                border: 'none',
                boxShadow: '0 10px 30px -5px rgba(236, 72, 153, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                opacity: loading ? 0.75 : 1,
                letterSpacing: '0.01em'
              }}
            >
              {loading ? (
                <>Weaving Your Comprehensive AI Blueprint...</>
              ) : (
                <>
                  <Sparkles size={22} />
                  <span>Generate My Event Plan</span>
                </>
              )}
            </button>

            <div style={{ textAlign: 'center', fontSize: '0.82rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <CheckCircle size={14} color="#10b981" />
              <span>Full dynamic budget, chronological run-of-show & checklist synthesized instantly.</span>
            </div>
          </div>

        </form>
      </div>

    </div>
  );
}

