import { motion } from 'framer-motion'
import { loveThings, loveThingsClosing } from '../data/content'
import PageShell from './PageShell'
import { TapPop } from './EasterEggs'
import { easterEggs } from '../data/content'

export default function LoveThings({ onNext }) {
  return (
    <PageShell onNext={onNext} nextLabel="There's more →">
      <p className="uppercase tracking-[0.2em] text-xs text-forest-500/70 font-body mb-2">Things I love about you</p>
      <h2 className="font-display text-2xl md:text-4xl text-forest-800 max-w-xl mx-auto mb-10">
        Not generic. Just... true.
      </h2>

      <div className="max-w-lg mx-auto space-y-3 text-left">
        {loveThings.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: (i % 5) * 0.08 }}
            className="font-body text-base md:text-lg text-forest-700 pl-4 border-l-2 border-peony-300"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="font-display italic text-xl md:text-2xl text-peony-600 mt-12 max-w-md mx-auto"
      >
        <TapPop messages={easterEggs.popups.loveClosing}>{loveThingsClosing}</TapPop>
      </motion.p>
    </PageShell>
  )
}
