import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = [
  "https://picsum.photos/800/400?random=1",
  "https://picsum.photos/800/400?random=2",
  "https://picsum.photos/800/400?random=3",
];

const PhotoCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
  const prev = () => setCurrent((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full border-2 border-retro-green p-1 bg-retro-bg group">
       <div className="absolute top-0 left-0 bg-retro-green text-retro-bg px-2 py-0.5 text-xs font-bold z-10">
         IMG_VIEWER_v1.0
       </div>
      <div className="relative h-64 md:h-80 overflow-hidden bg-retro-grid">
        <img 
          src={IMAGES[current]} 
          alt={`Slide ${current}`} 
          className="w-full h-full object-cover opacity-80 filter sepia-[0.5] hue-rotate-[50deg] contrast-125 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-retro-bg to-transparent opacity-60"></div>
      </div>
      
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-retro-bg/80 p-2 text-retro-green border border-retro-green hover:bg-retro-green hover:text-retro-bg transition-colors">
        <ChevronLeft size={20} />
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-retro-bg/80 p-2 text-retro-green border border-retro-green hover:bg-retro-green hover:text-retro-bg transition-colors">
        <ChevronRight size={20} />
      </button>

      <div className="flex justify-center gap-2 p-2 bg-retro-bg border-t border-retro-green">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 border ${current === idx ? 'bg-retro-green border-retro-green' : 'border-retro-green/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoCarousel;