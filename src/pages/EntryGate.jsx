import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Heart } from "lucide-react";

const PASSCODE = "lovepanda";

export default function EntryGate({ onNext }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === PASSCODE) {
      setSuccess(true);
      setTimeout(() => onNext(), 600);
    } else {
      setError(true);
      setTimeout(() => setError(false), 800);
      setInput("");
    }
  };

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
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10">
              <Lock className="h-6 w-6 text-rose-400" />
            </div>
          </div>

          {/* Header */}
          <h1 className="mb-2 text-center text-xl font-semibold tracking-tight text-zinc-100">
            Welcome back
          </h1>
          <p className="mb-8 text-center text-sm text-zinc-400">
            Enter the passcode to continue
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Passcode"
                autoFocus
                className={`w-full rounded-xl border bg-neutral-950 px-4 py-3 text-sm text-zinc-100 outline-none transition-all placeholder:text-zinc-600 focus:ring-2 focus:ring-rose-500/40 ${
                  error
                    ? "border-red-500/50"
                    : "border-zinc-700/50 focus:border-rose-500/50"
                }`}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-red-400"
                >
                  Incorrect passcode. Try again.
                </motion.p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={!input.trim()}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all ${
                success
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "gradient-pink text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30 disabled:opacity-40"
              }`}
            >
              {success ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <Heart className="h-4 w-4" fill="currentColor" />
                </motion.div>
              ) : (
                <>
                  Enter
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Hint */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          Hint: what&apos;s my name?
        </p>
      </motion.div>
    </div>
  );
}
