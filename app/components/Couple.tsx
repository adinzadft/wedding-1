"use client";

import { motion, type Variants } from "framer-motion"; // Update import
import Image from "next/image";
import { Instagram } from "lucide-react";

// Update definisi variabel dengan tipe
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

export default function Couple() {
  return (
    <section className="py-20 md:py-32 bg-stone-50 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Judul Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp} // Error merah harusnya hilang sekarang
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-serif text-stone-800 mb-4">Mempelai</h2>
          <p className="text-stone-500 italic max-w-lg mx-auto">
            Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan...
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-8">
          
          {/* === GROOM CARD === */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-t-full overflow-hidden border border-stone-200 shadow-xl mb-6">
              <Image
                src="/images/groom.avif"
                alt="The Groom"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            <h3 className="text-3xl font-serif mb-1">Romeo Montague</h3>
            <p className="text-sm tracking-widest uppercase text-stone-500 mb-3">Putra Bapak A & Ibu B</p>
            
            <a href="https://instagram.com" target="_blank" className="flex items-center gap-2 text-xs font-bold border-b border-stone-800 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors">
              <Instagram size={14} /> @romeo_m
            </a>
          </motion.div>

          {/* === DAN / AND DIVIDER === */}
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="font-serif text-5xl text-stone-300 md:mx-8"
          >
            &
          </motion.div>

          {/* === BRIDE CARD === */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-b-full overflow-hidden border border-stone-200 shadow-xl mb-6">
              <Image
                src="/images/bride.jpg"
                alt="The Bride"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            <h3 className="text-3xl font-serif mb-1">Juliet Capulet</h3>
            <p className="text-sm tracking-widest uppercase text-stone-500 mb-3">Putri Bapak C & Ibu D</p>
            
            <a href="https://instagram.com" target="_blank" className="flex items-center gap-2 text-xs font-bold border-b border-stone-800 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors">
              <Instagram size={14} /> @juliet_c
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}