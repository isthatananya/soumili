import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const EasterEggHunt = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [foundEggs, setFoundEggs] = useState([]);
  const [eggs, setEggs] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('easterEggHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  // Generate random eggs
  const generateEggs = () => {
    const newEggs = [];
    for (let i = 0; i < 15; i++) {
      newEggs.push({
        id: i,
        x: Math.random() * 80 + 10, // 10% to 90% of screen width
        y: Math.random() * 60 + 20, // 20% to 80% of screen height
        found: false,
        points: Math.floor(Math.random() * 20) + 10, // 10-30 points
        emoji: ['🥚', '🐣', '🐰', '🌸', '🌺', '🦋', '🌼', '🌷'][Math.floor(Math.random() * 8)]
      });
    }
    setEggs(newEggs);
  };

  // Start game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(60);
    setFoundEggs([]);
    generateEggs();
  };

  // Timer countdown
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      endGame();
    }
  }, [gameStarted, timeLeft, gameOver, endGame]);

  // End game
  const endGame = useCallback(() => {
    setGameOver(true);
    setGameStarted(false);
    
    // Check for new high score
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('easterEggHighScore', score.toString());
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [score, highScore]);

  // Find egg
  const findEgg = (eggId) => {
    if (gameOver || !gameStarted) return;
    
    const egg = eggs.find(e => e.id === eggId);
    if (egg && !egg.found) {
      setScore(score + egg.points);
      setFoundEggs([...foundEggs, eggId]);
      
      // Update eggs array
      setEggs(eggs.map(e => 
        e.id === eggId ? { ...e, found: true } : e
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pixel-pink to-pixel-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => navigate('/')}
            className="font-pixel text-pixel-hot-pink hover:text-pixel-lilac transition-colors duration-300 mb-4"
          >
            ← Back to Surprises
          </button>
          <h1 className="font-pixel text-4xl md:text-6xl text-pixel-hot-pink mb-4">
            🐣 EASTER EGG HUNT 🐣
          </h1>
          <p className="font-pixel-alt text-lg md:text-xl text-pixel-pink">
            Explore the pixel world and find hidden treasures! Click on the eggs to collect them.
          </p>
        </motion.div>

        {/* Game Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-pixel-white border-4 border-pixel-hot-pink rounded-lg p-4 text-center">
            <h3 className="font-pixel text-lg text-pixel-hot-pink mb-2">Score</h3>
            <p className="font-pixel-alt text-2xl text-pixel-pink">{score}</p>
          </div>
          <div className="bg-pixel-white border-4 border-pixel-lilac rounded-lg p-4 text-center">
            <h3 className="font-pixel text-lg text-pixel-hot-pink mb-2">Time Left</h3>
            <p className="font-pixel-alt text-2xl text-pixel-pink">{timeLeft}s</p>
          </div>
          <div className="bg-pixel-white border-4 border-pixel-peach rounded-lg p-4 text-center">
            <h3 className="font-pixel text-lg text-pixel-hot-pink mb-2">High Score</h3>
            <p className="font-pixel-alt text-2xl text-pixel-pink">{highScore}</p>
          </div>
        </div>

        {/* Game Area */}
        <div className="relative bg-pixel-white border-4 border-pixel-hot-pink rounded-2xl p-8 shadow-2xl min-h-[500px] mb-8">
          {!gameStarted && !gameOver && (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="text-8xl mb-6">🐰</div>
              <h2 className="font-pixel text-3xl text-pixel-hot-pink mb-4">
                Ready to Hunt?
              </h2>
              <p className="font-pixel-alt text-lg text-pixel-pink mb-6 text-center">
                Find as many eggs as you can in 60 seconds!<br/>
                Each egg is worth different points.
              </p>
              <motion.button
                onClick={startGame}
                className="bg-pixel-hot-pink text-pixel-white font-pixel px-8 py-4 rounded-lg text-xl hover:bg-pixel-lilac transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Hunt! 🎮
              </motion.button>
            </div>
          )}

          {gameStarted && !gameOver && (
            <div className="relative w-full h-96">
              {/* Game World Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-pixel-lilac to-pixel-peach rounded-lg opacity-20"></div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 text-2xl">🌺</div>
              <div className="absolute top-8 right-8 text-2xl">🌸</div>
              <div className="absolute bottom-4 left-8 text-2xl">🌼</div>
              <div className="absolute bottom-8 right-4 text-2xl">🌷</div>
              <div className="absolute top-1/2 left-1/4 text-2xl">🦋</div>
              <div className="absolute top-1/3 right-1/3 text-2xl">🌿</div>
              
              {/* Easter Eggs */}
              {eggs.map((egg) => (
                <motion.div
                  key={egg.id}
                  className={`absolute cursor-pointer text-3xl ${egg.found ? 'opacity-0' : 'opacity-100'}`}
                  style={{
                    left: `${egg.x}%`,
                    top: `${egg.y}%`,
                  }}
                  onClick={() => findEgg(egg.id)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  animate={!egg.found ? {
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: egg.id * 0.1
                  }}
                >
                  {egg.emoji}
                </motion.div>
              ))}
            </div>
          )}

          {gameOver && (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="text-8xl mb-6">🎉</div>
              <h2 className="font-pixel text-3xl text-pixel-hot-pink mb-4">
                Game Over!
              </h2>
              <p className="font-pixel-alt text-lg text-pixel-pink mb-6 text-center">
                Final Score: {score} points<br/>
                Eggs Found: {foundEggs.length} / {eggs.length}
              </p>
              {score === highScore && score > 0 && (
                <p className="font-pixel text-xl text-pixel-hot-pink mb-4">
                  🏆 NEW HIGH SCORE! 🏆
                </p>
              )}
              <motion.button
                onClick={startGame}
                className="bg-pixel-hot-pink text-pixel-white font-pixel px-8 py-4 rounded-lg text-xl hover:bg-pixel-lilac transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again! 🎮
              </motion.button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-pixel-white border-4 border-pixel-lilac rounded-2xl p-6 shadow-2xl">
          <h3 className="font-pixel text-xl text-pixel-hot-pink mb-4 text-center">
            🎮 How to Play 🎮
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-pixel-alt text-pixel-pink mb-2">Objective:</h4>
              <p className="font-pixel-alt text-sm text-pixel-pink">
                Find as many hidden eggs as possible in 60 seconds!
              </p>
            </div>
            <div>
              <h4 className="font-pixel-alt text-pixel-pink mb-2">Scoring:</h4>
              <p className="font-pixel-alt text-sm text-pixel-pink">
                Each egg is worth 10-30 points. Try to beat your high score!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-8xl"
            >
              🏆
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pixel-lilac text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['🐣', '🐰', '🌸', '🌺', '🦋', '🌼', '🌷', '🥚', '✨', '💖', '🎈', '🎊'][i % 12]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EasterEggHunt;
