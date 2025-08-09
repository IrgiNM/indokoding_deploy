import Image from 'next/image'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function JoinUsPage() {
  const [age, setAge] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <div className=' lg:w-full lg:flex lg:flex-row lg:justify-center lg:items-center lg:relative lg:gap-20 lg:h-100 lg:mt-40 lg:mb-30 w-full flex flex-col justify-center items-center relative gap-20 h-300 mt-20 mb-30'>
      <div className='relative top-0'>
        <div className=' lg:p-8 lg:pt-8 lg:flex lg:flex-col lg:justify-center lg:items-start lg:gap-y-4 lg:bg-white lg:rounded-[20px] lg:border-[1px] lg:mt-0 lg:-ml-20 lg:border-[#307CFF] lg:w-193 p-5 pt-10 w-70 flex flex-col mt-0 justify-center items-start gap-y-4 bg-white rounded-[20px] border-[1px] ml-0  border-[#307CFF]'>
        <p className='lg:text-4xl lg:font-bold lg:italic lg:text-[#2C507A] lg:px-10 lg:pt-2 lg:pb-3 lg:border-5 lg:ml-20 lg:rounded-full lg:border-[#498cff] lg:backdrop-blur lg:absolute lg:-left-40 lg:-top-13 lg:-rotate-4 text-2xl font-bold italic text-[#181F38] px-5 pt-1 pb-2 border-3 rounded-full border-[#498cff] backdrop-blur absolute left-5 z-3 -top-7 -rotate-4'>Join Us</p>
          <div className=" lg:flex lg:flex-row lg:space-x-2 lg:gap-3 flex flex-col space-x-2 gap-3">
            <input type="text" placeholder="Your Name" className=" lg:bg-[#d9ebfc] lg:text-sm lg:text-[#00296c] lg:px-6 lg:py-3 lg:rounded-[40px] lg:w-[420px] bg-[#d9ebfc] text-sm text-[#00296c] px-6 py-3 border border-[#8eb0e5] rounded-lg w-[240px]" />
            <input type="number" placeholder="How much rate do you want?" className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none lg:bg-[#d9ebfc] lg:text-sm lg:text-[#00296c] lg:px-6 lg:py-3 lg:pl-12 lg:rounded-[40px] lg:w-[260px] bg-[#d9ebfc] text-sm text-[#00296c] px-6 py-3 pl-11  rounded-lg w-[240px] border border-[#8eb0e5]" />
            <Image width={140} height={140} src="/dollar.svg" alt="MySQL" className=" lg:w-2 lg:absolute lg:top-12 lg:right-67 w-2 absolute top-28 right-58" />
          </div>
          <div className=" lg:flex lg:flex-row lg:space-x-2 lg:gap-4 flex flex-col space-x-2 gap-4">
            <div className=" lg:flex lg:flex-col lg:space-y-2 lg:gap-2 flex flex-col space-y-2 gap-2">
              <div className=" lg:flex lg:flex-row lg:space-x-2 flex flex-col space-x-2">
                <div className='lg:w-[200px] w-60 mr-4 lg:h-[50px] border-1 border-[#00296c] h-[50px] rounded-lg bg-[#d9ebfc] pr-8'>
                  <select className="font-semibold focus:outline-none focus:ring-0 lg:text-sm lg:text-[#00296c] lg:bg-[#d9ebfc] lg:px-6 pr-7 lg:py-3 lg:rounded-[10px] lg:w-[180px] lg:h-[48px] text-[12px] text-[#00296c] bg-[#d9ebfc] px-6 py-2 rounded-[10px] w-55 h-[48px]" name="" id="">
                    <option value="Web Frontend">Web-Frontend</option>
                    <option value="Web Backend">Web-Backend</option>
                    <option value="Android Developer">Android Developer</option>
                    <option value="IOS Developer">IOS Developer</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Django Developer">Django Developer</option>
                  </select>
                </div>
                <input type="text" placeholder="Where are you come from?" className=" lg:text-sm lg:text-[#00296c] lg:bg-[#d9ebfc] lg:px-6 lg:py-3 lg:rounded-[10px] lg:w-[205px] lg:h-[50px] lg:mt-0 text-sm text-[#00296c] bg-[#d9ebfc] px-6 py-3 rounded-[10px] w-[240px] h-[50px] mt-3 border border-[#8eb0e5]" />
              </div>
              <div className=" lg:flex lg:flex-row lg:space-x-2 flex flex-col space-x-2">
                <input type="email" placeholder="Your email" className=" lg:text-sm lg:text-[#00296c] lg:bg-[#d9ebfc] lg:px-6 lg:py-3 lg: lg:rounded-[50px] lg:w-[205px] lg:h-[50px] text-sm text-[#00296c] bg-[#d9ebfc] px-6 py-3  rounded-lg w-[240px] h-[50px] border border-[#8eb0e5]" />
                <input type="number" placeholder="Your phone number" className=" lg:text-sm lg:text-[#00296c] lg:bg-[#d9ebfc] lg:px-6 lg:py-3 lg:mt-0 lg:rounded-[50px] lg:w-[205px] lg:h-[50px] text-sm text-[#00296c] bg-[#d9ebfc] px-6 py-3 rounded-lg w-[240px] h-[50px] mt-3 border border-[#8eb0e5]" />
              </div>
            </div>
            <textarea placeholder="Some more words, maybe?" className=" lg:bg-[#d9ebfc] lg:text-sm lg:text-[#00296c] lg:px-6 lg:py-3 lg: lg:rounded-[10px] lg:w-[260px] lg:h-[119px] bg-[#d9ebfc] text-sm text-[#00296c] px-6 py-3  rounded-[10px] w-[240px] h-[119px] border focus:border-[#498cff]" />
            </div>
          <button className="cursor-pointer lg:mt-3 lg:w-[705px] lg:py-3 lg:bg-[#181F38] lg:text-sm lg:font-bold lg:text-white lg:rounded-full mt-3 w-[240px] py-3 bg-[#181F38] text-sm font-bold text-white rounded-full">Submit</button>
        </div>
        <div className=' lg:w-[930px] lg:h-90 lg:bg-gradient-to-b lg:from-[#aae8ff] lg:to-[#498cff] lg:rounded-[20px] lg:absolute lg:-z-1 lg:rotate-3 lg:top-0 lg:-left-45 w-[1400px] h-270 bg-gradient-to-b from-[#aae8ff] to-[#498cff] rounded-[20px] absolute -z-1 rotate-3 top-10 -left-45'/>
        
      </div>
      
      <div className=" lg:ml-20 lg:flex lg:flex-col lg:items-center lg:justify-center ml-5 flex flex-col items-center justify-center">
        <div className='relative lg:ml-0 -ml-5'>
          <h3 className=" lg:text-2xl lg:text-left lg:font-extrabold lg:text-blue-800 lg:mb-7 lg:font-poppins lg:rotate-3 text-2xl text-left font-extrabold text-[#00296c] mb-7 font-poppins">OUR SKILLS</h3>
          <Image width={140} height={140} src="/assets/image/2line-yellow.png" alt="MySQL" className=" lg:absolute lg:w-10 lg:h-10 lg:scale-x-[-1] lg:-left-10 lg:-top-5 absolute w-10 h-10 scale-x-[-1] -left-12 -top-5" />
        </div>
        
        <div className=" lg:flex lg:flex-row lg:flex-wrap lg:gap-5 lg:w-50 lg:place-items-center flex flex-row flex-wrap gap-5 w-50 place-items-center">
          <Image width={140} height={140} src="/golang.svg" alt="Golang" className=" lg:bg-white lg:w-20 lg:h-20 lg:p-3 lg:rounded-lg lg:border-1 lg:border-b-2 lg:border-[#498cff] bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]"/> 
          <Image width={140} height={140} src="/postgre.svg" alt="PostgreSQL" className="lg:bg-white lg:w-20 lg:h-20 lg:p-3 lg:rounded-lg lg:border-1 lg:border-b-2 lg:border-[#498cff] bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]" />
          <Image width={140} height={140} src="/python.svg" alt="Python" className="lg:bg-white lg:w-20 lg:h-20 lg:p-3 lg:rounded-lg lg:border-1 lg:border-b-2 lg:border-[#498cff] bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]" />
          <Image width={140} height={140} src="/java.svg" alt="Java" className="lg:bg-white lg:w-20 lg:h-20 lg:p-3 lg:rounded-lg lg:border-1 lg:border-b-2 lg:border-[#498cff] bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]" />
          <Image width={140} height={140} src="/mysql.svg" alt="MySQL" className="lg:bg-white lg:w-20 lg:h-20 lg:p-3 lg:rounded-lg lg:border-1 lg:border-b-2 lg:border-[#498cff] bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]" />
        </div>
      </div>
      <Image width={140} height={140} src="/assets/image/pythonk.png" alt="gambar-pythonb" className='lg:w-35 lg:-rotate-20 lg:absolute lg:-right-6 lg:-bottom-25 w-10 rotate-10 scale-x-[-1] absolute -right-10 -bottom-20'/>
    </div>
  )
}
