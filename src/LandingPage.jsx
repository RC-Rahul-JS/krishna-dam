import React from 'react';
import AboutPage from './AboutPage';
import MapPreview from './MapPreview';
import FeaturesSection from './FeaturesSection';
import VideoSection from './VideoSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

const features = [
  'Vastu-Compliant Plots',
  'Gated Community',
  'Wide CC Roads',
  'Underground Electricity',
  '24/7 Water Supply',
  'TC&P Approved',
];

export default function LandingPage({ onViewTour }) {
  return (
    <main style={{ width: '100%', overflowX: 'hidden' }}>
      <div
      style={{
        minHeight: '100vh',
        // Very light green fading into white/lighter in the center
        background: '#E6FDEE',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* ── Corner accent dots (top-left) ── */}
      <div style={{ position: 'absolute', top: 18, left: 18, display: 'grid', gridTemplateColumns: 'repeat(4,8px)', gap: 5, opacity: 0.35 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#16a34a' }} />
        ))}
      </div>
      {/* ── Corner accent dots (bottom-right) ── */}
      <div style={{ position: 'absolute', bottom: 80, right: 18, display: 'grid', gridTemplateColumns: 'repeat(4,8px)', gap: 5, opacity: 0.35 }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#16a34a' }} />
        ))}
      </div>

      {/* ── CENTER PIECE: Massive 3D Image ── */}
      <div 
        className="hero-img-wrapper"
        style={{ top: '24%' }}
      >
        {/* Soft green glow behind image */}
        <div style={{
          position: 'absolute', width: '60%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(134,239,172,0.6) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'pulseGlow 6s infinite ease-in-out',
        }} />
        <img
          src="/3D.png"
          alt="Krishnadham 3D Colony"
          className="animate-float hero-3d-img"
          style={{
            width: '100%',
            maxWidth: '900px',
            filter: 'drop-shadow(0 35px 55px rgba(20,83,45,0.4)) drop-shadow(0 15px 25px rgba(20,83,45,0.2))',
            transformStyle: 'preserve-3d',
            transform: 'scale(1.1) translateY(60px)',
          }}
        />
      </div>

      {/* ── FOREGROUND CONTENT ── */}
      <div className="hero-foreground">
        
        {/* ── TOP: Typography ── */}
        <div className="animate-fade-in-up text-center pt-4">
          <h1 style={{
            margin: 0,
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(48px, 8vw, 96px)',
            color: '#14532d',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            lineHeight: 1,
            textShadow: '0 4px 16px rgba(22, 163, 74, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1)',
          }}>
            KRISHNA DHAM
          </h1>
          <p style={{
            margin: '-15px 0 0 0',
            fontFamily: "'Great Vibes', cursive",
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 400,
            color: '#b45309',
            lineHeight: 1.1,
            letterSpacing: '0.02em',
            textShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            Plotted Colony
          </p>
          <p style={{
            margin: '0 auto',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(12px, 1.5vw, 16px)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#047857',
          }}>
            Build Your Dream Home in a Peaceful &amp; Premium Community
          </p>
        </div>

        {/* ── MIDDLE: Floating Panels ── */}
        <div className="hero-panels">
          
          {/* LEFT — Premium Features (No Box) */}
          <div className="animate-slide-left delay-200 hero-features-panel">
            <p style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontStyle: 'italic', 
              fontSize: 32, 
              color: '#064e3b', 
              fontWeight: 700, 
              margin: '0 0 32px 0',
              textTransform: 'capitalize',
              position: 'relative',
              letterSpacing: '0.05em'
            }}>
              <span style={{ position: 'absolute', left: '-24px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '2px', background: '#10b981' }} />
              Exclusive Features
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.3) 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.8)' }} />
                  </div>
                  <span style={{ 
                    fontSize: 16, 
                    color: '#022c22', 
                    fontFamily: "'Montserrat', sans-serif", 
                    fontWeight: 500, 
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Price (No Box) */}
          <div className="animate-fade-in-up delay-400 hero-price-panel">
            <p style={{ fontSize: 13, color: '#047857', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 4px 0' }}>
              Booking Starts From
            </p>
            <p style={{ fontSize: 42, fontWeight: 900, color: '#064e3b', margin: 0, lineHeight: 1.1, fontFamily: "'Montserrat', sans-serif" }}>
              ₹20,000
            </p>
            
            <p style={{ fontSize: 13, color: '#047857', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', margin: '24px 0 4px 0' }}>
              Total Price
            </p>
            <p style={{ fontSize: 32, fontWeight: 800, color: '#15803d', margin: 0, lineHeight: 1.1, fontFamily: "'Montserrat', sans-serif" }}>
              ₹11 Lakh
            </p>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(22,163,74,0.1), rgba(22,163,74,0.2))', border: '1px solid rgba(22,163,74,0.3)', borderRadius: '8px', padding: '8px 16px', display: 'inline-block' }}>
                <p style={{ margin: 0, fontSize: 11, color: '#064e3b', fontWeight: 800, letterSpacing: '0.05em' }}>📐 TC&amp;P APPROVED</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
      
    {/* ── ABOUT TYPING SECTION (Scroll down to see) ── */}
    <AboutPage />

    {/* ── MAP PREVIEW SECTION ── */}
    <MapPreview />

    {/* ── FEATURES SECTION ── */}
    <FeaturesSection />

    {/* ── VIDEO SECTION ── */}
    <VideoSection />

    {/* ── CONTACT SECTION ── */}
    <ContactSection />

    {/* ── FOOTER ── */}
    <Footer />

    </main>
  );
}
