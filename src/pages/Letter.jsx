import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import FlowerBloom from "../components/FlowerBloom";

const paragraphs = [
  "I've been trying to figure out exactly what to say, but honestly, no amount of words could ever really capture what you mean to me. So, this is my best shot—just a really honest letter to the person who changed everything. I still look at you and wonder how I got so incredibly lucky that you chose me. Sometimes I can't help but ask myself if I even deserve to be noticed by you. We're complete opposites, really—I'm the guy who usually goes unnoticed, while you are the exact opposite. You just stand out and shine.",
  "Before you, I had no idea love could feel like this. I didn't know someone's voice could literally be the thing I look forward to most every day. Just hearing you call me \"mahal,\" \"love,\" or \"baby\" is honestly enough to turn my whole day around. You showed me that love isn't just some feeling—it's like gravity. It just pulls you in and makes everything feel a lot more centered.",
  "I really want you to know that I never take us for granted. Between my dev projects and your MedTech stuff, things get insanely chaotic. But what means the absolute most to me is how we never let any of that get in the way. No matter how heavy our workloads get, we always make time for each other, without fail.",
  "You've shown me what it means to be totally understood. Not just the version of myself I show everyone else, but the real me—the guy who overthinks, who gets quiet when everything is too much, who breaks down crying out of frustration over acads, and who sometimes just can't find the right words. You see all of that, and you make it feel safe.",
  "I really love the little things about you, too. Like how I keep catching myself just staring at your eyes because I love them so much. Or the quiet comfort of just sitting beside you at a coffee shop while you're completely in your zone studying. And I can't even explain how joyful it makes me when you kiss me in public. It feels so natural and warm, almost like we're already husband and wife sharing a sweet goodbye kiss before heading home. I notice all these little details, and I cherish them so much.",
  "So, I guess this is my thank-you note. Thank you for being so patient with me, and for believing in us. Every single moment we share—whether we're out exploring somewhere new or just sitting together in comfortable silence—I hold onto it. With you, even the super ordinary days turn into memories I never want to forget.",
  "I love you—not just for who you are, but for the person I become when I'm with you. I promise, for every day I get to be yours, I'm going to choose you. Again and again and again.\n\nI love you, always.",
];

const totalDelay = 0.5 + paragraphs.length * 0.15;

const ENVELOPE_W = 280;
const ENVELOPE_H = 200;
const FLAP_H = 85;

export default function Letter() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showPaper, setShowPaper] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [hasFinishedReading, setHasFinishedReading] = useState(false);
  const [isFolding, setIsFolding] = useState(false);
  const [showBouquet, setShowBouquet] = useState(false);
  const scrollRef = useRef(null);

  const handleOpen = () => {
    if (isEnvelopeOpen) return;
    setIsEnvelopeOpen(true);
    setTimeout(() => setShowPaper(true), 800);
    setTimeout(() => setShowLetter(true), 2200);
  };

  const handleScroll = useCallback((e) => {
    if (hasFinishedReading || isFolding || showBouquet) return;
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      setHasFinishedReading(true);
      setTimeout(() => setIsFolding(true), 500);
      setTimeout(() => setShowBouquet(true), 2000);
    }
  }, [hasFinishedReading, isFolding, showBouquet]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">

        {/* === ENVELOPE STATE === */}
        <AnimatePresence>
          {!showLetter && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -40, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              className="flex flex-col items-center gap-6"
            >
              {/* Envelope */}
              <div
                className="relative cursor-pointer select-none"
                onClick={handleOpen}
                style={{ width: ENVELOPE_W, height: ENVELOPE_H }}
              >
                {/* Sneaking panda behind envelope */}
                <motion.div
                  animate={{
                    y: isEnvelopeOpen ? -40 : [0, -3, 0],
                    opacity: isEnvelopeOpen ? 0 : 1,
                  }}
                  transition={{
                    y: isEnvelopeOpen
                      ? { duration: 0.4, ease: "easeIn" }
                      : { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
                    opacity: isEnvelopeOpen ? { duration: 0.3 } : {},
                  }}
                  className="absolute z-[0]"
                  style={{ top: -65, right: -15 }}
                >
                  <svg viewBox="0 0 140 110" width="140" height="110">
                    <defs>
                      <radialGradient id="pandaFaceGrad" cx="40%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#ffffff"/>
                        <stop offset="60%" stopColor="#f5f5f5"/>
                        <stop offset="100%" stopColor="#d4d4d4"/>
                      </radialGradient>
                      <radialGradient id="pandaEarGrad" cx="45%" cy="40%" r="55%">
                        <stop offset="0%" stopColor="#2a2a2a"/>
                        <stop offset="100%" stopColor="#0d0d0d"/>
                      </radialGradient>
                      <radialGradient id="pandaPatchGrad" cx="45%" cy="40%" r="55%">
                        <stop offset="0%" stopColor="#1a1a1a"/>
                        <stop offset="100%" stopColor="#0a0a0a"/>
                      </radialGradient>
                      <radialGradient id="pandaNoseGrad" cx="40%" cy="30%" r="60%">
                        <stop offset="0%" stopColor="#3a3a3a"/>
                        <stop offset="100%" stopColor="#0d0d0d"/>
                      </radialGradient>
                    </defs>
                    {/* Ears */}
                    <circle cx="28" cy="25" r="17" fill="url(#pandaEarGrad)"/>
                    <circle cx="100" cy="25" r="17" fill="url(#pandaEarGrad)"/>
                    {/* Head */}
                    <circle cx="65" cy="68" r="42" fill="url(#pandaFaceGrad)"/>
                    <circle cx="65" cy="68" r="42" fill="none" stroke="#bbb" strokeWidth="0.5" opacity="0.3"/>
                    {/* Eye patches */}
                    <ellipse cx="48" cy="60" rx="15" ry="17" fill="url(#pandaPatchGrad)" transform="rotate(-5 48 60)"/>
                    <ellipse cx="82" cy="60" rx="15" ry="17" fill="url(#pandaPatchGrad)" transform="rotate(5 82 60)"/>
                    {/* Eyes */}
                    <circle cx="48" cy="58" r="7" fill="white"/>
                    <circle cx="82" cy="58" r="7" fill="white"/>
                    <circle cx="49.5" cy="57" r="4.5" fill="#1a1a1a"/>
                    <circle cx="83.5" cy="57" r="4.5" fill="#1a1a1a"/>
                    <circle cx="51.5" cy="55" r="1.8" fill="white"/>
                    <circle cx="85.5" cy="55" r="1.8" fill="white"/>
                    <circle cx="47" cy="61" r="0.9" fill="white" opacity="0.5"/>
                    <circle cx="81" cy="61" r="0.9" fill="white" opacity="0.5"/>
                    {/* Nose */}
                    <ellipse cx="65" cy="76" rx="5.5" ry="3.5" fill="url(#pandaNoseGrad)"/>
                    <ellipse cx="63.5" cy="74.5" rx="2" ry="1" fill="white" opacity="0.2"/>
                    {/* Mouth */}
                    <path d="M59 80 Q65 86 71 80" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    {/* Paws gripping top edge */}
                    <ellipse cx="105" cy="100" rx="10" ry="8" fill="#1a1a1a"/>
                    <ellipse cx="120" cy="92" rx="10" ry="8" fill="#1a1a1a"/>
                  </svg>
                </motion.div>

                {/* Paw holding envelope from right side */}
                <motion.div
                  animate={{
                    opacity: isEnvelopeOpen ? 0 : 1,
                    x: isEnvelopeOpen ? 20 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute z-[4]"
                  style={{ right: -12, top: "42%" }}
                >
                  <svg viewBox="0 0 30 35" width="30" height="35">
                    <ellipse cx="15" cy="20" rx="14" ry="18" fill="#1a1a1a"/>
                    <ellipse cx="10" cy="12" rx="4" ry="5" fill="#333"/>
                    <ellipse cx="20" cy="12" rx="4" ry="5" fill="#333"/>
                    <circle cx="15" cy="22" r="5" fill="#333"/>
                  </svg>
                </motion.div>

                {/* Layer 1: Back body — full rectangle */}
                <div
                  className="absolute inset-0 z-[1]"
                  style={{
                    background: "#f8f8f8",
                    border: "1px solid rgba(0, 0, 0, 0.08)",
                    borderRadius: "4px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
                  }}
                />

                {/* Layer 2: Flap — rotates open */}
                <motion.div
                  animate={{ rotateX: isEnvelopeOpen ? -180 : 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{ transformOrigin: "top", perspective: 800 }}
                  className="absolute left-0 right-0 top-0 z-[2]"
                >
                  <div
                    style={{
                      width: ENVELOPE_W,
                      height: FLAP_H,
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      background: "linear-gradient(180deg, #ffffff, #f0f0f0)",
                    }}
                  />

                </motion.div>

                {/* Layer 3: Heart seal */}
                <motion.div
                  animate={{
                    scale: isEnvelopeOpen ? 0 : 1,
                    opacity: isEnvelopeOpen ? 0 : 1,
                    rotate: isEnvelopeOpen ? 45 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute left-1/2 top-[42%] z-[3] -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="rounded-full bg-rose-500/15 p-3 shadow-sm">
                    <Heart className="h-6 w-6 text-rose-400" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Layer 4: Paper rising from envelope */}
                <motion.div
                  initial={{ y: 15, opacity: 0, scale: 0.9, rotate: 0 }}
                  animate={
                    showPaper
                      ? { y: -40, opacity: 1, scale: 1, rotate: [-0.5, 0.5, -0.3, 0] }
                      : { y: 15, opacity: 0, scale: 0.9, rotate: 0 }
                  }
                  transition={
                    showPaper
                      ? {
                          y: { type: "spring", damping: 14, stiffness: 120, mass: 0.8 },
                          opacity: { duration: 0.3, delay: 0.3, ease: "easeOut" },
                          scale: { type: "spring", damping: 12, stiffness: 100, delay: 0.15 },
                          rotate: { duration: 0.6, delay: 0.25, ease: "easeOut", times: [0, 0.3, 0.6, 1] },
                        }
                      : { duration: 0.3, ease: "easeIn" }
                  }
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${showPaper ? "z-[10]" : "z-[0]"}`}
                  style={{ width: ENVELOPE_W - 40, height: ENVELOPE_H - 40 }}
                >
                  <motion.div
                    animate={
                      showPaper
                        ? {
                            boxShadow: [
                              "0 2px 8px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
                              "0 8px 30px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.12)",
                            ],
                          }
                        : {
                            boxShadow: "0 2px 8px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
                          }
                    }
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative h-full w-full overflow-hidden rounded"
                    style={{
                      background: "linear-gradient(170deg, #faf9f6, #f5f3ee)",
                      border: "1px solid rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    {/* Paper grain */}
                    <div className="pointer-events-none absolute inset-0" style={{ opacity: 0.4 }}>
                      <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.02) 1px, rgba(0,0,0,0.02) 2px)" }} />
                      <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 3px)" }} />
                    </div>
                    {/* Fold line */}
                    <div className="pointer-events-none absolute left-4 right-4 top-1/2 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)" }} />
                  </motion.div>
                </motion.div>
              </div>

              {/* Tap hint */}
              <motion.p
                animate={{ opacity: isEnvelopeOpen ? 0 : [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: isEnvelopeOpen ? 0 : Infinity, ease: "easeInOut" }}
                className="text-xs tracking-wide text-stone-500"
              >
                Tap to open
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* === LETTER STATE === */}
        <AnimatePresence>
          {showLetter && !showBouquet && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: isFolding ? 0 : 1, y: isFolding ? -20 : 0, scale: isFolding ? 0.9 : 1 }}
              exit={{ opacity: 0, scale: 0.85, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
              style={{ perspective: 1200 }}
            >
              {/* Scrollable letter container */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="max-h-[75vh] overflow-y-auto pr-2"
                style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,0.15) transparent" }}
              >
              {/* Paper card */}
              <motion.div
                initial={{ opacity: 0, y: 20, rotateX: 0 }}
                animate={{ opacity: 1, y: 0, rotateX: isFolding ? -180 : 0 }}
                transition={{ 
                  duration: isFolding ? 0.8 : 0.6, 
                  delay: isFolding ? 0 : 0.3,
                  ease: isFolding ? "easeInOut" : [0.22, 1, 0.36, 1],
                }}
                className="relative overflow-hidden rounded-sm border p-8 md:p-12"
                style={{
                  background: "#faf5ed",
                  borderColor: "rgba(0, 0, 0, 0.06)",
                  boxShadow: "inset 0 2px 8px rgba(0,0,0,0.04), inset 0 0 2px rgba(0,0,0,0.02), 0 4px 12px rgba(80,60,40,0.12), 0 12px 32px rgba(60,40,20,0.08)",
                  transformOrigin: "top center",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Paper texture layers */}
                <div className="pointer-events-none absolute inset-0">
                  {/* Ruled lines */}
                  <div className="absolute inset-0" style={{
                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(244,114,182,0.06) 31px, rgba(244,114,182,0.06) 32px)",
                    backgroundSize: "100% 32px",
                  }} />
                  {/* Paper grain noise */}
                  <div className="absolute inset-0" style={{
                    opacity: 0.4,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                  }} />
                  {/* Warm edge vignette */}
                  <div className="absolute inset-0" style={{
                    background: "radial-gradient(ellipse at center, transparent 50%, rgba(180,140,100,0.08) 100%)",
                  }} />
                  {/* Pink tint overlay */}
                  <div className="absolute inset-0" style={{
                    background: "rgba(251,207,232,0.04)",
                  }} />
                </div>

                {/* Salutation */}
                <p className="mb-6 font-serif italic text-[15px] text-rose-500">
                  Dear Mahal,
                </p>

                {/* Letter body */}
                <div className="space-y-6">
                  {paragraphs.map((text, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.8 + i * 0.15,
                        ease: "easeOut",
                      }}
                    >
                      <p className="font-serif italic text-[15px] leading-[1.9] text-stone-700">
                        {text}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Closing divider */}
                <div className="letter-divider mx-auto my-10 w-1/3" />

                {/* Signature */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + paragraphs.length * 0.15 + 0.5 }}
                  className="text-center"
                >
                  <p className="font-serif italic text-sm text-stone-500">
                    With all my love,
                  </p>
                  <p className="gradient-pink-text mt-2 text-lg font-semibold">
                    Ed
                  </p>
                </motion.div>
              </motion.div>

              {/* Bottom heart */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 + paragraphs.length * 0.15 + 0.8 }}
                className="mt-12 flex justify-center pb-8"
              >
                <Heart className="h-4 w-4 text-rose-500/30" fill="currentColor" />
              </motion.div>
              </div>{/* end scroll container */}
            </motion.div>
          )}
        </AnimatePresence>

        {/* === BLOOMING FLOWER STATE === */}
        <AnimatePresence>
          {showBouquet && (
            <motion.div
              key="flower"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flower-scene"
              style={{ background: "#0a0a0b" }}
            >
              <FlowerBloom />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}











