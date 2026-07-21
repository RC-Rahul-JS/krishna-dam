import React, { useState, useEffect, useRef } from 'react';

const featureDetails = [
  {
    title: 'Vastu-Compliant Plots',
    description: 'Designed according to ancient architectural principles to bring peace, prosperity, and positive energy to your family.',
  },
  {
    title: 'Gated Community',
    description: 'A fully secure, enclosed environment with 24/7 security personnel and CCTV surveillance for complete peace of mind.',
  },
  {
    title: 'Wide CC Roads',
    description: 'Premium cement concrete internal roads ensuring durability, smooth driving, and an elegant look for the entire colony.',
  },
  {
    title: 'Underground Electricity',
    description: 'Modern underground wiring system that prevents power disruptions and keeps the sky clear of unsightly cables.',
  },
  {
    title: '24/7 Water Supply',
    description: 'Uninterrupted, high-quality water supply connected directly to every plot through a centralized robust system.',
  },
  {
    title: 'TC&P Approved',
    description: 'Fully compliant with Town & Country Planning regulations, guaranteeing a safe, legal, and hassle-free investment.',
  },
];

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        background: '#E6FDEE',
        minHeight: '100vh',
        padding: isMobile ? '60px 20px' : '100px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(80px, 15vw, 250px)',
        fontWeight: 900, color: '#16a34a', opacity: 0.03,
        pointerEvents: 'none', whiteSpace: 'nowrap',
        fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.05em', zIndex: 0,
      }}>
        AMENITIES
      </div>

      <div style={{ maxWidth: '1200px', width: '100%', position: 'relative', zIndex: 10 }}>

        {/* Header */}
        <div
          className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}
          style={{ textAlign: 'center', marginBottom: isMobile ? '48px' : '72px' }}
        >
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(20px, 2vw, 28px)',
            color: '#15803d',
            margin: '0 0 12px 0',
          }}>
            Experience an unparalleled lifestyle
          </p>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 64px)',
            color: '#064e3b',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 900,
            margin: 0,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            PREMIUM AMENITIES
          </h2>
          <div style={{ width: '80px', height: '3px', background: 'linear-gradient(90deg, transparent, #16a34a, transparent)', margin: '24px auto 0 auto' }} />
        </div>

        {/* Features Grid — dot-circle design */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '36px' : '48px 80px',
        }}>
          {featureDetails.map((feat, i) => (
            <div
              key={i}
              className={isVisible ? 'animate-feature-card' : 'opacity-0'}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                animationDelay: `${i * 120}ms`,
              }}
            >
              {/* Glowing dot circle — same as LandingPage */}
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.3) 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 16px rgba(16,185,129,0.25)',
                marginTop: '2px',
              }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px rgba(16,185,129,0.9)',
                }} />
              </div>

              {/* Text */}
              <div>
                <p style={{
                  margin: '0 0 8px 0',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#022c22',
                  fontFamily: "'Montserrat', sans-serif",
                }}>
                  {feat.title}
                </p>
                <p style={{
                  margin: 0,
                  fontSize: 16,
                  color: '#475569',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 500,
                  lineHeight: 1.8,
                }}>
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .opacity-0 { opacity: 0; }

        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-feature-card {
          animation: fadeUpStagger 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUpStagger {
          0%   { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
