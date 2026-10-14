import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PeonySVG from './PeonySVG'
import CatSVG from './CatSVG'
import { TapPop } from './EasterEggs'
import { easterEggs } from '../data/content'

// SHA-256 of the 4-digit PIN — the plain code is not written anywhere in the code.
const PIN_HASH = '736e537f0f664a3d8208e88c114f2c5a16fff5800e5c146b0b83b1c43213d003'
const PIN_LENGTH = 4

// Plain-JS SHA-256, used when the browser's built-in crypto isn't available
// (some phones block it when the site is opened as a downloaded file).
function sha256Fallback(text) {
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01,
    0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
    0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08,
    0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ]
  const H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]
  const bytes = Array.from(new TextEncoder().encode(text))
  const bitLen = bytes.length * 8
  bytes.push(0x80)
  while (bytes.length % 64 !== 56) bytes.push(0)
  for (let i = 7; i >= 0; i--) bytes.push(i >= 4 ? 0 : (bitLen >>> (i * 8)) & 0xff)
  const rotr = (x, n) => (x >>> n) | (x << (32 - n))
  const W = new Array(64)
  for (let off = 0; off < bytes.length; off += 64) {
    for (let t = 0; t < 16; t++) {
      const j = off + t * 4
      W[t] = ((bytes[j] << 24) | (bytes[j + 1] << 16) | (bytes[j + 2] << 8) | bytes[j + 3]) >>> 0
    }
    for (let t = 16; t < 64; t++) {
      const s0 = rotr(W[t - 15], 7) ^ rotr(W[t - 15], 18) ^ (W[t - 15] >>> 3)
      const s1 = rotr(W[t - 2], 17) ^ rotr(W[t - 2], 19) ^ (W[t - 2] >>> 10)
      W[t] = (W[t - 16] + s0 + W[t - 7] + s1) >>> 0
    }
    let [a, b, c, d, e, f, g, h] = H
    for (let t = 0; t < 64; t++) {
      const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)
      const ch = (e & f) ^ (~e & g)
      const t1 = (h + S1 + ch + K[t] + W[t]) >>> 0
      const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)
      const maj = (a & b) ^ (a & c) ^ (b & c)
      const t2 = (S0 + maj) >>> 0
      h = g
      g = f
      f = e
      e = (d + t1) >>> 0
      d = c
      c = b
      b = a
      a = (t1 + t2) >>> 0
    }
    H[0] = (H[0] + a) >>> 0
    H[1] = (H[1] + b) >>> 0
    H[2] = (H[2] + c) >>> 0
    H[3] = (H[3] + d) >>> 0
    H[4] = (H[4] + e) >>> 0
    H[5] = (H[5] + f) >>> 0
    H[6] = (H[6] + g) >>> 0
    H[7] = (H[7] + h) >>> 0
  }
  return H.map((x) => x.toString(16).padStart(8, '0')).join('')
}

async function sha256(text) {
  try {
    if (window.crypto && window.crypto.subtle) {
      const digest = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
      return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    }
  } catch (e) {
    /* fall back below */
  }
  return sha256Fallback(text)
}

const WRONG = ['Hmm, not quite. Try again. 🦋', "That's not it, princess.", 'So close. (Not really.)', 'Psst. Ask Hades.']

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del']

export default function PasswordGate({ onUnlock }) {
  const [code, setCode] = useState('')
  const [wrong, setWrong] = useState(0)
  const [shake, setShake] = useState(0)
  const [state, setState] = useState('idle') // idle | checking | bad | good
  const busy = useRef(false)
  const codeRef = useRef('')

  const check = async (full) => {
    busy.current = true
    setState('checking')
    let ok = false
    try {
      ok = (await sha256(full)) === PIN_HASH
    } catch (err) {
      ok = false
    }
    if (ok) {
      setState('good')
      setTimeout(onUnlock, 450)
      return
    }
    setState('bad')
    setWrong((n) => n + 1)
    setShake((n) => n + 1)
    setTimeout(() => {
      codeRef.current = ''
      setCode('')
      setState('idle')
      busy.current = false
    }, 420)
  }

  const press = (k) => {
    if (busy.current) return
    const c = codeRef.current
    const next = k === 'del' ? c.slice(0, -1) : c.length >= PIN_LENGTH ? c : c + k
    codeRef.current = next
    setCode(next)
    if (k !== 'del' && next.length === PIN_LENGTH && c.length < PIN_LENGTH) check(next)
  }

  // a real keyboard works too (laptop)
  const pressRef = useRef(press)
  pressRef.current = press
  useEffect(() => {
    const on = (e) => {
      if (/^[0-9]$/.test(e.key)) pressRef.current(e.key)
      else if (e.key === 'Backspace') pressRef.current('del')
    }
    window.addEventListener('keydown', on)
    return () => window.removeEventListener('keydown', on)
  }, [])

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-4"
      >
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <PeonySVG size={96} className="drop-shadow-[0_0_35px_rgba(255,143,179,0.45)]" />
        </motion.div>
      </motion.div>

      <p className="font-body text-sm tracking-wide text-forest-600/70 mb-2">A tiny door, made just for you...</p>
      <h1 className="font-display text-3xl text-forest-800 mb-6 max-w-xs text-shadow-soft">Enter the code 🦋</h1>

      {/* the four dots */}
      <motion.div
        key={shake}
        animate={{ x: shake ? [0, -12, 12, -8, 8, 0] : 0 }}
        transition={{ duration: 0.4 }}
        className="flex gap-4 mb-2"
        aria-live="polite"
        aria-label={`${code.length} of ${PIN_LENGTH} digits entered`}
      >
        {Array.from({ length: PIN_LENGTH }, (_, i) => {
          const filled = i < code.length
          return (
            <motion.span
              key={i}
              animate={{ scale: filled ? 1.18 : 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              className={`block w-4 h-4 rounded-full border-2 transition-colors duration-200 ${
                state === 'good'
                  ? 'bg-forest-400 border-forest-500'
                  : state === 'bad'
                    ? 'bg-red-400 border-red-400'
                  : filled
                    ? 'bg-gradient-to-br from-peony-400 to-peony-600 border-transparent'
                    : 'border-peony-300'
              }`}
            />
          )
        })}
      </motion.div>

      <p className="min-h-[1.75rem] mt-1 mb-3 font-body text-sm italic text-peony-600">
        {state === 'good' ? 'Welcome in, princess 💗' : wrong > 0 ? WRONG[(wrong - 1) % WRONG.length] : ''}
      </p>

      {/* keypad */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {KEYS.map((k, i) =>
          k === '' ? (
            <span key={i} />
          ) : (
            <motion.button
              key={i}
              type="button"
              onClick={() => press(k)}
              whileTap={{ scale: 0.88 }}
              aria-label={k === 'del' ? 'delete' : k}
              className={`w-[68px] h-[68px] sm:w-[72px] sm:h-[72px] rounded-full glass border border-peony-100 shadow-sm flex items-center justify-center select-none active:bg-peony-200/70 transition-colors ${
                k === 'del' ? 'font-body text-xl text-forest-500' : 'font-display text-2xl text-forest-800'
              }`}
            >
              {k === 'del' ? '⌫' : k}
            </motion.button>
          )
        )}
      </div>

      <div className="mt-8 flex flex-col items-center">
        <TapPop below messages={easterEggs.passwordHint} hold={3600}>
          <motion.span
            className="block drop-shadow-md"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <CatSVG size={64} variant="tortie" />
          </motion.span>
        </TapPop>
        <span className="mt-1 font-body text-xs italic text-forest-500/80">Hades · tap for hint</span>
      </div>
    </div>
  )
}
