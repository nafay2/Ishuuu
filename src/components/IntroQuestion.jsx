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
  const yesRef = useRef(null)
  const headingRef = useRef(null)

  const onPeonyClick = () => {
    const next = peonyClicks + 1
    setPeonyClicks(next)
    if (next === 5) {
      setPeonyMsg(easterEggs.peony[0])
      setTimeout(() => setPeonyMsg(easterEggs.peony[1]), 1400)
      setTimeout(() => setPeonyMsg(null), 3200)
    }
  }

  // Every "No" makes the question more dramatic: Really? → Really really? → ...
  const message =
    noCount === 0
      ? introQuestion.question
      : `${Array.from({ length: noCount }, (_, i) => (i === 0 ? 'Really' : 'really')).join(' ')}? 😗`

  // the old playful lines still appear, as a little comment underneath
  const comment =
    noCount === 0
      ? null
      : introQuestion.noMessages[Math.min(noCount - 1, introQuestion.noMessages.length - 1)]

  const yesScale = Math.min(1 + noCount * 0.06, 1.5)
  const noScale = Math.max(1 - noCount * 0.04, 0.7)
  const headingSize =
    noCount > 9 ? 'text-xl md:text-3xl' : noCount > 4 ? 'text-2xl md:text-4xl' : 'text-3xl md:text-5xl'

  const dodge = (countIt = true) => {
    const container = containerRef.current
    if (!container) return
    const rect = container.getBoundingClientRect()
    const btnW = 130 * noScale
    const btnH = 56 * noScale
    const padding = 16
    const maxX = Math.max(rect.width - btnW - padding * 2, 0)
    const maxY = Math.max(rect.height - btnH - padding * 2, 0)

    const rel = (el) => {
      if (!el) return null
      const r = el.getBoundingClientRect()
      return { l: r.left - rect.left, t: r.top - rect.top, r: r.right - rect.left, b: r.bottom - rect.top }
    }
    const avoid = [rel(yesRef.current), rel(headingRef.current)].filter(Boolean)
    const hits = (x, y) =>
      avoid.some((a) => x < a.r + 8 && x + btnW > a.l - 8 && y < a.b + 8 && y + btnH > a.t - 8)

    let x = padding
    let y = padding
    for (let tries = 0; tries < 30; tries++) {
      x = padding + Math.random() * maxX
      y = padding + Math.random() * maxY
      if (!hits(x, y)) break
    }
    setNoPos({ x, y })
    if (countIt) setNoCount((c) => c + 1)
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
          ref={headingRef}
          key={message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className={`font-display ${headingSize} text-forest-800 mb-3 max-w-md text-shadow-soft`}
        >
          {message}
        </motion.h1>
      </AnimatePresence>

      <p className="font-body text-sm italic text-forest-600/80 min-h-[1.5rem] mb-7 max-w-xs">{comment}</p>

      <div className="w-full max-w-sm h-24 flex items-center justify-center">
        <motion.button
          ref={yesRef}
          animate={{ scale: yesScale }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          whileTap={{ scale: yesScale * 0.94 }}
          onClick={onYes}
          className="relative z-10 px-8 py-4 rounded-full bg-gradient-to-br from-peony-400 to-peony-600 text-white font-body font-medium shadow-glow text-base md:text-lg"
        >
          {introQuestion.yes}
        </motion.button>

        <motion.button
          onClick={() => dodge(true)}
          onPointerEnter={(e) => {
            // mouse only: hovering makes it slip away (no counting); touch taps are counted once via onClick
            if (e.pointerType === 'mouse' && noCount > 0) dodge(false)
          }}
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
