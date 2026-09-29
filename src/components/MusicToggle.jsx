import { useRef, useState, useEffect } from 'react'

// A tiny, entirely procedural ambient pad — no external audio files,
// no copyrighted music, and the site works perfectly with it off.
export default function MusicToggle() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef(null)
  const nodesRef = useRef(null)

  const start = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = ctxRef.current || new AudioCtx()
    ctxRef.current = ctx
    if (ctx.state === 'suspended') ctx.resume()

    const masterGain = ctx.createGain()
    masterGain.gain.value = 0
    masterGain.connect(ctx.destination)
    masterGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 1.5)

    const freqs = [261.6, 329.6, 392.0] // soft C major-ish pad
    const oscillators = freqs.map((f, i) => {
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = f
      const gain = ctx.createGain()
      gain.gain.value = 0.6 / freqs.length

      const lfo = ctx.createOscillator()
      lfo.frequency.value = 0.08 + i * 0.02
      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 0.15 / freqs.length
      lfo.connect(lfoGain)
      lfoGain.connect(gain.gain)
      lfo.start()

      osc.connect(gain)
      gain.connect(masterGain)
      osc.start()
      return { osc, lfo, gain }
    })

    nodesRef.current = { masterGain, oscillators }
  }

  const stop = () => {
    const ctx = ctxRef.current
    const nodes = nodesRef.current
    if (!ctx || !nodes) return
    nodes.masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8)
    setTimeout(() => {
      nodes.oscillators.forEach(({ osc, lfo }) => {
        try {
          osc.stop()
          lfo.stop()
        } catch (e) {
          /* already stopped */
        }
      })
      nodesRef.current = null
    }, 900)
  }

  const toggle = () => {
    if (on) stop()
    else start()
    setOn((v) => !v)
  }

  useEffect(() => {
    return () => stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <button
      onClick={toggle}
      className="fixed top-3 right-3 z-40 safe-top flex items-center gap-1.5 px-3 py-2 rounded-full glass text-xs font-body text-forest-600 shadow-sm"
      aria-pressed={on}
      aria-label="toggle our little soundtrack"
    >
      <span>{on ? '🎵' : '🔇'}</span>
      <span className="hidden sm:inline">{on ? 'our little soundtrack' : 'play our little soundtrack'}</span>
    </button>
  )
}
