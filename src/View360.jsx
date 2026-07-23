import React, { useEffect, useState, useCallback } from "react";
import PanoramaViewer from "./PanoramaViewer";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

export default function View360() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentView, setCurrentView] = useState(null);
  const navigate = useNavigate();

  const fetchImages = useCallback(async () => {
    try {
      // Fetch static JSON configs from public folder
      const [mapRes, anglesRes, remoteRes] = await Promise.all([
        fetch("/data/map.json").then(r => r.json()).catch(() => ({})),
        fetch("/data/angles.json").then(r => r.json()).catch(() => ({})),
        fetch("/data/remote_urls.json").then(r => r.json()).catch(() => ({}))
      ]);

      const imageFiles = Object.keys(remoteRes).sort((a, b) => 
        a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
      );

      const parsedImages = imageFiles.map((img, index) => {
        let hotspots = mapRes[img] || null;
        
        // Auto-generate linear hotspots if not defined
        if (!hotspots) {
          hotspots = [];
          if (index > 0) hotspots.push({ yaw: 180, pitch: -10, target: imageFiles[index - 1], text: "Back" });
          if (index < imageFiles.length - 1) hotspots.push({ yaw: 0, pitch: -10, target: imageFiles[index + 1], text: "straight" });
        }

        let proxyUrl = remoteRes[img];
        // Only use local Vite dev server proxy in DEV mode. In PROD (Firebase), use full S3 URL.
        if (import.meta.env.DEV && proxyUrl && proxyUrl.startsWith('https://c2c-files-bucket.s3.eu-north-1.amazonaws.com/estate/3d_file/')) {
          proxyUrl = proxyUrl.replace(
            'https://c2c-files-bucket.s3.eu-north-1.amazonaws.com/estate/3d_file/',
            '/proxy-image/'
          );
        }

        console.log(`[View360] Image: ${img} -> URL: ${proxyUrl}`);

        return {
          name: img,
          url: proxyUrl || null,
          yaw: anglesRes[img]?.yaw ?? 180,
          pitch: anglesRes[img]?.pitch ?? 10,
          hotspots
        };
      });

      console.log(`[View360] Total 360 images parsed: ${parsedImages.length}`);
      setImages(parsedImages);
    } catch (e) { 
      console.error("[View360 Error] Failed to fetch 360 images config:", e); 
    } finally { 
      setLoading(false); 
    }
  }, []);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  if (loading) return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
    </div>
  );
  if (!images.length) return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center text-neutral-500">
      <p>No 360 images found. Ensure JSON files are in public/data/</p>
      <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-white/10 rounded-full text-white">Back to Home</button>
    </div>
  );

  const currentImageObj = images[currentIndex];
  const currentImageName = currentImageObj.name;
  const activeHotspots = currentImageObj.hotspots ?? [];

  const goTo = (name) => {
    const idx = images.findIndex(i => i.name === name);
    if (idx !== -1) { setCurrentIndex(idx); setCurrentView(null); }
  };

  return (
    <main className="w-screen h-screen bg-black relative overflow-hidden">
      {/* ── TOP BAR ── */}
      <div className="absolute top-0 left-0 right-0 z-50 px-4 py-3 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-4">
          <span className="text-white font-bold text-base pointer-events-none">Street View</span>
          <button 
            onClick={() => navigate('/')}
            className="pointer-events-auto flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 transition-all active:scale-95"
          >
            <Home className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-semibold">Home</span>
          </button>
        </div>
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Gallery button (commented out as requested) */}
          {/* <button className="...">...</button> */}
          <span className="text-white/80 text-xs bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            {currentImageName} · {currentIndex + 1}/{images.length}
          </span>
        </div>
      </div>

      {/* ── 360 VIEWER ── */}
      <div className="w-full h-full">
        <PanoramaViewer
          key={currentImageName}
          imagePath={currentImageObj.url}
          initialYaw={currentImageObj.yaw}
          initialPitch={currentImageObj.pitch}
          initialHfov={currentImageObj.hfov || 110}
          onViewChange={setCurrentView}
          hotspots={activeHotspots}
          onHotspotClick={goTo}
          editMode={false}
        />
      </div>
    </main>
  );
}
