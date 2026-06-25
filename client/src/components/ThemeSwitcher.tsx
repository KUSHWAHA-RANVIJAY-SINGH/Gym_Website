'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Zap } from 'lucide-react';

type Theme = 'midnight-brass' | 'iron-ember' | 'concrete-lime';

const themes: { id: Theme; name: string; icon: any; accentColor: string; bgPreview: string }[] = [
  {
    id: 'midnight-brass',
    name: 'Midnight Brass',
    icon: Sparkles,
    accentColor: '#C9A24B',
    bgPreview: 'bg-[#0E1420]',
  },
  {
    id: 'iron-ember',
    name: 'Iron & Ember',
    icon: Flame,
    accentColor: '#FF6A39',
    bgPreview: 'bg-[#1B1B1E]',
  },
  {
    id: 'concrete-lime',
    name: 'Concrete & Lime',
    icon: Zap,
    accentColor: '#8BC400',
    bgPreview: 'bg-[#EDEAE2]',
  },
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState<Theme>('midnight-brass');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read theme from localStorage or document element
    const savedTheme = localStorage.getItem('gym-theme') as Theme;
    const currentTheme = (document.documentElement.getAttribute('data-theme') as Theme) || 'midnight-brass';
    const initialTheme = savedTheme || currentTheme;
    
    if (themes.some(t => t.id === initialTheme)) {
      setActiveTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
    setMounted(true);
  }, []);

  const handleThemeChange = (themeId: Theme) => {
    setActiveTheme(themeId);
    localStorage.setItem('gym-theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/5 h-10 w-[300px] animate-pulse" />
    );
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {themes.map((theme) => {
          const Icon = theme.icon;
          const isActive = activeTheme === theme.id;

          return (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 select-none group"
              style={{
                color: isActive 
                  ? theme.id === 'concrete-lime' ? '#181818' : '#FFFFFF' 
                  : 'rgba(255, 255, 255, 0.45)'
              }}
            >
              {/* Animated active pill background */}
              {isActive && (
                <motion.div
                  layoutId="activeThemePill"
                  className="absolute inset-0 rounded-full -z-10 shadow-lg"
                  style={{
                    backgroundColor: theme.accentColor,
                    boxShadow: `0 0 20px ${theme.accentColor}40`,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Hover highlight (only when not active) */}
              {!isActive && (
                <div className="absolute inset-0 rounded-full -z-10 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              )}

              <Icon 
                size={14} 
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ 
                  color: isActive 
                    ? theme.id === 'concrete-lime' ? '#181818' : '#FFFFFF' 
                    : theme.accentColor 
                }} 
              />
              <span className="hidden sm:inline font-black tracking-tight">{theme.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
