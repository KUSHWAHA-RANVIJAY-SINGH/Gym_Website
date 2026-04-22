'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show after scrolling 400px AND not near the bottom (500px from end)
      if (scrollY > 400 && (documentHeight - (scrollY + windowHeight) > 600)) {
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
          className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
        >
          <div className="flex gap-3">
            <a 
              href="tel:+919199999999"
              className="flex-1 bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-all text-[10px] uppercase tracking-widest border border-white"
            >
              <Phone size={14} className="text-rose-600" /> CALL
            </a>
            <a 
              href="https://wa.me/919199999999?text=Namaste! I want to join GymOS."
              target="_blank"
              className="flex-[2] bg-rose-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-[0_10px_30px_-5px_rgba(225,29,72,0.5)] active:scale-95 transition-all text-[10px] uppercase tracking-[0.15em] border border-rose-500/20"
            >
              <MessageCircle size={14} /> WHATSAPP NOW
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
