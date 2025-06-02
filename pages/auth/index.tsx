
import ParticlesBackground from "../../components/ParticlesBackground";

export default function AuthPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <ParticlesBackground />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white text-black p-6 rounded shadow">
          <h1 className="text-2xl font-bold">Login</h1>
          {/* AuthForm kann hier importiert werden */}
        </div>
      </div>
    </div>
  );
}
