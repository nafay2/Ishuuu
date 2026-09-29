import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PeonySVG from './PeonySVG'
import { finalScreen } from '../data/content'

export default function FinalScreen() {
  const [stage, setStage] = useState('ask') // ask | yes | maybe

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 py-16 text-center overflow-hidden bg-gradient-to-b from-forest-900 via-forest-700 to-icy-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="mb-8"
      >
        <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
          <PeonySVG size={150} className="drop-shadow-[0_0_60px_rgba(255,179,203,0.6)]" />
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {stage === 'ask' && (
          <motion.div
            key="ask"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-sm text-cream/70 mb-2">{finalScreen.question}</p>
            <h1 className="font-display text-3xl md:text-5xl text-cream mb-10 max-w-md text-shadow-soft">
              {finalScreen.ask}
            </h1>
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStage('yes')}
                className="px-8 py-4 rounded-full bg-gradient-to-br from-peony-400 to-peony-600 text-white font-body font-medium shadow-glow"
              >
                {finalScreen.yes}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStage('maybe')}
                className="px-8 py-4 rounded-full glass-dark border border-white/20 text-cream font-body font-medium"
              >
                {finalScreen.maybe}
              </motion.button>
            </div>
          </motion.div>
        )}

        {stage === 'yes' && (
          <motion.div
            key="yes"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <h2 className="font-display text-3xl md:text-5xl text-cream">{finalScreen.afterYes.good}</h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="font-body text-base md:text-lg text-cream/85 max-w-md mx-auto"
            >
              {finalScreen.afterYes.reason}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="font-body text-sm text-cream/60 pt-4"
            >
              {finalScreen.afterYes.until}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="font-display italic text-2xl md:text-4xl text-butter-200 drop-shadow-[0_0_25px_rgba(253,226,133,0.4)] pt-2"
            >
              {finalScreen.afterYes.favorite}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-3xl pt-3"
            >
              😚💗
            </motion.p>
          </motion.div>
        )}

        {stage === 'maybe' && (
          <motion.div
            key="maybe"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {finalScreen.afterMaybe.map((line, i) => (
              <p key={i} className="font-body text-base md:text-lg text-cream/85">
                {line}
              </p>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStage('yes')}
              className="mt-4 px-7 py-3 rounded-full bg-gradient-to-br from-peony-400 to-peony-600 text-white font-body text-sm font-medium"
            >
              okay fine, obviously 😚
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
