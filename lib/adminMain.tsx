import React from 'react'
import { auth, provider, signInWithPopup } from '../firebase/config';

export default function AdminMain() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Kirim email ke API
      const response = await fetch('/api/save-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.text();
      alert(data);
    } catch (error) {
      // console.error('Login error:', error);
    }
  };

  return (
    <div className='w-full h-1000 flex justify-center items-center bg-[#f4f7ff]'>
      <button onClick={handleLogin}>Login dengan Google</button>
    </div>
  )
}
