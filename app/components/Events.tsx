"use client";

import { motion, type Variants } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

// Tentukan Target Tanggal (Format: YYYY-MM-DDTHH:mm:ss)
const TARGET_DATE = new Date("2025-12-25T08:00:00").getTime();

export default function Events() {
  // State untuk Countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Logic Hitung Mundur
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Variabel animasi kartu
  const cardVariants : Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  return (
    <section className="py-20 md:py-32 bg-stone-100 text-stone-800 relative overflow-hidden">
      {/* Dekorasi Background Pattern (Opsional) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="w-96 h-96 bg-wedding-gold rounded-full blur-3xl absolute -top-20 -left-20 mix-blend-multiply" />
        <div className="w-96 h-96 bg-wedding-sage rounded-full blur-3xl absolute bottom-0 right-0 mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* JUDUL */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4">Save The Date</h2>
          <p className="text-stone-500 tracking-widest uppercase">Kami menantikan kehadiran Anda</p>
        </motion.div>

        {/* COUNTDOWN TIMER */}
        <div className="flex justify-center gap-4 md:gap-8 mb-20 text-center">
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <motion.div 
              key={unit}
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white shadow-lg rounded-2xl flex items-center justify-center mb-2 border border-stone-200">
                <span className="text-2xl md:text-4xl font-serif font-bold text-stone-800">
                  {value < 10 ? `0${value}` : value}
                </span>
              </div>
              <span className="text-xs md:text-sm uppercase tracking-widest text-stone-500">{unit}</span>
            </motion.div>
          ))}
        </div>

        {/* KARTU ACARA (GRID SYSTEM) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* KARTU 1: AKAD NIKAH */}
          <motion.div 
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100 relative overflow-hidden group hover:shadow-2xl transition-all"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Calendar size={100} />
            </div>
            
            <h3 className="text-3xl font-serif mb-6 text-stone-800">Akad Nikah</h3>
            
            <div className="space-y-4 text-stone-600">
              <div className="flex items-start gap-4">
                <Clock className="mt-1 text-wedding-gold shrink-0" />
                <div>
                  <p className="font-bold text-lg">08:00 WIB - Selesai</p>
                  <p className="text-sm">Sabtu, 25 Desember 2025</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-wedding-gold shrink-0" />
                <div>
                  <p className="font-bold text-lg">Masjid Agung Al-Azhar</p>
                  <p className="text-sm">Jl. Sisingamangaraja, Kebayoran Baru, Jakarta Selatan</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-stone-100">
               <a 
                 href="https://maps.google.com" 
                 target="_blank"
                 className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-wedding-gold hover:border-wedding-gold transition-colors"
               >
                 Lihat Lokasi <MapPin size={14} />
               </a>
            </div>
          </motion.div>

          {/* KARTU 2: RESEPSI */}
          <motion.div 
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-stone-900 text-stone-100 p-8 md:p-12 rounded-3xl shadow-xl border border-stone-800 relative overflow-hidden group hover:shadow-2xl transition-all"
          >
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Calendar size={100} />
            </div>

            <h3 className="text-3xl font-serif mb-6 text-white">Resepsi</h3>
            
            <div className="space-y-4 text-stone-300">
              <div className="flex items-start gap-4">
                <Clock className="mt-1 text-wedding-gold shrink-0" />
                <div>
                  <p className="font-bold text-lg text-white">11:00 - 13:00 WIB</p>
                  <p className="text-sm">Sabtu, 25 Desember 2025</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 text-wedding-gold shrink-0" />
                <div>
                  <p className="font-bold text-lg text-white">Grand Ballroom Hotel Mulia</p>
                  <p className="text-sm">Jl. Asia Afrika, Senayan, Jakarta Pusat</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-stone-800">
               <a 
                 href="https://maps.google.com" 
                 target="_blank"
                 className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase border-b border-white pb-1 hover:text-wedding-gold hover:border-wedding-gold transition-colors"
               >
                 Lihat Lokasi <MapPin size={14} />
               </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}