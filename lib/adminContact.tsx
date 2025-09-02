import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { User } from './adminDashboard';
import { useRouter } from 'next/navigation';
import { getCookies } from '@/utils/tokenController';

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
  

export default function Admincontacts() {
    const [edit, setEdit] = useState('none');
    const [hapus, setHapus] = useState(false);
    const [detail, setDetail] = useState(false);
    const [hapusMessage, setHapusMessage] = useState("none");
    const [readMessage, setReadMessage] = useState(false);
    const [date, setDate] = useState("");

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
    }, []);

    const [urutan, setUrutan] = useState("New");
    const [urutanActive, setUrutanActive] = useState(false);
    const diKlik = () => {
        setUrutanActive(!urutanActive);
    }
    const klikDetail = () => {
        setDetail(!detail);
    }
    const az = () => {
        setUrutan("A - Z");
        setUrutanActive(false);
    }
    const za = () => {
        setUrutan("Z - A");
        setUrutanActive(false);
    }
    const newklik = () => {
        setUrutan("New");
        setUrutanActive(false);
    }
    const old = () => {
        setUrutan("Old");
        setUrutanActive(false);
    }

    const [pickSubjek, setPickSubjek] = useState('none');
    const [pickNama, setPickNama] = useState('none');
    const [pickEmail, setPickEmail] = useState('none@gmail.com');
    const [pickTanggal, setPickTanggal] = useState('0-0-2025');
    const [pickIsi, setPickIsi] = useState('none');
    const [isLoading, setIsLoading] = useState(false);
    
      
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    function truncateTextByChar(text: string, charLimit: number): string {
        if (text.length <= charLimit) return text;
        return text.slice(0, charLimit) + '...';
    }

    const [contacts, setContacts] = useState<Contact[]>([]);
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                // panggil backend API
                const res = await fetch("http://localhost:3001/api/getContact"); 
                const data = await res.json();
                
                // Urutkan data berdasarkan pilihan sorting
                const sortedData = sortContacts(data, urutan);
                setContacts(sortedData);
            } catch (err) {
                console.error("Gagal fetch contacts:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContacts();
    }, [hapusMessage, urutan, detail, readMessage]);

    const getContact = async () => {
        try {
            // panggil backend API
            const res = await fetch("http://localhost:3001/api/getContact"); 
            const data = await res.json();
            
            // Urutkan data berdasarkan pilihan sorting
            const sortedData = sortContacts(data, "New");
            setContacts(sortedData);
        } catch (err) {
            console.error("Gagal fetch contacts:", err);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Fungsi untuk mengurutkan contacts
    const sortContacts = (data: Contact[], order: string) => {
        const sortedData = [...data];
        
        switch (order) {
            case 'A - Z':
                return sortedData.sort((a, b) => 
                    a.subject.localeCompare(b.subject)
                );
            
            case 'Z - A':
                return sortedData.sort((a, b) => 
                    b.subject.localeCompare(a.subject)
                );
            
            case 'New':
                return sortedData.sort((a, b) => 
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
            
            case 'Old':
                return sortedData.sort((a, b) => 
                    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );
            
            default:
                return sortedData;
        }
    };

    const searchDate = async (selectedDate: string) => {
      setDate(selectedDate);

      try {
        const res = await fetch("http://localhost:3001/api/searchContactsByDate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: selectedDate }),
        });

        const data = await res.json();

        if (res.ok) {
          console.log("Data ditemukan:", data.contacts || []);
          const sortedData = sortContacts(data.contacts || [], urutan);
          setContacts(sortedData);
        } else {
          console.error("Error:", data.error);
          setContacts([]);
        }
      } catch (error) {
        console.error("Request error:", error);
        setContacts([]);
      }
    };

    async function handleDelete(id: string, email: string) {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3001/api/removeContact", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, email: email }),
        });
    
        if (!res.ok) {
          throw new Error("Gagal menghapus message");
        }
    
        const data = await res.json();
        console.log("Contact message berhasil dihapus:", data);
        alert("Contact message berhasil dihapus");
        setHapusMessage("none");
      } catch (error) {
        console.error("Error:", error);
        alert("Gagal menghapus message. Silakan coba lagi nanti.");
      }finally {
        setIsLoading(false);
      }
    }

    async function handleDeleteAll() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3001/api/removeAllContact", {
          method: "DELETE",
        });
    
        if (!res.ok) {
          throw new Error("Gagal menghapus semua message");
        }
    
        const data = await res.json();
        console.log("Contact message berhasil dihapus semua:", data);
        alert("Contact message berhasil dihapus semua");
        setHapusMessage("none");
      } catch (error) {
        console.error("Error:", error);
        alert("Gagal menghapus semua message. Silakan coba lagi nanti.");
      }finally {
        setIsLoading(false);
      }
    }

    async function handleBuka(id: string, email: string) {
      try {
        const res = await fetch("http://localhost:3001/api/openContact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id, email: email }),
        });
    
        const data = await res.json();
        console.log("id:", id, "email:", email);
        console.log("Contact message berhasil dibuka:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    async function handleBukaSemua(email: string) {
      try {
        const res = await fetch("http://localhost:3001/api/openAllContact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });
    
        const data = await res.json();
        console.log("Contact message berhasil dibuka semua:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    
  return (
    <>
        <div className='w-full h-1000 pl-50 flex flex-col bg-[#eff3ff]'>
            {/* TITLE */}
            <div className='fixed z-2 w-266 flex flex-row justify-between p-2 px-4 bg-white border-b-[1px] border-[#f6d7ff]'>
                <h1 className='font-semibold text-sm text-[#710093]'>Contact Inbox List</h1>
                <p className='font-light text-[12px] text-[#00930f]'>today : <span className='font-bold'>{formattedDate}</span></p>
            </div>

            {/* SEARCH */}
            <div className='fixed z-2 w-266 top-8 p-3 pl-5 border-t-[1px] border-[#f6d7ff] bg-white flex flex-row  justify-between gap-4'>
                <div className='relative'>
                    <input type="text" className='border-1 hover:border-[1.5px] border-[#710093] bg-[#fcf1ff] p-2 pl-4 text-[12px] w-70 rounded-full text-[#930062]' placeholder='Search'/>
                    <button className='cursor-pointer w-8 h-8 pt-1 absolute top-0 right-1'>
                        <Image width={30} height={30} src='/search.svg' alt="Search" className='w-4 h-4 ml-2'/>
                    </button>
                </div>
                <div className='relative flex flex-row gap-2'>
                    <input type="date" value={date} onChange={(e) => searchDate(e.target.value)} className='hover:bg-[#f9e6ff] text-[12px] font-semibold text-[#710093] px-4 rounded-full border-1 border-[#d37eec] flex justify-start'/>
                    <button onClick={diKlik} className='cursor-pointer bg-white text-[#710093] font-semibold flex flex-row text-[12px] px-4 py-2 rounded-full hover:bg-[#f9e6ff] transition duration-200'>{urutan}
                        <Image width={30} height={30} src='/arrow-solid.svg' alt="Search" className={`w-2 h-2 mt-1.5 ${urutanActive ? 'rotate-0' : 'rotate-180'} ml-2`}/>
                    </button>
                    { urutanActive && 
                        <div className='absolute z-2 w-30 h-50 border-[1.5px] rounded-lg border-[#cb48f3] top-10 right-82 backdrop-blur-md flex flex-col justify-center items-center gap-2 px-4'>
                            <button onClick={az} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>A - Z</button>
                            <button onClick={za} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>Z - A</button>
                            <button onClick={newklik} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>New</button>
                            <button onClick={old} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>Old</button>
                        </div>
                    }
                    {/* <button onClick={()=>setUrutan("New")} className='text-[12px] font-bold p-2 px-5 border-1 border-[#d37eec] text-[#710093] rounded-lg bg-[#f9e6ff] hover:bg-[#d37eec] hover:text-white active:bg-[#710093] cursor-pointer'>Reset</button> */}
                    <button onClick={() => setReadMessage(true)} className='text-[12px] font-bold p-2 px-5 border-1 border-[#7e8bec] text-[#001893] flex flex-row gap-2 rounded-lg bg-[#e6edff] hover:bg-[#7e8bec] hover:text-white active:bg-[#001893] cursor-pointer'>
                        <Image width={30} height={30} src='/email-dibuka-blue.svg' alt="Dashboard" className='w-3 h-3 mt-[.5px]'/>
                        Read All</button>
                    <button onClick={() => {
                        setHapus(true);
                    }} 
                    className='cursor-pointer text-[12px] font-bold p-2 px-5 border-1 border-[#ec7eaf] text-[#93006e] rounded-lg bg-[#f9e6ff] hover:bg-[#ff1376] hover:border-[#ff1376] hover:text-white active:bg-[#93006e]'>Delete All</button>
                </div>
            </div>

            {/* LIST contactS */}
            <div className='flex flex-row flex-wrap gap-x-5 gap-y-1 p-5 pt-30'>
                {contacts.map((contact, index) => (
                    
                        <div className={`w-full flex flex-row justify-start items-center p-3 px-4 pr-10 bg-white rounded-lg border-1 border-[#cb48f3] hover:bg-purple-50 shadow-md gap-2 relative`}>
                            <button key={index} onClick={() => {
                                klikDetail();
                                setPickNama(contact.username);
                                setPickSubjek(contact.subject);
                                setPickEmail(contact.email);
                                setPickTanggal(contact.createdAt);
                                setPickIsi(contact.message);
                                handleBuka(contact.id, contact.email);
                            }} className='w-full flex items-start justify-start'>
                                <div className='flex flex-col items-start'>
                                    <p className={`text-[13px] font-bold text-[#710093] ${(contact.dibaca_oleh || []).length > 0 ? 'opacity-30' : 'opacity-100'}`}>{truncateTextByChar(contact.subject,60)} <span className='font-light text-[10px] text-[#00930f] ml-2'>{contact.createdAt}</span></p>
                                    <p className='text-[12px] font-light'>from 
                                        <span className='text-[#004793]'> {contact.username} -</span>
                                        <span className='text-[#004793]'> {contact.email} -</span>
                                        <span> {truncateTextByChar(contact.message,100)}</span>
                                    </p>
                                </div>
                            </button>
                            <button onClick={()=>{(setHapusMessage(contact.id),setPickEmail(contact.email))}} className='h-8 w-8 absolute right-3 top-4 flex justify-center items-center rounded-full bg-[#ffa0c0] text-[#cf008a] border-[1px] border-[#930062] hover:bg-[#cf008a] cursor-pointer'>
                                <Image width={30} height={30} src='/trash.svg' alt="Dashboard" className='w-3 h-3'/>
                            </button>
                            {(contact.dibaca_oleh || []).length > 0 ?
                            <Image width={30} height={30} src='/email-dibuka.svg' alt="Dashboard" className='w-4 h-4 absolute right-15 top-6'/>
                            :
                            <Image width={30} height={30} src='/email-blue.svg' alt="Dashboard" className='w-4 h-4 absolute right-15 top-6'/>
                            }
                            {(contact.dibaca_oleh || []).length > 0 && contact.dibaca_oleh.map((admin, idx) => (
                                <button onClick={() => {
                                    if (edit === 'none' || edit !== contact.id) {
                                        setEdit(contact.id);
                                    }else {
                                        setEdit('none');
                                    }
                                }}>
                                    <Image width={30} height={30} src='/eye.svg' alt="Dashboard" className='w-4 h-4 absolute right-24 top-6 cursor-pointer'/>
                                </button>
                            ))}
                            {(contact.dibaca_oleh || []).length > 0  && edit === contact.id ?
                                <div className='absolute z-1 w-30 border-[1.5px] rounded-lg border-[#cb48f3] top-4 right-30 backdrop-blur-md flex flex-col justify-center items-center gap-2 py-4'>
                                    {contact.dibaca_oleh.map((admin, idx) => (
                                        <p key={idx} className='text-[12px] font-semibold text-[#710093]'>{admin}</p>
                                    ))}
                                </div>
                            : null}
                            
                        </div>
                    
                ))}
            </div>

            {/* EDIT contact */}
            {hapus || hapusMessage !== "none" || detail || readMessage ?
            <div className='fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center'></div>
            : null
            }
            {hapus || hapusMessage !== "none" || detail || readMessage ?
            <div className='fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center'></div>
            : null
            }
            {hapus &&
            <div className='fixed z-6 top-40 left-140 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                <p className='text-[12px] text-[#930062] w-30 text-center'>Yakin <span className='font-bold'>dihapus</span> semua ?</p>
                <button onClick={handleDeleteAll} className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>
                    {isLoading ? "delete..." : "Yes"}
                </button>
                <button onClick={() => setHapus(false)} className={`fixed z-6 top-37 right-133 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
            }
            {readMessage &&
            <div className='fixed z-6 top-40 left-140 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                <p className='text-[12px] text-[#005dcf] w-30 text-center'>Yakin <span className='font-bold'>Semua Message</span> dibaca ?</p>
                <button onClick={() => (handleBukaSemua("saya"),setReadMessage(false))} className='p-2 w-full rounded-md bg-[#9fc7ff] hover:bg-[#0055ff] active:bg-[#001d93] text-[12px] text-[#005dcf] hover:text-white font-bold'>Yes</button>
                <button onClick={() => setReadMessage(false)} className={`fixed z-6 top-37 right-133 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
            }
            {hapusMessage !== "none" &&
            <div className='fixed z-6 top-40 left-140 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                <p className='text-[12px] text-[#930062] w-30 text-center'>Yakin <span className='font-bold'>Message ini</span> dihapus ?</p>
                <button onClick={() => handleDelete(hapusMessage,pickEmail)} className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>Yes</button>
                <button onClick={() => setHapusMessage("none")} className={`fixed z-6 top-37 right-133 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
            }
            {detail &&
                <div className='fixed w-150 z-6 top-20 left-90 p-7 border-1 rounded-lg border-[#930062] bg-white flex flex-col justify-center items-start'>
                    <h1 className='text-xl font-bold text-[#710093]'>{pickSubjek}</h1>
                    <h1 className='text-sm font-semibold text-[#710093] mb-2'>{pickTanggal}</h1>
                    <div className='flex flex-row gap-2 mb-7 items-center'>
                        <div className='w-10 h-10 bg-blue-100 flex justify-center items-center rounded-full font-bold text-md text-blue-700'>{pickNama.charAt(0)}</div>
                        <div className='flex flex-col'>
                            <p className='text-[12px] text-[#710093]'>{pickNama}</p>
                            <p className='text-[12px] text-[#710093]'>{pickEmail}</p>
                        </div>
                    </div>
                    <p className='max-h-50 pr-5 overflow-auto text-[12px] text-justify'>{pickIsi}</p>
                    <button onClick={() => klikDetail()} className={`fixed z-6 top-16 right-73 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}>
                        <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                    </button>
                </div>
            }
            
        </div>
    </>
  )
}
