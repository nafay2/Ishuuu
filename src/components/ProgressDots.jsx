export default function ProgressDots({ total, current }) {
  if (current <= 0) return null
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-1.5 px-3 py-2 rounded-full glass safe-bottom pointer-events-none">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${
            i === current - 1
              ? 'w-5 bg-peony-500'
              : i < current - 1
              ? 'w-1.5 bg-peony-300'
              : 'w-1.5 bg-peony-100'
          }`}
        />
      ))}
    </div>
  )
}
