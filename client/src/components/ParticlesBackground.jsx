import {useCallback} from "react";
import {Particles} from "@tsparticles/react";
import {loadSlim} from "@tsparticles/slim";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          color: {
            value: "#18181b", // Dark zinc 900
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#14b8a6", // Teal 500
          },
          links: {
            color: "#14b8a6", // Teal 500
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: {min: 1, max: 3},
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
