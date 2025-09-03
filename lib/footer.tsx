import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const Footer: React.FC = () => {
  const router = useRouter();

  const onHandleClick = () => {
    router.push('/admin'); // Ganti '/loginAdmin' sesuai tujuan kamu
  };

  return (
<footer className=" lg:bg-[#412E57] lg:text-white lg:py-12 lg:px-6 lg:w-full bg-[#412E57] text-white py-12 px-0 w-full">
  <div className=" lg:max-w-screen-xl lg:mx-auto lg:px-25 lg:flex lg:flex-col lg:md:flex-row lg:md:justify-between lg:gap-10 px-10 flex flex-col md:flex-row md:justify-between gap-10">
    {/* Bagian Kiri */}
    <div className =" lg:flex lg:flex-col lg:gap-4 lg:md:w-1/2 flex flex-col  gap-4 md:w-1/2">
      <div className=" lg:flex lg:items-center lg:gap-4 flex items-center gap-4">
        <Image onClick={onHandleClick}
        width={140} height={140} src="/indokoding-polos.svg" alt="indokoding" className=" lg:w-16 lg:h-16 w-8 h-8 " />
        <div>
          <span className=" lg:text-2xl lg:font-bold lg:block text-xm   font-bold block">&lt;indokoding/&gt;</span>
          <span className=" lg:text-xs lg:font-light lg:block text-xs font-light block">IT Service</span>
        </div>
      </div>
      <p className=" lg:text-sm lg:max-w-md lg:leading-relaxed lg:text-justify text-[10px] max-w-md leading-relaxed text-justify">
        We are a boutique software development company that started from a band of developers who excel in developing apps with great flexibility and always listen to client needs.
      </p>
      <div className=" lg:flex lg:space-x-4 flex space-x-4 -mt-2">
        <Image width={140} height={140} src="/fb.svg" alt="Facebook" className="cursor-pointer lg:w-6lg:h-6 w-6 h-6" />
        <Image width={140} height={140} src="/ig.svg" alt="Instagram" className=" cursor-pointer lg:w-6 lg:h-6 w-6 h-6" />
        <Image width={140} height={140} src="/x.svg" alt="Twitter" className=" cursor-pointer lg:w-6 lg:h-6 w-6 h-6" />
      </div>
    </div>

    {/* Bagian Kanan (Links) */}
    <div className=" lg:flex lg:flex-wrap lg:md:space-x-12 lg:mt-10 lg:md:mt-0 flex flex-wrap md:space-x-12 gap-10 md:mt-0">
      <div>
        <h3 className=" lg:text-lg lg:font-semibold lg:mb-2 text-xm font-semibold mb-2">EXPLORE</h3>
        <ul className=" lg:space-y-2 lg:text-sm space-y-2 text-[10px]">
          <li><a href="#" className=" lg:hover:text-gray-300 hover:text-gray-300">Home</a></li>
          <li><a href="#" className="lg:hover:text-gray-300 hover:text-gray-300">Our Work</a></li>
          <li><a href="#" className="lg:hover:text-gray-300 hover:text-gray-300">About Us</a></li>
          <li><a href="#" className="lg:hover:text-gray-300 hover:text-gray-300">Contact</a></li>
          <li><a href="#" className="lg:hover:text-gray-300 hover:text-gray-300">Careers Online</a></li>
          <li><a href="#" className="lg:hover:text-gray-300 hover:text-gray-300">Book Online</a></li>
        </ul>
      </div>
      <div>
        <h3 className=" lg:text-lg lg:font-semibold lg:mb-2 text-xm font-semibold mb-2">ABOUT</h3>
        <ul className=" lg:space-y-2 lg:text-sm space-y-2 text-[10px]">
          <li><a href="#" className="lg:hover:text-gray-300 hover:text-gray-300">About Us</a></li>
          <li><a href="#" className="lg:hover:text-gray-300 hover:text-gray-300">Our Skills</a></li>
          <li><a href="#" className="lg:hover:text-gray-300 hover:text-gray-300">Our Services</a></li>
        </ul>
      </div>
      <div>
        <h3 className=" lg:text-lg lg:font-semibold lg:mb-2 text-xm font-semibold mb-2">CAREER</h3>
        <ul className=" lg:space-y-2 lg:text-sm space-y-2 text-[10px]">
          <li><a href="#" className="lg:hover:text-gray-300 hover:text-gray-300">Join Us</a></li>
          <li><a href="#" className="lg:hover:text-gray-300 hover:text-gray-300">Last Careers</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>


  );
};

export default Footer;