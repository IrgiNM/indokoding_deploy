import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Footer(
  {
    link,
    // page,
    onNavClick,
  }: {
    link: string;
    page: string;
    onNavClick: {
      ourWork?: () => void;
      aboutUs?: () => void;
      contactUs?: () => void;
      ourSkill?: () => void;
      ourService?: () => void;
      careerApply?: () => void;
    };
  }
) {
  const router = useRouter();
  // const pathname = usePathname();
  // const [bgNav, setBgNav] = useState(page);

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
      <div className=" lg:flex flex gap-1 -mt-2">
        <a href="https://www.instagram.com/indokoding/">
          <Image width={140} height={140} src="/fb.svg" alt="Facebook" className="cursor-pointer lg:w-6lg:h-6 w-6 h-6" />
        </a>
        <a href="https://www.instagram.com/indokoding/"></a>
        <Image width={140} height={140} src="/ig.svg" alt="Instagram" className=" cursor-pointer lg:w-6 lg:h-6 w-6 h-6" />
      </div>
    </div>

    {/* Bagian Kanan (Links) */}
    <div className=" lg:flex lg:flex-wrap lg:md:space-x-12 lg:mt-10 lg:md:mt-0 flex flex-wrap md:space-x-12 gap-10 md:mt-0">
      <div>
        <h3 className=" lg:text-lg lg:font-semibold lg:mb-2 text-xm font-semibold mb-2">EXPLORE</h3>
        <ul className=" lg:space-y-2 lg:text-sm space-y-2 text-[10px]">
          <li><button onClick={()=>{
            router.push('/')
          }} className=" lg:hover:text-gray-300 hover:text-gray-300">Home</button></li>
          <li><button onClick={()=>{
            if(link === "career" || link === "bookOnline") {
              router.push("/#OurWork");
            }
            // setBgNav("Our Work");
            onNavClick.ourWork?.();
          }} className="lg:hover:text-gray-300 hover:text-gray-300">Our Work</button></li>
          <li><button onClick={()=>{
            if(link === "career" || link === "bookOnline") {
              router.push("/#AboutUs");
            }
            // setBgNav("About Us");
            onNavClick.aboutUs?.();
          }} className="lg:hover:text-gray-300 hover:text-gray-300">About Us</button></li>
          <li><button onClick={()=>{
            if(link === "career" || link === "bookOnline") {
              router.push("/#ContactUs");
            }
            // setBgNav("Contact");
            onNavClick.contactUs?.();
          }} className="lg:hover:text-gray-300 hover:text-gray-300">Contact</button></li>
          <li><button onClick={()=>{
            // setBgNav("Career");
            router.push("/career");
          }} className="lg:hover:text-gray-300 hover:text-gray-300">Careers Online</button></li>
          <li><button onClick={()=>{
            // setBgNav("Book Online");
            router.push("/bookOnline");
          }} className="lg:hover:text-gray-300 hover:text-gray-300">Book Online</button></li>
        </ul>
      </div>
      <div>
        <h3 className=" lg:text-lg lg:font-semibold lg:mb-2 text-xm font-semibold mb-2">ABOUT</h3>
        <ul className=" lg:space-y-2 lg:text-sm space-y-2 text-[10px]">
          <li><button onClick={()=>{
            if(link === "career" || link === "bookOnline") {
              router.push("/#AboutUs");
            }
            // setBgNav("About Us");
            onNavClick.aboutUs?.();
          }} className="lg:hover:text-gray-300 hover:text-gray-300">About Us</button></li>
          <li><button onClick={()=>{
            if(link === "career" || link === "bookOnline") {
              router.push("/#OurSkill");
            }
            // setBgNav("About Us");
            onNavClick.ourSkill?.();
          }} className="lg:hover:text-gray-300 hover:text-gray-300">Our Skills</button></li>
          <li><button onClick={()=>{
            if(link === "career" || link === "bookOnline") {
              router.push("/#Service");
            }
            // setBgNav("About Us");
            onNavClick.ourService?.();
          }} className="lg:hover:text-gray-300 hover:text-gray-300">Our Services</button></li>
        </ul>
      </div>
      <div>
        <h3 className=" lg:text-lg lg:font-semibold lg:mb-2 text-xm font-semibold mb-2">CAREER</h3>
        <ul className=" lg:space-y-2 lg:text-sm space-y-2 text-[10px]">
          <li><button onClick={()=>{
            // setBgNav("Career");
            router.push("/career");
          }} className="lg:hover:text-gray-300 hover:text-gray-300">Join Us</button></li>
          <li><button onClick={()=>{
            if(link === "home" || link === "bookOnline") {
              router.push("/career/#CareerApply");
            }
            // setBgNav("Career");
            // router.push("/career");
            onNavClick.careerApply?.();
          }} className="lg:hover:text-gray-300 hover:text-gray-300">Last Careers</button></li>
        </ul>
      </div>
    </div>
  </div>
</footer>


  );
};