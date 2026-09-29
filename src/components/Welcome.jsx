import { motion } from 'framer-motion'
import PeonySVG from './PeonySVG'
import { welcome } from '../data/content'
import { useHeartBurst } from './FloatingHearts'
import { TapPop } from './EasterEggs'
import { easterEggs } from '../data/content'

export default function Welcome({ onNext }) {
  const { triggerFromEvent, portal } = useHeartBurst()

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <TapPop messages={easterEggs.popups.welcomePeony}>
          <PeonySVG size={90} />
        </TapPop>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-display italic text-xl md:text-2xl text-peony-600 mt-4"
      >
        {welcome.eyebrow}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="font-display text-3xl md:text-5xl text-forest-800 mt-3 mb-8 max-w-lg text-shadow-soft"
      >
        Welcome,{' '}
        <span
          onClick={triggerFromEvent}
          className="cursor-pointer underline decoration-peony-300 decoration-2 underline-offset-4"
        >
          my princess
        </span>
        .
      </motion.h1>
      {portal}

      <div className="space-y-3 max-w-md mb-10">
        {welcome.lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.25, duration: 0.6 }}
            className="font-body text-base md:text-lg text-forest-600/90"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onNext}
        className="px-8 py-4 rounded-full bg-gradient-to-br from-icy-300 to-forest-400 text-white font-body font-medium shadow-glow-blue"
      >
        {welcome.cta}
      </motion.button>
    </div>
  )
}
