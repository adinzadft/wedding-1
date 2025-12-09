"use client";

import { useState, useRef } from "react";
import Cover from "./components/Cover"; // Import component Cover
import Hero from "./components/Hero";   // Import component Hero baru
import Story from "./components/Story";
import Couple from "./components/Couple";
import Events from "./components/Events";
import RSVP from "./components/RSVP";
import Footer from "./components/Footer";
import { Play, Pause } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const openInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <main className="relative min-h-screen bg-stone-50">
      {/* Audio */}
      <audio ref={audioRef} src="/audio/wedding-song.mp3" loop />

      {/* Cover (Opening Gate) */}
      <Cover onOpen={openInvitation} />

      {/* Music Control */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-1000 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <button 
          onClick={toggleMusic}
          className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-all animate-spin-slow"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      {/* Kita delay munculnya konten sedikit biar sinkron sama cover yang terbuka */}
      <div className={`transition-opacity duration-1000 delay-500 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        
        {/* 1. HERO SECTION */}
        {/* <Hero /> */}

        {/* 2. SPACE BUAT SCROLL (Testing Parallax) */}
        <div className={`transition-opacity duration-1000 delay-500 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
  
            <Hero />

            {/* Quote Singkat sebagai pembatas (Opsional) */}
            <section className="py-24 bg-stone-100 text-center px-4">
                <p className="font-serif text-2xl md:text-3xl italic text-stone-600">
                  "Love is not just looking at each other,<br/> it's looking in the same direction."
                </p>
            </section>

            {/* Masukkan Component Couple disini */}
            <Couple />

            {/* === SECTION STORY (Horizontal Scroll) === */}
            {/* Kita tidak perlu margin/padding tambahan karena dia punya tinggi 300vh sendiri */}
            <Story />

            {/* === EVENTS & COUNTDOWN === */}
            <Events />

            {/* === RSVP FORM === */}
            <RSVP />

            {/* === FOOTER === */}
            <Footer />

            {/* Dummy Footer */}
            {/* ... */}

        </div>

      </div>
    </main>
  );
}