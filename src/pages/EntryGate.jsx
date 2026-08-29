import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const PASSCODE = "100904";
const LENGTH = 6;

function FloatingHeart({ delay, x, size }) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      initial={{ opacity: 0, y: 20, x, scale: 0.5 }}
      animate={{
        opacity: [0, 0.6, 0.6, 0],
        y: [20, -120, -260, -400],
        x: [x, x + 15, x - 10, x + 5],
        scale: [0.5, 1, 0.9, 0.6],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      <Heart
        className="text-rose-400/40"
        fill="currentColor"
        style={{ width: size, height: size }}
      />
    </motion.div>
  );
}

const hearts = [
  { delay: 0, x: -80, size: 14 },
  { delay: 1.5, x: 60, size: 10 },
  { delay: 3, x: -30, size: 16 },
  { delay: 0.8, x: 90, size: 12 },
  { delay: 2.2, x: -60, size: 11 },
];

function SuccessBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [1, 1, 0],
            scale: [0, 1.2, 0.8],
            x: Math.cos((i * 72 * Math.PI) / 180) * 60,
            y: Math.sin((i * 72 * Math.PI) / 180) * 60 - 20,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Heart className="h-4 w-4 text-rose-400" fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
}

export default function EntryGate({ onNext }) {
  const [digits, setDigits] = useState(Array(LENGTH).fill(""));
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d$/.test(value) && value !== "") return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    if (value && index < LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    const newDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);
    const nextEmpty = newDigits.findIndex((d) => !d);
    const focusIndex = nextEmpty === -1 ? LENGTH - 1 : nextEmpty;
    inputRefs.current[focusIndex]?.focus();
  };

  useEffect(() => {
    if (digits.every((d) => d !== "") && !success) {
      const code = digits.join("");
      if (code === PASSCODE) {
        setSuccess(true);
        setTimeout(() => onNext(), 1000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
          setDigits(Array(LENGTH).fill(""));
          inputRefs.current[0]?.focus();
        }, 800);
      }
    }
  }, [digits, success, onNext]);

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden">
      {/* Soft pink radial glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(244,63,94,0.15) 0%, rgba(217,70,239,0.08) 30%, rgba(10,10,11,1) 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-1/4 left-1/3 h-[300px] w-[300px] rounded-full bg-fuchsia-500/5 blur-[100px]" />
      </div>

      {/* Floating hearts */}
      <div className="pointer-events-none absolute inset-0">
        {hearts.map((h, i) => (
          <FloatingHeart key={i} {...h} />
        ))}
      </div>

      <motion.div
        className="relative z-10 px-6"
        style={{ width: "min(420px, 90vw)" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          style={{
            boxShadow: "0 0 40px rgba(236,72,153,0.08), 0 25px 50px rgba(0,0,0,0.4)",
          }}
          animate={
            error
              ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
              : { x: 0 }
          }
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {success && <SuccessBurst />}
          </AnimatePresence>

          {/* Icon */}
          <div className="mb-5 flex justify-center">
            <motion.div
              className="flex h-12 w-12 items-center justify-center rounded-2xl sm:h-14 sm:w-14"
              style={{
                background: "linear-gradient(135deg, rgba(244,63,94,0.15), rgba(217,70,239,0.15))",
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="h-6 w-6 text-rose-400" fill="currentColor" />
            </motion.div>
          </div>

          {/* Header */}
          <h1 className="mb-2 text-center text-xl font-bold tracking-tight gradient-pink-text sm:text-2xl">
            Hi Love!
          </h1>
          <p className="mb-6 text-center text-xs text-zinc-400 sm:mb-8 sm:text-sm">
            Enter your birthdate to unlock
          </p>

          {/* PIN input */}
          <div className="flex justify-center gap-1.5 sm:gap-2" onPaste={handlePaste}>
            {digits.map((digit, i) => (
              <motion.input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                autoFocus={i === 0}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                whileFocus={{ scale: 1.05 }}
                className={`h-14 w-10 rounded-xl border text-center text-lg font-semibold text-zinc-100 outline-none transition-all duration-200 sm:h-16 sm:w-11 sm:text-xl ${
                  error
                    ? "border-red-500/50 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                    : digit
                    ? "border-rose-500/50 bg-rose-500/5 focus:ring-2 focus:ring-rose-500/40"
                    : "border-zinc-700/50 bg-neutral-950 focus:border-rose-500/50 focus:ring-2 focus:ring-rose-500/40"
                }`}
              />
            ))}
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-center text-xs text-red-400"
            >
              Incorrect passcode. Try again.
            </motion.p>
          )}

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex justify-center gap-1"
              >
                <Heart className="h-4 w-4 text-rose-400" fill="currentColor" />
                <Heart className="h-5 w-5 text-pink-400" fill="currentColor" />
                <Heart className="h-4 w-4 text-rose-400" fill="currentColor" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </motion.div>
    </div>
  );
}
