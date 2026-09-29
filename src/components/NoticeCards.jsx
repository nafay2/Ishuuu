import { useState } from 'react'
import { motion } from 'framer-motion'
import { noticeHeading, noticeCards } from '../data/content'
import PageShell from './PageShell'
import { CatCorner } from './EasterEggs'

export default function NoticeCards({ onNext }) {
  const [flipped, setFlipped] = useState({})

  const toggle = (i) => setFlipped((f) => ({ ...f, [i]: !f[i] }))

  return (
    <PageShell onNext={onNext} nextLabel="Show me more →">
      <h2 className="font-display text-2xl md:text-4xl text-forest-800 max-w-xl mx-auto mb-10 text-shadow-soft">
        {noticeHeading}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
        {noticeCards.map((card, i) => {
          const isOpen = !!flipped[i]
          return (
            <motion.button
              key={i}
              onClick={() => toggle(i)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.06 }}
              whileTap={{ scale: 0.97 }}
              className="relative h-40 sm:h-36 rounded-2xl glass p-3 flex flex-col items-center justify-center overflow-hidden shadow-sm"
              style={{ perspective: 800 }}
            >
              <motion.div
                animate={{ rotateY: isOpen ? 180 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-full h-full relative"
              >
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="text-3xl">{card.emoji}</span>
                  <span className="font-body text-xs md:text-sm text-forest-700 font-medium">{card.title}</span>
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center px-2"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <p className="font-body text-xs md:text-sm text-forest-600 leading-snug">{card.text}</p>
                </div>
              </motion.div>
            </motion.button>
          )
        })}
      </div>

      <div className="mt-12">
        <p className="font-body text-xs text-forest-500/70 mb-4">say hi 🐾</p>
        <CatCorner />
      </div>
    </PageShell>
  )
}
