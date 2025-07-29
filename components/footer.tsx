import React from 'react';

const Footer: React.FC = () => {
  return (
<footer className="bg-[#412E57] text-white py-12 px-6 w-full">
  <div className="max-w-screen-xl mx-auto px-25 flex flex-col md:flex-row md:justify-between gap-10">
    {/* Bagian Kiri */}
    <div className="flex flex-col gap-4 md:w-1/2">
      <div className="flex items-center gap-4">
        <img src="/indokoding-polos.svg" alt="indokoding" className="w-16 h-16" />
        <div>
          <span className="text-2xl font-bold block">&lt;indokoding/&gt;</span>
          <span className="text-xs font-light block">IT Service</span>
        </div>
      </div>
      <p className="text-sm max-w-md leading-relaxed">
        We are a boutique software development company that started from a band of developers who excel in developing apps with great flexibility and always listen to client needs.
      </p>
      <div className="flex space-x-4">
        <img src="/fb.svg" alt="Facebook" className="w-6 h-6" />
        <img src="/ig.svg" alt="Instagram" className="w-6 h-6" />
        <img src="/x.svg" alt="Twitter" className="w-6 h-6" />
      </div>
    </div>

    {/* Bagian Kanan (Links) */}
    <div className="flex flex-wrap md:space-x-12 mt-10 md:mt-0">
      <div>
        <h3 className="text-lg font-semibold mb-2">EXPLORE</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-gray-300">Home</a></li>
          <li><a href="#" className="hover:text-gray-300">Our Work</a></li>
          <li><a href="#" className="hover:text-gray-300">About Us</a></li>
          <li><a href="#" className="hover:text-gray-300">Contact</a></li>
          <li><a href="#" className="hover:text-gray-300">Careers Online</a></li>
          <li><a href="#" className="hover:text-gray-300">Book Online</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">ABOUT</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-gray-300">About Us</a></li>
          <li><a href="#" className="hover:text-gray-300">Our Skills</a></li>
          <li><a href="#" className="hover:text-gray-300">Our Services</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">CAREER</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="hover:text-gray-300">Join Us</a></li>
          <li><a href="#" className="hover:text-gray-300">Last Careers</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>


  );
};

export default Footer;