import React, { useState, useEffect, useRef } from 'react';

const contacts = [
  {
    id: 'phone',
    label: 'Call Us',
    value: '+91 94794 44536',
    sub: 'Mon – Sat, 9 AM – 7 PM',
    href: 'tel:+919479444536',
    action: 'Call Now',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+91 94794 44536',
    sub: 'Chat with us anytime',
    href: 'https://wa.me/919479444536',
    action: 'Message Us',
  },
  {
    id: 'address',
    label: 'Site Location',
    value: 'Krishna Dham Colony',
    sub: 'Kolar Road, Bhopal',
    href: 'https://maps.app.goo.gl/RELUenTsRD5pq7tR7?g_st=aw',
    action: 'Get Directions',
  },
];

export default function ContactSection() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => { observer.disconnect(); window.removeEventListener('resize', handleResize); };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#E0FAE9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '80px 24px' : '100px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark */}
      <div style={{
        position: 'absolute', bottom: -40, right: -20,
        fontSize: 'clamp(100px, 18vw, 260px)',
        fontWeight: 900, color: 'rgba(0,0,0,0.02)',
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: '-0.02em', pointerEvents: 'none',
        lineHeight: 1, userSelect: 'none',
      }}>
        CONTACT
      </div>

      {/* Header */}
      <div
        className={isVisible ? 'ct-fadein' : 'ct-hidden'}
        style={{ textAlign: 'center', marginBottom: isMobile ? 60 : 80, position: 'relative', zIndex: 2 }}
      >
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(18px, 2vw, 24px)',
          color: '#4b5563',
          margin: '0 0 12px 0',
        }}>
          We'd love to hear from you
        </p>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 64px)',
          color: '#111827',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          margin: 0,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          lineHeight: 1.1,
        }}>
          CONTACT US
        </h2>
        <div style={{
          width: 60, height: 2,
          background: '#111827',
          margin: '24px auto 0 auto',
          opacity: 0.8,
        }} />
      </div>

      {/* Typography List */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center',
        gap: isMobile ? 60 : 80,
        width: '100%',
        maxWidth: 1000,
        position: 'relative',
        zIndex: 2,
      }}>
        {contacts.map((c, i) => (
          <React.Fragment key={c.id}>
            <a
              href={c.href}
              target={c.id === 'address' || c.id === 'whatsapp' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={isVisible ? `ct-fadein ct-delay-${i}` : 'ct-hidden'}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
                transform: hovered === c.id ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            >
              {/* Label */}
              <p style={{
                margin: '0 0 12px 0',
                fontSize: 11, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: '#6b7280',
                fontFamily: "'Inter', sans-serif",
              }}>
                {c.label}
              </p>

              {/* Value */}
              <p style={{
                margin: '0 0 10px 0',
                fontSize: isMobile ? 22 : 'clamp(20px, 2vw, 26px)',
                fontWeight: 700,
                color: hovered === c.id ? '#10b981' : '#111827',
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.2,
                letterSpacing: '0.01em',
                transition: 'color 0.3s ease',
              }}>
                {c.value}
              </p>

              {/* Sub */}
              <p style={{
                margin: '0 0 16px 0',
                fontSize: 14,
                color: '#6b7280',
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.6,
              }}>
                {c.sub}
              </p>

              {/* Arrow/Action */}
              <div style={{
                marginTop: 'auto',
                display: 'flex', alignItems: 'center', gap: 6,
                color: '#111827',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontFamily: "'Inter', sans-serif",
                opacity: hovered === c.id ? 1 : 0.3,
                transform: hovered === c.id ? 'translateX(4px)' : 'translateX(0)',
                transition: 'all 0.3s ease',
              }}>
                {c.action}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </a>
            
            {/* Elegant Divider between columns on desktop */}
            {!isMobile && i < contacts.length - 1 && (
              <div style={{
                width: 1,
                height: 120,
                background: 'rgba(0,0,0,0.06)',
                alignSelf: 'center',
              }} className={isVisible ? `ct-fadein ct-delay-${i}` : 'ct-hidden'} />
            )}
          </React.Fragment>
        ))}
      </div>

      <style>{`
        .ct-hidden { opacity: 0; }
        .ct-fadein {
          animation: ctFadeUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
        .ct-delay-0 { animation-delay: 0ms; }
        .ct-delay-1 { animation-delay: 150ms; }
        .ct-delay-2 { animation-delay: 300ms; }
        @keyframes ctFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
