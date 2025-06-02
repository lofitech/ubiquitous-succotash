import { supabase } from '../lib/supabase'
import { useState } from 'react'

export default function LogtimeButton() {
  const [status, setStatus] = useState('')

  const logTime = async () => {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError || !user) {
      setStatus('Nicht eingeloggt')
      return
    }

    const { error } = await supabase.from('logtimes').insert({
      user_id: user.id,
      timestamp: new Date().toISOString(),
      session_type: 'Lernen'
    })

    if (error) setStatus('Fehler: ' + error.message)
    else setStatus('Logtime gespeichert!')
  }

  return (
    <div className="space-y-2">
      <button
        onClick={logTime}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
      >
        Logtime erfassen
      </button>
      <p className="text-sm text-yellow-300">{status}</p>
    </div>
  )
}
