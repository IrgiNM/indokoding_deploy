import Image from 'next/image';
import React, { forwardRef } from 'react';

type ContactUsProps = {};

function ContactUsComponent(props: ContactUsProps, ref: React.Ref<HTMLDivElement>) {
  return (
    <>
    <div ref={ref} className="relative top-20 right-0"></div>
    <div className=' lg:w-full lg:pl-20 lg:mb-0 lg:mt-50 lg:relative lg:flex lg:flex-col lg:justify-center lg:items-center lg:pr-20 w-full px-5 mb-0 mt-50 relative flex flex-col justify-center items-center'>
      <div className=' lg:w-full lg:h-50 lg:bg-gradient-to-b lg:from-[#D6FFD8] lg:to-[#A0FDFF] lg:absolute lg:-top-20 lg:-z-1 w-full h-30 bg-gradient-to-b from-[#D6FFD8] to-[#A0FDFF] absolute -top-10 -z-1'></div>
      <div className='lg:relative relative z-3 flex flex-row lg:w-200 w-70'>
        <h1 className='lg:w-180 lg:text-4xl lg:text-left lg:font-bold lg:text-[#4F006C] w-180 text-xl text-left font-bold -mb-2 text-[#4F006C]'>Contact Us</h1>
        <Image width={140} height={140} src="/all_mascot.svg" alt="" className='absolute lg:w-100 w-50 lg:-top-52 lg:-right-40 -top-22 -right-20'/>
      </div>
    
      <div className=" lg:flex lg:justify-center lg:w-250 lg:items-center lg:px-5 lg:py-5 flex flex-col justify-center items-center px-5 py-5 w-full">
        <div className=" lg:flex lg:flex-col lg:md:flex-row lg:w-full lg:max-w-6xl lg:bg-white lg:border-[1px] lg:border-[#97BED7] lg:rounded-3xl lg:shadow-xl lg:p-6 lg:gap-10 flex flex-col justify-center items-center md:flex-row w-full max-w-6xl bg-white border-[1px] border-[#97BED7] rounded-xl shadow-xl p-6 gap-10">
          <div className=" lg:w-full lg:md:w-2/3 lg:flex lg:flex-col lg:gap-4 w-full md:w-2/3 flex flex-col justify-center items-center gap-4">
            <div className=" lg:flex lg:flex-col lg:md:flex-row lg:gap-4 w-full flex flex-col md:flex-row gap-4">
              <input
                className=" lg:bg-[#D9DFFC] lg:rounded-3xl lg:text-sm lg:px-5 lg:py-3 lg:text-[#4F006C] lg:w-full bg-[#D9DFFC] rounded-lg text-[12px] px-5 py-2 text-[#4F006C] w-full"
                type="email"
                placeholder="Name"
              />
              <input
                className=" lg:bg-[#D9DFFC] lg:rounded-3xl lg:text-sm lg:px-5 lg:py-3 lg:text-[#4F006C] lg:w-full bg-[#D9DFFC] rounded-lg text-[12px] px-5 py-2 text-[#4F006C] w-full"
                type="text"
                placeholder="Email"
              />
            </div>

            <input
              className=" lg:bg-[#D9DFFC] lg:rounded-3xl lg:text-sm lg:px-5 lg:py-3 lg:text-[#4F006C] lg:w-full bg-[#D9DFFC] rounded-lg text-[12px] px-5 py-2 text-[#4F006C] w-full"
              type="text"
              placeholder="Subject"
            />

            <textarea
              className=" lg:bg-[#D9DFFC] lg:rounded-3xl lg:text-sm lg:px-5 lg:py-4 lg:text-[#4F006C] lg:h-40 lg:w-full lg:resize-none bg-[#D9DFFC] rounded-lg text-[12px] px-5 py-4 text-[#4F006C] h-40 w-full resize-none"
              placeholder="Message"
            ></textarea>

            <button className=" lg:bg-[#181F38] lg:text-white lg:text-sm lg:font-bold lg:py-3 lg:rounded-3xl lg:w-full lg:hover:bg-[#303b69] lg:transition bg-[#181F38] text-[12px] text-white font-semibold py-3 rounded-3xl w-full hover:bg-[#303b69] transition">
              Send
            </button>
          </div>

          
          <div className=" lg:w-full lg:md:w-1/3 lg:flex lg:flex-col lg:gap-4 lg:text-[#4F006C] w-full md:w-1/3 flex flex-col justify-center items-center gap-4 text-[#4F006C]">
            
            <div className=" lg:bg-[#D9DFFC] lg:flex lg:flex-row lg:items-center lg:p-4 lg:pl-7 lg:rounded-2xl bg-[#D9DFFC] flex flex-row items-center p-4 pl-7 rounded-xl w-full">
              <Image width={140} height={140} src="/icon-jam.svg" alt="" className=' lg:w-8 lg:mr-5 w-6 mr-5'/>
              <div>
                <p className="font-semibold text-[12px] text-[#181F38]">Monday - Friday</p>
                <p className="lg:text-sm text-[12px] text-[#181F38]">7 AM - 6 PM</p>
              </div>
            </div>
            
            <div className=" lg:bg-[#D9DFFC] lg:flex lg:flex-row lg:items-center lg:p-4 lg:pl-7 lg:rounded-2xl bg-[#D9DFFC] flex flex-row items-center p-4 pl-7 rounded-xl w-full">
              <Image width={140} height={140} src="/icon-phone.svg" alt="" className=' lg:w-8 lg:mr-5 w-6 mr-5'/>
              <div>
                <p className="lg:font-semibold font-semibold text-[12px] text-[#181F38]">+62274 540448</p>
                <p className="lg:text-sm text-[12px] text-[#181F38]">+622745306395</p>
              </div>
            </div>

            
            <div className=" lg:bg-[#D9DFFC] lg:flex lg:flex-row lg:items-center lg:p-4 lg:pl-7 lg:rounded-2xl bg-[#D9DFFC] flex flex-row items-center p-4 pl-7 rounded-xl w-full">
              <Image width={140} height={140} src="/icon-email.svg" alt="" className=' lg:w-8 lg:mr-5 w-6 mr-5'/>
              <div>
                <p className="lg:text-sm text-[12px] text-[#181F38]">info@indokoding.com</p>
              </div>
            </div>

            
            <div className="lg:mt-4 mt-4 flex flex-col justify-center items-center">
              <p className=" lg:mb-2 lg:text-extrabold mb-2 text-extrabold text-[12px]">Follow our social media</p>
              <div className=" lg:flex lg:gap-4 flex gap-4">
                <div className=" lg:bg-[#D9DFFC] lg:w-10 lg:h-10 lg:rounded-full lg:flex lg:items-center lg:justify-center bg-[#D9DFFC] w-10 h-10 rounded-full flex items-center justify-center">
                  <Image width={140} height={140} src="/fb-black.svg" alt="" className=' lg:w-3 w-3'/>
                </div>
                <div className=" lg:bg-[#D9DFFC] lg:w-10 lg:h-10 lg:rounded-full lg:flex lg:items-center lg:justify-center bg-[#D9DFFC] w-10 h-10 rounded-full flex items-center justify-center">
                  <Image width={140} height={140} src="/ig-black.svg" alt="" className='lg:w-5 w-5'/>
                </div>
                <div className=" lg:bg-[#D9DFFC] lg:w-10 lg:h-10 lg:rounded-full lg:flex lg:items-center lg:justify-center bg-[#D9DFFC] w-10 h-10 rounded-full flex items-center justify-center">
                  <Image width={140} height={140} src="/x-black.svg" alt="" className='lg:w-4 w-4'/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1450.0329966036097!2d110.30648249266326!3d-7.785142307915073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7af70009a10b4b%3A0x2a213bb1df2a7745!2sCV%20Indokoding%20Sukses%20Makmur!5e0!3m2!1sen!2sid!4v1753343284581!5m2!1sen!2sid" className=' lg:w-full lg:h-80 lg:-mt-10 w-full h-80 -mt-10'></iframe>
    </>
  );
}

const ContactUs = forwardRef(ContactUsComponent);
export default ContactUs;