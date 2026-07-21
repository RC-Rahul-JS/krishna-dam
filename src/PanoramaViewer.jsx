import React, { useRef, useState, useEffect, useCallback } from "react";
import { Pannellum } from "pannellum-react";

/** Convert hotspot (yaw,pitch) → screen (x,y) using gnomonic projection. */
function toScreen(viewer, yaw, pitch, w, h) {
  const vy = viewer.getYaw() * Math.PI / 180;
  const vp = viewer.getPitch() * Math.PI / 180;
  const hfov = viewer.getHfov() * Math.PI / 180;

  let dLon = (yaw * Math.PI / 180) - vy;
  while (dLon > Math.PI) dLon -= 2 * Math.PI;
  while (dLon < -Math.PI) dLon += 2 * Math.PI;

  const pp = pitch * Math.PI / 180;

  const cosC = Math.sin(vp) * Math.sin(pp) + Math.cos(vp) * Math.cos(pp) * Math.cos(dLon);
  if (cosC <= 0.1) return null; // Behind camera

  const x = (Math.cos(pp) * Math.sin(dLon)) / cosC;
  const y = (Math.cos(vp) * Math.sin(pp) - Math.sin(vp) * Math.cos(pp) * Math.cos(dLon)) / cosC;

  const f = (w / 2) / Math.tan(hfov / 2);

  return { x: w / 2 + f * x, y: h / 2 - f * y };
}

/** Convert screen (x,y) → (yaw,pitch) using inverse gnomonic projection. */
function toYawPitch(viewer, px, py, w, h) {
  const vy = viewer.getYaw() * Math.PI / 180;
  const vp = viewer.getPitch() * Math.PI / 180;
  const hfov = viewer.getHfov() * Math.PI / 180;

  const f = (w / 2) / Math.tan(hfov / 2);
  const x = (px - w / 2) / f;
  const y = (h / 2 - py) / f;

  const rho = Math.sqrt(x * x + y * y);
  if (rho === 0) return { yaw: viewer.getYaw(), pitch: viewer.getPitch() };

  const c = Math.atan(rho);
  const pitchRad = Math.asin(Math.cos(c) * Math.sin(vp) + (y * Math.sin(c) * Math.cos(vp)) / rho);
  const yawRad = vy + Math.atan2(x * Math.sin(c), rho * Math.cos(vp) * Math.cos(c) - y * Math.sin(vp) * Math.sin(c));

  let yaw = yawRad * 180 / Math.PI;
  let pitch = pitchRad * 180 / Math.PI;

  while (yaw > 180) yaw -= 360;
  while (yaw < -180) yaw += 360;

  return { yaw, pitch };
}

const DIR_TO_ROT = { straight: 0, right: 90, back: 180, left: -90 };

function ArrowSVG({ rotation = 0, size = 36, color = "rgba(255,255,255,0.92)", scale = 1 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36"
      style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.8))", transform: `scale(${scale}) rotate(${rotation}deg)`, transition: "transform 0.12s" }}>
      <path d="M18 32 L18 6 M10 14 L18 6 L26 14"
        fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PanoramaViewer({
  imagePath,
  initialYaw   = 180,
  initialPitch = 10,
  initialHfov  = 110,
  onViewChange,
  hotspots     = [],     // [{yaw,pitch,target,text,dir,rotation}]
  onHotspotClick,
  editMode     = false,
  onHotspotDragEnd,      // (index, {yaw,pitch}) — called when arrow dragged to new pos
}) {
  const panRef       = useRef(null);
  const containerRef = useRef(null);
  const rafRef       = useRef(null);
  const dragRef      = useRef(null); // {index, startX, startY}

  const [spots, setSpots]     = useState([]);           // [{x,y,hs,index}]
  const [dragIdx, setDragIdx] = useState(null);         // index being dragged
  const [dragPos, setDragPos] = useState(null);         // {x,y} current drag position
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded]   = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [imagePath]);

  /* ── rAF position loop ── */
  const updatePositions = useCallback(() => {
    if (!panRef.current || !containerRef.current || !loaded) return;
    const viewer = panRef.current.getViewer?.();
    if (!viewer) return;
    const { offsetWidth: w, offsetHeight: h } = containerRef.current;

    const next = hotspots.map((hs, index) => {
      let x, y;
      let syaw = hs.yaw, spitch = hs.pitch;

      if (dragIdx === index && dragPos) {
        x = dragPos.x; y = dragPos.y;
        const coords = toYawPitch(viewer, x, y, w, h);
        syaw = coords.yaw; spitch = coords.pitch;
      } else {
        const pos = toScreen(viewer, syaw, spitch, w, h);
        if (!pos) return null;
        x = pos.x; y = pos.y;
      }

      const baseRot = hs.rotation !== undefined ? hs.rotation : (DIR_TO_ROT[hs.dir] || 0);
      let screenRotation = baseRot;

      const d = 0.5; // step in degrees
      const bearingRad = baseRot * Math.PI / 180;
      const spitchRad = spitch * Math.PI / 180;
      const tyaw = syaw + d * Math.sin(bearingRad) / (Math.cos(spitchRad) || 1e-5);
      const tpitch = spitch + d * Math.cos(bearingRad);

      const tpos = toScreen(viewer, tyaw, tpitch, w, h);
      if (tpos) {
        const dx = tpos.x - x;
        const dy = tpos.y - y;
        screenRotation = (Math.atan2(dy, dx) * 180 / Math.PI) + 90;
      }

      return { x, y, screenRotation, hs, index };
    }).filter(Boolean);

    setSpots(next);
    rafRef.current = requestAnimationFrame(updatePositions);
  }, [hotspots, dragIdx, dragPos, loaded]);

  useEffect(() => {
    const t = setTimeout(() => { rafRef.current = requestAnimationFrame(updatePositions); }, 600);
    return () => { clearTimeout(t); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [updatePositions]);

  /* ── view sync ── */
  const syncView = () => {
    const viewer = panRef.current?.getViewer?.();
    if (viewer && onViewChange) onViewChange({ yaw: viewer.getYaw(), pitch: viewer.getPitch(), hfov: viewer.getHfov() });
  };

  /* ── drag handlers ── */
  const handleArrowMouseDown = (e, index) => {
    if (!editMode) return;
    e.preventDefault(); e.stopPropagation();
    const rect = containerRef.current.getBoundingClientRect();
    dragRef.current = { index, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top };
    setDragIdx(index);
  };

  const handleMouseMove = (e) => {
    if (dragIdx === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setDragPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseUp = (e) => {
    if (dragIdx === null || !containerRef.current || !panRef.current) { setDragIdx(null); setDragPos(null); return; }
    const viewer = panRef.current.getViewer?.();
    if (viewer) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const { offsetWidth: w, offsetHeight: h } = containerRef.current;
      const coords = toYawPitch(viewer, x, y, w, h);
      onHotspotDragEnd?.(dragIdx, coords);
    }
    setDragIdx(null); setDragPos(null);
  };

  return (
    <div ref={containerRef}
      className="w-full h-full bg-black relative select-none"
      style={{ cursor: dragIdx !== null ? "grabbing" : "default" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseUpCapture={syncView}
      onTouchEnd={syncView}
      onWheel={syncView}
    >
      {/* Loading Overlay */}
      {!loaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-500">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-white/20 border-t-indigo-500 rounded-full animate-spin shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
            <span className="mt-5 text-white/90 text-sm font-semibold tracking-[0.2em] uppercase drop-shadow-md">Loading View...</span>
          </div>
        </div>
      )}

      <Pannellum
        ref={panRef}
        width="100%" height="100%"
        image={imagePath}
        pitch={initialPitch} yaw={initialYaw} hfov={initialHfov}
        autoLoad showZoomCtrl={true}
        onMouseup={syncView}
        onLoad={() => setLoaded(true)}
      />

      {/* ── Arrow overlays ── */}
      {spots.map(({ x, y, screenRotation, hs, index }) => (
        <div key={`${hs.target}-${index}`}
          style={{
            position: "absolute", left: x, top: y,
            transform: "translate(-50%,-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            cursor: editMode ? (dragIdx === index ? "grabbing" : "grab") : "pointer",
            zIndex: 30,
            userSelect: "none",
          }}
          onMouseDown={editMode ? (e) => handleArrowMouseDown(e, index) : undefined}
          onClick={!editMode ? (e) => { e.stopPropagation(); onHotspotClick?.(hs.target); } : undefined}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <ArrowSVG
            rotation={screenRotation}
            color={editMode ? (dragIdx === index ? "#818cf8" : "rgba(255,255,255,0.92)") : "rgba(255,255,255,0.92)"}
            scale={hovered === index ? 1.25 : 1}
          />
          <span style={{
            background: "rgba(0,0,0,0.7)", color: "#fff",
            fontSize: 11, fontWeight: 700, fontFamily: "Arial,sans-serif",
            letterSpacing: "0.05em", padding: "2px 10px", borderRadius: 99,
            border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(4px)",
            whiteSpace: "nowrap", pointerEvents: "none",
          }}>
            {hs.text}
          </span>
          {editMode && (
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", pointerEvents: "none" }}>drag</span>
          )}
        </div>
      ))}
    </div>
  );
}
