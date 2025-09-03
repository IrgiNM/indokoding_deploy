import Image from 'next/image';
import React from 'react';

const Decorations = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#A1D6FF] min-h-screen">
      {/* Tambahkan elemen dekorasi seperti gambar atau ikon */}
      <Image width={140} height={140} src="/D6FFDC.svg" alt="decoration" className="w-[80px] absolute bottom-0 right-0" />
      <Image width={140} height={140} src="/5685BF.svg" alt="decoration" className="w-[350px] h-[350px] absolute top-[-50px] right-0" />
      <Image width={140} height={140} src="/F1D6FF.svg" alt="decoration" className="w-[350px] h-[350px] absolute bottom-[-50px] left-0" />
    </div>
  );
};

export default Decorations;