"use client";

import { motion } from "framer-motion";
import { MailOpen } from "lucide-react"; // Icon surat
import { useState } from "react";

// Definisikan props biar type-safe
interface CoverProps {
  onOpen: () => void; // Function yang dipanggil saat tombol diklik
  guestName: string;
}

export default function Cover({ onOpen, guestName }: CoverProps) {
  const [isExit, setIsExit] = useState(false);

  const handleOpen = () => {
    setIsExit(true); // Trigger animasi keluar
    
    // Tunggu animasi selesai sedikit baru panggil fungsi parent
    setTimeout(() => {
      onOpen();
    }, 500); 
  };

  return (
    <motion.div
      // Animasi Container (Slide Up saat keluar)
      initial={{ y: 0 }}
      animate={isExit ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // Bezier curve biar smooth
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-900 text-white overflow-hidden"
    >
      {/* Background Image dengan overlay gelap */}
      <div 
        className="absolute inset-0 bg-[url('/images/cover-bg.jpg')] bg-cover bg-center opacity-40 blur-sm scale-110" 
      />
      
      {/* Konten Cover */}
      <div className="relative z-10 text-center space-y-6 p-4">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-sm tracking-[0.3em] uppercase"
        >
          The Wedding of
        </motion.p>

        <motion.h1 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl font-serif italic"
        >
          Romeo & Juliet
        </motion.h1>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
        >
            <p className="mb-8 font-light text-stone-200">
                Kepada Yth.<br/>
                {/* Ganti teks statis dengan variabel guestName */}
                <span className="font-bold text-lg capitalize">{guestName}</span>
            </p>

            {/* Tombol Interaktif */}
            <button
            onClick={handleOpen}
            className="group relative px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
            <MailOpen size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="tracking-widest text-sm font-medium">BUKA UNDANGAN</span>
            </button>
        </motion.div>
      </div>
    </motion.div>
  );
}