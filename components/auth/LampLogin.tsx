"use client";

import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import LoginForm from './LoginForm';

export default function LampLogin() {
  const [isLightOn, setIsLightOn] = useState(false);
  const cordControls = useAnimation();

  const handleDragEnd = async (event: any, info: any) => {
    if (info.offset.y > 80) {
      await cordControls.start({ y: -50, opacity: 0, transition: { duration: 0.2 } });
      setIsLightOn(true);
    } else {
      cordControls.start({ y: 0, transition: { type: "spring", stiffness: 300, damping: 10, mass: 0.8 } });
    }
  };

  return (
    <div className={`relative min-h-screen w-full flex flex-col items-center justify-center transition-colors duration-1000 overflow-hidden ${isLightOn ? 'bg-zinc-950' : 'bg-zinc-900'}`}>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-20">
        <svg 
          width="160" 
          height="140" 
          viewBox="0 0 160 140" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-2xl pointer-events-none"
        >
          <path d="M80 0V20" stroke="#3F3F46" strokeWidth="4"/>
          <path d="M70 20H90V35H70V20Z" fill="#27272A"/>
          <path d="M40 100C40 60 60 35 80 35C100 35 120 60 120 100H40Z" fill="#18181B"/>
          <path d="M35 100H125V105H35V100Z" fill="#3F3F46"/>
          
          <motion.circle 
            cx="80" 
            cy="110" 
            r="12" 
            fill={isLightOn ? "#FEF08A" : "#52525B"}
            animate={{
              filter: isLightOn ? "drop-shadow(0px 0px 30px rgba(254, 240, 138, 0.9))" : "drop-shadow(0px 0px 0px rgba(0,0,0,0))"
            }}
            transition={{ duration: 0.5 }}
          />
        </svg>

        {!isLightOn && (
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 120 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            animate={cordControls}
            style={{ touchAction: "none" }}
            className="absolute top-[120px] flex flex-col items-center cursor-grab active:cursor-grabbing z-50 px-12 py-4"
          >
            <div className="w-1 h-32 bg-zinc-600 pointer-events-none"></div>
            <div className="w-4 h-6 bg-zinc-400 rounded-sm mt-[-2px] shadow-md flex items-center justify-center pointer-events-none">
              <div className="w-2 h-2 bg-zinc-500 rounded-full"></div>
            </div>
            
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="absolute top-[100%] mt-4 text-zinc-400 text-[10px] font-bold tracking-[0.2em] uppercase whitespace-nowrap pointer-events-none"
            >
              Pull down
            </motion.div>
          </motion.div>
        )}
      </div>

      {isLightOn && (
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-full max-w-sm px-4 mt-24 z-10 relative"
        >
          <LoginForm />
        </motion.div>
      )}
      
    </div>
  );
}