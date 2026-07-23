import React, { useState, useEffect } from 'react';

// Local images: 1.png – 7.png + the jpeg photos
const images = [
  '/1.png',
  '/2.png',
  '/3.png',
  '/4.png',
  '/5.png',
  '/6.png',
  '/7.png',
  '/8.png',
  '/9.png',
  '/10.png',
  '/11.png',
  '/1.png',
];

export default function VideoSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'stretch',
      background: '#f9fafb',
      overflow: 'hidden',
    }}>

      {/* LEFT — Video Container */}
      <div style={{
        flex: isMobile ? 'none' : 1,
        width: isMobile ? '100%' : '50%',
        height: isMobile ? '45%' : '100%',
        padding: '24px',
        boxSizing: 'border-box',
      }}>
        {/* Video Outlet with Border Pattern */}
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}>
          <video
            src="/VIDEO.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {/* LIVE badge */}
          <div style={{
            position: 'absolute',
            top: 20,
            left: 20,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(8px)',
            padding: '6px 14px',
            borderRadius: 50,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: "'Montserrat', sans-serif",
            zIndex: 10,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '60%',
              background: '#ef4444',
              animation: 'pulseDot 1.5s infinite',
              display: 'inline-block',
            }} />
            Live Preview
          </div>
        </div>
      </div>

      {/* RIGHT — Masonry Grid (No Scroll, Fixed Height) */}
      <div style={{
        flex: isMobile ? 'none' : 1.2,
        width: isMobile ? '100%' : 'auto',
        height: isMobile ? '55%' : '100%',
        padding: '24px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          gap: '16px',
          height: '100%',
        }}>
          {/* Column 1 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            {[
              { i: 0, flex: 1.2 },
              { i: 1, flex: 1.5 },
              { i: 2, flex: 0.8 },
            ].map(item => (
              <img
                key={item.i}
                src={images[item.i]}
                alt={`Krishnadham plot ${item.i + 1}`}
                style={{
                  flex: item.flex,
                  width: '100%',
                  height: 0,
                  minHeight: 0,
                  objectFit: 'cover',
                  borderRadius: '30px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                }}
              />
            ))}
          </div>

          {/* Column 2 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
            {[
              { i: 3, flex: 1.0 },
              { i: 4, flex: 1.4 },
              { i: 5, flex: 0.9 },
              { i: 6, flex: 1.1 },
            ].map(item => (
              <img
                key={item.i}
                src={images[item.i]}
                alt={`Krishnadham plot ${item.i + 1}`}
                style={{
                  flex: item.flex,
                  width: '100%',
                  height: 0,
                  minHeight: 0,
                  objectFit: 'cover',
                  borderRadius: '30px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                }}
              />
            ))}
          </div>

          {/* Column 3 — hidden on mobile */}
          {!isMobile && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
              {[
                { i: 7,  flex: 1.3 },
                { i: 8,  flex: 0.9 },
                { i: 9,  flex: 1.0 },
                { i: 10, flex: 1.2 },
              ].map(item => (
                <img
                  key={item.i}
                  src={images[item.i]}
                  alt={`Krishnadham plot ${item.i + 1}`}
                  style={{
                    flex: item.flex,
                    width: '100%',
                    height: 0,
                    minHeight: 0,
                    objectFit: 'cover',
                    borderRadius: '30px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }
      `}</style>
    </div>
  );
}
