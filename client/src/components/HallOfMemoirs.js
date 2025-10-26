import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HallOfMemoirs = () => {
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Sample photo data - in a real app, these would come from Google Drive or a database
  const photos = [
    {
      id: 1,
      title: "First Adventure Together",
      date: "2023-01-15",
      description: "Remember when we went on that amazing road trip? The sunset was absolutely breathtaking!",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      driveUrl: "https://drive.google.com/drive/folders/example1"
    },
    {
      id: 2,
      title: "Birthday Celebration",
      date: "2023-03-22",
      description: "Your surprise birthday party was so much fun! Everyone had an amazing time celebrating you.",
      imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop",
      driveUrl: "https://drive.google.com/drive/folders/example2"
    },
    {
      id: 3,
      title: "Coffee Shop Memories",
      date: "2023-05-10",
      description: "Our weekly coffee dates became the highlight of my week. So many deep conversations!",
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
      driveUrl: "https://drive.google.com/drive/folders/example3"
    },
    {
      id: 4,
      title: "Beach Day Fun",
      date: "2023-07-08",
      description: "That perfect summer day at the beach - building sandcastles and watching the waves.",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      driveUrl: "https://drive.google.com/drive/folders/example4"
    },
    {
      id: 5,
      title: "Movie Night",
      date: "2023-09-14",
      description: "Our epic movie marathon with popcorn and blankets. You always pick the best films!",
      imageUrl: "https://images.unsplash.com/photo-1489599809000-0b0b0b0b0b0b?w=400&h=300&fit=crop",
      driveUrl: "https://drive.google.com/drive/folders/example5"
    },
    {
      id: 6,
      title: "Holiday Magic",
      date: "2023-12-25",
      description: "Christmas morning surprise! Your reaction was absolutely priceless and made my day.",
      imageUrl: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop",
      driveUrl: "https://drive.google.com/drive/folders/example6"
    }
  ];

  const openPhoto = (photo) => {
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(photos.findIndex(p => p.id === photo.id));
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % photos.length;
    setCurrentPhotoIndex(nextIndex);
    setSelectedPhoto(photos[nextIndex]);
  };

  const prevPhoto = () => {
    const prevIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    setCurrentPhotoIndex(prevIndex);
    setSelectedPhoto(photos[prevIndex]);
  };

  const openInDrive = (driveUrl) => {
    window.open(driveUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pixel-pink to-pixel-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
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
            📸 HALL OF MEMOIRS 📸
          </h1>
          <p className="font-pixel-alt text-lg md:text-xl text-pixel-pink">
            Our precious memories in a beautiful 3x3 polaroid grid
          </p>
        </motion.div>

        {/* Polaroid Gallery - 3x3 Grid */}
        <div className="relative min-h-screen bg-pixel-lilac bg-opacity-10 rounded-2xl p-8">
          {/* 3x3 Grid Layout */}
          <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
            {photos.map((photo, index) => {
              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: -50, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1"
                  onClick={() => openPhoto(photo)}
                >
                  {/* Polaroid Photo */}
                  <div className="relative w-full h-64 bg-pixel-white rounded-lg shadow-2xl p-3">
                    {/* Photo */}
                    <div className="w-full h-3/4 bg-pixel-lilac rounded overflow-hidden mb-3">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Polaroid Label */}
                    <div className="bg-pixel-white p-2">
                      <h3 className="font-pixel text-xs text-pixel-hot-pink mb-1 leading-tight">
                        {photo.title}
                      </h3>
                      <p className="font-pixel-alt text-xs text-pixel-pink">
                        {new Date(photo.date).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 bg-pixel-lilac bg-opacity-0 rounded-lg flex items-center justify-center"
                      whileHover={{ backgroundColor: 'rgba(231, 211, 255, 0.1)' }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-3xl">👀</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View All Memories Button */}
          <div className="text-center mt-12">
            <motion.button
              onClick={() => window.open('https://drive.google.com/drive/u/2/folders/1MnzqcJoQTTQNgEUonmWVrQngt8V1XJ5j', '_blank')}
              className="bg-gradient-to-r from-pixel-hot-pink to-pixel-lilac text-pixel-white font-pixel px-8 py-4 rounded-2xl text-lg shadow-2xl hover:from-pixel-lilac hover:to-pixel-peach transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              📸 View All Memories in Google Drive 📸
            </motion.button>
            <p className="font-pixel-alt text-pixel-pink mt-4 text-sm">
              Click to see all our precious memories in full resolution!
            </p>
          </div>

          {/* Bottom spacing */}
          <div className="h-16"></div>
        </div>

        {/* Photo Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
              onClick={closePhoto}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-pixel-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mb-4">
                  <motion.button
                    onClick={prevPhoto}
                    className="bg-pixel-hot-pink text-pixel-white font-pixel px-4 py-2 rounded-lg hover:bg-pixel-lilac transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ← Previous
                  </motion.button>
                  
                  <button
                    onClick={closePhoto}
                    className="bg-pixel-pink text-pixel-white font-pixel px-4 py-2 rounded-lg hover:bg-pixel-lilac transition-colors duration-300"
                  >
                    ✕ Close
                  </button>
                  
                  <motion.button
                    onClick={nextPhoto}
                    className="bg-pixel-hot-pink text-pixel-white font-pixel px-4 py-2 rounded-lg hover:bg-pixel-lilac transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next →
                  </motion.button>
                </div>

                {/* Photo Content */}
                <div className="text-center">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    className="w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-6"
                  />
                  
                  <h2 className="font-pixel text-2xl text-pixel-hot-pink mb-2">
                    {selectedPhoto.title}
                  </h2>
                  
                  <p className="font-pixel-alt text-pixel-pink mb-4">
                    {selectedPhoto.date}
                  </p>
                  
                  <p className="font-pixel-alt text-lg text-pixel-pink mb-6 leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                  
                  <motion.button
                    onClick={() => openInDrive(selectedPhoto.driveUrl)}
                    className="bg-pixel-lilac text-pixel-white font-pixel px-6 py-3 rounded-lg hover:bg-pixel-hot-pink transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    📁 View Full Album in Google Drive
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
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
            {['📸', '💖', '✨', '🎈', '🎊', '🎂', '🎁', '📷'][i % 8]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HallOfMemoirs;
