import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: '#064E3B',
      color: '#ffffff',
      padding: '24px 40px',
      borderTop: 'none'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}>
        
        {/* LEFT SIDE: Text Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.9)', fontFamily: 'system-ui, sans-serif' }}>
            Managed &amp; Handled by <strong style={{ color: '#ffffff' }}>Duniyape Technologies</strong>
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
            © {new Date().getFullYear()} Krishna Dham. All Rights Reserved.
          </p>
        </div>

        {/* RIGHT SIDE: Social Media Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
        </div>

      </div>
    </footer>
  );
}
