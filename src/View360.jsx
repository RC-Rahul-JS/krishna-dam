import React, { useState, useRef } from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Map, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * All scene data in one place.
 */
const nodes = [
  {
    id: 0,
    src: '/20260708_191357_458.jpg.jpeg',
    label: 'Start',
    nav: { forward: 1, backward: null, left: 3, right: 2 },
  },
  {
    id: 1,
    src: '/20260708_191502_510.jpg.jpeg',
    label: 'Street A',
    nav: { forward: 4, backward: 0, left: 3, right: null },
  },
  {
    id: 2,
    src: '/20260708_191739_967.jpg.jpeg',
    label: 'Right Lane',
    nav: { forward: null, backward: null, left: 0, right: null },
  },
  {
    id: 3,
    src: '/20260708_191942_302.jpg.jpeg',
    label: 'Left Lane',
    nav: { forward: null, backward: null, left: null, right: 0 },
  },
  {
    id: 4,
    src: '/20260708_192038_909.jpg.jpeg',
    label: 'Street B',
    nav: { forward: null, backward: 1, left: null, right: null },
  },
];


function NavButton({ direction, icon: Icon, targetIndex, onClick }) {
  const disabled = targetIndex === null || targetIndex === undefined;

  return (
    <button
      onClick={() => !disabled && onClick(targetIndex)}
      disabled={disabled}
      title={disabled ? `No ${direction} view` : `Go ${direction}`}
      className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all duration-200 select-none
        ${disabled
          ? 'border-white/5 bg-white/5 text-white/20 cursor-not-allowed'
          : 'border-white/20 bg-white/10 hover:bg-blue-600 hover:border-blue-400 text-white cursor-pointer active:scale-90 shadow-lg hover:shadow-blue-500/30'
        }`}
    >
      <Icon className="w-6 h-6" />
      <span className="text-[9px] font-bold uppercase tracking-widest leading-none">
        {direction}
      </span>
    </button>
  );
}

export default function View360() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const psvRef = useRef(null);
  const navigate = useNavigate();

  const handleReady = (instance) => {
    psvRef.current = instance;
  };

  const goTo = (idx) => {
    setCurrentIndex(idx);
  };

  const rotate = (yawOffset, pitchOffset) => {
    if (psvRef.current) {
      const pos = psvRef.current.getPosition();
      psvRef.current.animate({
        yaw: pos.yaw + yawOffset,
        pitch: pos.pitch + pitchOffset,
        speed: 1000,
      });
    }
  };

  const currentNode = nodes[currentIndex];
  const nav = currentNode.nav;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      {/* 360 Viewer */}
      <ReactPhotoSphereViewer
        ref={psvRef}
        key={currentIndex}
        src={currentNode.src}
        height="100vh"
        width="100%"
        onReady={handleReady}
        littlePlanet={false}
        hideNavbarButton={true}
        navbar={['zoom', 'caption', 'fullscreen']}
      />

      {/* ── Top Header ── */}
      <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]">
            <Map className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow">360° Street View</h1>
            <p className="text-sm text-gray-300 uppercase tracking-wider">
              📍 {currentNode.label}
            </p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/')}
          className="pointer-events-auto flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 transition-all active:scale-95"
        >
          <Home className="w-5 h-5" />
          <span className="font-semibold text-sm">Back to Home</span>
        </button>
      </div>

      {/* ── Camera Pan Controls (look around) — top-left ── */}
      <div className="absolute top-24 left-6 flex flex-col items-center gap-2 bg-black/40 backdrop-blur-md p-3 rounded-3xl shadow-2xl border border-white/10 z-10">
        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Look</p>
        <button onClick={() => rotate(0, 0.3)}  className="p-2 bg-white/10 hover:bg-white/25 rounded-full transition-all active:scale-90" title="Look Up"><ArrowUp className="w-4 h-4" /></button>
        <div className="flex gap-2">
          <button onClick={() => rotate(-0.5, 0)} className="p-2 bg-white/10 hover:bg-white/25 rounded-full transition-all active:scale-90" title="Look Left"><ArrowLeft className="w-4 h-4" /></button>
          <button onClick={() => rotate(0, -0.3)} className="p-2 bg-white/10 hover:bg-white/25 rounded-full transition-all active:scale-90" title="Look Down"><ArrowDown className="w-4 h-4" /></button>
          <button onClick={() => rotate(0.5, 0)}  className="p-2 bg-white/10 hover:bg-white/25 rounded-full transition-all active:scale-90" title="Look Right"><ArrowRight className="w-4 h-4" /></button>
        </div>
      </div>

      {/* ── Navigation Controls (move between images) — bottom-right ── */}
      <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 bg-black/50 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white/10 z-10">
        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">Navigate</p>

        {/* Forward */}
        <NavButton direction="Forward" icon={ArrowUp} targetIndex={nav.forward} onClick={goTo} />

        {/* Left & Right */}
        <div className="flex gap-3">
          <NavButton direction="Left"    icon={ArrowLeft}  targetIndex={nav.left}  onClick={goTo} />
          <NavButton direction="Right"   icon={ArrowRight} targetIndex={nav.right} onClick={goTo} />
        </div>

        {/* Backward */}
        <NavButton direction="Back" icon={ArrowDown} targetIndex={nav.backward} onClick={goTo} />
      </div>

    </div>
  );
}
