import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-900 text-white py-6 px-75">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start">
        {/* Logo dan Deskripsi */}
        <div className="mb-6 md:mb-0">
          <div className="flex items-center mb-2">
            <span className="text-2xl font-bold">indokoding/</span>
          </div>
          <p className="text-sm max-w-xs">
            We are an IT Service software development started from a band of developers that excel in developing apps with great flexibility and always listen to client needs.
          </p>
          <div className="flex space-x-4 mt-4 ">
            <a href="#" className="text-white hover:text-gray-300"><span className="sr-only">Facebook</span>🇫</a>
            <a href="#" className="text-white hover:text-gray-300"><span className="sr-only">Twitter</span>🐦</a>
            <a href="#" className="text-white hover:text-gray-300"><span className="sr-only">Instagram</span>📷</a>
          </div>
        </div>

        {/* Kolom Menu */}
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
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
      <p className="text-sm max-w-md leading-relaxed">
        We are a boutique software development company that started from a band of developers who excel in developing apps with great flexibility and always listen to client needs.
      </p>
      <div className="flex space-x-4">
        <Image width={140} height={140} src="/fb.svg" alt="Facebook" className="w-6 h-6" />
        <Image width={140} height={140} src="/ig.svg" alt="Instagram" className="w-6 h-6" />
        <Image width={140} height={140} src="/x.svg" alt="Twitter" className="w-6 h-6" />
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
</footer>


  );
};

export default Footer;