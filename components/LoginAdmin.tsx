// app/login/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const LoginForm = () => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    // Tambahkan proses autentikasi Firebase di sini (misalnya GoogleAuthProvider)
    // Contoh sementara:
    router.push('/admin/dashboard');
  };

  return (
    <div className="absolute w-[400px] h-[400px] flex flex-col items-center justify-center bg-white p-6 top-[100px] left-1/2 transform -translate-x-1/2 rounded-[25px] shadow-lg z-20 transparent-50">
      <div className="flex flex-col items-center mb-8">
        <Image src="/logo2.svg" alt="Logo" width={100} height={100} />
        <h1 className="mt-4 text-2xl font-bold text-[#333] font-['Poppins'] tracking-tight">
          &lt;indokoding/&gt;
        </h1>
      </div>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-3 bg-[#E0A6FE] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#AB4CDC] transition"
      >
        <Image src="/google.svg" alt="Google" width={20} height={20} />
        Login with Google
      </button>
      <p className="absolute bottom-4 text-gray-400 text-xs">©2018 by indokoding</p>
    </div>
  );
};

export default LoginForm;
