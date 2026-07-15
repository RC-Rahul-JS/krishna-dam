import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      style={{ 
        background: 'linear-gradient(to bottom, #FDFFFD 0%, #EAFDF0 100%)', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* ── MASSIVE WATERMARK BACKGROUND ── */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(100px, 20vw, 300px)',
        fontWeight: 900,
        color: '#16a34a',
        opacity: 0.03,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: '-0.02em'
      }}>
        ABOUT
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', width: '100%', textAlign: 'center' }}>
        
        {/* ── HEADER ── */}
        <div 
          className={isVisible ? "animate-blur-reveal" : "opacity-0"} 
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '60px' }}
        >
          <p style={{ 
            fontFamily: "'Cormorant Garamond', serif", 
            fontStyle: 'italic', 
            fontSize: '24px', 
            color: '#15803d', 
            margin: '0 0 8px 0' 
          }}>
            Discover the legacy of
          </p>
          <h2 style={{ 
            fontSize: 'clamp(42px, 6vw, 72px)', 
            color: '#064e3b', 
            fontFamily: "'Montserrat', sans-serif", 
            fontWeight: 900, 
            margin: '0',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textShadow: '0 10px 30px rgba(22, 163, 74, 0.15)'
          }}>
            KRISHNA DHAM
          </h2>
          <div style={{ width: '80px', height: '3px', background: 'linear-gradient(90deg, transparent, #16a34a, transparent)', marginTop: '24px' }} />
        </div>

        {/* ── HIGH-END TYPOGRAPHY BLOCK (No Box) ── */}
        <div 
          className={isVisible ? "animate-blur-reveal delay-300" : "opacity-0"}
          style={{
            position: 'relative',
            marginBottom: '60px',
            maxWidth: '850px',
            margin: '0 auto 60px auto'
          }}
        >
          {/* Subtle Decorative quotes in background */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            left: '-20px',
            fontSize: '120px',
            fontFamily: "'Cormorant Garamond', serif",
            color: 'rgba(22, 163, 74, 0.08)',
            lineHeight: 1,
            zIndex: 0
          }}>
            "
          </div>
          
          <p style={{ 
            margin: 0, 
            fontSize: 'clamp(16px, 1.8vw, 22px)', // Made smaller as requested
            color: '#334155', 
            lineHeight: 2.0, 
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            textAlign: 'center',
            position: 'relative',
            zIndex: 2
          }}>
            Welcome to Krishna Dham, an exclusive plotted community designed for those who appreciate premium living. Nestled in a serene green environment, our project offers wide CC roads, underground electricity, 24/7 water supply, and vast open spaces. Build the home of your dreams in a fully secure, TC&P-approved layout that promises an elevated lifestyle and outstanding connectivity for your family's future.
          </p>
        </div>

        {/* ── EXPLORE BUTTON ── */}
        <div className={isVisible ? "animate-blur-reveal delay-500 pointer-events-auto" : "opacity-0 pointer-events-none"} style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/tour')}
            style={{
              background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50px',
              padding: '16px 48px',
              fontSize: '16px',
              fontWeight: 800,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 10px 30px -5px rgba(22, 163, 74, 0.5), inset 0 2px 4px rgba(255,255,255,0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(22, 163, 74, 0.6), inset 0 2px 4px rgba(255,255,255,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(22, 163, 74, 0.5), inset 0 2px 4px rgba(255,255,255,0.2)';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z"></path>
              <line x1="8" y1="2" x2="8" y2="18"></line>
              <line x1="16" y1="6" x2="16" y2="22"></line>
            </svg>
            Explore 360° Map
          </button>
        </div>

      </div>

      <style>{`

        .opacity-0 { opacity: 0; }
        
        .animate-blur-reveal {
          animation: blurReveal 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-600 {
          animation-delay: 700ms;
        }

        @keyframes blurReveal {
          0% {
            opacity: 0;
            filter: blur(12px);
            transform: translateY(30px) scale(0.98);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>

  );
}
