"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook untuk mendeteksi posisi scroll pada element ini
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"], // Mulai animasi dari top viewport
  });

  // --- RUMUS PARALLAX "GILA" ---
  
  // 1. Background bergerak lebih lambat (50% speed) dari scroll
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // 2. Efek Zoom-in perlahan pada background biar dramatis
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  // 3. Teks Nama bergerak Cepat ke atas (biar seolah "lepas" dari background)
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  
  // 4. Opacity text perlahan hilang saat di-scroll ke bawah
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* === LAYER 1: BACKGROUND (Parallax + Zoom) === */}
      <motion.div 
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0"
      >
        <div className="relative w-full h-[120%] -top-[10%]"> {/* Tinggi 120% biar gak putus pas parallax */}
          <Image
            src="/images/hero-bg-3.jpg" // Pastikan file ini ada
            alt="Wedding Couple"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay Gradient biar teks kebaca */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>
      </motion.div>

      {/* === LAYER 2: TEXT CONTENT (Floating) === */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center text-white px-4 drop-shadow-lg"
      >
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-sm md:text-lg tracking-[0.3em] uppercase mb-4"
        >
          The Wedding of
        </motion.p>

        <motion.h1 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1, type: "spring" }}
          className="text-6xl md:text-9xl font-serif mb-6 leading-tight"
        >
          Romeo <span className="text-3xl md:text-6xl align-middle font-sans font-light">&</span> Juliet
        </motion.h1>

        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 1.2, duration: 1 }}
           className="inline-block border-y border-white/50 py-2 px-6 backdrop-blur-sm"
        >
          <p className="text-lg md:text-xl font-light tracking-widest">
            25 . 12 . 2025
          </p>
        </motion.div>
      </motion.div>

      {/* === LAYER 3: SCROLL INDICATOR === */}
      <motion.div
        style={{ opacity: opacityText }} // Ikut hilang kalau discroll
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2 z-20"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll Down</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"
        />
      </motion.div>
    </section>
  );
}