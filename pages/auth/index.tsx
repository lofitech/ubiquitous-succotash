import { supabase } from "@/lib/supabase"; // Pfad anpassen
import ParticlesBackground from "../../components/ParticlesBackground";

export default function AuthPage() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github", // oder "google"
    });
    if (error) console.error("Login error:", error.message);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <ParticlesBackground />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white text-black p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <button
            onClick={handleLogin}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
