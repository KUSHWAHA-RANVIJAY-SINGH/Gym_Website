'use client';

import { motion } from 'framer-motion';
import { Dumbbell, Utensils, Zap, HeartPulse, Trophy } from 'lucide-react';

const services = [
  {
    icon: <Zap className="text-white" />,
    title: "Weight Loss",
    desc: "Burn fat efficiently with our scientifically backed high-intensity training programs.",
    color: "bg-rose-600"
  },
  {
    icon: <Dumbbell className="text-white" />,
    title: "Muscle building",
    desc: "Gain strength and size with personalized hypertrophy programs and proper lifting form.",
    color: "bg-zinc-800"
  },
  {
    icon: <Utensils className="text-white" />,
    title: "Diet Plan",
    desc: "Nutrition is 70% of the game. Get custom meal plans that actually taste good.",
    color: "bg-rose-600"
  },
  {
    icon: <HeartPulse className="text-white" />,
    title: "Cardio + Strength",
    desc: "The perfect hybrid approach to build an athletic body and improve heart health.",
    color: "bg-zinc-800"
  },
  {
    icon: <Trophy className="text-white" />,
    title: "Personal Training",
    desc: "1-on-1 attention to ensure every rep counts and your safety is never compromised.",
    color: "bg-rose-600"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-black relative scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6"
            >
              LEVEL UP YOUR <br /> <span className="text-rose-600">FITNESS GAME</span>
            </motion.h2>
            <p className="text-zinc-500 font-medium text-lg">From fat loss to muscle gain, we provide the tools and guidance you need to dominate your fitness goals.</p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex -space-x-4 mb-4"
          >
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-black bg-rose-600 flex items-center justify-center text-[10px] font-bold">
              500+
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-10 rounded-[3rem] bg-zinc-900/30 border border-white/5 backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-rose-500/30 hover:bg-zinc-900/50"
            >
              <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-8 shadow-[0_10px_30px_-10px_rgba(225,29,72,0.3)] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter leading-none">{service.title}</h3>
              <p className="text-zinc-500 font-medium leading-relaxed mb-8 text-balance text-sm md:text-base">{service.desc}</p>
              
              <div className="flex items-center gap-2 text-rose-500 font-black text-[10px] tracking-[0.2em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                Explore More <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>

              {/* Decorative Background Icon */}
              <div className="absolute top-8 right-8 text-white/[0.02] group-hover:text-rose-500/[0.05] transition-all duration-500 transform scale-[3] rotate-12 -z-10">
                {service.icon}
              </div>
            </motion.div>
          ))}

          {/* Premium Promotion Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[3rem] bg-gradient-to-br from-rose-600 to-rose-900 flex flex-col justify-between group cursor-pointer relative overflow-hidden shadow-[0_20px_50px_-20px_rgba(225,29,72,0.4)]"
          >
            <div className="relative z-10">
               <div className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white border border-white/20 mb-6 backdrop-blur-md">
                 Active Offer
               </div>
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase leading-[0.9] mb-4 tracking-tighter">Limited Seats <br /> Available!</h3>
              <p className="text-rose-100 font-medium text-sm md:text-base leading-relaxed">Join today and get a free nutrition consultation worth <span className="font-black text-white underline decoration-rose-400 underline-offset-4">₹1999</span></p>
            </div>
            
            <button className="mt-12 bg-white text-rose-700 font-black py-5 rounded-2xl uppercase tracking-[0.1em] text-xs hover:bg-rose-50 transition-all shadow-xl active:scale-95 relative z-10">
              Claim Offer Now
            </button>

            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-16 -mb-16 blur-2xl text-white flex items-center justify-center font-black rotate-12">GYMOS</div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
