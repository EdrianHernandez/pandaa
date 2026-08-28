import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TICK_COUNT = 24;
const MAX_ROTATION = 270;

function MicroscopeKnob({ value, onChange, label, sensitivity, size }) {
  const knobRef = useRef(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const rotation = (value / 100) * MAX_ROTATION;
  const innerSize = size * 0.55;
  const bezelWidth = size * 0.08;
  const tickAreaSize = size - bezelWidth * 2;

  const handlePointerDown = useCallback(
    (e) => {
      isDragging.current = true;
      startY.current = e.clientY;
      startValue.current = value;
      knobRef.current?.setPointerCapture(e.pointerId);
      e.preventDefault();
    },
    [value]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging.current) return;
      const deltaY = startY.current - e.clientY;
      const newValue = startValue.current + deltaY / sensitivity;
      onChange(Math.max(0, Math.min(100, Math.round(newValue))));
    },
    [sensitivity, onChange]
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={knobRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative cursor-grab active:cursor-grabbing select-none touch-none"
        style={{ width: size, height: size }}
      >
        {/* Layer 1: Metallic bezel ring */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #52525b, #3f3f46 40%, #27272a 70%, #18181b)",
            boxShadow:
              "0 3px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.08)",
          }}
        />

        {/* Layer 2: Tick marks ring */}
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            inset: bezelWidth,
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.05s linear",
          }}
        >
          {Array.from({ length: TICK_COUNT }).map((_, i) => {
            const angle = (i / TICK_COUNT) * 360;
            const isMajor = i % 6 === 0;
            const tickLength = isMajor ? size * 0.07 : size * 0.04;
            const tickWidth = isMajor ? 1.5 : 1;
            const tickColor = isMajor
              ? "rgba(161, 161, 170, 0.7)"
              : "rgba(113, 113, 122, 0.4)";

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: "50%",
                  top: 0,
                  width: 0,
                  height: tickLength,
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: `0 ${tickAreaSize / 2}px`,
                }}
              >
                <div
                  style={{
                    width: tickWidth,
                    height: tickLength,
                    background: tickColor,
                    borderRadius: 1,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Layer 3: Knurled grip surface */}
        <div
          className="pointer-events-none absolute rounded-full"
          style={{
            inset: bezelWidth + size * 0.06,
            background: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px),
              #1c1c1f
            `,
            boxShadow:
              "inset 0 2px 6px rgba(0,0,0,0.5), inset 0 -1px 3px rgba(255,255,255,0.03)",
          }}
        />

        {/* Layer 4: Center cap with value */}
        <div
          className="pointer-events-none absolute rounded-full bg-zinc-900"
          style={{
            width: innerSize,
            height: innerSize,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow:
              "inset 0 2px 6px rgba(0,0,0,0.6), inset 0 -1px 2px rgba(255,255,255,0.04), 0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          <div className="flex h-full items-center justify-center">
            <span
              className="font-light text-zinc-300"
              style={{ fontSize: size > 80 ? "17px" : "13px" }}
            >
              {value}
            </span>
          </div>
        </div>

        {/* Layer 5: Fixed indicator line at 12 o'clock */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: "50%",
            top: bezelWidth * 0.3,
            transform: "translateX(-50%)",
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: size * 0.08,
              height: size * 0.025,
              background: "linear-gradient(90deg, #f43f5e, #ec4899)",
              boxShadow: "0 0 6px rgba(236, 72, 153, 0.5)",
            }}
          />
        </div>
      </div>

      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </span>
    </div>
  );
}

export default function LabJournal({ onNext }) {
  const [coarseValue, setCoarseValue] = useState(0);
  const [fineValue, setFineValue] = useState(0);

  const focusLevel = Math.min(coarseValue + fineValue, 100);
  const isPerfectFocus = focusLevel >= 100;
  const blurAmount = 24 - focusLevel * 0.24;

  useEffect(() => {
    if (isPerfectFocus) {
      const timer = setTimeout(() => onNext(), 800);
      return () => clearTimeout(timer);
    }
  }, [isPerfectFocus, onNext]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">

        {/* Knobs + Viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-center md:gap-10"
        >
          {/* Knobs column */}
          <div className="flex shrink-0 flex-row items-center gap-6 order-last md:order-first md:flex-col md:gap-6">
            <MicroscopeKnob
              value={coarseValue}
              onChange={setCoarseValue}
              label="Coarse"
              sensitivity={1.5}
              size={100}
            />
            <MicroscopeKnob
              value={fineValue}
              onChange={setFineValue}
              label="Fine"
              sensitivity={3.5}
              size={72}
            />
          </div>

          {/* Circular viewport */}
          <div className="relative shrink-0">
            <div
              className="rounded-full p-[3px] md:p-1"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, #52525b, #3f3f46 50%, #27272a 80%, #18181b)",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.06)",
              }}
            >
              <div className="relative h-80 w-80 overflow-hidden rounded-full bg-zinc-950 md:h-[28rem] md:w-[28rem]">
                <svg
                  viewBox="0 0 200 200"
                  className="absolute inset-0 h-full w-full"
                  style={{
                    filter: `blur(${blurAmount}px)`,
                    transition: "filter 0.1s ease-out",
                  }}
                >
                  <defs>
                    {/* Face — spherical shading */}
                    <radialGradient id="faceGrad" cx="40%" cy="35%" r="60%">
                      <stop offset="0%" stopColor="#ffffff"/>
                      <stop offset="60%" stopColor="#f5f5f5"/>
                      <stop offset="100%" stopColor="#d4d4d4"/>
                    </radialGradient>
                    {/* Ears */}
                    <radialGradient id="earGradL" cx="45%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#2a2a2a"/>
                      <stop offset="100%" stopColor="#0d0d0d"/>
                    </radialGradient>
                    <radialGradient id="earGradR" cx="55%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#2a2a2a"/>
                      <stop offset="100%" stopColor="#0d0d0d"/>
                    </radialGradient>
                    {/* Eye patches */}
                    <radialGradient id="patchGradL" cx="45%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#1a1a1a"/>
                      <stop offset="100%" stopColor="#0a0a0a"/>
                    </radialGradient>
                    <radialGradient id="patchGradR" cx="55%" cy="40%" r="55%">
                      <stop offset="0%" stopColor="#1a1a1a"/>
                      <stop offset="100%" stopColor="#0a0a0a"/>
                    </radialGradient>
                    {/* Eyes — iris gradient */}
                    <radialGradient id="eyeGrad" cx="45%" cy="40%" r="50%">
                      <stop offset="0%" stopColor="#3d2b1f"/>
                      <stop offset="70%" stopColor="#1a0e08"/>
                      <stop offset="100%" stopColor="#0d0503"/>
                    </radialGradient>
                    {/* Nose */}
                    <radialGradient id="noseGrad" cx="40%" cy="30%" r="60%">
                      <stop offset="0%" stopColor="#3a3a3a"/>
                      <stop offset="100%" stopColor="#0d0d0d"/>
                    </radialGradient>
                    {/* Drop shadow for depth */}
                    <filter id="pandaShadow" x="-10%" y="-5%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.4"/>
                    </filter>
                    {/* Ear inner highlight */}
                    <radialGradient id="earInner" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#444" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#000" stopOpacity="0"/>
                    </radialGradient>
                    {/* Blush soft gradient */}
                    <radialGradient id="blushGrad">
                      <stop offset="0%" stopColor="#f48fb1" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#f48fb1" stopOpacity="0"/>
                    </radialGradient>
                  </defs>

                  <g filter="url(#pandaShadow)">
                    {/* Ears */}
                    <circle cx="52" cy="42" r="22" fill="url(#earGradL)"/>
                    <circle cx="52" cy="42" r="13" fill="url(#earInner)"/>
                    <circle cx="148" cy="42" r="22" fill="url(#earGradR)"/>
                    <circle cx="148" cy="42" r="13" fill="url(#earInner)"/>

                    {/* Face */}
                    <circle cx="100" cy="105" r="65" fill="url(#faceGrad)"/>
                    {/* Subtle face edge shadow */}
                    <circle cx="100" cy="105" r="65" fill="none" stroke="#bbb" strokeWidth="0.5" opacity="0.3"/>

                    {/* Eye patches */}
                    <ellipse cx="75" cy="95" rx="20" ry="22" fill="url(#patchGradL)" transform="rotate(-8 75 95)"/>
                    <ellipse cx="125" cy="95" rx="20" ry="22" fill="url(#patchGradR)" transform="rotate(8 125 95)"/>

                    {/* Eyes — white */}
                    <circle cx="75" cy="93" r="9" fill="white"/>
                    <circle cx="125" cy="93" r="9" fill="white"/>
                    {/* Eyes — iris */}
                    <circle cx="76" cy="92" r="6" fill="url(#eyeGrad)"/>
                    <circle cx="126" cy="92" r="6" fill="url(#eyeGrad)"/>
                    {/* Eyes — pupil */}
                    <circle cx="77" cy="91" r="3" fill="#0a0503"/>
                    <circle cx="127" cy="91" r="3" fill="#0a0503"/>
                    {/* Eyes — highlights */}
                    <circle cx="79" cy="89" r="2" fill="white"/>
                    <circle cx="129" cy="89" r="2" fill="white"/>
                    <circle cx="75" cy="94" r="0.8" fill="white" opacity="0.6"/>
                    <circle cx="125" cy="94" r="0.8" fill="white" opacity="0.6"/>

                    {/* Nose */}
                    <ellipse cx="100" cy="115" rx="7" ry="4.5" fill="url(#noseGrad)"/>
                    {/* Nose highlight */}
                    <ellipse cx="98" cy="113.5" rx="2.5" ry="1.2" fill="white" opacity="0.25"/>

                    {/* Mouth */}
                    <path d="M93 121 Q100 129 107 121" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                    {/* Mouth center line */}
                    <line x1="100" y1="119" x2="100" y2="123" stroke="#1a1a1a" strokeWidth="1.2" strokeLinecap="round"/>

                    {/* Blush */}
                    <circle cx="58" cy="112" r="10" fill="url(#blushGrad)"/>
                    <circle cx="142" cy="112" r="10" fill="url(#blushGrad)"/>
                  </g>
                </svg>

                {/* Glass reflections */}
                <div className="pointer-events-none absolute inset-0">
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "60%",
                      height: "60%",
                      top: "-5%",
                      left: "-5%",
                      background: "radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.08), transparent 60%)",
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "15%",
                      height: "15%",
                      top: "12%",
                      left: "15%",
                      background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)",
                    }}
                  />
                </div>

                {/* Measurement rings */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  {[40, 65, 85].map((pct) => (
                    <div
                      key={pct}
                      className="absolute rounded-full"
                      style={{
                        width: `${pct}%`,
                        height: `${pct}%`,
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    />
                  ))}
                </div>

                {/* Vignette */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.6) 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: isPerfectFocus ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center font-light text-sm text-zinc-500"
        >
          Adjust the microscope knobs to bring the memory into focus
        </motion.p>

      </div>
    </div>
  );
}
