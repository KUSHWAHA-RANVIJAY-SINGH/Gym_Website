'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Namaste! I am ${formData.name}. I want to transform my body with GymOS Elite. ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919199999999?text=${encodedText}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-black relative scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] uppercase tracking-tighter"
            >
              START YOUR <br />
              <span className="text-rose-600">TRANSFORMATION</span> <br />
              TODAY 🔥
            </motion.h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-md mx-auto lg:mx-0 font-medium italic">"The only bad workout is the one that didn't happen."</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-6 justify-center lg:justify-start group cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-rose-600/10 flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                   <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em] mb-1">Call Our Head Coach</p>
                   <p className="text-2xl md:text-3xl font-black text-white tracking-tighter">+91 91999 99999</p>
                </div>
              </div>
              <p className="text-emerald-500 font-bold flex items-center gap-2 justify-center lg:justify-start">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                 No hidden charges. 100% transparency.
              </p>
            </div>
            
            <div className="mt-12 rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-zinc-900/50 hidden lg:block grayscale hover:grayscale-0 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14391.432612739327!2d85.1278107!3d25.5940947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5844f0bb6903%3A0x57ad3ebcdabf7087!2sPatna%2C%20Bihar!5e0!3m2!1sen!2sin!4v1711204000000!5m2!1sen!2sin" 
                width="100%" 
                height="180" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
              ></iframe>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex-1 w-full glassmorphism p-8 md:p-12 rounded-[3rem]"
          >
            <form onSubmit={handleWhatsApp} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    suppressHydrationWarning
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 md:py-5 text-white focus:border-rose-600 focus:bg-white/[0.08] outline-none transition-all placeholder:text-zinc-700 font-medium"
                    placeholder="Rahul Kumar"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3 ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    suppressHydrationWarning
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 md:py-5 text-white focus:border-rose-600 focus:bg-white/[0.08] outline-none transition-all placeholder:text-zinc-700 font-medium"
                    placeholder="+91 XXXXX XXXXX"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3 ml-1">Message (Optional)</label>
                <textarea 
                  suppressHydrationWarning
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-8 md:py-10 text-white focus:border-rose-600 focus:bg-white/[0.08] outline-none transition-all placeholder:text-zinc-700 font-medium min-h-[120px] resize-none"
                  placeholder="Tell us about your fitness goals..."
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <div className="flex items-center gap-3 px-2">
                 <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                 <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.1em]">Only 4 spots left for this month's intake</p>
              </div>
              <button 
                type="submit"
                className="w-full py-6 md:py-7 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-4 group shadow-[0_20px_50px_-15px_rgba(225,29,72,0.6)] uppercase tracking-widest text-sm relative overflow-hidden active:scale-95"
              >
                <span className="relative z-10 font-black">WHATSAPP NOW</span> 
                <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
