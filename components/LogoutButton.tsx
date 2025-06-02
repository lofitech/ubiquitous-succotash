import { supabase } from '../lib/supabase'
import { useRouter } from 'next/router'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
    >
      Logout
    </button>
  )
}
