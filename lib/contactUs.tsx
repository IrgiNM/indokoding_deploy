import Image from 'next/image';
import React from 'react';

export default function ContactUs() {
  return (
    
    <div className=' lg:w-full lg:pl-20 lg:mb-60 lg:mt-50 lg:relative lg:flex lg:flex-col lg:justify-center lg:items-center lg:pr-20 w-full bg-gradient-to-r from-[#D6FFD8] to-[#A0FDFF] py-6 relative text-center' >
      <div className=' lg:w-full lg:h-50 lg:bg-gradient-to-b lg:from-[#D6FFD8] lg:to-[#A0FDFF] lg:absolute lg:-top-20 lg:-z-1 '></div>
      <Image width={140} height={140} src="/all_mascot.svg" alt="" className=' lg:absolute lg:w-100 lg:-top-52 lg:right-20' />
      <a href="https://maps.app.goo.gl/1XpcLZoMr6bhypjw6" className=' lg:absolute lg:w-317 lg:h-65 lg:left-0 lg:-bottom-60'></a>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1450.0329966036097!2d110.30648249266326!3d-7.785142307915073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7af70009a10b4b%3A0x2a213bb1df2a7745!2sCV%20Indokoding%20Sukses%20Makmur!5e0!3m2!1sen!2sid!4v1753343284581!5m2!1sen!2sid" 
        className=' lg:absolute lg:w-317 lg:h-80 lg:right-0 lg:-bottom-60 lg:-z-1'></iframe>
      

      <h1 className=' lg:w-180 lg:text-4xl lg:text-left lg:font-bold lg:text-[#4F006C]'>Contact Us</h1>
    
      <div className=" lg:flex lg:justify-center lg:w-250 lg:items-center lg:px-5 lg:py-5">
        <div className=" lg:flex lg:flex-col lg:md:flex-row lg:w-full lg:max-w-6xl lg:bg-white lg:border-[1px] lg:border-[#97BED7] lg:rounded-3xl lg:shadow-xl lg:p-6 lg:gap-10">
          <div className=" lg:w-full lg:md:w-2/3 lg:flex lg:flex-col lg:gap-4">
            <div className=" lg:flex lg:flex-col lg:md:flex-row lg:gap-4">
              <input
                className=" lg:bg-[#D9DFFC] lg:rounded-3xl lg:text-sm lg:px-5 lg:py-3 lg:text-[#4F006C] lg:w-full"
                type="email"
                placeholder="Name"
              />
              <input
                className=" lg:bg-[#D9DFFC] lg:rounded-3xl lg:text-sm lg:px-5 lg:py-3 lg:text-[#4F006C] lg:w-full"
                type="text"
                placeholder="Email"
              />
            </div>

            <input
              className=" lg:bg-[#D9DFFC] lg:rounded-3xl lg:px-5 lg:text-sm lg:py-3 lg:text-[#4F006C] lg:w-full"
              type="text"
              placeholder="Subject"
            />

            <textarea
              className=" lg:bg-[#D9DFFC] lg:rounded-3xl lg:text-sm lg:px-5 lg:py-4 lg:text-[#4F006C] lg:h-40 lg:w-full lg:resize-none"
              placeholder="Message"
            ></textarea>

            <button className=" lg:bg-[#181F38] lg:text-white lg:font-bold lg:py-3 lg:rounded-3xl lg:w-full lg:hover:bg-[#303b69] lg:transition">
              Send
            </button>
          </div>

          
          <div className=" lg:w-full lg:md:w-1/3 lg:flex lg:flex-col lg:gap-4 lg:text-[#4F006C]">
            
            <div className=" lg:bg-[#D9DFFC] lg:flex lg:flex-row lg:items-center lg:p-4 lg:pl-7 lg:rounded-2xl">
              <Image width={140} height={140} src="/icon-jam.svg" alt="" className=' lg:w-8 lg:mr-5'/>
              <div>
                <p className="lg:font-semibold">Monday - Friday</p>
                <p className="lg:text-sm">7 AM - 6 PM</p>
              </div>
            </div>

            
            <div className=" lg:bg-[#D9DFFC] lg:flex lg:flex-row lg:items-center lg:p-4 lg:pl-7 lg:rounded-2xl">
              {/* <p className="text-sm">+62274 540448</p>
              <p className="text-sm">+622745306395</p> */}
              <Image width={140} height={140} src="/icon-phone.svg" alt="" className=' lg:w-8 lg:mr-5'/>
              <div>
                <p className="lg:font-semibold">+62274 540448</p>
                <p className="lg:text-sm">+622745306395</p>
              </div>
            </div>

            
            <div className=" lg:bg-[#D9DFFC] lg:flex lg:flex-row lg:items-center lg:p-4 lg:pl-7 lg:rounded-2xl">
              {/* <p className="text-sm">info@indokoding.com</p> */}
              <Image width={140} height={140} src="/icon-email.svg" alt="" className=' lg:w-8 lg:mr-5'/>
              <div>
                <p className="lg:text-sm">info@indokoding.com</p>
              </div>
            </div>

            
            <div className="lg:mt-4">
              <p className=" lg:mb-2 lg:text-extrabold">Follow our social media</p>
              <div className=" lg:flex lg:gap-4">
                <div className=" lg:bg-[#D9DFFC] lg:w-10 lg:h-10 lg:rounded-full lg:flex lg:items-center lg:justify-center">
                  <Image width={140} height={140} src="/fb.svg" alt="" className='lg:w-3'/>
                </div>
                <div className=" lg:bg-[#D9DFFC] lg:w-10 lg:h-10 lg:rounded-full lg:flex lg:items-center lg:justify-center">
                  <Image width={140} height={140} src="/ig.svg" alt="" className='lg:w-5'/>
                </div>
                <div className=" lg:bg-[#D9DFFC] lg:w-10 lg:h-10 lg:rounded-full lg:flex lg:items-center lg:justify-center">
                  <Image width={140} height={140} src="/x.svg" alt="" className='lg:w-4'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
