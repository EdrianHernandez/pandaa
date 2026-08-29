import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingParticles from "./components/FloatingParticles";
import EntryGate from "./pages/EntryGate";
import LabJournal from "./pages/LabJournal";
import Gallery from "./pages/Gallery";
import Letter from "./pages/Letter";

const TOTAL_STEPS = 3;

const stepVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const stepTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.4,
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () => setCurrentStep((s) => s + 1);
  const progress = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-neutral-950 text-neutral-100">
      <FloatingParticles />

      {/* Progress bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] bg-zinc-800/50">
        <motion.div
          className="h-full gradient-pink"
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        />
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <motion.div
            key="gate"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
            className="min-h-screen"
          >
            <EntryGate onNext={goNext} />
          </motion.div>
        )}
        {currentStep === 1 && (
          <motion.div
            key="lab"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
          >
            <LabJournal onNext={goNext} />
          </motion.div>
        )}
        {currentStep === 2 && (
          <motion.div
            key="gallery"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
          >
            <Gallery onNext={goNext} />
          </motion.div>
        )}
        {currentStep === 3 && (
          <motion.div
            key="letter"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={stepTransition}
          >
            <Letter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
