import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // effizienter als full, funktioniert auch stabil

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: {
          color: "#0d0d0d",
        },
        particles: {
          number: { value: 60 },
          size: { value: 3 },
          move: { enable: true, speed: 1 },
          links: { enable: true, color: "#ffffff" },
        },
      }}
    />
  );
}
