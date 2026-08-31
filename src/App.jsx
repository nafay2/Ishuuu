import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import FloatingPetals from './components/FloatingPetals'
import IntroQuestion from './components/IntroQuestion'
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
  const [stage, setStage] = useState('intro') // intro | celebrating | main
  const [pageIndex, setPageIndex] = useState(0)

  const isFinal = pageIndex === PAGES.length - 1
  const PageComponent = PAGES[pageIndex]

  const goNext = () => setPageIndex((i) => Math.min(i + 1, PAGES.length - 1))

  return (
    <div className="grain relative min-h-screen w-full bg-cream overflow-x-hidden">
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
