import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars, Gift, Music, Image as ImageIcon } from 'lucide-react';
import './index.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const audioRef = useRef(null);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#8b5cf6', '#3b82f6']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#8b5cf6', '#3b82f6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleOpen = () => {
    setIsOpen(true);
    triggerConfetti();
    setStep(1);

    // Memutar musik setelah ada interaksi user (Syarat dari browser)
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      triggerConfetti();
      setStep(1); // loop back
    }
  }

  // =====================================================================
  // GANTI URL GAMBAR DI SINI DENGAN FOTO KALIAN 
  // Contoh: Jika kamu menaruh foto 'foto1.jpg' di dalam folder 'public', 
  // ubah image menjadi: image: "/foto1.jpg"
  // =====================================================================
  const content = [
    {
      message: "",
      subtext: "",
      image: null
    },
    {
      message: "Selamat Ulang Tahun, Sayang! 🎂",
      subtext: "Hari ini adalah hari yang paling spesial.",
      image: "/foto_1.jpeg"
    },
    {
      message: "Terima kasih sudah ada di hidupku.",
      subtext: "Aku sangat bersyukur memilikimu.",
      image: "/foto_3.jpeg"
    },
    {
      message: "Setiap detik bersamamu sangat berharga.",
      subtext: "I have loved you for a thousand years...",
      image: "/foto_4.jpeg"
    },
    {
      message: "Semoga harimu dipenuhi bahagia.",
      subtext: "I'll love you for a thousand more. ❤️",
      image: "/foto_2.jpeg"
    }
  ];

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'radial-gradient(circle at center, #1e293b 0%, #0f172a 100%)' }}>

      {/* 
        =====================================================================
        CARA MENAMBAHKAN LAGU:
        1. Siapkan file mp3 lagu "A Thousand Years" (misal namanya: 'a-thousand-years.mp3')
        2. Masukkan file mp3 tersebut ke dalam folder 'public' (C:\Users\acern\.gemini\antigravity-ide\scratch\birthday-app\public)
        3. Pastikan `src` di bawah ini sama dengan nama file mp3-nya.
        =====================================================================
      */}
      <audio
        ref={audioRef}
        src="/Christina Perri - A Thousand Years [Official Music Video].mp3"
        loop
      />

      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="glass-panel"
          style={{ padding: '3rem', borderRadius: '24px', textAlign: 'center', maxWidth: '400px' }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Gift size={64} color="#ec4899" style={{ marginBottom: '1.5rem', marginInline: 'auto' }} />
          </motion.div>
          <h1 className="serif" style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>Ada Sesuatu Untukmu</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Pastikan volume suara perangkatmu menyala, lalu klik tombol di bawah.</p>

          <button className="btn-primary" onClick={handleOpen}>
            Buka Sekarang
          </button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-panel"
            style={{ padding: '2rem', borderRadius: '32px', textAlign: 'center', maxWidth: '600px', width: '100%', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '150px', height: '150px', background: 'var(--accent-1)', filter: 'blur(80px)', opacity: 0.2, borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '200px', height: '200px', background: 'var(--accent-2)', filter: 'blur(100px)', opacity: 0.2, borderRadius: '50%' }} />

            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {content[step].image && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  style={{ marginBottom: '1.5rem', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.1)', display: 'inline-flex', maxWidth: '100%' }}
                >
                  <img
                    src={content[step].image}
                    alt="Memory"
                    style={{ maxWidth: '100%', maxHeight: '350px', objectFit: 'contain', display: 'block' }}
                  />
                </motion.div>
              )}

              <h1 className="serif gradient-text" style={{ fontSize: '2rem', marginBottom: '1rem', lineHeight: '1.3' }}>
                {content[step].message}
              </h1>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                {content[step].subtext}
              </p>

              <button className="btn-primary" onClick={nextStep} style={{ padding: '10px 28px', fontSize: '1rem' }}>
                {step < 4 ? "Lanjut 💖" : "Ulangi ✨"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

    </div>
  );
}

export default App;
