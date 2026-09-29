import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import FloatingPetals from './components/FloatingPetals'
import IntroQuestion from './components/IntroQuestion'
import PasswordGate from './components/PasswordGate'
import Celebration from './components/Celebration'
import Welcome from './components/Welcome'
import Timeline from './components/Timeline'
import NoticeCards from './components/NoticeCards'
import ColorUniverse from './components/ColorUniverse'
import Questionnaire from './components/Questionnaire'
import BucketList from './components/BucketList'
import LoveThings from './components/LoveThings'
import LoveLetter from './components/LoveLetter'
import PoetrySection from './components/PoetrySection'
import FinalScreen from './components/FinalScreen'
import ProgressDots from './components/ProgressDots'
import MusicToggle from './components/MusicToggle'
import { PersistentCat, HiddenButton } from './components/EasterEggs'

// The main story, in order. Each entry is a component that receives
// an onNext prop (except the final one, which stands alone).
const PAGES = [
  Welcome,
  Timeline,
  NoticeCards,
  ColorUniverse,
  Questionnaire,
  BucketList,
  LoveThings,
  LoveLetter,
  PoetrySection,
  FinalScreen,
]

export default function App() {
  const [stage, setStage] = useState(() => {
    // stay unlocked for this browser tab, so a refresh doesn't ask again
    try {
      return sessionStorage.getItem('unlocked') === '1' ? 'intro' : 'locked'
    } catch (e) {
      return 'locked'
    }
  }) // locked | intro | celebrating | main
  const [pageIndex, setPageIndex] = useState(0)

  const isFinal = pageIndex === PAGES.length - 1
  const PageComponent = PAGES[pageIndex]

  const dark = PageComponent === PoetrySection

  const goNext = () => setPageIndex((i) => Math.min(i + 1, PAGES.length - 1))

  return (
    <div className={`grain relative min-h-screen w-full bg-cream overflow-x-hidden ${dark ? 'on-dark' : ''}`}>
      {/* soft ambient colour behind everything */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-peony-200/50 blur-3xl" />
        <div className="absolute top-1/3 -right-28 w-72 h-72 rounded-full bg-icy-200/50 blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 w-72 h-72 rounded-full bg-butter-200/40 blur-3xl" />
      </div>

      {/* fades so scrolling content never collides with the fixed buttons */}
      {stage === 'main' && !isFinal && (
        <>
          <div
            aria-hidden
            className={`pointer-events-none fixed top-0 inset-x-0 h-20 z-30 bg-gradient-to-b to-transparent ${
              dark ? 'from-forest-800 via-forest-800/70' : 'from-cream via-cream/75'
            }`}
          />
          <div
            aria-hidden
            className={`pointer-events-none fixed bottom-0 inset-x-0 h-28 z-30 bg-gradient-to-t to-transparent ${
              dark ? 'from-forest-900 via-forest-900/70' : 'from-cream via-cream/75'
            }`}
          />
        </>
      )}

      <FloatingPetals count={stage === 'main' ? 10 : 16} variant={isFinal ? 'heart' : 'petal'} />

      {stage === 'main' && !isFinal && (
        <>
          <MusicToggle />
          <HiddenButton />
          <PersistentCat />
        </>
      )}

      {stage === 'main' && <ProgressDots total={PAGES.length - 1} current={isFinal ? 0 : pageIndex + 1} />}

      <AnimatePresence mode="wait">
        {stage === 'locked' && (
          <motion.div key="locked" className="min-h-screen" exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }}>
            <PasswordGate
              onUnlock={() => {
                try {
                  sessionStorage.setItem('unlocked', '1')
                } catch (e) {
                  /* storage blocked — that's fine */
                }
                setStage('intro')
              }}
            />
          </motion.div>
        )}

        {stage === 'intro' && (
          <motion.div
            key="intro"
            className="min-h-screen"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <IntroQuestion onYes={() => setStage('celebrating')} />
          </motion.div>
        )}

        {stage === 'celebrating' && (
          <Celebration key="celebration" onDone={() => setStage('main')} />
        )}

        {stage === 'main' && (
          <motion.div
            key={`page-${pageIndex}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="min-h-screen relative"
          >
            <PageComponent onNext={isFinal ? undefined : goNext} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
