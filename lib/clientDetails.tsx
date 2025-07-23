import React from 'react';

export default function ClientDetails() {
  return (
    <div className='pl-20 pr-20'>
      
      <p className='mb-20'></p>
      <h1 className='text-4xl font-bold text-[#00466C]'>Client Details</h1>
      <p className='mt-2 text-[#00466C]'>Tell Us a bit about Yourself</p>

      
      <div className='flex flex-row mt-5 gap-15 items-start'>
        
        <div className='flex flex-col justify-center items-center border-2 border-[#00466c21] rounded-3xl w-[720px] p-5'>
          <div className='flex flex-row justify-center items-center gap-5'>
            <input
              className='border border-[#4F006C] bg-purple-100 rounded-md w-84 h-10 p-5 text-[#4F006C]'
              type='text'
              placeholder='Name'
            />
            <input
              className='border border-[#4F006C] bg-purple-100 rounded-md w-80 h-10 p-5 text-[#4F006C]'
              type='text'
              placeholder='Email'
            />
          </div>

          <input
            className='border border-[#4F006C] bg-purple-100 rounded-md w-full h-10 text-[#4F006C] mt-3 p-5'
            type='text'
            placeholder='Phone Number'
          />
          <input
            className='border border-[#4F006C] bg-purple-100 rounded-md w-full h-50 text-[#4F006C] mt-3 p-5'
            type='text'
            placeholder='Add Your Message'
          />
        </div>

        
        <div className='p-4 h-fit '>
          <p className=' font-bold text-3xl text-[#4F006C]'>Booking Details</p>
          <p className='text-1  text-[#4F006C]'>Booking Details</p>
          <p className='text-1 font-bold text-[#4F006C] mb-15'>11 July 2025 at 09.30</p>
          <p className='font-bold text-3xl text-[#4F006C]'>Payment Details</p>
          <p className='text-1  text-[#4F006C] mb-10'>Free</p>

          <div className='bg-[#FFBC48] rounded-sm p-3 text-center '>
            <button className=' font-bold text-white'>Next</button>
          </div>

        </div>

        
      </div>

      <p className='mb-70'></p>
    </div>
  );
}
