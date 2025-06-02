import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function UserProfile() {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
        setUserId(user.id);
        const { data } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single();
        if (data?.avatar_url) setAvatarUrl(data.avatar_url);
      }
      setLoading(false);
    };
    loadProfile();
  }, []);

  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert("Upload fehlgeschlagen");
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: filePath })
      .eq("id", userId);

    if (updateError) {
      alert("Profil konnte nicht aktualisiert werden");
      return;
    }

    setAvatarUrl(filePath);
    alert("Avatar erfolgreich aktualisiert!");
  };

  const getPublicUrl = () => {
    if (!avatarUrl) return "";
    const { data } = supabase.storage.from("avatars").getPublicUrl(avatarUrl);
    return data?.publicUrl || "";
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded mt-4 space-y-4">
      <h3 className="text-lg font-bold">👤 Benutzerprofil</h3>
      {loading ? (
        <p>Lade Profil...</p>
      ) : (
        <>
          <p><strong>ID:</strong> {userId}</p>
          <p><strong>E-Mail:</strong> {email}</p>
          <div>
            <p><strong>Profilbild:</strong></p>
            {avatarUrl && <img src={getPublicUrl()} alt="Avatar" className="w-24 h-24 rounded-full mt-2" />}
            <input type="file" accept="image/*" onChange={uploadAvatar} className="mt-2" />
          </div>
        </>
      )}
    </div>
  );
}
