import UserProfile from '../../components/UserProfile';

export default function ProfilePage() {
  return (
    <main className="p-8 bg-gray-900 min-h-screen text-white space-y-4">
      <h1 className="text-2xl font-bold">⚙️ Profil</h1>
      <UserProfile />
    </main>
  );
}
