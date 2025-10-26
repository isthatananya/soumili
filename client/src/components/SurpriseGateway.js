import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SurpriseGateway = () => {
  const navigate = useNavigate();
  const [hoveredBox, setHoveredBox] = useState(null);

  const surprises = [
    {
      id: 'memoirs',
      title: '📸 Hall of Memoirs',
      description: 'Relive our precious memories together',
      emoji: '📸',
      color: 'from-pixel-pink to-pixel-lilac',
      route: '/memoirs'
    },
    {
      id: 'candy',
      title: '🍬 Candy Memory Machine',
      description: 'Generate sweet memories like fortune cookies',
      emoji: '🍬',
      color: 'from-pixel-lilac to-pixel-peach',
      route: '/candy'
    },
    {
      id: 'egghunt',
      title: '🐣 Easter Egg Hunt',
      description: 'Explore the pixel world and find hidden treasures',
      emoji: '🐣',
      color: 'from-pixel-peach to-pixel-hot-pink',
      route: '/egghunt'
    }
  ];

  const handleBoxClick = (route) => {
    navigate(route);
  };

  return (
    <section id="surprise-gateway" className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-pixel text-3xl md:text-5xl text-pixel-hot-pink mb-4">
          🎁 THE TRIPLE SURPRISE GATEWAY 🎁
        </h2>
        <p className="font-pixel-alt text-lg md:text-xl text-pixel-pink">
          Choose your adventure! Each box holds a special surprise just for you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {surprises.map((surprise, index) => (
          <motion.div
            key={surprise.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div
              className={`relative bg-gradient-to-br ${surprise.color} p-8 rounded-2xl border-4 border-pixel-white shadow-2xl cursor-pointer transform transition-all duration-300 ${
                hoveredBox === surprise.id ? 'scale-105' : 'scale-100'
              }`}
              onClick={() => handleBoxClick(surprise.route)}
              onHoverStart={() => setHoveredBox(surprise.id)}
              onHoverEnd={() => setHoveredBox(null)}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Box Decoration */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-pixel-white border-2 border-pixel-hot-pink rounded-full flex items-center justify-center">
                <span className="text-pixel-hot-pink text-lg">{surprise.emoji}</span>
              </div>

              {/* Main Content */}
              <div className="text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={hoveredBox === surprise.id ? {
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {surprise.emoji}
                </motion.div>
                
                <h3 className="font-pixel text-xl md:text-2xl text-pixel-white mb-4">
                  {surprise.title}
                </h3>
                
                <p className="font-pixel-alt text-sm md:text-base text-pixel-white opacity-90 mb-6">
                  {surprise.description}
                </p>

                <motion.button
                  className="bg-pixel-white text-pixel-hot-pink font-pixel px-6 py-3 rounded-lg hover:bg-pixel-lilac hover:text-pixel-white transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Open Surprise
                </motion.button>
              </div>

              {/* Pixel Border Effect */}
              <div className="absolute inset-0 border-2 border-pixel-white rounded-2xl opacity-50"></div>
              <div className="absolute inset-2 border border-pixel-white rounded-xl opacity-30"></div>
            </motion.div>

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-pixel-white rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-16 w-full max-w-2xl"
      >
        <div className="bg-pixel-white border-4 border-pixel-hot-pink rounded-2xl p-8 shadow-2xl">
          <h3 className="font-pixel text-2xl text-pixel-hot-pink mb-4 text-center">
            💌 Leave a Birthday Message 💌
          </h3>
          <p className="font-pixel-alt text-pixel-pink mb-6 text-center">
            Share your birthday wishes and they'll appear on the message board!
          </p>
          <motion.button
            onClick={() => navigate('/messages')}
            className="w-full bg-pixel-hot-pink text-pixel-white font-pixel px-6 py-4 rounded-lg hover:bg-pixel-lilac transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Write a Message ✨
          </motion.button>
        </div>
      </motion.div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pixel-lilac text-2xl"
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
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['💖', '✨', '🎈', '🎊'][i % 4]}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SurpriseGateway;
