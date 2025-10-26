import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CandyMemoryMachine = () => {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentCandy, setCurrentCandy] = useState(null);
  const [openedCandies, setOpenedCandies] = useState([]);
  const [showCandy, setShowCandy] = useState(false);

  const candyMemories = [
    {
      id: 1,
      candy: '🍭',
      color: 'from-pixel-pink to-pixel-lilac',
      memory: "Remember when we stayed up all night talking about our dreams? That was the night I realized how amazing you are!",
      title: "Sweet Dreams"
    },
    {
      id: 2,
      candy: '🍬',
      color: 'from-pixel-lilac to-pixel-peach',
      memory: "The time you surprised me with my favorite coffee when I was having a rough day. Your thoughtfulness always brightens my world!",
      title: "Sweet Surprise"
    },
    {
      id: 3,
      candy: '🍫',
      color: 'from-pixel-peach to-pixel-hot-pink',
      memory: "Our first adventure together - getting lost in the city but finding the most amazing little café. Best 'mistake' ever!",
      title: "Sweet Adventure"
    },
    {
      id: 4,
      candy: '🍪',
      color: 'from-pixel-hot-pink to-pixel-pink',
      memory: "When you taught me how to bake cookies and we ended up with flour everywhere. Your laugh made it all worth it!",
      title: "Sweet Baking"
    },
    {
      id: 5,
      candy: '🍰',
      color: 'from-pixel-pink to-pixel-lilac',
      memory: "That time we shared a slice of cake and talked about everything and nothing. Perfect moments with you are my favorite!",
      title: "Sweet Moments"
    },
    {
      id: 6,
      candy: '🍩',
      color: 'from-pixel-lilac to-pixel-peach',
      memory: "Our donut run at 2 AM because we both had a craving. Spontaneous adventures with you are the best!",
      title: "Sweet Cravings"
    },
    {
      id: 7,
      candy: '🍯',
      color: 'from-pixel-peach to-pixel-hot-pink',
      memory: "When you comforted me during a tough time with just your presence and a warm hug. You have the sweetest heart!",
      title: "Sweet Comfort"
    },
    {
      id: 8,
      candy: '🍓',
      color: 'from-pixel-hot-pink to-pixel-pink',
      memory: "Our picnic in the park with fresh strawberries. Simple moments with you feel like magic!",
      title: "Sweet Picnic"
    }
  ];

  const generateCandy = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setShowCandy(false);
    
    // Simulate candy generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get a random candy that hasn't been opened yet
    const availableCandies = candyMemories.filter(candy => 
      !openedCandies.some(opened => opened.id === candy.id)
    );
    
    if (availableCandies.length === 0) {
      // All candies have been opened, reset
      setOpenedCandies([]);
      const randomCandy = candyMemories[Math.floor(Math.random() * candyMemories.length)];
      setCurrentCandy(randomCandy);
    } else {
      const randomCandy = availableCandies[Math.floor(Math.random() * availableCandies.length)];
      setCurrentCandy(randomCandy);
    }
    
    setIsGenerating(false);
    setShowCandy(true);
  };

  const openCandy = () => {
    if (currentCandy && !openedCandies.some(candy => candy.id === currentCandy.id)) {
      setOpenedCandies([...openedCandies, currentCandy]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pixel-pink to-pixel-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <button
            onClick={() => navigate('/')}
            className="font-pixel text-pixel-hot-pink hover:text-pixel-lilac transition-colors duration-300 mb-4"
          >
            ← Back to Surprises
          </button>
          <h1 className="font-pixel text-4xl md:text-6xl text-pixel-hot-pink mb-4">
            🍬 CANDY MEMORY MACHINE 🍬
          </h1>
          <p className="font-pixel-alt text-lg md:text-xl text-pixel-pink">
            Click to generate a sweet memory! Each candy holds a precious moment we shared.
          </p>
        </motion.div>

        {/* Machine Interface */}
        <div className="text-center mb-12">
          <motion.div
            className="bg-pixel-white border-4 border-pixel-hot-pink rounded-2xl p-8 shadow-2xl mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-pixel text-2xl text-pixel-hot-pink mb-6">
              🎰 Memory Generator 🎰
            </h2>
            
            <motion.button
              onClick={generateCandy}
              disabled={isGenerating}
              className="bg-gradient-to-r from-pixel-hot-pink to-pixel-lilac text-pixel-white font-pixel px-8 py-4 rounded-lg text-xl hover:from-pixel-lilac hover:to-pixel-peach transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isGenerating ? 'Generating Candy...' : 'Generate Candy 🍭'}
            </motion.button>
            
            <p className="font-pixel-alt text-pixel-pink mt-4">
              {openedCandies.length} / {candyMemories.length} memories discovered
            </p>
          </motion.div>
        </div>

        {/* Generated Candy Display */}
        <AnimatePresence>
          {showCandy && currentCandy && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className="text-center mb-8"
            >
              <div className={`bg-gradient-to-br ${currentCandy.color} border-4 border-pixel-white rounded-2xl p-8 shadow-2xl`}>
                <motion.div
                  className="text-8xl mb-4"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentCandy.candy}
                </motion.div>
                
                <h3 className="font-pixel text-2xl text-pixel-white mb-4">
                  {currentCandy.title}
                </h3>
                
                <motion.button
                  onClick={openCandy}
                  className="bg-pixel-white text-pixel-hot-pink font-pixel px-6 py-3 rounded-lg hover:bg-pixel-lilac hover:text-pixel-white transition-colors duration-300 mb-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Open Candy! 🎁
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Opened Candy Memory */}
        <AnimatePresence>
          {currentCandy && openedCandies.some(candy => candy.id === currentCandy.id) && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-pixel-white border-4 border-pixel-lilac rounded-2xl p-8 shadow-2xl mb-8"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">✨</div>
                <h3 className="font-pixel text-2xl text-pixel-hot-pink mb-4">
                  {currentCandy.title}
                </h3>
                <p className="font-pixel-alt text-lg text-pixel-pink leading-relaxed">
                  {currentCandy.memory}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Opened Candies Collection */}
        {openedCandies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-pixel-white border-4 border-pixel-peach rounded-2xl p-6 shadow-2xl"
          >
            <h3 className="font-pixel text-xl text-pixel-hot-pink mb-4 text-center">
              🍭 Your Sweet Memory Collection 🍭
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {openedCandies.map((candy) => (
                <motion.div
                  key={candy.id}
                  className="text-center p-4 bg-pixel-lilac rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl mb-2">{candy.candy}</div>
                  <p className="font-pixel-alt text-xs text-pixel-white">{candy.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Progress Indicator */}
        <div className="mt-8 text-center">
          <div className="bg-pixel-white border-2 border-pixel-pink rounded-lg p-4 inline-block">
            <p className="font-pixel-alt text-pixel-pink">
              Progress: {openedCandies.length} / {candyMemories.length} memories found
            </p>
            <div className="w-64 bg-pixel-pink rounded-full h-4 mt-2">
              <motion.div
                className="bg-pixel-hot-pink h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(openedCandies.length / candyMemories.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pixel-lilac text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['🍭', '🍬', '🍫', '🍪', '🍰', '🍩', '🍯', '🍓', '✨', '💖'][i % 10]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CandyMemoryMachine;
