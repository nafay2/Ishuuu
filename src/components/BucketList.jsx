import { useState } from 'react'
import { motion } from 'framer-motion'
import { bucketList } from '../data/content'
import PageShell from './PageShell'
import { PercyPeek } from './EasterEggs'
import { easterEggs } from '../data/content'

export default function BucketList({ onNext }) {
  const [saved, setSaved] = useState({})

  const toggle = (i) => setSaved((s) => ({ ...s, [i]: !s[i] }))

  return (
    <PageShell onNext={onNext} nextLabel="Keep reading →">
      <p className="uppercase tracking-[0.2em] text-xs text-forest-500/70 font-body mb-2">
        Things I want to do with you
      </p>
      <h2 className="font-display text-2xl md:text-4xl text-forest-800 max-w-xl mx-auto mb-3">
        Not promises. Just a wishlist.
      </h2>
      <p className="font-body text-sm text-forest-600/70 mb-10">tap one to save it 🤍</p>

      <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
        {bucketList.map((item, i) => {
          const isSaved = !!saved[i]
          return (
            <motion.button
              key={i}
              onClick={() => toggle(i)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-colors border ${
                isSaved ? 'bg-peony-100 border-peony-300' : 'glass border-transparent'
              }`}
            >
              <span className="text-xl shrink-0">{item.emoji}</span>
              <span className="font-body text-sm text-forest-700 flex-1">{item.text}</span>
              <motion.span
                initial={false}
                animate={{ scale: isSaved ? 1 : 0, opacity: isSaved ? 1 : 0 }}
                className="text-xs font-body text-peony-600 shrink-0"
              >
                added 💗
              </motion.span>
            </motion.button>
          )
        })}
      </div>

      <PercyPeek message={easterEggs.percyPeek} />
    </PageShell>
  )
}
