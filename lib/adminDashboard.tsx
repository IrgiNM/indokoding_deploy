import Image from 'next/image'
import React from 'react'

export default function AdminDashboard() {
  return (
    <>
        <div className='w-full h-1000 pl-50 flex flex-col bg-[#eff3ff]'>
            {/* TITLE */}
            <div className='flex flex-row p-2 pl-4 bg-white border-b-[1px] border-[#f6d7ff]'>
                <h1 className='font-semibold text-sm text-[#710093]'>Dashboard Admin</h1>
            </div>
            {/* PROFILE */}
            <div className='flex flex-row justify-start items-center p-5 bg-white relative'>
                <Image width={140} height={140} src="/assets/image/photo2.jpeg" alt="golang" className='w-20 h-20 rounded-full' />
                <button className='cursor-pointer h-7 w-7 absolute left-19 top-17 flex justify-center items-center rounded-full bg-[#fbecff] text-[#710093] border-[1px] border-[#AD48FF] hover:bg-[#deb6ff]'>
                    <Image width={30} height={30} src='/edit.svg' alt="Dashboard" className='w-3 h-3'/>
                </button>
                <div className='flex flex-col ml-5'>
                    <div className='flex flex-row gap-2'>
                        <h1 className='font-bold text-lg'>NicoRobin</h1>
                        <button className='cursor-pointer h-7 w-7 flex justify-center items-center rounded-full bg-white text-[#710093] border-[1px] border-[#daadff] hover:bg-[#deb6ff]'>
                            <Image width={30} height={30} src='/edit.svg' alt="Dashboard" className='w-3 h-3'/>
                        </button>
                        <p className='text-[12px] rounded-full bg-[#fbecff] text-[#710093] border-[1px] border-[#f2c6ff] py-1 px-5 font-semibold'>Admin basic</p>
                    </div>
                    <div className='flex flex-row gap-10 mt-5'>
                        <div className='flex flex-col'>
                            <p className='text-[12px] opacity-50'>Email address :</p>
                            <p className='text-[12px] font-semibold'>robinnico@gmail.com</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-[12px] opacity-50'>Phone number :</p>
                            <p className='text-[12px] font-semibold'><span className='font-light mr-1'>+62</span> 8983733359</p>
                        </div>
                    </div>
                    
                </div>
            </div>
            {/* DASHBOARD */}
            <div className='flex flex-row justify-start items-center gap-6 p-5'>
                <div className='relative w-50 h-25 rounded-lg flex shadow-lg flex-col justify-between items-center border-[1px] border-[#4372ff] bg-white'>
                    <div className='w-full pt-3 pl-5 flex flex-row justify-start items-center gap-2'>
                        <Image width={30} height={30} src='/message-blue.svg' alt="Dashboard" className='w-3 h-3'/>
                        <p className='text-[12px] font-light'>Message Inbox</p>
                    </div>
                    <div className='w-full pl-5 flex flex-row justify-start items-center gap-2'>
                        <p className='text-3xl font-bold'>20</p>
                        <p className='text-[10px] rounded-full font-bold text-white p-1 px-2 pr-3 bg-[#76bfff]'>+0</p>
                        <p className='text-[10px] text-[#2475bb]'>/ today</p>
                    </div>
                    <button className='cursor-pointer w-full text-[12px] pr-10 p-1 border-t-[1px] border-[#4372ff] flex flex-row justify-end items-center bg-white hover:bg-[#d2ecff] rounded-b-lg text-[#0c0093]'>view more</button>
                    <button className='cursor-pointer h-8 w-8 absolute -right-2 top-19 flex justify-center items-center rounded-full bg-white text-[#0c0093] border-[1px] border-[#0c0093] hover:bg-[#d2ecff]'>
                        <Image width={30} height={30} src='/arrow-blue.svg' alt="Dashboard" className='w-4 rotate-45 h-4'/>
                    </button>
                </div>
                <div className='relative w-50 h-25 rounded-lg flex shadow-lg flex-col justify-between items-center border-[1px] border-[#b743ff] bg-white'>
                    <div className='w-full pt-3 pl-5 flex flex-row justify-start items-center gap-2'>
                        <Image width={30} height={30} src='/email-active.svg' alt="Dashboard" className='w-3 h-3'/>
                        <p className='text-[12px] font-light'>Join Inbox</p>
                    </div>
                    <div className='w-full pl-5 flex flex-row justify-start items-center gap-2'>
                        <p className='text-3xl font-bold'>16</p>
                        <p className='text-[10px] rounded-full font-bold text-white p-1 px-2 pr-3 bg-[#dd76ff]'>+0</p>
                        <p className='text-[10px] text-[#ae24bb]'>/ today</p>
                    </div>
                    <button className='cursor-pointer w-full text-[12px] pr-10 p-1 border-t-[1px] border-[#b743ff] flex flex-row justify-end items-center bg-white hover:bg-[#f7d2ff] rounded-b-lg text-[#780093]'>view more</button>
                    <button className='cursor-pointer h-8 w-8 absolute -right-2 top-19 flex justify-center items-center rounded-full bg-white text-[#780093] border-[1px] border-[#780093] hover:bg-[#f7d2ff]'>
                        <Image width={30} height={30} src='/arrow-blue.svg' alt="Dashboard" className='w-4 rotate-45 h-4'/>
                    </button>
                </div>
                <div className='relative w-50 h-25 rounded-lg flex shadow-lg flex-col justify-between items-center border-[1px] border-[#00d80e] bg-white'>
                    <div className='w-full pt-3 pl-5 flex flex-row justify-start items-center gap-2'>
                        <Image width={30} height={30} src='/email-green.svg' alt="Dashboard" className='w-3 h-3'/>
                        <p className='text-[12px] font-light'>Career Inbox</p>
                    </div>
                    <div className='w-full pl-5 flex flex-row justify-start items-center gap-2'>
                        <p className='text-3xl font-bold'>38</p>
                        <p className='text-[10px] rounded-full font-bold text-white p-1 px-2 pr-3 bg-[#4ceb44]'>+0</p>
                        <p className='text-[10px] text-[#4ceb44]'>/ today</p>
                    </div>
                    <button className='cursor-pointer w-full text-[12px] pr-10 p-1 border-t-[1px] border-[#69eb62] flex flex-row justify-end items-center bg-white hover:bg-[#d2fff5] rounded-b-lg text-[#00938c]'>view more</button>
                    <button className='cursor-pointer h-8 w-8 absolute -right-2 top-19 flex justify-center items-center rounded-full bg-white text-[#00938c] border-[1px] border-[#00938c] hover:bg-[#d2fff5]'>
                        <Image width={30} height={30} src='/arrow-blue.svg' alt="Dashboard" className='w-4 rotate-45 h-4'/>
                    </button>
                </div>
                <div className='relative w-50 h-25 rounded-lg flex shadow-lg flex-col justify-between items-center border-[1px] border-[#4372ff] bg-white'>
                    <div className='w-full pt-3 pl-5 flex flex-row justify-start items-center gap-2'>
                        <Image width={30} height={30} src='/user-blue.svg' alt="Dashboard" className='w-3 h-3'/>
                        <p className='text-[12px] font-light'>Total Customer</p>
                    </div>
                    <div className='w-full pl-5 flex flex-row justify-start items-center gap-2'>
                        <p className='text-3xl font-bold'>27</p>
                        <p className='text-[10px] rounded-full font-bold text-white p-1 px-2 pr-3 bg-[#76bfff]'>+0</p>
                        <p className='text-[10px] text-[#2475bb]'>/ today</p>
                    </div>
                    <button className='cursor-pointer w-full text-[12px] pr-10 p-1 border-t-[1px] border-[#4372ff] flex flex-row justify-end items-center bg-white hover:bg-[#d2ecff] rounded-b-lg text-[#0c0093]'>view more</button>
                    <button className='cursor-pointer h-8 w-8 absolute -right-2 top-19 flex justify-center items-center rounded-full bg-white text-[#0c0093] border-[1px] border-[#0c0093] hover:bg-[#d2ecff]'>
                        <Image width={30} height={30} src='/arrow-blue.svg' alt="Dashboard" className='w-4 rotate-45 h-4'/>
                    </button>
                </div>
                
                
            </div>
        </div>
    </>
  )
}
