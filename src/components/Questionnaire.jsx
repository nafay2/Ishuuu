import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { questions } from '../data/content'
import PageShell from './PageShell'

function ChoiceQuestion({ q, onAnswered }) {
  const [picked, setPicked] = useState(null)

  return (
    <div className="mb-8">
      <p className="font-display text-xl md:text-2xl text-forest-800 mb-5">{q.prompt}</p>
      <div className="grid gap-3 w-full max-w-sm mx-auto">
        {q.options.map((opt, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setPicked(i)
              onAnswered()
            }}
            className={`px-4 py-3.5 rounded-2xl font-body text-[15px] md:text-base transition-colors border ${
              picked === i
                ? 'bg-peony-100 border-peony-400 text-peony-700'
                : 'glass border-peony-100 text-forest-700 hover:border-peony-300'
            }`}
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {picked !== null && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 font-body text-sm italic text-forest-600"
          >
            {q.options[picked].reaction}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function SliderQuestion({ q, onAnswered }) {
  const [val, setVal] = useState(50)
  const [touched, setTouched] = useState(false)

  return (
    <div className="mb-8 max-w-sm mx-auto">
      <p className="font-display text-xl md:text-2xl text-forest-800 mb-6">{q.prompt}</p>
      <input
        type="range"
        min={0}
        max={100}
        value={val}
        onChange={(e) => {
          setVal(Number(e.target.value))
          if (!touched) {
            setTouched(true)
            onAnswered()
          }
        }}
        className="w-full accent-peony-500 h-2"
      />
      <div className="flex justify-between text-xs font-body text-forest-500/70 mt-2">
        <span>{q.minLabel}</span>
        <span>{q.maxLabel}</span>
      </div>
      {touched && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 font-body text-sm italic text-forest-600"
        >
          {val > 70 ? "That's what I thought. 😌" : val > 30 ? 'Fair enough, honeyyy.' : "We'll work on it. 🥺"}
        </motion.p>
      )}
    </div>
  )
}

export default function Questionnaire({ onNext }) {
  const [answeredCount, setAnsweredCount] = useState(0)

  const markAnswered = () => setAnsweredCount((c) => c + 1)

  return (
    <PageShell onNext={onNext} nextLabel="Almost there →">
      <p className="uppercase tracking-[0.2em] text-xs text-forest-500/70 font-body mb-2">
        Little questions for my princess
      </p>
      <h2 className="font-display text-2xl md:text-4xl text-forest-800 max-w-xl mx-auto mb-10">
        A very serious quiz.
      </h2>

      <div className="max-w-md mx-auto">
        {questions.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="pb-6 mb-6 border-b border-peony-100 last:border-0"
          >
            {q.type === 'slider' ? (
              <SliderQuestion q={q} onAnswered={markAnswered} />
            ) : (
              <ChoiceQuestion q={q} onAnswered={markAnswered} />
            )}
          </motion.div>
        ))}
      </div>
    </PageShell>
  )
}
