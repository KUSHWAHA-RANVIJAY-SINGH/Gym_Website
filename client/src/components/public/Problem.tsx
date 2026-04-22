'use client';

import { motion } from 'framer-motion';
import { XCircle, AlertCircle, Ban } from 'lucide-react';

const problems = [
  {
    icon: <Ban className="text-rose-600" size={32} />,
    title: "No Proper Guidance",
    desc: "Walking into a gym without a plan is just a waste of time. Most people quit because they don't know what to do."
  },
  {
    icon: <XCircle className="text-rose-600" size={32} />,
    title: "No Diet Plan",
    desc: "You can't out-train a bad diet. Without specific nutrition advice, your hard work in the gym won't show results."
  },
  {
    icon: <AlertCircle className="text-rose-600" size={32} />,
    title: "No Consistency",
    desc: "Motivation gets you started, but discipline keeps you going. We provide the accountability you lack."
  }
];

export default function Problem() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-rose-600/10 blur-[100px] rounded-full -ml-32" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-rose-500/10 rounded-full mb-6 border border-rose-500/20"
          >
            <span className="text-rose-500 font-black uppercase tracking-[0.2em] text-[10px]">
              Stop Wasting Time
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mt-4 mb-8 leading-[0.9] uppercase tracking-tighter text-balance"
          >
            Tired of not seeing <span className="text-rose-600">Results</span> even after working out?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto text-balance"
          >
            Most people fail in their fitness journey not because of lack of effort, but because of poor strategy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 rounded-[3rem] bg-zinc-900/30 border border-white/5 hover:border-rose-500/30 transition-all duration-500 group"
            >
              <div className="mb-8 p-5 rounded-2xl bg-zinc-950 w-fit group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 shadow-xl">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tighter leading-none">{item.title}</h3>
              <p className="text-zinc-500 leading-relaxed font-medium text-sm md:text-base">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
