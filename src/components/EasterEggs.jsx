import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CatSVG from './CatSVG'
import { easterEggs } from '../data/content'

function Bubble({ text }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap glass px-3 py-1.5 rounded-full text-xs font-body text-forest-700 shadow-sm"
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function PersistentCat() {
  const [msgIndex, setMsgIndex] = useState(null)
  const timer = useRef(null)

  const onClick = () => {
    setMsgIndex((i) => (i === null ? 0 : (i + 1) % easterEggs.cat.length))
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMsgIndex(null), 2200)
  }

  return (
    <div className="fixed bottom-20 left-4 z-40">
      <div className="relative">
        <Bubble text={msgIndex !== null ? easterEggs.cat[msgIndex] : null} />
        <motion.button
          onClick={onClick}
          whileTap={{ scale: 0.85, rotate: -8 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
          aria-label="a little cat"
          className="drop-shadow-md"
        >
          <CatSVG size={44} />
        </motion.button>
      </div>
    </div>
  )
}

export function HiddenButton() {
  const [step, setStep] = useState(0) // 0 = idle, 1 = first msg, 2 = second msg

  const onClick = () => {
    if (step === 0) {
      setStep(1)
      setTimeout(() => setStep(2), 1400)
      setTimeout(() => setStep(0), 3200)
    }
  }

  return (
    <div className="fixed top-4 left-4 z-40">
      <div className="relative">
        <Bubble text={step === 1 ? easterEggs.dontClick[0] : step === 2 ? easterEggs.dontClick[1] : null} />
        <button
          onClick={onClick}
          className="text-[10px] font-body text-forest-400/40 hover:text-forest-500/60 transition-colors px-2 py-1"
        >
          don't click
        </button>
      </div>
    </div>
  )
}
