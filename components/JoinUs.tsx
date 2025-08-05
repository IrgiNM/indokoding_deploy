import React from 'react';

export default function JoinUs() {
  return (
<div>
          <div className="w-60 h-20 relative rounded-[87px] z-20 rotate-[-3deg] top-[-135px] left-[-10px]">
            <div className="w-60 h-16 left-0 top-[17.07px] absolute bg-white/25 rounded-[87px] border-[5px] border-[#307CFF] backdrop-blur-[2.60px]" />
            <div className="w-56 h-14 left-[9.35px] top-[30.74px] absolute text-center justify-start text-[#2C507A] text-4xl font-extrabold font-poppins leading-10 italic">Join Us</div>
          </div>
          <p className="mb-6 relative font-poppins top-[-120px] right-[-10px] z-20">Join with our passionate team and together shape the world.</p>
          <div className="flex justify-center items-center h-screen"> 
            <div className="w-[869px] h-90 bg-blue-100 rounded-[20px] shadow-[6px_4px_4px_0px_rgba(44,80,122,0.25)] outline-1 outline-slate-400/70 absolute left-[-100px] top-43 z-7" />
            <div className="w-[869px] h-90 bg-[#A3D7FF] rounded-[20px] shadow-[6px_4px_4px_0px_rgba(44,80,122,0.25)] absolute left-[-93px] top-43 z-5 rotate-6" />
              <div className="relative z-21 top-[-300px] right-[250px] space-y-4 ">
                  <div className="flex space-x-2">
                    <input type="text" placeholder="Your Name" className="bg-white px-6 py-3 rounded-[20px] w-[420px]" />
                    <input type="text" placeholder="How much rate do you want?" className="bg-white px-6 py-3 rounded-[20px] w-[260px]" />
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-2">
                        <input type="text" placeholder="What position do you" className="text-sm bg-white px-6 py-3 rounded-[20px] w-[205px] h-[50px]" />
                        <input type="text" placeholder="Where are you come from?" className="text-sm bg-white px-6 py-3 rounded-[20px] w-[205px] h-[50px]" />
                      </div>
                      <div className="flex space-x-2">
                        <input type="email" placeholder="Your email" className="text-sm bg-white px-6 py-3 rounded-[20px] w-[205px] h-[50px]" />
                        <input type="tel" placeholder="Your phone number" className="text-sm bg-white px-6 py-3 rounded-[20px] w-[205px] h-[50px]" />
                      </div>
                    </div>
                    <input type="text" placeholder="Some more words, maybe?" className="bg-white px-6 py-3 rounded-[20px] w-[260px] h-[110px]" />
                    </div>
                  <button className="mt-[6] px-6 py-2 bg-[#2C507A] text-white rounded-[20px]">Submit</button>
                </div>
          </div>
  </div>
  );
}