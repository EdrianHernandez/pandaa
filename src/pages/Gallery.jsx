import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const memories = [
  {
    id: 1,
    title: "Golden Hour",
    image: "https://placehold.co/600x800/18181b/ec4899?text=Golden+Hour",
  },
  {
    id: 2,
    title: "Night Walk",
    image: "https://placehold.co/600x800/18181b/ec4899?text=Night+Walk",
  },
  {
    id: 3,
    title: "Morning Coffee",
    image: "https://placehold.co/600x800/18181b/ec4899?text=Morning+Coffee",
  },
  {
    id: 4,
    title: "Mountain Top",
    image: "https://placehold.co/600x800/18181b/ec4899?text=Mountain+Top",
  },
  {
    id: 5,
    title: "By The Sea",
    image: "https://placehold.co/600x800/18181b/ec4899?text=By+The+Sea",
  },
  {
    id: 6,
    title: "City Lights",
    image: "https://placehold.co/600x800/18181b/ec4899?text=City+Lights",
  },
  {
    id: 7,
    title: "First Sunrise",
    image: "https://placehold.co/600x800/18181b/ec4899?text=First+Sunrise",
  },
  {
    id: 8,
    title: "Quiet Afternoon",
    image: "https://placehold.co/600x800/18181b/ec4899?text=Quiet+Afternoon",
  },
];

const CARD_SIZES = [
  { width: 160, height: 220, imageH: 175 },
  { width: 180, height: 160, imageH: 115 },
  { width: 150, height: 170, imageH: 120 },
];

const ROTATIONS = [-3, -2, -1, 0, 1, 2, 3];

function getSize(id) {
  return CARD_SIZES[id % CARD_SIZES.length];
}

function getRotation(id) {
  return ROTATIONS[id % ROTATIONS.length];
}

function MarqueeRow({ items, direction = "left", duration = 50 }) {
  const duplicated = [...items, ...items];

  return (
    <div className="overflow-hidden py-4 md:py-8">
      <div
        className="relative flex w-fit gap-4 md:gap-8"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
        }}
      >
        {/* String line */}
        <div className="pointer-events-none absolute left-0 right-0 top-2 h-px bg-zinc-500/40" />

        {duplicated.map((memory, i) => {
          const size = getSize(memory.id + i);
          const rotation = getRotation(memory.id + i);
          const swingDuration = 3 + ((memory.id + i) % 3);
          const swingDelay = ((memory.id * 7 + i * 3) % 5) * 0.4;

          return (
            <div
              key={`${memory.id}-${i}`}
              className="relative shrink-0"
              style={{
                transformOrigin: "top center",
                animation: `swing ${swingDuration}s ease-in-out ${swingDelay}s infinite`,
                transform: `rotate(${rotation}deg)`,
              }}
            >
              {/* Hanging gap */}
              <div className="h-3" />

              {/* Clothespin clip */}
              <div
                className="absolute left-1/2 top-0 z-10 -translate-x-1/2"
                style={{
                  width: 30,
                  height: 40,
                  clipPath: "polygon(5% 0%, 95% 0%, 80% 100%, 20% 100%)",
                  background: "linear-gradient(180deg, #a16207, #92400e, #78350f)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                }}
              />

              {/* Polaroid card */}
              <div
                className="bg-white p-2 pb-10 shadow-lg"
                style={{
                  width: size.width,
                  height: size.height,
                  boxShadow:
                    "0 4px 20px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)",
                }}
              >
                {/* Image */}
                <div
                  className="w-full overflow-hidden bg-zinc-200"
                  style={{ height: size.imageH }}
                >
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Title in white bar */}
                <div className="flex items-center justify-center pt-2">
                  <span className="font-serif italic text-sm text-zinc-600">
                    {memory.title}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Gallery({ onNext }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-10">
      <div className="w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-center md:mb-8"
        >
          <div className="flex items-center gap-2 px-4 md:gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-rose-500/40" />
            <h1
              className="shrink-0 text-2xl font-bold tracking-tight gradient-pink-text md:text-4xl"
              style={{ textShadow: "0 0 30px rgba(236, 72, 153, 0.3), 0 0 60px rgba(236, 72, 153, 0.15)" }}
            >
              Our Gallery
            </h1>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-rose-500/40" />
          </div>
          <p className="mt-4 text-xs text-zinc-500 md:text-sm">
            A collection of our favorite moments, captured in light and color
          </p>
        </motion.div>

        {/* Marquee rows */}
        <motion.div className="space-y-3 md:space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <MarqueeRow items={memories} direction="left" duration={50} />
          <MarqueeRow items={[...memories].reverse()} direction="right" duration={55} />
        </motion.div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="gradient-pink mx-auto flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white shadow-lg shadow-pink-500/20 transition-shadow hover:shadow-pink-500/30"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}







