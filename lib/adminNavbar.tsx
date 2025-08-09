import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface AdminNavbarProps {
  active?: string;
}

export default function AdminNavbar(props: AdminNavbarProps) {
  const navActive = props.active || 'dashboard';
  const router = useRouter();
  return (
    <div className='fixed top-0 w-50 h-158 flex flex-col justify-start items-center pt-8 border-r-[3px] border-[#9e1ac3] bg-[#ffffff]'>
        <Image width={140} height={140} src="/logo2.svg" alt="" className='w-15 mb-10'/>
        <button onClick={() => {router.push("/admin/dashboard")}} className='w-full px-7 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
            <Image width={30} height={30} src={navActive === 'dashboard' ? `/dashboard-active.svg` : '/dashboard.svg'} alt="Dashboard" className='w-3 h-3'/>
            <p className={`text-[12px] ${navActive === 'dashboard' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Dashboard</p>
        </button>
        <button onClick={() => {router.push("/admin/users")}} className='w-full px-7 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
            <Image width={30} height={30} src={navActive === 'customer' || navActive === 'admin' ? `/user-active.svg` : '/user.svg'} alt="Dashboard" className='w-3 h-3'/>
            <p className={`text-[12px] ${navActive === 'customer' || navActive === 'admin' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Users</p>
        </button>
        {(navActive === 'customer' || navActive === 'admin') &&
          <div className={`w-full mb-2 flex flex-col bg-[#fbeffe]`}>
            <button className='w-full pl-11 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
              <Image width={30} height={30} src={navActive === 'customer' ? `/user2-active.svg` : '/user2.svg'} alt="Dashboard" className='w-3 h-3'/>
              <p className={`text-[12px] ${navActive === 'customer' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Customers</p>
            </button>
            <button className='w-full pl-11 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
              <Image width={30} height={30} src={navActive === 'admin' ? `/user2-active.svg` : '/user2.svg'} alt="Dashboard" className='w-3 h-3'/>
              <p className={`text-[12px] ${navActive === 'admin' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Admins</p>
            </button>
          </div>
        }
        <div className='w-full h-[1px] bg-[#48a7ff] my-2'/>
        <button className='w-full px-7 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
            <Image width={30} height={30} src={navActive === 'message' ? `/message-active.svg` : '/message.svg'} alt="Dashboard" className='w-3 h-3'/>
            <p className={`text-[12px] ${navActive === 'message' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Contact List</p>
        </button>
        <button className='w-full px-7 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
            <Image width={30} height={30} src={navActive === 'email' ? `/email-active.svg` : '/email.svg'} alt="Dashboard" className='w-3 h-3'/>
            <p className={`text-[12px] ${navActive === 'email' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Join List</p>
        </button>
        <button className='w-full px-7 py-2 flex flex-row items-center gap-2 mb-2 hover:bg-[#f1e7ff] cursor-pointer'>
            <Image width={30} height={30} src={navActive === 'suitcase' ? `/suitcase-active.svg` : '/suitcase-black.svg'} alt="Dashboard" className='w-3 h-3'/>
            <p className={`text-[12px] ${navActive === 'suitcase' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Career List</p>
        </button>
        <div className='w-full h-[.5px] bg-[#48ff94] mb-2'/>
        <button className='w-full px-7 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
            <Image width={30} height={30} src={navActive === 'photo1' ? `/photo1-active.svg` : '/photo1.svg'} alt="Dashboard" className='w-3 h-3'/>
            <p className={`text-[12px] ${navActive === 'photo1' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Photo Our Work</p>
        </button>
        <button className='w-full px-7 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
            <Image width={30} height={30} src={navActive === 'photo2' ? `/photo2-active.svg` : '/photo2.svg'} alt="Dashboard" className='w-3 h-3'/>
            <p className={`text-[12px] ${navActive === 'photo2' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Photo About Us</p>
        </button>
    </div>
  )
}
