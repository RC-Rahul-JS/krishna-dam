import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZoomIn, ZoomOut, Maximize, MapPin, Phone } from 'lucide-react';

import phase1Plots from './data/phase1_partial.json';
import phase2Plots from './data/phase2_partial.json';

const getPhase1Details = (plotId) => {
  const num = parseInt(plotId, 10);
  if (isNaN(num)) return null;

  if (num >= 1 && num <= 16) return { size: 1500, sqm: 139.35, isIrregular: false };
  if (num === 17 || num === 18) return { size: null, sqm: null, isIrregular: true };
  if (num >= 19 && num <= 31) return { size: 1200, sqm: 111.46, isIrregular: false };
  if (num === 32 || num === 33) return { size: null, sqm: null, isIrregular: true };
  if (num >= 34 && num <= 38) return { size: 880, sqm: 82.16, isIrregular: false };
  if (num >= 39 && num <= 45) return { size: 1200, sqm: 111.46, isIrregular: false };
  if (num >= 46 && num <= 52) return { size: 1500, sqm: 139.35, isIrregular: false };
  if (num >= 53 && num <= 57) return { size: 924, sqm: 85.76, isIrregular: false };
  if (num === 58) return { size: null, sqm: null, isIrregular: true };
  if (num >= 59 && num <= 63) return { size: 1350, sqm: 125.27, isIrregular: false };
  if (num === 64) return { size: null, sqm: null, isIrregular: true };
  if (num >= 65 && num <= 72) return { size: 1350, sqm: 125.27, isIrregular: false };
  if (num === 73) return { size: null, sqm: null, isIrregular: true };
  if (num >= 74 && num <= 86) return { size: 1000, sqm: 92.9, isIrregular: false };
  if (num >= 87 && num <= 94) return { size: 1080, sqm: 100.32, isIrregular: false };
  if (num === 95) return { size: null, sqm: null, isIrregular: true };
  if (num >= 96 && num <= 100) return { size: 1080, sqm: 100.32, isIrregular: false };
  if (num === 101 || num === 102) return { size: null, sqm: null, isIrregular: true };
  if (num >= 103 && num <= 116) return { size: 1500, sqm: 139.35, isIrregular: false };
  if (num >= 117 && num <= 121) return { size: 629, sqm: 58.44, isIrregular: false };
  if (num >= 122 && num <= 126) return { size: 850, sqm: 78.58, isIrregular: false };

  return null;
};

const getPhase2Details = (plotId) => {
  if (!plotId) return null;
  const idStr = String(plotId).trim().toUpperCase();

  if (idStr === 'E-11' || idStr === 'E-12' || idStr === 'E11' || idStr === 'E12') {
    return { size: 750, sqm: 69.68, isIrregular: false };
  }
  if (idStr === 'E-1' || idStr === 'E1') {
    return { size: null, sqm: null, isIrregular: true };
  }
  if (/^E-[2-9]$/.test(idStr) || /^E[2-9]$/.test(idStr)) {
    return { size: 416, sqm: 38.65, isIrregular: false };
  }
  if (idStr === 'L-1' || idStr === 'L1') {
    return { size: null, sqm: null, isIrregular: true };
  }
  if (/^L-[2-8]$/.test(idStr) || /^L[2-8]$/.test(idStr)) {
    return { size: 396, sqm: 36.79, isIrregular: false };
  }
  if (idStr === 'L-9' || idStr === 'L9' || idStr === 'L-10' || idStr === 'L10') {
    return { size: null, sqm: null, isIrregular: true };
  }

  const num = parseInt(idStr, 10);
  if (isNaN(num)) return null;

  if (num === 1) return { size: null, sqm: null, isIrregular: true };
  if (num >= 2 && num <= 12) return { size: 1200, sqm: 111.46, isIrregular: false };
  if (num >= 13 && num <= 18) return { size: 720, sqm: 66.93, isIrregular: false };
  if (num === 19) return { size: null, sqm: null, isIrregular: true };
  if (num >= 20 && num <= 29) return { size: 800, sqm: 74.32, isIrregular: false };
  if (num >= 30 && num <= 38) return { size: 1000, sqm: 92.9, isIrregular: false };
  if (num === 39 || num === 40) return { size: null, sqm: null, isIrregular: true };
  if (num >= 41 && num <= 49) return { size: 1000, sqm: 92.9, isIrregular: false };
  if (num >= 50 && num <= 59) return { size: 800, sqm: 74.32, isIrregular: false };
  if (num === 60) return { size: null, sqm: null, isIrregular: true };
  if (num >= 61 && num <= 68) return { size: 600, sqm: null, isIrregular: true };
  if (num >= 69 && num <= 74) return { size: 800, sqm: 74.32, isIrregular: false };
  if (num === 75 || num === 76) return { size: null, sqm: null, isIrregular: true };
  if (num >= 77 && num <= 82) return { size: 800, sqm: 74.32, isIrregular: false };
  if (num >= 83 && num <= 90) return { size: 600, sqm: 55.77, isIrregular: false };
  if (num === 91 || num === 92) return { size: null, sqm: null, isIrregular: true };
  if (num >= 93 && num <= 99) return { size: 600, sqm: 55.77, isIrregular: false };
  if (num >= 100 && num <= 106) return { size: 600, sqm: 55.77, isIrregular: false };
  if (num === 107 || num === 108) return { size: null, sqm: null, isIrregular: true };
  if (num >= 109 && num <= 119) return { size: 600, sqm: 55.77, isIrregular: false };
  if (num === 120 || num === 121) return { size: null, sqm: null, isIrregular: true };
  if (num >= 122 && num <= 130) return { size: 600, sqm: 55.77, isIrregular: false };
  if (num === 131) return { size: null, sqm: null, isIrregular: true };
  if (num >= 132 && num <= 153) return { size: 600, sqm: 55.77, isIrregular: false };
  if (num >= 154 && num <= 175) return { size: 800, sqm: 74.32, isIrregular: false };
  if (num === 176) return { size: null, sqm: null, isIrregular: true };
  if (num >= 177 && num <= 179) return { size: 800, sqm: 74.32, isIrregular: false };

  return null;
};

const phase1WithKeys = phase1Plots.map((p, i) => {
  const details = getPhase1Details(p.id);
  return {
    ...p,
    size: details ? details.size : p.size,
    sqm: details ? details.sqm : p.sqm,
    isIrregular: details ? details.isIrregular : p.isIrregular,
    _key: `p1-${p.id}-${i}`
  };
});

const phase2WithKeys = phase2Plots.map((p, i) => {
  const details = getPhase2Details(p.id);
  const sizeVal = details ? details.size : p.size;
  const isIrr = details ? details.isIrregular : p.isIrregular;
  return {
    ...p,
    size: sizeVal,
    sqm: details ? details.sqm : p.sqm,
    isIrregular: isIrr,
    price: isIrr ? null : (sizeVal ? sizeVal * 3000 : p.price),
    type: isIrr ? 'Irregular' : (p.type || 'Standard'),
    _key: `p2-${p.id}-${i}`
  };
});

const initialPlotsData = [...phase1WithKeys, ...phase2WithKeys];

export default function MapPreview() {
  const navigate = useNavigate();
  const [plots] = useState(initialPlotsData);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [hoveredPlot, setHoveredPlot] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isVisible, setIsVisible] = useState(false);
  const [detailsKey, setDetailsKey] = useState(0);
  const sectionRef = useRef(null);
  const detailsRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.05 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => { window.removeEventListener('resize', handleResize); obs.disconnect(); };
  }, []);

  const handleResetMap = useCallback(() => {
    if (isMobile) {
      const zoom = 0.72;
      const offsetX = (window.innerWidth - 900 * zoom) / 2;
      setZoomLevel(zoom);
      setPanOffset({ x: offsetX, y: 16 });
    } else {
      const zoom = 1.7;
      const scaledH = 1200 * zoom;
      const vpH = window.innerHeight;
      setZoomLevel(zoom);
      setPanOffset({ x: 0, y: (vpH - scaledH) / 2 + scaledH * 0.05 });
    }
  }, [isMobile]);

  useEffect(() => { handleResetMap(); }, [isMobile]);

  const handleMouseDown = (e) => { setIsDragging(true); setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y }); };
  const handleMouseMove = (e) => { if (!isDragging) return; setPanOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y }); };
  const handleMouseUp = () => setIsDragging(false);
  const handleTouchStart = (e) => { if (e.touches.length === 1) { setIsDragging(true); setDragStart({ x: e.touches[0].clientX - panOffset.x, y: e.touches[0].clientY - panOffset.y }); } };
  const handleTouchMove = (e) => { if (!isDragging || e.touches.length !== 1) return; setPanOffset({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y }); };
  const handleTouchEnd = () => setIsDragging(false);
  const handleZoom = (dir) => setZoomLevel(prev => Math.min(Math.max(dir === 'in' ? prev + 0.2 : prev - 0.2, 0.2), 6.0));
  const handlePlotClick = (plot) => {
    setSelectedPlot(plot);
    setDetailsKey(k => k + 1);
    if (isMobile && mainRef.current && detailsRef.current) {
      setTimeout(() => {
        const detailsTop = detailsRef.current.offsetTop;
        mainRef.current.scrollTo({ top: detailsTop, behavior: 'smooth' });
      }, 50);
    }
  };

  const getColors = (plot, isActive) => {
    if (plot.status === 'sold') return { fill: 'rgba(148,163,184,0.25)', stroke: '#94a3b8', glow: 'rgba(148,163,184,0.3)' };
    if (plot.phase === 'Phase-1') return isActive
      ? { fill: 'rgba(239,68,68,0.9)', stroke: '#dc2626', glow: 'rgba(239,68,68,0.5)' }
      : { fill: 'rgba(239,68,68,0.55)', stroke: '#ef4444', glow: 'rgba(239,68,68,0.2)' };
    return isActive
      ? { fill: 'rgba(59,130,246,0.9)', stroke: '#1d4ed8', glow: 'rgba(59,130,246,0.5)' }
      : { fill: 'rgba(59,130,246,0.55)', stroke: '#3b82f6', glow: 'rgba(59,130,246,0.2)' };
  };

  const activePlot = hoveredPlot || selectedPlot;
  const phase1Count = plots.filter(p => p.phase === 'Phase-1' && p.status !== 'sold').length;
  const phase2Count = plots.filter(p => p.phase === 'Phase-2' && p.status !== 'sold').length;

  return (
    <div ref={sectionRef} style={{
      fontFamily: "'Montserrat', 'Inter', sans-serif",
      background: '#ffffff',
      height: isMobile ? 'auto' : '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: isMobile ? 'visible' : 'hidden',
    }}>

      {/* ═══ GLOBAL STYLES ═══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .fade-in { animation: fadeIn 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .slide-left { animation: slideLeft 0.75s cubic-bezier(0.16,1,0.3,1) both; }
        .slide-right { animation: slideRight 0.75s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .pop-in { animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }

        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideLeft { from { opacity:0; transform:translateX(-40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideRight { from { opacity:0; transform:translateX(40px); } to { opacity:1; transform:translateX(0); } }
        @keyframes popIn { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }

        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity:1; }
          50% { transform: scale(1.6); opacity:0.5; }
        }
        @keyframes ring-expand {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .ring-anim {
          animation: ring-expand 1.6s ease-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        .ctrl-btn:hover { background: #16a34a !important; color: #fff !important; border-color: transparent !important; transform: scale(1.1); }
        .ctrl-btn { transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1) !important; }

        .detail-row { transition: background 0.2s; }
        .detail-row:hover { background: rgba(16,185,129,0.05) !important; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(22,163,74,0.25); border-radius: 4px; }

        .tour-btn:hover { transform: translateY(-3px) scale(1.01); box-shadow: 0 16px 40px rgba(20,83,45,0.35) !important; }
        .tour-btn { transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1) !important; }

        .contact-btn:hover { transform: scale(1.06); box-shadow: 0 6px 20px rgba(16,185,129,0.45) !important; }
        .contact-btn { transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1) !important; }
      `}</style>

      {/* ═══ BACKGROUND ═══ */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, background:'#ffffff' }} />

      {/* ═══ HEADER ═══ */}
      <header className={isVisible ? 'fade-in' : ''} style={{
        position:'relative', zIndex:10, flexShrink:0,
        padding: isMobile ? '14px 18px 10px' : '16px 40px 10px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        borderBottom:'1px solid #f0f0f0',
        background:'#ffffff',
      }}>
        {/* Left: brand */}
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          {/* Logo mark */}
          <div style={{
            width:42, height:42, borderRadius:12, flexShrink:0,
            background:'linear-gradient(135deg, #16a34a, #10b981)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <MapPin size={20} color="#fff" strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <h2 style={{ fontFamily:"'Montserrat', sans-serif", fontSize: isMobile ? 18 : 22, fontWeight:900, color:'#14532d', letterSpacing:'0.04em', lineHeight:1, textTransform:'uppercase' }}>
                Krishna Dham
              </h2>
              <span style={{ fontSize:9, fontWeight:800, letterSpacing:'0.12em', textTransform:'uppercase', color:'#16a34a', background:'rgba(22,163,74,0.1)', padding:'2px 8px', borderRadius:20, border:'1px solid rgba(22,163,74,0.25)' }}>
                Live Map
              </span>
            </div>
            <p style={{ fontSize:11, color:'#047857', marginTop:2, fontWeight:600, letterSpacing:'0.05em', textTransform:'uppercase' }}>Kolar Road, Bhopal · Interactive Plot Explorer</p>
          </div>
        </div>

        {/* Right: counters */}
        {!isMobile && (
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {[
              { phase:'Phase 1', count:phase1Count, color:'#16a34a', light:'rgba(22,163,74,0.07)', border:'rgba(22,163,74,0.2)' },
              { phase:'Phase 2', count:phase2Count, color:'#b45309', light:'rgba(180,83,9,0.07)', border:'rgba(180,83,9,0.2)' },
            ].map(s => (
              <div key={s.phase} style={{ background:s.light, borderRadius:12, padding:'8px 16px', textAlign:'center' }}>
                <div style={{ fontSize:22, fontWeight:900, color:s.color, lineHeight:1, fontVariantNumeric:'tabular-nums' }}>{s.count}</div>
                <div style={{ fontSize:9, fontWeight:700, color:'#047857', textTransform:'uppercase', letterSpacing:'0.1em', marginTop:2 }}>{s.phase} Available</div>
              </div>
            ))}
            <a href="tel:+919479444536" style={{
              display:'flex', alignItems:'center', gap:8, padding:'10px 18px',
              background:'linear-gradient(135deg, #16a34a, #14532d)',
              borderRadius:12, textDecoration:'none', color:'#fff',
              fontSize:13, fontWeight:700,
              transition:'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='scale(1.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; }}
            >
              <Phone size={14} /> Call Now
            </a>
          </div>
        )}
      </header>

      {/* ═══ MAIN CONTENT ═══ */}
      <main ref={mainRef} style={{
        flex:1, minHeight:0, position:'relative', zIndex:1,
        display:'flex', flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 14 : 20,
        padding: isMobile ? '12px 16px 16px' : '16px 40px 20px',
        overflowY: isMobile ? 'visible' : 'hidden',
      }}>

        {/* ── MAP COLUMN ── */}
        <div className={isVisible ? 'slide-left' : ''} style={{
          display: 'flex',
          flex: isMobile ? 'none' : '1.9',
          height: isMobile ? '60vh' : undefined,
          minHeight: isMobile ? 320 : 0,
          flexDirection:'column', gap:0,
        }}>
          {/* Map card */}
            <div style={{
              flex:1, minHeight:0, position:'relative',
              background:'#fff',
              overflow:'hidden',
            }}>

            {/* ── MAP OVERLAY UI ── */}

            {/* Top-left: hint pill */}
            <div style={{
              position:'absolute', top:14, left:14, zIndex:20,
              background:'rgba(15,23,42,0.75)', backdropFilter:'blur(12px)',
              borderRadius:10, padding:'5px 12px',
              display:'flex', alignItems:'center', gap:7,
            }}>
              <span style={{ width:5, height:5, borderRadius:'50%', background:'#34d399', animation:'pulse-dot 2s infinite' }} />
              <span style={{ fontSize:10, fontWeight:600, color:'rgba(255,255,255,0.85)', letterSpacing:'0.06em' }}>Drag · Scroll · Hover</span>
            </div>

            {/* Top-right: zoom controls */}
            <div style={{ position:'absolute', top:14, right:14, zIndex:20, display:'flex', flexDirection:'column', gap:6 }}>
              {[
                { icon:<ZoomIn size={14}/>, fn:()=>handleZoom('in'), tip:'Zoom In' },
                { icon:<ZoomOut size={14}/>, fn:()=>handleZoom('out'), tip:'Zoom Out' },
                { icon:<Maximize size={13}/>, fn:handleResetMap, tip:'Reset' },
              ].map((b,i) => (
                <button key={i} className="ctrl-btn" onClick={b.fn} title={b.tip} style={{
                  width:34, height:34, borderRadius:10, border:'none',
                  background:'rgba(255,255,255,0.92)', backdropFilter:'blur(8px)',
                  cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                  color:'#475569',
                }}>
                  {b.icon}
                </button>
              ))}
            </div>

            {/* Bottom-left: legend */}
            <div style={{
              position:'absolute', bottom:14, left:14, zIndex:20,
              background:'rgba(255,255,255,0.95)',
              borderRadius:10, padding:'10px 14px',
            }}>
              <div style={{ fontSize:8, fontWeight:800, color:'#047857', textTransform:'uppercase', letterSpacing:'0.14em', marginBottom:7 }}>Legend</div>
              {[
                { color:'#ef4444', label:'Phase 1 Available' },
                { color:'#3b82f6', label:'Phase 2 Available' },
                { color:'#94a3b8', label:'Sold' },
              ].map(l => (
                <div key={l.label} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
                  <span style={{ width:9, height:9, borderRadius:'50%', background:l.color, flexShrink:0 }} />
                  <span style={{ fontSize:10, fontWeight:600, color:'#14532d' }}>{l.label}</span>
                </div>
              ))}
            </div>

            {/* Bottom-right: zoom level badge */}
            <div style={{
              position:'absolute', bottom:14, right:14, zIndex:20,
              background:'rgba(15,23,42,0.7)', backdropFilter:'blur(8px)',
              borderRadius:8, padding:'4px 10px',
            }}>
              <span style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.8)', letterSpacing:'0.04em' }}>{Math.round(zoomLevel * 100)}%</span>
            </div>

            {/* ── DRAGGABLE MAP AREA ── */}
            <div style={{ width:'100%', height:'100%', cursor: isDragging ? 'grabbing' : 'grab', touchAction:'none', overflow:'hidden', position:'relative' }}
              onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onTouchCancel={handleTouchEnd}
            >
              <div style={{ position:'absolute', transformOrigin:'top left', transform:`translate(${panOffset.x}px,${panOffset.y}px) scale(${zoomLevel})`, width:900, height:1200, willChange:'transform' }}>
                <img src="/map.jpg" alt="Krishna Dham Master Plan" style={{ width:'100%', height:'100%', objectFit:'contain', pointerEvents:'none', userSelect:'none', display:'block' }} draggable={false} />
                <svg viewBox="0 0 900 1200" style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'visible' }}>
                  {plots.map(plot => {
                    const isSel = selectedPlot?._key === plot._key;
                    const isHov = hoveredPlot?._key === plot._key;
                    const isAct = isHov || isSel;
                    const anyHov = hoveredPlot !== null;
                    const opacity = anyHov ? (isHov ? 1 : 0.1) : (isSel ? 1 : 0.38);
                    const colors = getColors(plot, isAct);
                    const r = plot.r || 14;

                    return (
                      <g key={plot._key}
                        style={{ cursor:'pointer', opacity, transition:'opacity 0.28s cubic-bezier(0.4,0,0.2,1)' }}
                        onClick={e => { e.stopPropagation(); handlePlotClick(plot); }}
                        onMouseEnter={() => setHoveredPlot(plot)}
                        onMouseLeave={() => setHoveredPlot(null)}
                      >
                        {/* Expanding ring */}
                        {isAct && <circle cx={plot.x} cy={plot.y} r={r+16} fill="none" stroke={colors.stroke} strokeWidth="1.5" className="ring-anim" style={{ transformOrigin:`${plot.x}px ${plot.y}px` }} />}
                        {/* Steady ring */}
                        {isAct && <circle cx={plot.x} cy={plot.y} r={r+7} fill="none" stroke={colors.stroke} strokeWidth="1" style={{ opacity:0.45 }} />}
                        {/* Glow disc */}
                        {isAct && <circle cx={plot.x} cy={plot.y} r={r*1.6} fill={colors.glow} style={{ filter:`blur(4px)` }} />}
                        {/* Main dot */}
                        <circle cx={plot.x} cy={plot.y}
                          r={isAct ? r * 1.3 : r * 0.72}
                          fill={colors.fill}
                          stroke={isSel ? '#fbbf24' : colors.stroke}
                          strokeWidth={isAct ? 2.5 : 1}
                          style={{ transition:'r 0.22s cubic-bezier(0.34,1.56,0.64,1), fill 0.18s, stroke 0.18s', filter: isAct ? `drop-shadow(0 2px 8px ${colors.glow})` : 'none' }}
                        />
                        {/* Tooltip label */}
                        {isAct && (
                          <g style={{ animation:'popIn 0.2s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                            <rect x={plot.x-20} y={plot.y-36} width={40} height={17} rx={6}
                              fill={isSel ? '#fbbf24' : '#0f172a'}
                              stroke={isSel ? '#d97706' : colors.stroke} strokeWidth={1.2}
                            />
                            <text x={plot.x} y={plot.y-24} textAnchor="middle"
                              fill={isSel ? '#000' : '#fff'} fontSize={8} fontWeight="800" fontFamily="Inter, sans-serif"
                              style={{ userSelect:'none' }}
                            >{plot.id}</text>
                            <polygon points={`${plot.x-5},${plot.y-20} ${plot.x+5},${plot.y-20} ${plot.x},${plot.y-12}`} fill={isSel ? '#fbbf24' : '#0f172a'} />
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── DETAILS COLUMN ── */}
        <div ref={detailsRef} className={isVisible ? 'slide-right' : ''} style={{
          display: 'flex',
          flex:'0.9', minHeight:0, minWidth: isMobile ? 'auto' : 310,
          flexDirection:'column', gap:12,
          overflowY: isMobile ? 'visible' : 'auto', overflowX:'hidden', paddingRight:2,
        }}>

          {/* ── MAIN INFO CARD ── */}
          <div style={{
            background:'#f9fafb',
            borderRadius:12,
            overflow:'hidden',
          }}>
            {/* Card header gradient strip */}
            <div style={{
              padding:'20px 22px 16px',
              background: activePlot
                ? activePlot.phase === 'Phase-1'
                  ? 'linear-gradient(135deg, #fff5f5 0%, #fff 60%)'
                  : 'linear-gradient(135deg, #eff6ff 0%, #fff 60%)'
                : 'linear-gradient(135deg, #f5f3ff 0%, #fff 60%)',
              borderBottom:'1px solid rgba(148,163,184,0.12)',
            }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:9, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', color:'#16a34a', marginBottom:6 }}>
                    {activePlot ? activePlot.phase : 'Plot Explorer'}
                  </div>
                  <div style={{ fontFamily:"'Montserrat', sans-serif", fontSize: isMobile ? 20 : 24, fontWeight:900, color:'#14532d', lineHeight:1.1, letterSpacing:'0.02em', textTransform:'uppercase' }}>
                    {activePlot ? `Plot #${activePlot.id}` : 'Select a Plot'}
                  </div>
                  {!activePlot && (
                    <p style={{ fontSize:12, color:'#047857', marginTop:6, lineHeight:1.5 }}>
                      Hover or click any plot on the map to see details
                    </p>
                  )}
                </div>
                <div style={{
                  width:44, height:44, borderRadius:14, flexShrink:0,
                  background: activePlot?.phase === 'Phase-1' ? 'linear-gradient(135deg,#d1fae5,#a7f3d0)' : activePlot?.phase === 'Phase-2' ? 'linear-gradient(135deg,#fef3c7,#fde68a)' : 'linear-gradient(135deg,#d1fae5,#a7f3d0)',
                  border:`1px solid ${activePlot?.phase === 'Phase-1' ? 'rgba(22,163,74,0.25)' : activePlot?.phase === 'Phase-2' ? 'rgba(180,83,9,0.25)' : 'rgba(22,163,74,0.2)'}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  boxShadow:'0 2px 8px rgba(0,0,0,0.06)',
                }}>
                  <MapPin size={19} color={activePlot?.phase === 'Phase-1' ? '#16a34a' : activePlot?.phase === 'Phase-2' ? '#b45309' : '#16a34a'} />
                </div>
              </div>

              {/* Status pill */}
              {activePlot && (
                <div style={{ marginTop:12, display:'flex', alignItems:'center', gap:8 }}>
                  <span style={{
                    display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px',
                    borderRadius:20, fontSize:10, fontWeight:800, letterSpacing:'0.08em', textTransform:'uppercase',
                    background: activePlot.status !== 'sold' ? 'linear-gradient(135deg,#dcfce7,#bbf7d0)' : 'linear-gradient(135deg,#f1f5f9,#e2e8f0)',
                    color: activePlot.status !== 'sold' ? '#14532d' : '#64748b',
                    border:`1px solid ${activePlot.status !== 'sold' ? 'rgba(22,163,74,0.3)' : 'rgba(148,163,184,0.3)'}`,
                  }}>
                    <span style={{ width:5, height:5, borderRadius:'50%', background: activePlot.status !== 'sold' ? '#16a34a' : '#94a3b8', animation: activePlot.status !== 'sold' ? 'pulse-dot 2s infinite' : 'none' }} />
                    {activePlot.status !== 'sold' ? 'Available' : 'Sold Out'}
                  </span>
                  <span style={{ fontSize:11, color:'#047857', fontWeight:600 }}>
                    {activePlot.phase}
                  </span>
                </div>
              )}
            </div>

            {/* ── DETAILS ROWS ── */}
            {activePlot ? (
              <div key={detailsKey} style={{ animation:'fadeIn 0.3s ease both' }}>
                {(() => {
                  const tableSpecs = activePlot.phase === 'Phase-1' ? getPhase1Details(activePlot.id) : getPhase2Details(activePlot.id);
                  const isIrregular = activePlot.isIrregular || (tableSpecs && tableSpecs.isIrregular) || activePlot.type === 'Irregular';
                  const sizeVal = tableSpecs && tableSpecs.size !== undefined ? tableSpecs.size : activePlot.size;
                  const sqmVal = tableSpecs && tableSpecs.sqm !== undefined ? tableSpecs.sqm : activePlot.sqm;
                  const sqftStr = (!sizeVal || (isIrregular && sizeVal === null)) ? 'IRREGULAR' : `${sizeVal.toLocaleString()} sq.ft.`;
                  const sqmStr = (!sqmVal || (isIrregular && sqmVal === null)) ? 'IRREGULAR' : `${sqmVal} sq.m`;

                  return [
                    { label:'Area (Sq.ft.)', value: sqftStr, highlight: !isIrregular, sub: !isIrregular ? `≈ ${Math.round(sizeVal / 9)} sq.yd` : undefined },
                    { label:'Area (Sq.m)', value: sqmStr },
                    { label:'Vastu Score', value: `${activePlot.vastu || 90}%`, vastu: true },
                    { label:'Plot Type', value: isIrregular ? 'Irregular' : (activePlot.type || 'Standard') },
                  ].map((row, i, arr) => (
                    <div key={i} className="detail-row" style={{
                      padding:'13px 22px',
                      borderBottom: i < arr.length-1 ? '1px solid rgba(148,163,184,0.09)' : 'none',
                      display:'flex', alignItems:'center', justifyContent:'space-between',
                      background: i%2===0 ? 'rgba(248,250,255,0.6)' : '#fff',
                    }}>
                      <span style={{ fontSize:11, fontWeight:600, color:'#64748b', letterSpacing:'0.03em' }}>{row.label}</span>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontSize: row.highlight ? 14 : 13, fontWeight: row.highlight ? 800 : 700, color: row.highlight ? '#16a34a' : '#14532d', letterSpacing:'-0.01em' }}>
                          {row.value}
                        </div>
                        {row.sub && <div style={{ fontSize:10, color:'#047857', marginTop:2 }}>{row.sub}</div>}
                        {row.vastu && (
                          <div style={{ marginTop:5, display:'flex', alignItems:'center', gap:6, justifyContent:'flex-end' }}>
                            <div style={{ width:70, height:4, borderRadius:4, background:'#e2e8f0', overflow:'hidden' }}>
                              <div style={{ width:`${activePlot.vastu || 90}%`, height:'100%', background:'linear-gradient(90deg,#16a34a,#86efac)', borderRadius:4, transition:'width 0.6s cubic-bezier(0.4,0,0.2,1)' }} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            ) : (
              <div style={{ padding:'32px 22px', textAlign:'center' }}>
                <div style={{ width:52, height:52, borderRadius:16, background:'linear-gradient(135deg,#d1fae5,#a7f3d0)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', border:'1px solid rgba(22,163,74,0.2)', boxShadow:'0 2px 8px rgba(22,163,74,0.12)' }}>
                  <MapPin size={22} color="#16a34a" />
                </div>
                <div style={{ fontSize:13, fontWeight:700, color:'#14532d', marginBottom:5 }}>Tap any plot to explore</div>
                <div style={{ fontSize:11, color:'#047857', lineHeight:1.6 }}>See area, facing, vastu<br/>and availability instantly</div>
              </div>
            )}
          </div>

          {/* ── QUICK STATS ── */}
          <div style={{ display:'flex', gap:10 }}>
            {[
              { label:'Phase 1', count:phase1Count, color:'#ef4444', bg:'rgba(239,68,68,0.07)' },
              { label:'Phase 2', count:phase2Count, color:'#3b82f6', bg:'rgba(59,130,246,0.07)' },
            ].map(s => (
              <div key={s.label} style={{
                flex:1, background:s.bg,
                borderRadius:10, padding:'11px 14px', textAlign:'center',
              }}>
                <div style={{ fontSize:24, fontWeight:900, color:s.color, lineHeight:1, fontVariantNumeric:'tabular-nums' }}>{s.count}</div>
                <div style={{ fontSize:9, fontWeight:700, color:'#047857', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:3 }}>{s.label} Available</div>
              </div>
            ))}
          </div>

          {/* ── 360 TOUR CARD ── */}
          <div className="tour-btn" onClick={() => navigate('/tour')} style={{
            position:'relative', borderRadius:12, overflow:'hidden', cursor:'pointer',
            width:'100%', aspectRatio:'1 / 1',
            background: 'url("/20260708_191357_458.jpg.jpeg") center/cover no-repeat',
          }}>
            {/* Dark green overlay */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(6,78,59,0.85) 0%, rgba(20,83,45,0.65) 50%, rgba(6,78,59,0.9) 100%)' }} />
            {/* Animated shimmer */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(105deg, transparent 40%, rgba(134,239,172,0.1) 50%, transparent 60%)', backgroundSize:'200% 100%', animation:'shimmer 3s linear infinite' }} />

            <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12 }}>
              <div style={{ width:56, height:56, borderRadius:'50%', background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:8, fontWeight:800, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:4 }}>Interactive</div>
                <div style={{ fontSize:22, fontWeight:900, color:'#fff', letterSpacing:'0.08em', lineHeight:1, fontFamily:"'Montserrat',sans-serif" }}>360° TOUR</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.6)', marginTop:6, fontWeight:500 }}>Explore the colony virtually →</div>
              </div>
            </div>
          </div>

          {/* ── CONTACT STRIP ── */}
          <div style={{
            background:'#f9fafb',
            borderRadius:10, padding:'13px 18px',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            gap:10,
          }}>
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:'#14532d' }}>Interested in a plot?</div>
              <div style={{ fontSize:10, color:'#047857', marginTop:2, fontWeight:500 }}>Our sales team is ready to help</div>
            </div>
            <div style={{ display:'flex', gap:8, flexShrink:0 }}>
              <a href="tel:+919479444536" style={{
                padding:'8px 14px', borderRadius:8,
                background:'linear-gradient(135deg,#16a34a,#14532d)',
                color:'#fff', fontSize:11, fontWeight:800,
                cursor:'pointer', whiteSpace:'nowrap',
                letterSpacing:'0.04em', fontFamily:"'Montserrat',sans-serif",
                textDecoration:'none', display:'flex', alignItems:'center', gap:5,
              }}>
                <Phone size={11} /> Call
              </a>
              <a href="https://wa.me/919479444536" target="_blank" rel="noopener noreferrer" style={{
                padding:'8px 14px', borderRadius:8,
                background:'#25D366',
                color:'#fff', fontSize:11, fontWeight:800,
                cursor:'pointer', whiteSpace:'nowrap',
                letterSpacing:'0.04em', fontFamily:"'Montserrat',sans-serif",
                textDecoration:'none', display:'flex', alignItems:'center', gap:5,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
