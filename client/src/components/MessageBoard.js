import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MessageBoard = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load messages from localStorage (in a real app, this would be Firebase)
  useEffect(() => {
    const savedMessages = localStorage.getItem('birthdayMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !senderName.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const message = {
      id: Date.now(),
      text: newMessage,
      sender: senderName,
      timestamp: new Date().toLocaleString(),
      likes: 0
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('birthdayMessages', JSON.stringify(updatedMessages));
    
    setNewMessage('');
    setSenderName('');
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleLike = (messageId) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('birthdayMessages', JSON.stringify(updatedMessages));
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
            💌 MESSAGE BOARD 💌
          </h1>
          <p className="font-pixel-alt text-lg md:text-xl text-pixel-pink">
            Birthday wishes from friends and family
          </p>
        </motion.div>

        {/* Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-pixel-white border-4 border-pixel-hot-pink rounded-2xl p-8 shadow-2xl mb-12"
        >
          <h2 className="font-pixel text-2xl text-pixel-hot-pink mb-6 text-center">
            Write a Birthday Message
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-pixel-alt text-pixel-pink mb-2">
                Your Name:
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full p-3 border-2 border-pixel-pink rounded-lg font-pixel-alt focus:border-pixel-hot-pink focus:outline-none"
                placeholder="Enter your name..."
                required
              />
            </div>
            
            <div>
              <label className="block font-pixel-alt text-pixel-pink mb-2">
                Your Message:
              </label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full p-3 border-2 border-pixel-pink rounded-lg font-pixel-alt focus:border-pixel-hot-pink focus:outline-none h-24 resize-none"
                placeholder="Write your birthday wishes here..."
                required
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-pixel-hot-pink text-pixel-white font-pixel px-6 py-4 rounded-lg hover:bg-pixel-lilac transition-colors duration-300 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message ✨'}
            </motion.button>
          </form>

          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mt-4 p-4 bg-pixel-lilac text-pixel-white rounded-lg text-center font-pixel-alt"
              >
                🎉 Message sent successfully! 🎉
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Messages Display */}
        <div className="space-y-6">
          <h2 className="font-pixel text-2xl text-pixel-hot-pink text-center mb-8">
            Birthday Messages ({messages.length})
          </h2>
          
          <AnimatePresence>
            {messages.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">💌</div>
                <p className="font-pixel-alt text-xl text-pixel-pink">
                  No messages yet. Be the first to leave a birthday wish!
                </p>
              </motion.div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-pixel-white border-2 border-pixel-lilac rounded-xl p-6 shadow-lg"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-pixel text-lg text-pixel-hot-pink">
                      {message.sender}
                    </h3>
                    <span className="font-pixel-alt text-sm text-pixel-pink">
                      {message.timestamp}
                    </span>
                  </div>
                  
                  <p className="font-pixel-alt text-pixel-pink mb-4 leading-relaxed">
                    {message.text}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <motion.button
                      onClick={() => handleLike(message.id)}
                      className="flex items-center space-x-2 text-pixel-hot-pink hover:text-pixel-lilac transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span>💖</span>
                      <span className="font-pixel-alt">
                        {message.likes} {message.likes === 1 ? 'like' : 'likes'}
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pixel-lilac text-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['💖', '✨', '🎈', '🎊', '🎂', '🎁'][i % 6]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MessageBoard;
