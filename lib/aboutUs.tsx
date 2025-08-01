import Image from 'next/image'
import React, { useEffect } from 'react'

export default function AboutUs() {
  const imgList = [
      'about-1.jpeg',
      'about-2.jpeg',
      'about-3.jpeg',
      'about-4.jpeg',
      'about-1.jpeg',
  ]
  const jumlahGambar = imgList.length;
  const [selectImg, setSelectImg] = React.useState(0);
  const handleClick = () => {
    if (selectImg === jumlahGambar - 2) {
      setSelectImg(0);
    } else {
      setSelectImg(selectImg + 1);
    }
  }
  useEffect(() => {
      console.log(`gambar 3 diganti ke `,selectImg);
  }, [selectImg]);


  return (
    <div className='lg:mt-100 lg:flex lg:flex-row lg:justify-center lg:items-center lg:w-full lg:relative flex flex-col justify-center items-center relative w-full gap-y-10'>
      <div className='lg:w-270 lg:pl-25 w-70'>
        <div className='relative'>
          <h1 className='lg:text-4xl lg:font-extrabold lg:mb-5 lg:text-[#005CB2] text-xl font-extrabold mb-5 text-[#005CB2]'>About Us</h1>
          <Image width={140} height={140} src="/assets/image/3line-cyan.png" alt="3line-cyan" className='lg:absolute lg:left-42 lg:-top-8 lg:rotate- lg:w-15 absolute left-23 -top-3 rotate- w-8' />
        </div>
          
          <p className='lg:w-130 lg:mb-5 lg:text-justify lg:text-lg w-70 mb-5 text-justify text-xs'>We are an boutique software development started from a band of developers that excel in developing apps with great flexibility and always listen to client needs.</p>
          <p className='lg:w-130 lg:mb-5 lg:text-justify lg:text-lg w-70 mb-5 text-justify text-xs'>We always develop using agile methodologies in mind, means that a big features in chopped into small chunks. Each chunk can be done in two weeks. And we always do a weekly or twice a week meeting over skype or using trello so you can see your apps as it progressing.</p>
          <p className='lg:w-130 lg:mb-5 lg:text-justify lg:text-lg w-70 mb-5 text-justify text-xs'>Our goal is to make software development to adapt clients needs and deliver results as quickly as possible</p>
      </div>

      <div className='relative'>
        <Image width={140} height={140} src={`/assets/image/aboutus/${imgList[selectImg]}`} alt="golang" className=' lg:w-[800px] lg:h-[360px] lg:rounded-xl w-[300px] rounded-xl object-cover' />
        <button onClick={handleClick}>
          <Image width={140} height={140} src={`/assets/image/aboutus/${imgList[selectImg+1]}`} alt="golang" className=' lg:w-[170px] lg:rounded-xl lg:absolute lg:z-2 lg:-bottom-10 lg:-right-10 lg:hover:w-[180px] lg:hover:-right-5 lg:transition-all lg:duration-200 lg:hover:shadow-lg w-[100px] rounded-xl absolute z-2 -bottom-10 -right-5 hover:w-[180px] hover:-right-5 transition-all duration-200 hover:shadow-lg object-cover animate-fade-in
          
          ' />
        </button>
        
        <Image width={140} height={140} src={`/assets/image/aboutus/${imgList[selectImg+2]}`} alt="golang" className=' lg:w-[200px] lg:rounded-xl lg:absolute lg:z-2 lg:bottom-30 lg:-right-70 w-[150px] rounded-xl absolute z-2 bottom-20 -right-50 object-cover' />
        <div className=' lg:-z-1 lg:bg-[#D6E9FF] lg:w-[840px] lg:h-[370px] lg:-rotate-5 lg:absolute lg:-top-5 lg:-left-5 lg:rounded-xl -z-1 bg-[#D6E9FF] w-[840px] h-[230px] -rotate-5 absolute -top-5 -left-5 rounded-xl'></div>
      </div>

      <div className="lg:absolute lg:rounded-full lg:-left-60 lg:-top-30 lg:-z-1 lg:bg-[#D6E9FF] lg:w-135 lg:h-135 absolute rounded-full -left-27 -top-20 -z-1 bg-[#D6E9FF] w-60 h-60"></div>
      
      <Image width={140} height={140} src="/assets/image/golang.png" alt="golang" className='lg:absolute lg:-left-20 lg:-top-70 lg:rotate-50 lg:w-70 absolute -left-10 -top-30  rotate-50 w-30' />
      
    </div>
  )
}