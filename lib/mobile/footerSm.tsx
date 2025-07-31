import Image from 'next/image';
import React from 'react';

const FooterSm: React.FC = () => {
  return (
<footer className="bg-[#412E57] text-white py-12 px-0 w-full">
  <div className=" px-10 flex flex-col md:flex-row md:justify-between gap-10">
    {/* Bagian Kiri */}
    <div className="flex flex-col  gap-4 md:w-1/2">
      <div className="flex items-center gap-4">
        <Image width={140} height={140} src="/indokoding-polos.svg" alt="indokoding" className="w-8 h-8 left-" />
        <div>
          <span className="text-xm   font-bold block">&lt;indokoding/&gt;</span>
          <span className="text-xs font-light block">IT Service</span>
        </div>
      </div>
      <p className="text-[10px] max-w-md leading-relaxed text-justify">
        We are a boutique software development company that started from a band of developers who excel in developing apps with great flexibility and always listen to client needs.
      </p>
      <div className="flex space-x-4 -mt-2">
        <Image width={140} height={140} src="/fb.svg" alt="Facebook" className="w-6 h-6" />
        <Image width={140} height={140} src="/ig.svg" alt="Instagram" className="w-6 h-6" />
        <Image width={140} height={140} src="/x.svg" alt="Twitter" className="w-6 h-6" />
      </div>
    </div>

    {/* Bagian Kanan (Links) */}
    <div className="flex flex-wrap md:space-x-12 gap-10 md:mt-0">
      <div>
        <h3 className="text-xm font-semibold mb-2">EXPLORE</h3>
        <ul className="space-y-2 text-[10px]">
          <li><a href="#" className="hover:text-gray-300">Home</a></li>
          <li><a href="#" className="hover:text-gray-300">Our Work</a></li>
          <li><a href="#" className="hover:text-gray-300">About Us</a></li>
          <li><a href="#" className="hover:text-gray-300">Contact</a></li>
          <li><a href="#" className="hover:text-gray-300">Careers Online</a></li>
          <li><a href="#" className="hover:text-gray-300">Book Online</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xm font-semibold mb-2">ABOUT</h3>
        <ul className="space-y-2 text-[10px]">
          <li><a href="#" className="hover:text-gray-300">About Us</a></li>
          <li><a href="#" className="hover:text-gray-300">Our Skills</a></li>
          <li><a href="#" className="hover:text-gray-300">Our Services</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-xm font-semibold mb-2">CAREER</h3>
        <ul className="space-y-2 text-[10px]">
          <li><a href="#" className="hover:text-gray-300">Join Us</a></li>
          <li><a href="#" className="hover:text-gray-300">Last Careers</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>


  );
};

export default FooterSm;