import Image from 'next/image';
import React from 'react';

export default function ContactUs() {
  return (
    
    <div className='w-full pl-20 mb-60 relative flex flex-col justify-center items-center pr-20'>
      <div className='w-full h-50 bg-gradient-to-b from-[#D6FFD8] to-[#A0FDFF] absolute -top-20 -z-1'></div>
      <Image width={140} height={140} src="/all_mascot.svg" alt="" className='absolute w-100 -top-52 right-20' />
      <a href="https://maps.app.goo.gl/1XpcLZoMr6bhypjw6" className='absolute w-317 h-65 right-0 -bottom-60'></a>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1450.0329966036097!2d110.30648249266326!3d-7.785142307915073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7af70009a10b4b%3A0x2a213bb1df2a7745!2sCV%20Indokoding%20Sukses%20Makmur!5e0!3m2!1sen!2sid!4v1753343284581!5m2!1sen!2sid" className='absolute w-317 h-80 right-0 -bottom-60 -z-1'></iframe>
      

      <h1 className='w-180 text-4xl text-left font-bold text-[#4F006C]'>Contact Us</h1>
    
      <div className="flex justify-center w-250 items-center px-5 py-5">
        <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white border-[1px] border-[#97BED7] rounded-3xl shadow-xl p-6 gap-10">
          <div className="w-full md:w-2/3 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                className="bg-[#D9DFFC] rounded-3xl text-sm px-5 py-3 text-[#4F006C] w-full"
                type="email"
                placeholder="Name"
              />
              <input
                className="bg-[#D9DFFC] rounded-3xl text-sm px-5 py-3 text-[#4F006C] w-full"
                type="text"
                placeholder="Email"
              />
            </div>

            <input
              className="bg-[#D9DFFC] rounded-3xl px-5 text-sm py-3 text-[#4F006C] w-full"
              type="text"
              placeholder="Subject"
            />

            <textarea
              className="bg-[#D9DFFC] rounded-3xl text-sm px-5 py-4 text-[#4F006C] h-40 w-full resize-none"
              placeholder="Message"
            ></textarea>

            <button className="bg-[#181F38] text-white font-bold py-3 rounded-3xl w-full hover:bg-[#303b69] transition">
              Send
            </button>
          </div>

          
          <div className="w-full md:w-1/3 flex flex-col gap-4 text-[#4F006C]">
            
            <div className="bg-[#D9DFFC] flex flex-row items-center p-4 pl-7 rounded-2xl">
              <Image width={140} height={140} src="/icon-jam.svg" alt="" className='w-8 mr-5'/>
              <div>
                <p className="font-semibold">Monday - Friday</p>
                <p className="text-sm">7 AM - 6 PM</p>
              </div>
            </div>

            
            <div className="bg-[#D9DFFC] flex flex-row items-center p-4 pl-7 rounded-2xl">
              {/* <p className="text-sm">+62274 540448</p>
              <p className="text-sm">+622745306395</p> */}
              <Image width={140} height={140} src="/icon-phone.svg" alt="" className='w-8 mr-5'/>
              <div>
                <p className="font-semibold">+62274 540448</p>
                <p className="text-sm">+622745306395</p>
              </div>
            </div>

            
            <div className="bg-[#D9DFFC] flex flex-row items-center p-4 pl-7 rounded-2xl">
              {/* <p className="text-sm">info@indokoding.com</p> */}
              <Image width={140} height={140} src="/icon-email.svg" alt="" className='w-8 mr-5'/>
              <div>
                <p className="text-sm">info@indokoding.com</p>
              </div>
            </div>

            
            <div className="mt-4">
              <p className="mb-2 text-extrabold">Follow our social media</p>
              <div className="flex gap-4">
                <div className="bg-[#D9DFFC] w-10 h-10 rounded-full flex items-center justify-center">
                  <Image width={140} height={140} src="/fb.svg" alt="" className='w-3'/>
                </div>
                <div className="bg-[#D9DFFC] w-10 h-10 rounded-full flex items-center justify-center">
                  <Image width={140} height={140} src="/ig.svg" alt="" className='w-5'/>
                </div>
                <div className="bg-[#D9DFFC] w-10 h-10 rounded-full flex items-center justify-center">
                  <Image width={140} height={140} src="/x.svg" alt="" className='w-4'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
