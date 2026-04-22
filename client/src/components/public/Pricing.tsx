'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '999',
    duration: 'Monthly',
    features: ['Access to all equipment', 'Locker facility', 'General training'],
    recommended: false,
  },
  {
    name: 'Pro',
    price: '2499',
    duration: 'Quarterly',
    features: ['Personal trainer consult', 'Diet planning', 'High-intensity sessions', 'Everything in Basic'],
    recommended: true,
  },
  {
    name: 'Elite',
    price: '7999',
    duration: 'Annual',
    features: ['Priority support', 'Home workout plans', 'Full body transformation', 'Everything in Pro'],
    recommended: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-black relative scroll-mt-24">
      <div className="container mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">Investment in <span className="text-rose-600">Yourself</span></h2>
          <p className="text-zinc-500 font-medium text-lg">Choose a plan that fits your goals. No hidden charges, just results.</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`p-10 rounded-[3rem] border transition-all duration-500 group ${
                plan.recommended 
                  ? 'border-rose-500/30 bg-rose-500/5 shadow-[0_20px_50px_-20px_rgba(225,29,72,0.15)] scale-105 z-10' 
                  : 'border-white/5 bg-zinc-900/30 hover:border-white/10'
              } relative overflow-hidden backdrop-blur-xl`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 px-8 py-3 bg-rose-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-[2rem] shadow-lg">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-black mb-6 uppercase tracking-[0.2em] text-zinc-500">{plan.name}</h3>
              <div className="flex items-baseline justify-center gap-1 mb-10">
                <span className="text-6xl font-black text-white tracking-tighter">₹{plan.price}</span>
                <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest">/{plan.duration}</span>
              </div>
              <ul className="text-left space-y-5 mb-14">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4 text-zinc-400 font-medium text-sm md:text-base group/li">
                    <div className="mt-1 w-5 h-5 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0 group-hover/li:bg-rose-500/20 transition-colors">
                      <Check className="w-3 h-3 text-rose-500" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                className={`w-full py-5 md:py-6 rounded-2xl font-black transition-all duration-300 uppercase tracking-tighter text-sm md:text-base relative overflow-hidden active:scale-95 ${
                  plan.recommended 
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-[0_15px_40px_-10px_rgba(225,29,72,0.5)]' 
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
              >
                <span className="relative z-10">Claim Your Spot</span>
                {plan.recommended && (
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                )}
              </button>
            </motion.div>
          ))}
        </div>

        
        <p className="mt-12 text-zinc-600 text-sm font-medium italic">*All memberships include a 1:1 orientation session.</p>
      </div>
    </section>
  );
}
