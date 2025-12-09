"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// Data Story (Bisa ditambah)
const stories = [
  {
    id: 1,
    year: "2018",
    title: "The First Hello",
    desc: "Pertama kali bertemu di perpustakaan kampus. Tidak ada cinta pada pandangan pertama, hanya pinjam pulpen.",
    img: "/images/story-1.jpg",
  },
  {
    id: 2,
    year: "2020",
    title: "The Confession",
    desc: "Setelah 2 tahun berteman, akhirnya memberanikan diri mengungkapkan rasa di kedai kopi favorit.",
    img: "/images/story-2.jpg",
  },
  {
    id: 3,
    year: "2024",
    title: "She Said Yes",
    desc: "Di bawah langit senja Bali, sebuah cincin menjadi saksi keseriusan hubungan ini.",
    img: "/images/story-3.jpg",
  },
  {
    id: 4,
    year: "2025",
    title: "The Beginning",
    desc: "Menuju lembaran baru, menyempurnakan separuh agama bersama orang tercinta.",
    img: "/images/story-4.jpg",
  },
];

export default function Story() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // LOGIC KEREN: Mengubah Scroll Vertikal jadi Gerak Horizontal
  // ["1%"] artinya mulai geser sedikit setelah masuk viewport
  // ["-95%"] artinya digeser ke kiri sampai item terakhir kelihatan
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    // Container Luar harus SANGAT TINGGI (300vh) agar user punya ruang buat scroll lama
    <section ref={targetRef} className="relative h-[300vh] bg-stone-900 text-stone-200">
      
      {/* Sticky Wrapper: Ini yang bikin konten "nempel" di layar saat discroll */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Judul Statis di Kiri Atas */}
        <div className="absolute top-10 left-10 z-20">
          <h2 className="text-4xl md:text-6xl font-serif text-white/20">Our Journey</h2>
        </div>

        {/* Container Horizontal yang Bergerak */}
        <motion.div style={{ x }} className="flex gap-12 md:gap-24 pl-12 md:pl-32">
          
          {stories.map((story, index) => (
            <div key={story.id} className="relative flex flex-col md:flex-row items-center gap-8 w-[80vw] md:w-[60vw] flex-shrink-0">
              
              {/* Garis Tahun Besar di Background */}
              <span className="absolute -top-20 left-0 text-[8rem] md:text-[12rem] font-bold text-white/5 font-serif z-0">
                {story.year}
              </span>

              {/* Foto Card */}
              <div className="relative w-full md:w-1/2 h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl z-10 group">
                <Image
                  src={story.img}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                {/* Teks di dalam foto (untuk Mobile) */}
                <div className="absolute bottom-4 left-4 md:hidden">
                    <h3 className="text-xl font-serif text-white">{story.title}</h3>
                </div>
              </div>

              {/* Teks Deskripsi (Kanan Foto) */}
              <div className="w-full md:w-1/2 z-10 px-4">
                <div className="w-16 h-1 bg-wedding-gold mb-6 hidden md:block" />
                <h3 className="text-3xl md:text-5xl font-serif mb-4 text-wedding-gold hidden md:block">
                  {story.title}
                </h3>
                <p className="text-sm md:text-lg font-light leading-relaxed text-stone-300">
                  {story.desc}
                </p>
              </div>

            </div>
          ))}
          
          {/* Closing Text di Ujung Kanan */}
          <div className="flex items-center justify-center w-[40vw] flex-shrink-0">
             <h3 className="text-4xl md:text-6xl font-serif text-center italic">
                To be continued...
             </h3>
          </div>

        </motion.div>
      </div>
    </section>
  );
}