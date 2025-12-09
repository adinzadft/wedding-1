"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
// Import komponen lain (pastikan path import benar "./" jika satu folder)
import Cover from "./Cover";
import Hero from "./Hero";
import Couple from "./Couple";
import Story from "./Story";
import Events from "./Events";
import RSVP from "./RSVP";
import Footer from "./Footer";

// TERIMA PROP guestName DISINI
export default function MainWrapper({ guestName }: { guestName: string }) {
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
      <audio ref={audioRef} src="/audio/wedding-song.mp3" loop />

      {/* ✅ PASSING PROP guestName KE COVER DISINI */}
      <Cover onOpen={openInvitation} guestName={guestName} />

      {/* Music Control */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-1000 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
        <button onClick={toggleMusic} className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-all animate-spin-slow">
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>

      <div className={`transition-opacity duration-1000 delay-500 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <Hero />
        <Couple />
        <Story />
        <Events />
        <RSVP />
        <Footer />
      </div>
    </main>
  );
}