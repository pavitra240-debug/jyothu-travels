import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { IMAGES } from '../config/images';

export default function CornerLogo() {
  const location = useLocation();
  const { scrollY } = useScroll();
  
  // Transform values for sliding into the corner (up and left) as user scrolls down
  // At scroll 0: x is 0, y is 0 (fully visible)
  // At scroll 300+: x is -40%, y is -40% (partially hidden in the corner)
  const xOffset = useTransform(scrollY, [0, 300], ['0%', '-40%']);
  const yOffset = useTransform(scrollY, [0, 300], ['0%', '-40%']);
  const scaleValue = useTransform(scrollY, [0, 300], [1, 0.7]);
  const blurValue = useTransform(scrollY, [0, 300], ['blur(0px)', 'blur(2px)']);

  if (location.pathname !== '/') {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-40 pointer-events-none p-4 md:p-8"
      style={{ x: xOffset, y: yOffset, scale: scaleValue, filter: blurValue }}
    >
      <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden bg-black/60 backdrop-blur-xl border-2 border-primary/30 shadow-[0_0_50px_rgba(108,99,255,0.6)] group">
        
        {/* Revolving Shining Outline effect */}
        <div className="absolute inset-[-50%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(108,99,255,0.6)_360deg)] opacity-70" />
        <div className="absolute inset-[3px] rounded-full bg-black flex items-center justify-center p-3 z-10">
          
          {/* Logo Image with dark theme invert */}
          <img
            src={IMAGES.logo}
            alt="Jyothu Travels and Tourism"
            className="w-full h-full object-contain rounded-full invert brightness-[1.5] contrast-125 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
          
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(108,99,255,0.4)] mix-blend-screen pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}
