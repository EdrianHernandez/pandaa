import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const memories = [
  { id: 1, title: "baby doc", image: "/gallery/baby doc.jpg", orientation: "horizontal" },
  { id: 2, title: "baby ko", image: "/gallery/baby ko.jpg", orientation: "square" },
  { id: 3, title: "iyaken", image: "/gallery/iyaken.jpeg", orientation: "vertical" },
  { id: 4, title: "bebetime", image: "/gallery/bebetime.jpg", orientation: "horizontal" },
  { id: 5, title: "biggs diner", image: "/gallery/biggs diner.jpg", orientation: "vertical" },
  { id: 6, title: "crushh", image: "/gallery/crushh.jpg", orientation: "vertical" },
  { id: 7, title: "cutiee wife", image: "/gallery/cutiee wife.jpg", orientation: "horizontal" },
  { id: 8, title: "date", image: "/gallery/date.jpg", orientation: "horizontal" },
  { id: 9, title: "double date", image: "/gallery/double date.jpg", orientation: "horizontal" },
  { id: 10, title: "first date", image: "/gallery/first date.jpg", orientation: "horizontal" },
  { id: 11, title: "outlets", image: "/gallery/outlets.jpg", orientation: "horizontal" },
  { id: 12, title: "first tusok", image: "/gallery/first tusok.webp", orientation: "vertical" },
  { id: 13, title: "gandaa", image: "/gallery/gandaa.jpg", orientation: "square" },
  { id: 14, title: "hehe", image: "/gallery/hehe.jpg", orientation: "vertical" },
  { id: 15, title: "minee", image: "/gallery/minee.jpg", orientation: "horizontal" },
  { id: 16, title: "more dates", image: "/gallery/more dates.jpg", orientation: "horizontal" },
  { id: 17, title: "museum date", image: "/gallery/museum date.jpg", orientation: "vertical" },
  { id: 18, title: "my girl", image: "/gallery/my girl.jpg", orientation: "vertical" },
  { id: 19, title: "poor panda", image: "/gallery/poor panda.jpeg", orientation: "horizontal" },
  { id: 20, title: "rawr", image: "/gallery/rawr.jpg", orientation: "vertical" },
  { id: 21, title: "random", image: "/gallery/random.webp", orientation: "vertical" },
  { id: 22, title: "SB", image: "/gallery/SB.jpg", orientation: "vertical" },
  { id: 23, title: "spidey day", image: "/gallery/spidey day.jpg", orientation: "vertical" },
  { id: 24, title: "night date", image: "/gallery/night date.jpg", orientation: "vertical" },
];

const CARD_SIZES = {
  vertical:   { width: 140, height: 220, imageH: 175 },
  horizontal: { width: 210, height: 160, imageH: 120 },
  square:     { width: 160, height: 160, imageH: 115 },
};

const ROTATIONS = [-3, -2, -1, 0, 1, 2, 3];

function getSize(memory) {
  return CARD_SIZES[memory.orientation];
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
          const size = getSize(memory);
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







