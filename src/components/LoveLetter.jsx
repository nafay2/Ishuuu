import { motion } from 'framer-motion'
import { letter } from '../data/content'
import PageShell from './PageShell'
import { TapPop } from './EasterEggs'
import { easterEggs } from '../data/content'

export default function LoveLetter({ onNext }) {
  return (
    <PageShell onNext={onNext} nextLabel="One more thing →">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="max-w-lg mx-auto glass rounded-3xl px-6 py-10 md:px-10 md:py-12 text-left shadow-glow"
      >
        <h2 className="font-display italic text-2xl md:text-3xl text-forest-800 mb-6 text-center">
          {letter.heading}
        </h2>
        <div className="space-y-4">
          {letter.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="font-body text-[15px] md:text-base leading-relaxed text-forest-700"
            >
              {p}
            </motion.p>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="font-display text-lg md:text-xl text-peony-600 mt-8 text-center"
        >
          <TapPop messages={easterEggs.popups.letterSignoff}>{letter.signoff}</TapPop>
        </motion.p>
      </motion.div>
    </PageShell>
  )
}
