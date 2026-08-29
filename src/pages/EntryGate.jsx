import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const PASSCODE = "100904";
const LENGTH = 6;

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
        setTimeout(() => onNext(), 600);
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
            "radial-gradient(ellipse at center, rgba(244,63,94,0.12) 0%, rgba(217,70,239,0.06) 30%, rgba(10,10,11,1) 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-1/4 left-1/3 h-[300px] w-[300px] rounded-full bg-fuchsia-500/5 blur-[100px]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-sm px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="rounded-2xl border border-zinc-800/60 bg-zinc-900/60 p-8 shadow-2xl backdrop-blur-xl"
          animate={
            error
              ? { x: [0, -8, 8, -6, 6, -3, 3, 0] }
              : { x: 0 }
          }
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <h1 className="mb-2 text-center text-xl font-semibold tracking-tight text-zinc-100">
            Welcome back
          </h1>
          <p className="mb-8 text-center text-sm text-zinc-400">
            Enter the passcode to continue
          </p>

          {/* PIN input */}
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                autoFocus={i === 0}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className={`h-14 w-11 rounded-xl border bg-neutral-950 text-center text-xl font-semibold text-zinc-100 outline-none transition-all focus:ring-2 ${
                  error
                    ? "border-red-500/50 focus:ring-red-500/40"
                    : digit
                    ? "border-rose-500/50 focus:ring-rose-500/40"
                    : "border-zinc-700/50 focus:border-rose-500/50 focus:ring-rose-500/40"
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

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 flex justify-center"
            >
              <Heart className="h-5 w-5 text-rose-400" fill="currentColor" />
            </motion.div>
          )}
        </motion.div>

        {/* Hint */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          Hint: her birthday
        </p>
      </motion.div>
    </div>
  );
}
