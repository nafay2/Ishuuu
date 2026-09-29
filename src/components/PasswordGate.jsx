import { useState } from 'react'
import { motion } from 'framer-motion'
import PeonySVG from './PeonySVG'
import CatSVG from './CatSVG'
import { TapPop } from './EasterEggs'
import { easterEggs } from '../data/content'

// SHA-256 of the (lower-cased) password — the plain word is not written anywhere in the code.
const PASSWORD_HASH = 'b2cb6d4897440b0a9595c75bd4d2d50cc704bd75005f984d3257dca8595a514d'

async function sha256(text) {
  const bytes = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

const WRONG = [
  'Hmm, not quite. Try again. 🦋',
  "That's not it, princess.",
  'So close. (Not really.)',
]

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)
  const [wrong, setWrong] = useState(0)
  const [shake, setShake] = useState(0)
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    if (busy || !value.trim()) return
    setBusy(true)
    try {
      const h = await sha256(value.trim().toLowerCase())
      if (h === PASSWORD_HASH) {
        onUnlock()
        return
      }
    } catch (err) {
      /* fall through to "wrong" */
    }
    setWrong((n) => n + 1)
    setShake((n) => n + 1)
    setBusy(false)
  }

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-6"
      >
        <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <PeonySVG size={110} className="drop-shadow-[0_0_35px_rgba(255,143,179,0.45)]" />
        </motion.div>
      </motion.div>

      <p className="font-body text-sm tracking-wide text-forest-600/70 mb-3">A tiny door, made just for you...</p>
      <h1 className="font-display text-3xl text-forest-800 mb-8 max-w-xs text-shadow-soft">Password, please. 🦋</h1>

      <motion.form
        key={shake}
        onSubmit={submit}
        animate={{ x: shake ? [0, -10, 10, -8, 8, 0] : 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xs"
      >
        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            autoFocus
            placeholder="type it here"
            aria-label="password"
            className="w-full glass rounded-full px-5 py-3.5 pr-14 text-base font-body text-forest-800 placeholder:text-forest-400/60 outline-none focus:border-peony-300 border"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'hide password' : 'show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-lg"
          >
            {show ? '🙈' : '👀'}
          </button>
        </div>

        <p className="min-h-[1.75rem] mt-3 font-body text-sm italic text-peony-600">
          {wrong > 0 ? WRONG[(wrong - 1) % WRONG.length] : ''}
        </p>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.96 }}
          className="mt-3 px-9 py-3.5 rounded-full bg-gradient-to-br from-peony-400 to-peony-600 text-white font-body font-medium shadow-glow"
        >
          Open 💗
        </motion.button>
      </motion.form>

      <div className="mt-10 flex flex-col items-center">
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
