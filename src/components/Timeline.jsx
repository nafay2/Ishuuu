import { useState } from 'react'
import { motion } from 'framer-motion'
import { timelineIntro, timelineMilestones } from '../data/content'
import PageShell from './PageShell'
import { TapPop } from './EasterEggs'
import { easterEggs } from '../data/content'

export default function Timeline({ onNext }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <PageShell onNext={onNext} nextLabel="Keep going →">
      <p className="uppercase tracking-[0.2em] text-xs text-forest-500/70 font-body mb-2">
        {timelineIntro.title}
      </p>
      <h2 className="font-display text-3xl md:text-5xl text-forest-800 mb-3">
        <TapPop below messages={easterEggs.popups.timelineDate}>{timelineIntro.date}</TapPop>
      </h2>
      <p className="font-body text-forest-600/90 max-w-md mx-auto mb-10">{timelineIntro.text}</p>

      <div className="relative max-w-xl mx-auto text-left">
        <div className="absolute left-[10px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-peony-300 via-icy-300 to-forest-300" />
        <div className="space-y-4">
          {timelineMilestones.map((m, i) => {
            const open = openIndex === i
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setOpenIndex(open ? null : i)}
                className="relative pl-8 w-full text-left group"
              >
                <span className="absolute left-0 top-1.5 w-[21px] h-[21px] rounded-full bg-white border-2 border-peony-400 flex items-center justify-center shadow-glow">
                  <span className="w-2 h-2 rounded-full bg-peony-500" />
                </span>
                <div className="glass rounded-2xl px-4 py-3 shadow-sm group-hover:shadow-glow transition-shadow">
                  <p className="text-xs uppercase tracking-wide text-peony-600 font-body mb-1">{m.label}</p>
                  <p className="font-display text-lg text-forest-800">{m.title}</p>
                  <motion.p
                    initial={false}
                    animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0, marginTop: open ? 6 : 0 }}
                    className="overflow-hidden font-body text-sm text-forest-600/80"
                  >
                    {m.detail}
                  </motion.p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </PageShell>
  )
}
