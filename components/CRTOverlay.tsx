import React from 'react';

const CRTOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden h-full w-full">
      {/* Scanline moving bar */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-retro-green/5 to-transparent h-[10%] w-full animate-scanline opacity-20"></div>
      
      {/* Static lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]"></div>
    </div>
  );
};

export default CRTOverlay;