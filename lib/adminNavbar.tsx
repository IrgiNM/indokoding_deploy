import { deleteCookies } from '@/utils/tokenController';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface AdminNavbarProps {
  active?: string;
}

export default function AdminNavbar(props: AdminNavbarProps) {
  const navActive = props.active || 'dashboard';
  const router = useRouter();
  const [showLogOut, setShowLogOut] = useState(false);
  
  const logout = (): void => {
    try {
      deleteCookies();
      router.push("/admin");
      alert("Berhasil logout!");
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <div className='fixed z-100 top-0 bottom-0 flex flex-col justify-start items-center pt-8 border-r-[3px] border-[#9e1ac3] bg-[#ffffff]'>
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
            <button onClick={() => {router.push("/admin/users")}} className='w-full pl-11 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
              <Image width={30} height={30} src={navActive === 'customer' ? `/user2-active.svg` : '/user2.svg'} alt="Dashboard" className='w-3 h-3'/>
              <p className={`text-[12px] ${navActive === 'customer' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Customers</p>
            </button>
            <button onClick={() => {router.push("/admin/users/admins")}} className='w-full pl-11 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
              <Image width={30} height={30} src={navActive === 'admin' ? `/user2-active.svg` : '/user2.svg'} alt="Dashboard" className='w-3 h-3'/>
              <p className={`text-[12px] ${navActive === 'admin' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Admins</p>
            </button>
          </div>
        }
        <div className='w-full h-[1px] bg-[#48a7ff] my-2'/>
        <button onClick={() => {router.push("/admin/contact")}} className='w-full px-7 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
            <Image width={30} height={30} src={navActive === 'message' ? `/message-active.svg` : '/message.svg'} alt="Dashboard" className='w-3 h-3'/>
            <p className={`text-[12px] ${navActive === 'message' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Contact List</p>
        </button>
        <button onClick={() => {router.push("/admin/joinUs")}} className='w-full px-7 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
            <Image width={30} height={30} src={navActive === 'email' ? `/email-active.svg` : '/email.svg'} alt="Dashboard" className='w-3 h-3'/>
            <p className={`text-[12px] ${navActive === 'email' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Join List</p>
        </button>
        <button onClick={() => {router.push("/admin/career")}} className='w-full px-7 py-2 flex flex-row items-center gap-2 mb-2 hover:bg-[#f1e7ff] cursor-pointer'>
            <Image width={30} height={30} src={navActive === 'suitcase' ? `/suitcase-active.svg` : '/suitcase-black.svg'} alt="Dashboard" className='w-3 h-3'/>
            <p className={`text-[12px] ${navActive === 'suitcase' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Career List</p>
        </button>
        <div className='w-full h-[.5px] bg-[#48ff94] mb-2'/>
        <button onClick={() => {router.push("/admin/ourWork")}} className='w-full px-7 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
            <Image width={30} height={30} src={navActive === 'photo1' ? `/photo1-active.svg` : '/photo1.svg'} alt="Dashboard" className='w-3 h-3'/>
            <p className={`text-[12px] ${navActive === 'photo1' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>Our Work Photos</p>
        </button>
        <button onClick={() => {router.push("/admin/aboutUs")}} className='w-full px-7 py-2 flex flex-row items-center gap-2 hover:bg-[#f1e7ff] cursor-pointer'>
            <Image width={30} height={30} src={navActive === 'photo2' ? `/photo2-active.svg` : '/photo2.svg'} alt="Dashboard" className='w-3 h-3'/>
            <p className={`text-[12px] ${navActive === 'photo2' ? 'text-[#AD48FF] font-bold' : 'text-black'}`}>About Us Photos</p>
        </button>
        <button onClick={() => (setShowLogOut(true))} className='fixed left-6 bottom-15 p-2 px-5 rounded-full border-1 transition-all duration-300 border-[#f00070] text-[12px] mt-40 font-bold text-[#f00070] hover:bg-[#f00070] hover:text-white'>Log Out</button>
        {showLogOut ?
          <>
            <div className='fixed z-98 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center'></div>
            <div className='fixed z-99 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center'></div>
            <div className='fixed z-100 lg:top-40 lg:left-140 top-40 p-5 border-1 rounded-lg border-purple-900 bg-white flex flex-col gap-3 justify-center items-center'>
                <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                <p className='text-[12px] text-purple-900 w-30 text-center'>Are you sure you want to log out?</p>
                <button onClick={() => (logout(),setShowLogOut(false))} className='text-[12px] font-bold text-[#f00070] w-full border py-1 rounded-md hover:bg-red-50'>Log Out</button>
                <button onClick={() => (setShowLogOut(false))} className={`fixed z-6 lg:top-37 lg:right-133 lg:mr-0 -mr-40 top-36 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
          </>
          : null
        }
    </div>
  )
}
