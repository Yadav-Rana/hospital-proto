import {motion} from "framer-motion";
import {useRef} from "react";

const SimpleBackground = () => {
  // Generate random positions for the particles
  const particles = useRef(
    Array.from({length: 150}, (_, i) => {
      // Randomly choose between teal and orange
      const color = Math.random() > 0.5 ? "#14b8a6" : "#f97316"; // teal-500 or orange-500
      const size = Math.random() * 3 + 1; // Smaller particles
      const glowSize = size * 3; // Larger glow for blur effect

      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        glowSize,
        color,
        duration: Math.random() * 30 + 20, // Slower movement for better effect
        delay: Math.random() * 5, // Random delay for more natural movement
      };
    })
  ).current;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-dark-zinc-900">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.glowSize}px ${particle.color}`,
            opacity: 0.6,
            filter: "blur(1px)",
            zIndex: -5,
          }}
          animate={{
            x: [0, Math.random() * 300 - 150, Math.random() * 300 - 150, 0],
            y: [0, Math.random() * 300 - 150, Math.random() * 300 - 150, 0],
            opacity: [0.4, 0.8, 0.6, 0.4], // Pulsing opacity for glow effect
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default SimpleBackground;
