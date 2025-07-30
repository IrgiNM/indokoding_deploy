import Image from 'next/image';
import React from 'react';

export default function ContactUsSm() {
  return (
    <div className="w-full flex flex-col items-center bg-white">
      
      <div className="w-full bg-gradient-to-r from-[#D6FFD8] to-[#A0FDFF] py-6 relative text-center">
        <h1 className="text-2xl mr-30 font-bold text-[#4F006C]">Contact Us</h1>
        <Image
          src="/assets/image/turu.png"
          alt="Ilustrasi"
          width={100}
          height={100}
          className="absolute right-5 z-50 -top-5 w-34 h-auto"
        />
      </div>

      
      <div className=" max-w-sm bg-white border border-[#97BED7] rounded-2xl p-10 -mt-5 shadow-md z-10">
        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="bg-[#D9DFFC] rounded-xl px-4 py-2 text-sm text-[#4F006C]"
          />
          <input
            type="text"
            placeholder="Subject"
            className="bg-[#D9DFFC] rounded-xl px-4 py-2 text-sm text-[#4F006C]"
          />
          <input
            type="text"
            placeholder="Name"
            className="bg-[#D9DFFC] rounded-xl px-4 py-2 text-sm text-[#4F006C]"
          />
          <textarea
            placeholder="Message"
            className="bg-[#D9DFFC] rounded-xl px-4 py-3 text-sm text-[#4F006C] resize-none h-28"
          ></textarea>
          <button
            type="submit"
            className="bg-[#181F38] hover:bg-[#303b69] text-white font-semibold py-2 rounded-full"
          >
            Send
          </button>
        </form>

        
        <div className="mt-6 flex flex-col gap-3 text-[#4F006C] text-sm">
          <div className="flex items-center gap-3 bg-[#D9DFFC] px-4 py-3 rounded-xl">
            <Image src="/icon-jam.svg" width={14} height={14} alt="Jam" />
            <div className='text-[10px]'>
              <p className="font-semibold">Monday - Friday</p>
              <p>7 AM - 6 PM</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#D9DFFC] px-4 py-3 rounded-xl">
            <Image src="/icon-phone.svg" width={14} height={14} alt="Phone" />
            <div className='text-[10px]'>
              <p className="font-semibold">+62274 540448</p>
              <p>+622745306395</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#D9DFFC] px-6 py-5 rounded-xl">
            <Image src="/icon-email.svg" width={14} height={14} alt="Email" />
            <p className='text-[10px]' >info@indokoding.com</p>
          </div>
        </div>

        
        <div className="text-center mt-6">
          <p className="text-sm font-semibold mb-2">Follow our social media</p>
          <div className="flex justify-center gap-4">
            <div className="bg-[#D9DFFC] w-10 h-10 flex items-center justify-center rounded-full">
              <Image src="/fb.svg" alt="FB" width={16} height={16} />
            </div>
            <div className="bg-[#D9DFFC] w-10 h-10 flex items-center justify-center rounded-full">
              <Image src="/ig.svg" alt="IG" width={20} height={20} />
            </div>
            <div className="bg-[#D9DFFC] w-10 h-10 flex items-center justify-center rounded-full">
              <Image src="/x.svg" alt="X" width={16} height={16} />
            </div>
          </div>
        </div>
      </div>

      
      <iframe
        className="w-full h-64 mt-10"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1450.0329966036097!2d110.30648249266326!3d-7.785142307915073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7af70009a10b4b%3A0x2a213bb1df2a7745!2sCV%20Indokoding%20Sukses%20Makmur!5e0!3m2!1sen!2sid!4v1753343284581!5m2!1sen!2sid"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}
