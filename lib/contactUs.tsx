import React from 'react';

export default function ContactUs() {
  return (
    
    <div className='pl-20 pr-20'>
      <h1 className='text-4xl text-center font-bold text-[#4F006C]'>Contact Us</h1>
   
    <div className="flex  justify-center items-center px-5 py-10">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-xl p-6 gap-10">
        
        
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              className="bg-[#D9DFFC] rounded-3xl px-5 py-3 text-[#4F006C] w-full"
              type="email"
              placeholder="Name"
            />
            <input
              className="bg-[#D9DFFC] rounded-3xl px-5 py-3 text-[#4F006C] w-full"
              type="text"
              placeholder="Email"
            />
          </div>

          <input
            className="bg-[#D9DFFC] rounded-3xl px-5 py-3 text-[#4F006C] w-full"
            type="text"
            placeholder="Subject"
          />

          <textarea
            className="bg-[#D9DFFC] rounded-3xl px-5 py-4 text-[#4F006C] h-40 w-full resize-none"
            placeholder="Message"
          ></textarea>

          <button className="bg-[#181F38] text-white font-bold py-3 rounded-3xl w-full hover:bg-[#303b69] transition">
            Send
          </button>
        </div>

        
        <div className="w-full md:w-1/3 flex flex-col gap-4 text-[#4F006C]">
          
          <div className="bg-[#D9DFFC] p-4 rounded-2xl">
            <p className="font-semibold">Monday - Friday</p>
            <p className="text-sm">7 AM - 6 PM</p>
          </div>

          
          <div className="bg-[#D9DFFC] p-4 rounded-2xl">
            <p className="text-sm">+62274 540448</p>
            <p className="text-sm">+622745306395</p>
          </div>

          
          <div className="bg-[#D9DFFC] p-4 rounded-2xl">
            <p className="text-sm">info@indokoding.com</p>
          </div>

          
          <div className="mt-4">
            <p className="mb-2">Follow our social media</p>
            <div className="flex gap-4">
              <div className="bg-[#D9DFFC] w-8 h-8 rounded-full flex items-center justify-center">F</div>
              <div className="bg-[#D9DFFC] w-8 h-8 rounded-full flex items-center justify-center">I</div>
              <div className="bg-[#D9DFFC] w-8 h-8 rounded-full flex items-center justify-center">X</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
