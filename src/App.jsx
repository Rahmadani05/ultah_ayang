import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars, Gift, Sparkles, ArrowRight, PlayCircle } from 'lucide-react';
import './index.css';

// Komponen untuk partikel love (hati) yang mengambang di background
const FloatingHearts = () => {
  const hearts = Array.from({ length: 20 });
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
      {hearts.map((_, i) => {
        const size = Math.random() * 15 + 15; // Ukuran random
        const left = Math.random() * 100 + '%'; // Posisi horizontal random
        const duration = Math.random() * 15 + 10; // Durasi animasi mengambang (lambat)
        const delay = Math.random() * 10; // Delay mulai
        return (
          <motion.div
            key={i}
            initial={{ y: '100vh', opacity: 0, x: 0 }}
            animate={{
              y: '-20vh',
              opacity: [0, 0.7, 0], // Fade in dan fade out
              x: Math.random() > 0.5 ? [0, 60, -60, 0] : [0, -60, 60, 0] // Meliuk ke kiri/kanan
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear"
            }}
            style={{ position: 'absolute', left: left }}
          >
            {/* Menggunakan Ikon Hati dari Lucide dengan isi warna pink */}
            <Heart size={size} fill="#fb7185" color="#fb7185" style={{ opacity: 0.5 }} />
          </motion.div>
        );
      })}
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const audioRef = useRef(null);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#fb7185', '#c084fc', '#818cf8']
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#fb7185', '#c084fc', '#818cf8']
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

    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const nextStep = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      triggerConfetti();
      setStep(1);
    }
  }

  // =====================================================================
  // GANTI URL GAMBAR DI SINI DENGAN NAMA FILE FOTO KALIAN DI FOLDER PUBLIC 
  // (Total 6 Foto: 4 Foto Sendiri, 2 Foto Bareng)
  // =====================================================================
  const content = [
    {
      message: "",
      subtext: "",
      image: null
    },
    {
      message: "Selamat Ulang Tahun, Sayang! 🎂",
      subtext: "Hari ini adalah hari yang paling spesial untukmu.",
      image: "/foto_sendiri_1.jpg"
    },
    {
      message: "Senyummu selalu jadi favoritku.",
      subtext: "Nggak pernah bosan rasanya melihat kamu bahagia.",
      image: "/foto_sendiri_2.jpg" // Ganti dengan nama file foto dia sendiri (2)
    },
    {
      message: "Terima kasih sudah jadi dirimu sendiri.",
      subtext: "Seseorang yang paling tangguh dan luar biasa di mataku.",
      image: "/foto_sendiri_3.jpg" // Ganti dengan nama file foto dia sendiri (3)
    },
    {
      message: "Dan terima kasih sudah hadir di hidupku.",
      subtext: "Aku sangat bersyukur kita bisa saling memiliki.",
      image: "/foto_bareng_1.jpg" // Ganti dengan nama file foto bareng (1)
    },
    {
      message: "Setiap momen bersamamu sangat berharga.",
      subtext: "I have loved you for a thousand years...",
      image: "/foto_bareng_2.jpg" // Ganti dengan nama file foto bareng (2)
    },
    {
      message: "Semoga semua harapan baikmu terwujud.",
      subtext: "I'll love you for a thousand more. Happy Birthday! ❤️",
      image: "/foto_sendiri_4.jpg" // Ganti dengan nama file foto dia sendiri (4)
    }
  ];

  // Animation Variants for professional stagger effects
  const containerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.2 }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="app-container">
      <div className="bg-gradient-animated" />
      <div className="bg-overlay" />

      {/* Menampilkan animasi hati mengambang hanya setelah kotak kado dibuka */}
      {isOpen && <FloatingHearts />}

      {/* Floating particles background effect */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '15%', left: '20%', zIndex: 5 }}
      >
        <Sparkles size={24} color="#c084fc" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        style={{ position: 'absolute', bottom: '25%', right: '15%', zIndex: 5 }}
      >
        <Stars size={32} color="#fb7185" />
      </motion.div>

      <audio ref={audioRef} src="/a-thousand-years.mp3" loop />

      {!isOpen ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel"
          style={{ padding: '3.5rem 3rem', borderRadius: '32px', textAlign: 'center', maxWidth: '420px', width: '100%' }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <div style={{ background: 'rgba(251, 113, 133, 0.1)', padding: '24px', borderRadius: '50%', display: 'inline-block', marginBottom: '1.5rem' }}>
              <Gift size={48} color="#fb7185" />
            </div>
          </motion.div>
          <h1 className="serif gradient-text" style={{ fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.1' }}>
            Ada Sesuatu<br />Untukmu
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6', fontSize: '1.05rem' }}>
            Pastikan volume suara perangkatmu menyala, lalu klik tombol di bawah untuk membuka hadiahnya.
          </p>

          <button className="btn-primary" onClick={handleOpen}>
            <PlayCircle size={20} />
            Buka Sekarang
          </button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="glass-panel"
            style={{ padding: '3.5rem 2.5rem', borderRadius: '32px', textAlign: 'center', maxWidth: '640px', width: '100%' }}
          >
            <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '250px', height: '250px', background: 'var(--accent-1)', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: '250px', height: '250px', background: 'var(--accent-2)', filter: 'blur(120px)', opacity: 0.15, borderRadius: '50%' }} />

            <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

              {content[step].image && (
                <motion.div variants={itemVariants} className="photo-frame" style={{ marginBottom: '2.5rem' }}>
                  <img src={content[step].image} alt="Memory" />
                </motion.div>
              )}

              <motion.h1 variants={itemVariants} className="serif gradient-text" style={{ fontSize: '2.2rem', marginBottom: '1rem', lineHeight: '1.3' }}>
                {content[step].message}
              </motion.h1>

              <motion.p variants={itemVariants} style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '80%' }}>
                {content[step].subtext}
              </motion.p>

              <motion.button variants={itemVariants} className="btn-primary" onClick={nextStep}>
                {step < 6 ? "Lanjut 💖" : "Ulangi ✨"}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

    </div>
  );
}

export default App;
