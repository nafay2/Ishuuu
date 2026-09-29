import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PeonySVG from './PeonySVG'
import { introQuestion, easterEggs } from '../data/content'

export default function IntroQuestion({ onYes }) {
  const [noCount, setNoCount] = useState(0)
  const [noPos, setNoPos] = useState(null) // null = default centered position
  const [peonyClicks, setPeonyClicks] = useState(0)
  const [peonyMsg, setPeonyMsg] = useState(null)
  const containerRef = useRef(null)

  const onPeonyClick = () => {
    const next = peonyClicks + 1
    setPeonyClicks(next)
    if (next === 5) {
      setPeonyMsg(easterEggs.peony[0])
      setTimeout(() => setPeonyMsg(easterEggs.peony[1]), 1400)
      setTimeout(() => setPeonyMsg(null), 3200)
    }
  }

  const message =
    noCount === 0
      ? introQuestion.question
      : introQuestion.noMessages[Math.min(noCount - 1, introQuestion.noMessages.length - 1)]

  const yesScale = Math.min(1 + noCount * 0.06, 1.5)
  const noScale = Math.max(1 - noCount * 0.05, 0.55)

  const dodge = () => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const btnW = 130 * noScale
    const btnH = 56 * noScale
    const padding = 16
    const maxX = Math.max(rect.width - btnW - padding, padding)
    const maxY = Math.max(rect.height - btnH - padding, padding)
    const x = padding + Math.random() * maxX
    const y = padding + Math.random() * maxY
    setNoPos({ x, y })
    setNoCount((c) => c + 1)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 py-16 text-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-6 relative"
      >
        <AnimatePresence>
          {peonyMsg && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap glass px-3 py-1.5 rounded-full text-xs font-body text-forest-700"
            >
              {peonyMsg}
            </motion.p>
          )}
        </AnimatePresence>
        <motion.button
          type="button"
          onClick={onPeonyClick}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          whileTap={{ scale: 0.92 }}
          aria-label="a little peony"
        >
          <PeonySVG size={130} className="drop-shadow-[0_0_35px_rgba(255,143,179,0.45)]" />
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="font-body text-sm md:text-base tracking-wide text-forest-600/70 mb-3"
      >
        {introQuestion.prompt}
      </motion.p>

      <AnimatePresence mode="wait">
        <motion.h1
          key={message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="font-display text-3xl md:text-5xl text-forest-800 mb-10 max-w-md text-shadow-soft"
        >
          {message}
        </motion.h1>
      </AnimatePresence>

      <div className="w-full max-w-sm h-24 flex items-center justify-center">
        <motion.button
          animate={{ scale: yesScale }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          whileTap={{ scale: yesScale * 0.94 }}
          onClick={onYes}
          className="relative z-10 px-8 py-4 rounded-full bg-gradient-to-br from-peony-400 to-peony-600 text-white font-body font-medium shadow-glow text-base md:text-lg"
        >
          {introQuestion.yes}
        </motion.button>

        <motion.button
          onClick={dodge}
          onMouseEnter={noCount > 0 ? dodge : undefined}
          animate={
            noPos
              ? { left: noPos.x, top: noPos.y, scale: noScale }
              : { scale: noScale }
          }
          initial={false}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className={`ml-4 px-7 py-4 rounded-full glass text-forest-700 font-body font-medium border border-peony-200 z-20 whitespace-nowrap ${
            noPos ? 'absolute' : 'relative'
          }`}
        >
          {introQuestion.no}
        </motion.button>
      </div>

      {noCount >= 3 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="mt-8 text-xs text-forest-500 font-body"
        >
          ({noCount} attempts logged 👀)
        </motion.p>
      )}
    </div>
  )
}
