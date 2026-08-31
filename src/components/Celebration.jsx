import { useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'

const EMOJIS = ['💗', '🌸', '✨', '🦋', '💖', '🌷']

export default function Celebration({ onDone, duration = 2600 }) {
  useEffect(() => {
    const t = setTimeout(onDone, duration)
    return () => clearTimeout(t)
  }, [onDone, duration])

  const particles = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => ({
        id: i,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2 + Math.random() * 1.6,
        size: 14 + Math.random() * 18,
        driftX: (Math.random() - 0.5) * 160,
      })),
    []
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-peony-50 via-white to-icy-50 overflow-hidden"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 animate-drift select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--drift-x': `${p.driftX}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}

      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
        className="text-center relative z-10"
      >
        <p className="text-6xl md:text-7xl mb-4">😚💗</p>
        <p className="font-display italic text-2xl md:text-3xl text-peony-600">I knew it.</p>
      </motion.div>
    </motion.div>
  )
}
