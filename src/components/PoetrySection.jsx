import { motion } from 'framer-motion'
import { poetryHeading, poetryLines, poetryClosing } from '../data/content'
import PageShell from './PageShell'
import { TapPop } from './EasterEggs'
import { easterEggs } from '../data/content'

export default function PoetrySection({ onNext }) {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-forest-800 via-forest-700 to-forest-900 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-icy-300 blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-peony-400 blur-3xl opacity-20" />
      </div>

      <PageShell onNext={onNext} nextLabel="Almost done →" showNext={false}>
        <p className="uppercase tracking-[0.25em] text-xs text-icy-200/70 font-body mb-3">
          {poetryHeading}
        </p>

        <div className="max-w-md mx-auto mt-8 space-y-5">
          {poetryLines.map((line, i) => {
            const isLast = i === poetryLines.length - 1
            return (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.7, delay: 0.05 }}
                className={
                  isLast
                    ? 'font-display italic text-xl md:text-3xl text-butter-200 drop-shadow-[0_0_25px_rgba(253,226,133,0.5)]'
                    : 'font-display italic text-lg md:text-xl text-cream/90'
                }
              >
                {line}
              </motion.p>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 flex justify-center"
        >
          <TapPop messages={easterEggs.popups.poetryDot}>
            <span className="block w-4 h-4 rounded-full bg-peony-300 shadow-glow animate-pulseGlow" />
          </TapPop>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-body text-sm text-cream/70 mt-6"
        >
          {poetryClosing}
        </motion.p>

        {onNext && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onNext}
            className="mt-12 px-8 py-3.5 rounded-full glass-dark border border-white/20 text-cream font-body font-medium"
          >
            Almost done →
          </motion.button>
        )}
      </PageShell>
    </div>
  )
}
