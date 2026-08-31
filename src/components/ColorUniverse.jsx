import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colorOrbs } from '../data/content'
import PageShell from './PageShell'

const backgrounds = {
  blue: 'radial-gradient(circle at 50% 30%, rgba(147,219,233,0.5), rgba(224,246,250,0.2) 60%, transparent)',
  green: 'radial-gradient(circle at 50% 30%, rgba(58,122,77,0.35), rgba(220,236,224,0.15) 60%, transparent)',
  yellow: 'radial-gradient(circle at 50% 30%, rgba(251,210,94,0.45), rgba(255,248,220,0.15) 60%, transparent)',
  pink: 'radial-gradient(circle at 50% 30%, rgba(255,143,179,0.45), rgba(255,233,240,0.15) 60%, transparent)',
}

export default function ColorUniverse({ onNext }) {
  const [active, setActive] = useState('pink')

  return (
    <PageShell onNext={onNext} nextLabel="One more thing →">
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-all duration-1000"
        style={{ background: backgrounds[active] }}
      />
      <p className="uppercase tracking-[0.2em] text-xs text-forest-500/70 font-body mb-2">Your little universe</p>
      <h2 className="font-display text-2xl md:text-4xl text-forest-800 max-w-xl mx-auto mb-10">
        Every color you love, in one place.
      </h2>

      <div className="grid grid-cols-2 gap-6 md:gap-10 max-w-lg mx-auto place-items-center">
        {colorOrbs.map((orb) => (
          <motion.button
            key={orb.key}
            onClick={() => setActive(orb.key)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: active === orb.key ? 1.1 : 1 }}
            className="flex flex-col items-center gap-3 focus:outline-none"
          >
            <div
              className={`w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${orb.className} shadow-lg flex items-center justify-center text-3xl animate-floatSlow`}
              style={{
                boxShadow: active === orb.key ? '0 0 50px rgba(255,255,255,0.5)' : undefined,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {orb.emoji}
            </div>
            <div className="text-center">
              <p className="font-display text-sm md:text-base text-forest-800">{orb.label}</p>
              <AnimatePresence mode="wait">
                {active === orb.key && (
                  <motion.p
                    key={orb.key}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-body text-xs text-forest-600/80 mt-0.5"
                  >
                    {orb.mood}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        ))}
      </div>
    </PageShell>
  )
}
