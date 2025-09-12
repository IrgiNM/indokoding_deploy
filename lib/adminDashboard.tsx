import { getCookies } from '@/utils/tokenController';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Career } from './adminCareer';
import { useRouter } from 'next/navigation';


export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  confirm_password?: string;
  level?: string;
  position?: string;
  fired?: string;
  phone?: string;
  sick?: number;
  createdAt: string;
  permission?: number;
  not_reason?: number;
  role_job?: string[];
  role: string;
}

export interface Contact {
  id: string;   
  createdAt: string;       
  dibaca: string;          
  dibaca_oleh: string[]; 
  email: string;    
  favorite: string[];
  message: string;              
  subject: string;             
  username: string;              
}

export default function AdminDashboard() {
    const [token, setToken] = useState<User>();
    const router = useRouter();
    
    useEffect(() => {
      const fetchCookies = async () => {
        try {
          const savedToken = await getCookies(); // <- pakai await
    
          if (savedToken) {
            // Parse JSON kalau cookies disimpan sebagai string
            const parsed = typeof savedToken === "string" ? JSON.parse(savedToken) : savedToken;
            // Ambil token dan simpan ke state
            setToken(parsed);
            if(parsed.role==="guest"){
                router.push("/");
            }
            console.log("Token dari cookies:", parsed);
          } else {
            setToken(undefined);
            router.push("/admin");
          }
        } catch (error) {
          console.error("Gagal mengambil cookies:", error);
          setToken(undefined);
        }
      };
    
      fetchCookies();
    }, [router]);

    const [contacts, setContacts] = useState<Contact[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // panggil backend API
                const res = await fetch("/api/getContact"); 
                const dataContacts = await res.json();

                setContacts(dataContacts);
            } catch (err) {
                console.error("Gagal fetch Data:", err);
            }
        };
        fetchData();
    }, []);

    const [Careers, setCareers] = useState<Career[]>([]);
    useEffect(() => {
        const fetchCareers = async () => {
            try {
                // panggil backend API
                const res = await fetch("/api/getCareerMessage");
                const data = await res.json();
                
                setCareers(data);
            } catch (err) {
                console.error("Gagal fetch Careers:", err);
            }
        };
        fetchCareers();
    }, []);

    const [listUsers, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                // panggil backend API
                const res = await fetch("/api/getUsers"); 
                const data = await res.json();
                
                setUsers(data);
            } catch (err) {
                console.error("Gagal fetch contacts:", err);
            }
        };
        fetchContacts();
    }, []);

  return (
    <>
        <div className='w-full h-1000 pl-50 flex flex-col bg-[#eff3ff]'>
            {/* TITLE */}
            <div className='flex flex-row p-2 pl-4 bg-white border-b-[1px] border-[#f6d7ff]'>
                <h1 className='font-semibold text-sm text-[#710093]'>Dashboard Admin</h1>
            </div>
            {/* PROFILE */}
            <div className='flex flex-row justify-start items-center p-5 bg-white relative'>
                <div className='w-20 h-20 bg-blue-100 flex justify-center items-center rounded-full font-bold text-4xl text-blue-700'>{token?.username.charAt(0) || "-"}</div>
                <div className='flex flex-col ml-5'>
                    <div className='flex flex-row gap-2'>
                        <h1 className='font-bold text-lg'>{token?.username || 'Not Username'}</h1>
                        <button className='cursor-pointer h-7 w-7 flex justify-center items-center rounded-full bg-white text-[#710093] border-[1px] border-[#daadff] hover:bg-[#deb6ff]'>
                            <Image width={30} height={30} src='/edit.svg' alt="Dashboard" className='w-3 h-3'/>
                        </button>
                    </div>
                    <div className='flex flex-row gap-10 mt-2'>
                        <div className='flex flex-col'>
                            <p className='text-[12px] opacity-50'>Email address :</p>
                            <p className='text-[12px] font-semibold'>{token?.email || 'Not Email'}</p>
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
                        <p className='text-3xl font-bold'>{contacts.length}</p>
                        <p className='text-[10px] rounded-full font-bold text-white p-1 px-2 pr-3 bg-[#76bfff]'>+0</p>
                        <p className='text-[10px] text-[#2475bb]'>/ today</p>
                    </div>
                    <button onClick={() => {router.push("/admin/contact")}} className='cursor-pointer w-full text-[12px] pr-10 p-1 border-t-[1px] border-[#4372ff] flex flex-row justify-end items-center bg-white hover:bg-[#d2ecff] rounded-b-lg text-[#0c0093]'>view more</button>
                    <button onClick={() => {router.push("/admin/contact")}} className='cursor-pointer h-8 w-8 absolute -right-2 top-19 flex justify-center items-center rounded-full bg-white text-[#0c0093] border-[1px] border-[#0c0093] hover:bg-[#d2ecff]'>
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
                    <button onClick={() => {router.push("/admin/joinUs")}} className='cursor-pointer w-full text-[12px] pr-10 p-1 border-t-[1px] border-[#b743ff] flex flex-row justify-end items-center bg-white hover:bg-[#f7d2ff] rounded-b-lg text-[#780093]'>view more</button>
                    <button onClick={() => {router.push("/admin/joinUs")}} className='cursor-pointer h-8 w-8 absolute -right-2 top-19 flex justify-center items-center rounded-full bg-white text-[#780093] border-[1px] border-[#780093] hover:bg-[#f7d2ff]'>
                        <Image width={30} height={30} src='/arrow-blue.svg' alt="Dashboard" className='w-4 rotate-45 h-4'/>
                    </button>
                </div>
                <div className='relative w-50 h-25 rounded-lg flex shadow-lg flex-col justify-between items-center border-[1px] border-[#00d80e] bg-white'>
                    <div className='w-full pt-3 pl-5 flex flex-row justify-start items-center gap-2'>
                        <Image width={30} height={30} src='/email-green.svg' alt="Dashboard" className='w-3 h-3'/>
                        <p className='text-[12px] font-light'>Career Inbox</p>
                    </div>
                    <div className='w-full pl-5 flex flex-row justify-start items-center gap-2'>
                        <p className='text-3xl font-bold'>{Careers.length || 0}</p>
                        <p className='text-[10px] rounded-full font-bold text-white p-1 px-2 pr-3 bg-[#4ceb44]'>+0</p>
                        <p className='text-[10px] text-[#4ceb44]'>/ today</p>
                    </div>
                    <button onClick={() => {router.push("/admin/career")}} className='cursor-pointer w-full text-[12px] pr-10 p-1 border-t-[1px] border-[#69eb62] flex flex-row justify-end items-center bg-white hover:bg-[#d2fff5] rounded-b-lg text-[#00938c]'>view more</button>
                    <button onClick={() => {router.push("/admin/career")}} className='cursor-pointer h-8 w-8 absolute -right-2 top-19 flex justify-center items-center rounded-full bg-white text-[#00938c] border-[1px] border-[#00938c] hover:bg-[#d2fff5]'>
                        <Image width={30} height={30} src='/arrow-blue.svg' alt="Dashboard" className='w-4 rotate-45 h-4'/>
                    </button>
                </div>
                <div className='relative w-50 h-25 rounded-lg flex shadow-lg flex-col justify-between items-center border-[1px] border-[#4372ff] bg-white'>
                    <div className='w-full pt-3 pl-5 flex flex-row justify-start items-center gap-2'>
                        <Image width={30} height={30} src='/user-blue.svg' alt="Dashboard" className='w-3 h-3'/>
                        <p className='text-[12px] font-light'>Total Customer</p>
                    </div>
                    <div className='w-full pl-5 flex flex-row justify-start items-center gap-2'>
                        <p className='text-3xl font-bold'>{listUsers.length}</p>
                        <p className='text-[10px] rounded-full font-bold text-white p-1 px-2 pr-3 bg-[#76bfff]'>+0</p>
                        <p className='text-[10px] text-[#2475bb]'>/ today</p>
                    </div>
                    <button onClick={() => {router.push("/admin/users")}} className='cursor-pointer w-full text-[12px] pr-10 p-1 border-t-[1px] border-[#4372ff] flex flex-row justify-end items-center bg-white hover:bg-[#d2ecff] rounded-b-lg text-[#0c0093]'>view more</button>
                    <button onClick={() => {router.push("/admin/users")}} className='cursor-pointer h-8 w-8 absolute -right-2 top-19 flex justify-center items-center rounded-full bg-white text-[#0c0093] border-[1px] border-[#0c0093] hover:bg-[#d2ecff]'>
                        <Image width={30} height={30} src='/arrow-blue.svg' alt="Dashboard" className='w-4 rotate-45 h-4'/>
                    </button>
                </div>
                
                
            </div>
        </div>
    </>
  )
}
