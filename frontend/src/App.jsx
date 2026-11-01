import React, { useState } from 'react';
import Header from './components/Header';
import HomeDashboard from './components/HomeDashboard';
import EventConfigPage from './components/EventConfigPage';
import PlanHeader from './components/PlanHeader';
import OverviewTab from './components/OverviewTab';
import BudgetTab from './components/BudgetTab';
import TimelineTab from './components/TimelineTab';
import VendorTab from './components/VendorTab';
import IdeasTab from './components/IdeasTab';
import { generateEventPlan } from './services/aiPlanner';

export default function App() {
  // Views: 'home' | 'config' | 'plan'
  const [currentView, setCurrentView] = useState('home');
  const [selectedEventType, setSelectedEventType] = useState('wedding');
  const [eventConfig, setEventConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [plan, setPlan] = useState(null);

  // 1. User selects an event from Home Dashboard -> Navigate to Event Configuration Page
  const handleSelectEvent = (type) => {
    setSelectedEventType(type);
    setCurrentView('config');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 2. User fills configuration form & clicks "Generate My Event Plan"
  // Replaces sample dashboard data with the actual API response from backend
  const handleGeneratePlan = async (formData) => {
    setLoading(true);
    setEventConfig(formData);

    try {
      const generatedBlueprint = await generateEventPlan(formData);
      setPlan(generatedBlueprint);
      setCurrentView('plan');
      setActiveTab('overview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Error generating event plan from API:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleVendorStatus = (id) => {
    if (!plan || !plan.vendorChecklist) return;
    setPlan(prev => ({
      ...prev,
      vendorChecklist: prev.vendorChecklist.map(v => {
        if (v.id === id) {
          const nextStatus = v.status === 'completed' ? 'pending' : 'completed';
          return { ...v, status: nextStatus };
        }
        return v;
      })
    }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header 
        currentView={currentView} 
        onGoHome={() => setCurrentView('home')} 
      />

      <main style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '2.5rem',
        width: '100%',
        flex: 1
      }}>
        {/* VIEW 1: COMMON HOME DASHBOARD WITH 3 EVENT CARDS */}
        {currentView === 'home' && (
          <HomeDashboard onSelectEvent={handleSelectEvent} />
        )}

        {/* VIEW 2: EVENT CONFIGURATION PAGE */}
        {currentView === 'config' && (
          <EventConfigPage 
            eventType={selectedEventType}
            onBack={() => setCurrentView('home')}
            onGeneratePlan={handleGeneratePlan}
            loading={loading}
          />
        )}

        {/* VIEW 3: ACTUAL API RESPONSE DISPLAYED IN DASHBOARD SECTIONS */}
        {currentView === 'plan' && plan && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <button
                onClick={() => setCurrentView('config')}
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
                  gap: '0.45rem',
                  boxShadow: '0 2px 8px rgba(236, 72, 153, 0.08)'
                }}
              >
                ← Edit Configuration
              </button>
            </div>

            {/* Header mapped to actual response title & tagline */}
            <PlanHeader
              plan={plan}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Response Mapped to Sections */}
            <div>
              {/* Overview → event summary */}
              {activeTab === 'overview' && (
                <OverviewTab
                  plan={plan}
                  formData={eventConfig}
                  onNavigateTab={setActiveTab}
                />
              )}

              {/* Budget Allocator → category-wise budget and percentages */}
              {activeTab === 'budget' && (
                <BudgetTab
                  budgetBreakdown={plan.budgetBreakdown}
                  totalBudget={plan.totalBudget}
                  currencySymbol={plan.currencySymbol || '$'}
                />
              )}

              {/* Run of Show → activities, timings and descriptions */}
              {activeTab === 'timeline' && (
                <TimelineTab
                  timeline={plan.timeline}
                />
              )}

              {/* Vendor Checklist → vendor tasks and priorities */}
              {activeTab === 'vendors' && (
                <VendorTab
                  vendorChecklist={plan.vendorChecklist}
                  onToggleStatus={toggleVendorStatus}
                />
              )}

              {/* Curated Ideas → personalized recommendations */}
              {activeTab === 'ideas' && (
                <IdeasTab
                  ideas={plan.aiIdeas}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
