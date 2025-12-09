"use client";

import { motion } from "framer-motion";
import { Send, MessageCircle, Check, X } from "lucide-react";
import { useState } from "react";

export default function RSVP() {
  // State untuk menyimpan input user
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"hadir" | "tidak" | null>(null);
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState("");

  // --- LOGIC WHATSAPP GENERATOR ---
  const handleSendMessage = () => {
    if (!name || !status) {
      alert("Mohon isi nama dan status kehadiran dulu ya!");
      return;
    }

    // Nomor HP Tujuan (Ganti dengan nomor kamu, format 62...)
    const phoneNumber = "6281234567890"; 

    // Format Pesan
    const text = `
Hello Romeo & Juliet! 👋

Saya *${name}* ingin konfirmasi kehadiran di pernikahan kalian.

Status: *${status === "hadir" ? "Hadir ✅" : "Maaf Tidak Bisa Hadir ❌"}*
Jumlah Tamu: *${guests} orang*

Pesan:
"${message}"

Terima kasih!
    `.trim();

    // Encode ke URL WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    
    // Buka WhatsApp
    window.open(url, "_blank");
  };

  return (
    <section className="py-20 md:py-32 bg-white text-stone-800 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-2xl">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4">RSVP & Wishes</h2>
          <p className="text-stone-500">
            Kehadiran Anda adalah kado terindah bagi kami. Mohon konfirmasi kehadiran Anda di bawah ini.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-stone-50 p-8 md:p-10 rounded-3xl shadow-lg border border-stone-200"
        >
          <div className="space-y-6">
            
            {/* Input Nama */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-stone-500 mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda..."
                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all"
              />
            </div>

            {/* Pilihan Kehadiran (Custom Radio Button) */}
            <div>
               <label className="block text-sm font-bold uppercase tracking-widest text-stone-500 mb-2">Konfirmasi Kehadiran</label>
               <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setStatus("hadir")}
                    className={`flex items-center justify-center gap-2 py-4 rounded-xl border transition-all ${
                      status === "hadir" 
                      ? "bg-stone-800 text-white border-stone-800 shadow-lg scale-[1.02]" 
                      : "bg-white text-stone-500 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <Check size={18} /> Hadir
                  </button>
                  <button
                    onClick={() => setStatus("tidak")}
                    className={`flex items-center justify-center gap-2 py-4 rounded-xl border transition-all ${
                      status === "tidak" 
                      ? "bg-stone-800 text-white border-stone-800 shadow-lg scale-[1.02]" 
                      : "bg-white text-stone-500 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <X size={18} /> Maaf..
                  </button>
               </div>
            </div>

            {/* Jumlah Tamu (Hanya muncul jika hadir) */}
            {status === "hadir" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <label className="block text-sm font-bold uppercase tracking-widest text-stone-500 mb-2">Jumlah Tamu</label>
                <select 
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400"
                >
                  <option value={1}>1 Orang</option>
                  <option value={2}>2 Orang</option>
                </select>
              </motion.div>
            )}

            {/* Input Pesan */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-stone-500 mb-2">Ucapan & Doa</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis ucapan manis untuk kedua mempelai..."
                rows={4}
                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all resize-none"
              />
            </div>

            {/* Tombol Kirim */}
            <button 
              onClick={handleSendMessage}
              className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-3 shadow-lg hover:shadow-green-900/20 active:scale-95 duration-200"
            >
              <MessageCircle size={20} />
              Kirim via WhatsApp
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  );
}