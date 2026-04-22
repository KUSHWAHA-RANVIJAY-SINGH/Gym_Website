'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Services', id: 'services' },
    { name: 'Reviews', id: 'transformations' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5 py-3' : 'bg-transparent py-6 lg:py-10'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" onClick={() => window.scrollTo(0,0)} className="flex items-center gap-2 group shrink-0">
          <Dumbbell className="w-7 h-7 md:w-8 md:h-8 text-rose-600 group-hover:rotate-12 transition-transform" />
          <span className="text-xl md:text-2xl font-black tracking-tighter">GYM<span className="text-rose-600">OS</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              onClick={() => scrollToSection(link.id)}
              className="text-xs font-black text-white/60 hover:text-white uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
            >
              {link.name}
            </button>
          ))}
        </nav>


        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[70px] z-40 md:hidden bg-black/95 backdrop-blur-2xl"
          >
            <div className="container mx-auto px-8 py-12 flex flex-col h-full">
              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.button 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-4xl font-black text-white uppercase tracking-tighter hover:text-rose-600 transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-auto pb-12">
                <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-6">Ready to transform?</p>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full py-6 bg-rose-600 text-white font-black rounded-[2rem] text-lg shadow-[0_20px_40px_-10px_rgba(225,29,72,0.5)] uppercase tracking-widest active:scale-95 transition-transform"
                >
                  Join the movement
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
