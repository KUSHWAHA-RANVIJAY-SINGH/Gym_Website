'use client';

import { motion } from 'framer-motion';
import { Users, Award, Salad, CalendarCheck } from 'lucide-react';

const stats = [
  {
    icon: <Users className="text-rose-600" />,
    value: "200+",
    label: "Transformations",
    desc: "Real life changing stories"
  },
  {
    icon: <Award className="text-rose-600" />,
    value: "15+",
    label: "Expert Trainers",
    desc: "Certified professionals"
  },
  {
    icon: <Salad className="text-rose-600" />,
    value: "100%",
    label: "Custom Diets",
    desc: "Tailored to your body"
  },
  {
    icon: <CalendarCheck className="text-rose-600" />,
    value: "90 Days",
    label: "Visible Results",
    desc: "Guaranteed progress"
  }
];

export default function SocialProof() {
  return (
    <section className="py-20 bg-black border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-rose-600/5 flex items-center justify-center border border-rose-600/20 group-hover:bg-rose-600/20 transition-all duration-300 transform group-hover:rotate-6">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">{stat.value}</h3>
              <p className="text-rose-500 font-bold uppercase tracking-widest text-xs mb-1">{stat.label}</p>
              <p className="text-zinc-500 text-sm font-medium">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
