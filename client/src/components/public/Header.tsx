'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Dumbbell } from 'lucide-react';
import Link from 'next/link';
import ThemeSwitcher from '@/components/ThemeSwitcher';

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

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
    <>
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

          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-10">
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
            <ThemeSwitcher />
          </div>


          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] md:hidden bg-black/98 backdrop-blur-3xl flex flex-col"
          >
            {/* Header Row inside Fullscreen Menu */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-black">
              <Link 
                href="/" 
                onClick={() => { setIsMobileMenuOpen(false); window.scrollTo(0,0); }} 
                className="flex items-center gap-2 group shrink-0"
              >
                <Dumbbell className="w-7 h-7 text-rose-600 group-hover:rotate-12 transition-transform" />
                <span className="text-xl font-black tracking-tighter">GYM<span className="text-rose-600">OS</span></span>
              </Link>
              <button 
                className="text-zinc-400 hover:text-white p-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links Content */}
            <div className="flex-1 flex flex-col justify-between px-8 py-10 overflow-y-auto">
              <div className="flex flex-col gap-4 my-auto">
                {navLinks.map((link, i) => (
                  <motion.button 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => scrollToSection(link.id)}
                    className="text-left text-3xl font-black text-white uppercase tracking-tighter hover:text-rose-600 transition-colors flex items-center justify-between group py-3 border-b border-white/5 last:border-0"
                  >
                    <span>{link.name}</span>
                    <span className="text-rose-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-xl font-light">→</span>
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">Select Theme</p>
                  <ThemeSwitcher />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-4">Ready to transform?</p>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="w-full py-5 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl text-base shadow-[0_15px_30px_-5px_rgba(225,29,72,0.4)] uppercase tracking-widest active:scale-95 transition-transform"
                  >
                    Join the movement
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
