"use client";

import { useState } from "react";
import { motion, type PanInfo, useAnimation } from "framer-motion";
import LoginForm from "./LoginForm";

export default function LampLogin() {
  const [isLightOn, setIsLightOn] = useState(false);
  const cordControls = useAnimation();

  const handleDragEnd = async (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.y > 80) {
      await cordControls.start({ y: -50, opacity: 0, transition: { duration: 0.2 } });
      setIsLightOn(true);
      return;
    }

    cordControls.start({
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 10, mass: 0.8 },
    });
  };

  return (
    <div className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden transition-colors duration-1000 ${isLightOn ? "bg-zinc-950" : "bg-zinc-900"}`}>
      <div className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 flex-col items-center">
        <svg
          width="160"
          height="140"
          viewBox="0 0 160 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none drop-shadow-2xl"
          aria-hidden="true"
        >
          <path d="M80 0V20" stroke="#3F3F46" strokeWidth="4" />
          <path d="M70 20H90V35H70V20Z" fill="#27272A" />
          <path d="M40 100C40 60 60 35 80 35C100 35 120 60 120 100H40Z" fill="#18181B" />
          <path d="M35 100H125V105H35V100Z" fill="#3F3F46" />
          <motion.circle
            cx="80"
            cy="110"
            r="12"
            fill={isLightOn ? "#FEF08A" : "#52525B"}
            animate={{
              filter: isLightOn
                ? "drop-shadow(0px 0px 30px rgba(254, 240, 138, 0.9))"
                : "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
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
            className="absolute top-[120px] z-50 flex cursor-grab flex-col items-center px-12 py-4 active:cursor-grabbing"
          >
            <div className="pointer-events-none h-32 w-1 bg-zinc-600" />
            <div className="pointer-events-none mt-[-2px] flex h-6 w-4 items-center justify-center rounded-sm bg-zinc-400 shadow-md">
              <div className="h-2 w-2 rounded-full bg-zinc-500" />
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="pointer-events-none absolute top-[100%] mt-4 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400"
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
          className="relative z-10 mt-24 w-full max-w-sm px-4"
        >
          <LoginForm />
        </motion.div>
      )}
    </div>
  );
}
