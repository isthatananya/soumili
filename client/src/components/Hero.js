import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [showTypewriter, setShowTypewriter] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  useEffect(() => {
    // Start typewriter animation after component mounts
    const timer1 = setTimeout(() => setShowTypewriter(true), 500);
    const timer2 = setTimeout(() => setShowScrollArrow(true), 4000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const scrollToNext = () => {
    const puzzleSection = document.getElementById('puzzle-section');
    if (puzzleSection) {
      puzzleSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pixel-hot-pink text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            💖
          </motion.div>
        ))}
        
        {/* Floating Stars */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pixel-lilac text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.div>
        ))}
        
        {/* Floating Balloons */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            🎈
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Birthday Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="font-pixel text-4xl md:text-6xl lg:text-8xl text-pixel-hot-pink mb-4 drop-shadow-lg">
            🎉 HAPPY BIRTHDAY! 🎉
          </h1>
          
          {showTypewriter && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'easeInOut' }}
              className="overflow-hidden whitespace-nowrap mx-auto"
            >
              <h2 className="font-pixel-alt text-2xl md:text-4xl text-pixel-pink">
                Welcome to your pixelated surprise adventure!
              </h2>
            </motion.div>
          )}
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex justify-center space-x-4 mb-8"
        >
          {['🎂', '🎁', '🎊', '🎈', '🍰'].map((emoji, index) => (
            <motion.span
              key={emoji}
              className="text-4xl"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll Arrow */}
        {showScrollArrow && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={scrollToNext}
            className="group flex flex-col items-center space-y-2 text-pixel-hot-pink hover:text-pixel-lilac transition-colors duration-300"
          >
            <span className="font-pixel-alt text-lg">Scroll to Begin the Adventure</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-3xl"
            >
              ⬇️
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* Pixel Border Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pixel-hot-pink via-pixel-lilac to-pixel-peach"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-pixel-peach via-pixel-lilac to-pixel-hot-pink"></div>
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-pixel-hot-pink via-pixel-lilac to-pixel-peach"></div>
        <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-pixel-peach via-pixel-lilac to-pixel-hot-pink"></div>
      </div>
    </section>
  );
};

export default Hero;
