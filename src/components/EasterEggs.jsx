import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CatSVG from './CatSVG'
import { easterEggs } from '../data/content'

function Bubble({ text, below = false, center = false }) {
  // the outer wrapper handles position/centering; the inner element only animates
  const place = below ? 'top-full mt-2' : 'bottom-full mb-2'
  const align = center ? 'inset-x-0 flex justify-center' : 'left-0'
  return (
    <div className={`pointer-events-none absolute z-50 ${place} ${align}`}>
      <AnimatePresence>
        {text && (
          <motion.div
            initial={{ opacity: 0, y: below ? -6 : 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: below ? 6 : -6, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="shrink-0 w-max max-w-[210px] text-center glass !bg-white/95 px-3.5 py-2 rounded-2xl text-xs font-body text-forest-700 shadow-md"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Wrap anything in <TapPop messages={[...]}> and tapping it shows a little rotating popup.
export function TapPop({ messages, children, className = '', below = false, hold = 2200 }) {
  const [i, setI] = useState(null)
  const timer = useRef(null)

  const onTap = () => {
    setI((n) => (n === null ? 0 : (n + 1) % messages.length))
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setI(null), hold)
  }

  return (
    <span className={`relative inline-block ${className}`}>
      <Bubble center below={below} text={i !== null ? messages[i] : null} />
      <span role="button" tabIndex={0} onClick={onTap} onKeyDown={(ev) => ev.key === 'Enter' && onTap()} className="cursor-pointer">
        {children}
      </span>
    </span>
  )
}

// A tappable cat with a name tag; the parent decides which popup is showing.
function CatBuddy({ variant, name, text, onTap, size = 76, slow = false }) {
  return (
    <div className="relative flex flex-col items-center">
      <Bubble center text={text} />
      <motion.button
        type="button"
        onClick={onTap}
        whileTap={{ scale: 0.88, rotate: -6 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ y: { duration: slow ? 4.4 : 3.6, repeat: Infinity, ease: 'easeInOut' } }}
        aria-label={`say hi to ${name}`}
        className="drop-shadow-md"
      >
        <CatSVG size={size} variant={variant} />
      </motion.button>
      <span className="mt-1 font-display italic text-sm text-forest-600">{name}</span>
    </div>
  )
}

// Hades (independent) and Percy (clingy baby) — one popup at a time.
export function CatCorner() {
  const [shown, setShown] = useState({ who: null, i: 0 })
  const timer = useRef(null)

  const tap = (who, list) => {
    setShown((cur) => ({ who, i: cur.who === who ? (cur.i + 1) % list.length : 0 }))
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setShown((c) => ({ ...c, who: null })), 2800)
  }

  return (
    <div className="flex justify-center gap-14">
      <CatBuddy
        variant="grey"
        name="Hades"
        text={shown.who === 'hades' ? easterEggs.hades[shown.i] : null}
        onTap={() => tap('hades', easterEggs.hades)}
      />
      <CatBuddy
        variant="patch"
        name="Percy"
        slow
        text={shown.who === 'percy' ? easterEggs.percy[shown.i] : null}
        onTap={() => tap('percy', easterEggs.percy)}
      />
    </div>
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
    <div className="fixed bottom-3 left-3 z-40 safe-bottom">
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
    <div className="fixed top-3 left-3 z-40 safe-top">
      <div className="relative">
        <Bubble below text={step === 1 ? easterEggs.dontClick[0] : step === 2 ? easterEggs.dontClick[1] : null} />
        <button
          onClick={onClick}
          className="glass rounded-full text-[11px] font-body text-forest-500/80 px-3 py-1.5 shadow-sm"
        >
          don't click
        </button>
      </div>
    </div>
  )
}
