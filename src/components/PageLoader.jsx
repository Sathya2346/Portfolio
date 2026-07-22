import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 150);
          return 100;
        }
        const step = Math.floor(Math.random() * 20) + 10;
        return Math.min(prev + step, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex flex-col justify-between p-10 bg-black-pure text-white"
          exit={{ y: "-100%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Top text */}
          <div className="flex justify-between items-center w-full">
            <span className="font-outfit text-xs tracking-widest text-primary font-bold uppercase">
              Sathya Ganesan
            </span>
            <span className="font-inter text-xs text-dark-gray">
              Developer Portfolio ©2026
            </span>
          </div>

          {/* Middle text - Name with staggered glow */}
          <div className="flex flex-col items-start max-w-4xl">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-outfit uppercase tracking-tight text-white mb-2 leading-none"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              CREATIVE
            </motion.h1>
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-outfit uppercase tracking-tight text-primary leading-none"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              DEVELOPER
            </motion.h1>
          </div>

          {/* Bottom progress bar */}
          <div className="flex flex-col md:flex-row justify-between items-end md:items-center w-full gap-4">
            <div className="flex items-center gap-4">
              <span className="font-outfit text-7xl md:text-9xl font-bold leading-none text-white/95">
                {progress}%
              </span>
            </div>
            <div className="w-full md:w-80 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
