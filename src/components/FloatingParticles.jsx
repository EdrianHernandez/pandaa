import { useMemo } from "react";

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const size = randomBetween(2, 4);
      const x = randomBetween(0, 100);
      const y = randomBetween(100, 140);
      const duration = randomBetween(18, 35);
      const delay = randomBetween(0, 20);
      const swayDuration = randomBetween(6, 14);
      const opacity = randomBetween(0.08, 0.28);
      const isPink = Math.random() > 0.4;

      return {
        id: i,
        style: {
          position: "absolute",
          left: `${x}%`,
          top: `${y}%`,
          width: size,
          height: size,
          borderRadius: "50%",
          background: isPink
            ? `rgba(236, 72, 153, ${opacity})`
            : `rgba(217, 70, 239, ${opacity})`,
          boxShadow: isPink
            ? `0 0 ${size * 2}px rgba(236, 72, 153, ${opacity * 0.5})`
            : `0 0 ${size * 2}px rgba(217, 70, 239, ${opacity * 0.5})`,
          animation: `float-up ${duration}s linear ${delay}s infinite, sway ${swayDuration}s ease-in-out ${delay}s infinite`,
          willChange: "transform, opacity",
        },
      };
    });
  }, []);

  return (
    <>
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-140vh);
            opacity: 0;
          }
        }
        @keyframes sway {
          0%, 100% {
            margin-left: 0;
          }
          50% {
            margin-left: 30px;
          }
        }
      `}</style>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {particles.map((p) => (
          <div key={p.id} style={p.style} />
        ))}
      </div>
    </>
  );
}
