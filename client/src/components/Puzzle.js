import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Puzzle = () => {
  const [puzzlePieces, setPuzzlePieces] = useState([]);
  const [solvedPieces, setSolvedPieces] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [draggedPiece, setDraggedPiece] = useState(null);

  // Create puzzle pieces with a secret message
  useEffect(() => {
    const message = "Happy Birthday Soumili! You are amazing and deserve all the happiness in the world!";
    const pieces = message.split('').map((char, index) => ({
      id: index,
      char: char,
      x: Math.random() * 300,
      y: Math.random() * 200 + 100,
      targetX: (index % 10) * 30 + 50,
      targetY: Math.floor(index / 10) * 40 + 50,
      isPlaced: false
    }));
    setPuzzlePieces(pieces);
  }, []);

  const handleDragStart = (e, piece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (!draggedPiece) return;

    const targetPiece = puzzlePieces[targetIndex];
    const distance = Math.sqrt(
      Math.pow(draggedPiece.x - targetPiece.targetX, 2) + 
      Math.pow(draggedPiece.y - targetPiece.targetY, 2)
    );

    if (distance < 50) {
      // Piece is close enough to target position
      const updatedPieces = puzzlePieces.map(piece => 
        piece.id === draggedPiece.id 
          ? { ...piece, x: targetPiece.targetX, y: targetPiece.targetY, isPlaced: true }
          : piece
      );
      setPuzzlePieces(updatedPieces);
      setSolvedPieces([...solvedPieces, draggedPiece.id]);
    }
    setDraggedPiece(null);
  };

  // Check if puzzle is solved
  useEffect(() => {
    if (solvedPieces.length === puzzlePieces.length && puzzlePieces.length > 0) {
      setIsSolved(true);
    }
  }, [solvedPieces, puzzlePieces]);

  const scrollToSurprises = () => {
    const surpriseSection = document.getElementById('surprise-gateway');
    if (surpriseSection) {
      surpriseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="puzzle-section" className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-pixel text-3xl md:text-5xl text-pixel-hot-pink mb-4">
          🧩 MYSTERY PUZZLE 🧩
        </h2>
        <p className="font-pixel-alt text-lg md:text-xl text-pixel-pink">
          Solve this puzzle to reveal your first birthday surprise!
        </p>
      </motion.div>

      <div className="relative">
        {/* Puzzle Board */}
        <div className="bg-pixel-white border-4 border-pixel-hot-pink rounded-lg p-8 shadow-2xl mb-8">
          <div className="grid grid-cols-10 gap-1 min-h-[200px] w-[300px]">
            {puzzlePieces.map((piece, index) => (
              <div
                key={index}
                className="w-6 h-8 border border-pixel-pink bg-pixel-lilac flex items-center justify-center text-xs font-pixel-alt"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                {piece.isPlaced ? piece.char : ''}
              </div>
            ))}
          </div>
        </div>

        {/* Puzzle Pieces */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl">
          {puzzlePieces.map((piece) => (
            <motion.div
              key={piece.id}
              draggable={!piece.isPlaced}
              onDragStart={(e) => handleDragStart(e, piece)}
              className={`w-8 h-10 border-2 border-pixel-hot-pink bg-pixel-peach flex items-center justify-center text-sm font-pixel-alt cursor-move select-none ${
                piece.isPlaced ? 'opacity-50' : 'hover:scale-110'
              }`}
              style={{
                position: piece.isPlaced ? 'static' : 'absolute',
                left: piece.isPlaced ? 'auto' : piece.x,
                top: piece.isPlaced ? 'auto' : piece.y,
              }}
              whileHover={!piece.isPlaced ? { scale: 1.1 } : {}}
              whileTap={!piece.isPlaced ? { scale: 0.95 } : {}}
            >
              {piece.char}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {isSolved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center mt-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-pixel-white border-4 border-pixel-hot-pink rounded-lg p-6 shadow-2xl"
            >
              <h3 className="font-pixel text-2xl text-pixel-hot-pink mb-4">
                🎊 PUZZLE SOLVED! 🎊
              </h3>
              <p className="font-pixel-alt text-lg text-pixel-pink mb-4">
                Happy Birthday Soumili! You are amazing and deserve all the happiness in the world!
              </p>
              <motion.button
                onClick={scrollToSurprises}
                className="bg-pixel-hot-pink text-pixel-white font-pixel px-6 py-3 rounded-lg hover:bg-pixel-lilac transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue to Surprises →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pixel-lilac text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✨
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Puzzle;
