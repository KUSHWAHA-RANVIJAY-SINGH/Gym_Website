'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-50 md:hidden"
        >
          <div className="flex gap-3">
            <a 
              href="tel:+919999999999"
              className="flex-1 bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-transform"
            >
              <Phone size={20} /> CALL
            </a>
            <a 
              href="https://wa.me/919999999999?text=Namaste! I want to join GymOS."
              target="_blank"
              className="flex-[2] bg-rose-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-transform"
            >
              <MessageCircle size={20} /> WHATSAPP NOW
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
