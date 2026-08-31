import { motion } from 'framer-motion'

// Shared scroll-friendly page wrapper with a consistent "next" CTA.
export default function PageShell({ children, onNext, nextLabel = 'Continue →', showNext = true }) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center relative z-10">
      <div className="w-full">{children}</div>
      {showNext && onNext && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className="mt-14 px-8 py-3.5 rounded-full glass border border-peony-200 text-forest-700 font-body font-medium"
        >
          {nextLabel}
        </motion.button>
      )}
    </div>
  )
}
