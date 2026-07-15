import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const plotDetails = [
  {
    emoji: '📐',
    label: 'Available Sizes',
    value: '100 – 500 sq.yd',
    pill: false,
  },
  {
    emoji: '💰',
    label: 'Booking Amount',
    value: '₹20,000',
    pill: false,
  },
  {
    emoji: '✅',
    label: 'Status',
    value: 'Fully TC&P Approved',
    pill: true,
  },
];

export default function MapPreview() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [hovered360, setHovered360] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        background: '#ffffff',
        minHeight: '80vh',
        padding: isMobile ? '40px 20px' : '40px 72px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top border line */}
      <div style={{
        position: 'absolute', top: 0, left: '8%', right: '8%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
      }} />

      {/* Decorative dots grid - Neutral */}
      <div style={{
        position: 'absolute', top: 60, right: 40,
        width: 180, height: 180,
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1.5px, transparent 1.5px)',
        backgroundSize: '18px 18px',
        opacity: 0.8,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 60, left: 30,
        width: 130, height: 130,
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1.5px, transparent 1.5px)',
        backgroundSize: '18px 18px',
        opacity: 0.8,
        pointerEvents: 'none',
      }} />

      {/* Main layout */}
      <div style={{
        width: '100%',
        maxWidth: '1700px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '64px' : '10%',
        alignItems: 'flex-start',
      }}>

        {/* LEFT: Map */}
        <div
          className={isVisible ? 'mp-slide-left' : 'mp-hidden'}
          style={{
            flex: isMobile ? 'none' : '1.5',
            width: '100%',
            position: 'relative',
            marginLeft: isMobile ? '0' : '5%',
          }}
        >

          <img
            src="/map.png"
            alt="Master Plan Map"
            style={{
              position: 'relative', zIndex: 1,
              width: '100%',
              maxHeight: isMobile ? 'auto' : '78vh',
              display: 'block',
              objectFit: 'contain',
              background: '#ffffff',
              borderRadius: 20,
            }}
          />
          {/* Floating label */}
          <div style={{
            position: 'absolute', zIndex: 2,
            bottom: 20, left: 20,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: 12,
            padding: '8px 16px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#000000',
              display: 'inline-block',
              animation: 'mpPulse 2s infinite',
            }} />
            <span style={{
              fontSize: 11, fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.12em',
              color: '#000000',
              fontFamily: "'Montserrat', sans-serif",
            }}>Master Plan</span>
          </div>
        </div>

        {/* RIGHT: Details panel */}
        <div
          className={isVisible ? 'mp-slide-right' : 'mp-hidden'}
          style={{
            flex: isMobile ? 'none' : '1',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            alignSelf: 'stretch',
          }}
        >

          {/* Heading */}
          <div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              color: '#4b5563',
              margin: '0 0 6px 0',
              letterSpacing: '0.02em',
            }}>
              Discover your perfect space
            </p>
            <h3 style={{
              fontSize: 'clamp(24px, 3vw, 44px)',
              color: '#111827',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              lineHeight: 1.05,
            }}>
              PLOT
              <br />
              <span style={{ color: '#6b7280' }}>DETAILS</span>
            </h3>
            {/* Thin accent line */}
            <div style={{
              marginTop: 12,
              width: 56, height: 3,
              background: 'linear-gradient(90deg, #111827, transparent)',
              borderRadius: 2,
            }} />
          </div>

          {/* Plot detail rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {plotDetails.map((item, i) => (
              <div
                key={i}
                className={isVisible ? `mp-row mp-row-delay-${i}` : 'mp-hidden'}
              >
                {/* Row */}
                <div style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                }}>
                  {/* Left: icon + label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: '50%',
                      background: 'rgba(0,0,0,0.03)',
                      border: '1px solid rgba(0,0,0,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, flexShrink: 0,
                    }}>
                      {item.emoji}
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.14em',
                      color: '#4b5563',
                      fontFamily: "'Montserrat', sans-serif",
                    }}>
                      {item.label}
                    </span>
                  </div>

                  {/* Right: value */}
                  {item.pill ? (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      background: 'linear-gradient(135deg, #1f2937, #111827)',
                      borderRadius: 30, padding: '5px 14px',
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: '#ffffff', opacity: 0.9,
                        display: 'inline-block',
                        animation: 'mpPulse 2s infinite',
                      }} />
                      <span style={{
                        fontSize: 9, fontWeight: 800,
                        textTransform: 'uppercase', letterSpacing: '0.1em',
                        color: '#ffffff',
                        fontFamily: "'Montserrat', sans-serif",
                      }}>
                        {item.value}
                      </span>
                    </div>
                  ) : (
                    <span style={{
                      fontSize: i === 1 ? 16 : 13,
                      fontWeight: 800, color: '#111827',
                      fontFamily: "'Montserrat', sans-serif",
                      letterSpacing: '0.02em',
                    }}>
                      {item.value}
                    </span>
                  )}
                </div>

                {/* Divider (not after last) */}
                {i < plotDetails.length - 1 && (
                  <div style={{
                    height: 1,
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.1), rgba(0,0,0,0.02), transparent)',
                  }} />
                )}
              </div>
            ))}
          </div>

          {/* 360° Tour Card */}
          <div
            onClick={() => navigate('/tour')}
            onMouseEnter={() => setHovered360(true)}
            onMouseLeave={() => setHovered360(false)}
            className={isVisible ? 'mp-row mp-row-delay-3' : 'mp-hidden'}
            style={{
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              cursor: 'pointer',
              width: '70%',
              alignSelf: 'flex-end',
              height: isMobile ? '200px' : '240px',
              marginTop: isMobile ? '32px' : 'auto',
              transform: hovered360 ? 'translateY(-6px) scale(1.015)' : 'translateY(0) scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {/* Thumbnail */}
            <img
              src="/20260708_191357_458.jpg.jpeg"
              alt="360 Tour"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                transform: hovered360 ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
              }}
            />

            {/* Overlay gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: hovered360
                ? 'linear-gradient(120deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)'
                : 'linear-gradient(120deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)',
              transition: 'background 0.4s',
            }} />

            {/* Content overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center',
              padding: '0 32px', gap: 22,
            }}>
              {/* Play ring */}
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: hovered360
                  ? 'linear-gradient(135deg, #111827, #000000)'
                  : 'rgba(255,255,255,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: hovered360 ? '#ffffff' : '#111827',
                flexShrink: 0,
                transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
              }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Text */}
              <div>
                <p style={{
                  margin: '0 0 2px 0', fontSize: 10,
                  textTransform: 'uppercase', letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: "'Montserrat', sans-serif", fontWeight: 600,
                }}>
                  Interactive
                </p>
                <p style={{
                  margin: 0, fontSize: 26, fontWeight: 900,
                  fontFamily: "'Montserrat', sans-serif",
                  color: '#ffffff', letterSpacing: '0.04em', lineHeight: 1,
                  textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                }}>
                  360° TOUR
                </p>
                <p style={{
                  margin: '6px 0 0 0', fontSize: 11,
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.08em',
                  transition: 'color 0.3s',
                }}>
                  {hovered360 ? 'Click to explore →' : 'Explore the colony'}
                </p>
              </div>

              {/* LIVE badge */}
              <div style={{
                position: 'absolute', top: 14, right: 14,
                background: hovered360 ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.5)',
                borderRadius: 20, padding: '4px 12px',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'background 0.3s',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#ffffff',
                  display: 'inline-block',
                  animation: 'mpPulse 1.8s infinite',
                }} />
                <span style={{
                  fontSize: 9, fontWeight: 800, color: '#ffffff',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  fontFamily: "'Montserrat', sans-serif",
                }}>LIVE VIEW</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .mp-hidden { opacity: 0; }

        .mp-slide-left {
          animation: mpSlideLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .mp-slide-right {
          animation: mpSlideRight 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          opacity: 0;
        }

        .mp-row {
          animation: mpFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .mp-row-delay-0 { animation-delay: 0.25s; }
        .mp-row-delay-1 { animation-delay: 0.38s; }
        .mp-row-delay-2 { animation-delay: 0.51s; }
        .mp-row-delay-3 { animation-delay: 0.64s; }

        @keyframes mpSlideLeft {
          from { opacity: 0; transform: translateX(-48px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes mpSlideRight {
          from { opacity: 0; transform: translateX(48px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes mpFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes mpPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}
