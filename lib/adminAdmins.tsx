import { collection, getDocs, or, query, where } from "firebase/firestore";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { getCookies } from "@/utils/tokenController";
import { useRouter } from "next/navigation";

interface User {
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

export default function AdminAdmins() {
    const [edit, setEdit] = useState('none');
    const [hapus, setHapus] = useState(false);
    const [addAdmin, setAddAdmin] = useState(false);
    const [isPosition, setIsPosition] = useState(false);
    const [isLevel, setIsLevel] = useState(false);
    const [hapusNama, setHapusNama] = useState("none");
    const [idUser, setIdUser] = useState("none");
    const [isLoading, setIsLoading] = useState(false);
    
    const [editUsername, setEditUsername] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);

    const [urutan, setUrutan] = useState("New");
    const [pickPosition, setPickPosition] = useState("web Frontend");
    const [pickLevel, setPickLevel] = useState("Basic");
    const [urutanActive, setUrutanActive] = useState(false);
    const diKlik = () => {
        setUrutanActive(!urutanActive);
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
    
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    function truncateTextByChar(text: string, charLimit: number): string {
        if (text.length <= charLimit) return text;
        return text.slice(0, charLimit) + '...';
    }

    const [formDataAdmin, setFormData] = useState({
      update: isUpdate,
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      level: pickLevel,
      position: pickPosition,
      fired: "Now",
      phone: "-",
      sick: 0,
      permission: 0,
      not_reason: 0,
      role_job: [], 
      role: "admin",
    });   

    const handleChangeAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };


    const handleCreateAdmin = async () => {
        setIsLoading(true);
    
        try {
            const res = await fetch("http://localhost:3001/api/createAdmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataAdmin),
            });
    
            const data = await res.json();
            console.log("Respon dari server:", data);
    
            if (!res.ok) {
                alert(data.error || "Create Admin gagal");
                return;
            }
    
            alert(data.message || "Create Admin berhasil!");
    
            // Reset form setelah berhasil
            setFormData({
                update: false,
                username: "",
                email: "",
                password: "",
                confirm_password: "",
                level: pickLevel,
                position: pickPosition,
                fired: "Now",
                phone: "-",
                sick: 0,
                permission: 0,
                not_reason: 0,
                role_job: [],
                role: "admin",
            });
    
            setAddAdmin(false);
        } catch (error) {
            console.error("Error saat Create Admin:", error);
            alert("Terjadi kesalahan saat Create Admin");
        } finally {
            setIsLoading(false);
        }
    };
    

    const [listUsers, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [firstUser, setFirstUser] = useState<User | null>(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await fetch("http://localhost:3001/api/getAdmins");
          const data: User[] = await res.json();

          const sortedData = sortContacts(data, urutan);
                setUsers(sortedData);
                if (data.length > 0 && !firstUser) {
                  setFirstUser(data[0]);
                }

          // ambil data pertama hanya jika ada
          if (data.length > 0 && !firstUser) {
            setFirstUser(data[0]);
          }
        } catch (err) {
          console.error("Gagal fetch users:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }, [urutan,hapusNama,addAdmin]);

    const sortContacts = (data: User[], order: string) => {
        const sortedData = [...data];
        
        switch (order) {
            case 'A - Z':
                return sortedData.sort((a, b) => 
                    a.username.localeCompare(b.username)
                );
            
            case 'Z - A':
                return sortedData.sort((a, b) => 
                    b.username.localeCompare(a.username)
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

    if (loading) return <p>Loading...</p>;

    async function handleDelete(userId: string) {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3001/api/removeUser", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: userId }),
        });
    
        if (!res.ok) {
          throw new Error("Gagal menghapus user");
        }
    
        const data = await res.json();
        console.log("User berhasil dihapus:", data);
        alert("User berhasil dihapus");
        setHapusNama("none");
      } catch (error) {
        console.error("Error:", error);
        alert("Gagal menghapus user. Silakan coba lagi nanti.");
      }finally {
        setIsLoading(false);
      }
    }

    async function handleDeleteAll(roles: string) {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3001/api/removeAllUser", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: roles }),
        });
    
        if (!res.ok) {
          throw new Error("Gagal menghapus semua message");
        }
    
        const data = await res.json();
        console.log("user admin berhasil dihapus semua:", data);
        alert("user admin berhasil dihapus semua");
        setHapus(false);
      } catch (error) {
        console.error("Error:", error);
        alert("Gagal menghapus semua admin. Silakan coba lagi nanti.");
      }finally {
        setIsLoading(false);
      }
    }
      
    
  return (
    <>
        <div className='w-full h-1000 pl-50 flex flex-col bg-[#eff3ff]'>
            {/* TITLE */}
            <div className='fixed z-2 w-266 flex flex-row justify-between p-2 px-4 bg-white border-b-[1px] border-[#f6d7ff]'>
                <h1 className='font-semibold text-sm text-[#710093]'>Admins List</h1>
                <p className='font-light text-[12px] text-[#00930f]'>today : <span className='font-bold'>{formattedDate}</span></p>
            </div>

            {/* SEARCH */}
            <div className='fixed z-2 w-266 top-8 p-3 pl-5 border-t-[1px] border-b-[1.5px] border-b-[#9e1ac3] border-[#f6d7ff] bg-white flex flex-row  justify-between gap-4'>
                <div className='relative'>
                    <input type="text" className='border-1 hover:border-[1.5px] border-[#710093] bg-[#fcf1ff] p-2 pl-4 text-[12px] w-70 rounded-full text-[#930062]' placeholder='Search'/>
                    <button className='cursor-pointer w-8 h-8 pt-1 absolute top-0 right-1'>
                        <Image width={30} height={30} src='/search.svg' alt="Search" className='w-4 h-4 ml-2'/>
                    </button>
                </div>
                <div className='relative flex flex-row gap-2'>
                    <button onClick={() => {
                        setAddAdmin(true);
                    }} 
                    className='cursor-pointer text-[12px] font-bold p-2 px-5 text-white rounded-lg bg-[#ce2dff] hover:bg-[#e078ff] active:bg-[#390056]'>+ Admin</button>
                    <button onClick={diKlik} className='cursor-pointer bg-white text-[#710093] font-semibold flex flex-row text-[12px] px-4 py-2 rounded-full hover:bg-[#f9e6ff] transition duration-200'>{urutan}
                        <Image width={30} height={30} src='/arrow-solid.svg' alt="Search" className={`w-2 h-2 mt-1.5 ${urutanActive ? 'rotate-0' : 'rotate-180'} ml-2`}/>
                    </button>
                    { urutanActive && 
                        <div className='absolute z-2 w-30 h-50 border-[1.5px] rounded-lg border-[#cb48f3] top-10 right-21 backdrop-blur-md flex flex-col justify-center items-center gap-2 px-4'>
                            <button onClick={az} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>A - Z</button>
                            <button onClick={za} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>Z - A</button>
                            <button onClick={newklik} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>New</button>
                            <button onClick={old} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>Old</button>
                        </div>
                    }
                    <button onClick={() => {
                        setHapus(true);
                    }} 
                    className='cursor-pointer text-[12px] font-bold p-2 px-5 border-1 border-[#ec7eaf] text-[#93006e] rounded-lg bg-[#f9e6ff] hover:bg-[#ff1376] hover:border-[#ff1376] hover:text-white active:bg-[#93006e]'>Delete All</button>
                </div>
            </div>

            {/* DETAIL USERS */}
            <div className='w-full flex flex-row'>
                <div className='w-80 top-23 pt-10 h-full fixed flex flex-col items-center bg-white border-r-[1.5px] border-[#e792ff] overflow-clip'>
                    <button onClick={()=>{setHapusNama(firstUser?.username || '');setIdUser(firstUser?.id || '')}} className='text-[10px] rounded-md bg-[#ffecf1] text-[#650028] border-[1px] border-b-2 absolute top-4 left-4 border-[#bc3c7a] py-1 px-3 flex flex-row items-center gap-2 font-semibold hover:border-b-4 hover:top-3 transition-all duration-100'>
                        <Image width={30} height={30} src='/trash-red.svg' alt="Dashboard" className='w-2 h-2'/>
                        Delete
                    </button>
                    <div className='w-25 h-25 bg-blue-100 flex justify-center items-center rounded-full font-bold text-6xl text-blue-700'>{firstUser?.username.charAt(0) || "-"}</div>
                    <p className='font-bold text-[#710093] text-xl mt-2'>{firstUser?.username}</p>
                    <p className='w-60 text-[10px] mt-3'>Hire Date & Termination Date</p>
                    <p className='w-60 text-[12px] font-semibold text-[#710093]'>{firstUser?.createdAt} - {firstUser?.fired}</p>
                    <p className='w-60 text-[10px] mt-3'>Email Address</p>
                    <p className='w-60 text-[12px] font-semibold text-[#710093]'>{firstUser?.email || '-'}</p>
                    
                    {/* DEKORASI BACKGROUND */}
                    {/* <div className='opacity-60 absolute flex justify-center items-center -z-1 rounded-full w-150 h-150 bg-purple-50'>
                        <div className='rounded-full flex justify-center items-center w-130 h-130 bg-white'>
                            <div className='rounded-full flex justify-center items-center w-120 h-120 bg-purple-50'>
                                <div className='rounded-full flex justify-center items-center w-110 h-110 bg-white'>
                                    <div className='rounded-full flex justify-center items-center w-100 h-100 bg-purple-50'>
                                        <div className='rounded-full flex justify-center items-center w-80 h-80 bg-white'>
                                            <div className='rounded-full flex justify-center items-center w-70 h-70 bg-purple-50'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* LIST USERS */}
                <div className='flex flex-row flex-wrap gap-x-5 gap-y-5 p-5 pt-30 pl-83'>
                    {listUsers.map((user, index) => (
                        <button onClick={()=>(setFirstUser(user))} key={index} className='w-85 flex flex-row justify-start items-center p-3 px-4 pr-10 bg-white rounded-lg border-1 border-[#cb48f3] shadow-md gap-2 relative hover:border-2 hover:-mt-1 hover:-ml-1'>
                            <div className='w-13 h-13 bg-blue-100 flex justify-center items-center rounded-full font-bold text-2xl text-blue-700'>{user.username.charAt(0)}</div>
                            <div className='flex flex-col items-start'>
                                <div className='flex flex-row items-end gap-2'>
                                    <p className='text-[13px] text-left font-bold text-[#710093]'>{truncateTextByChar(user.username,8)} <span className='font-light text-[10px] ml-2'>{user.createdAt}</span> </p>
                                </div>
                                <p className='text-[12px] font-light'>{user.email}</p>
                            </div>
                            <button
                            onClick={() => {
                                if (edit === 'none' || edit !== user.username) {
                                    setEdit(user.username);
                                }else {
                                    setEdit('none');
                                }
                                formDataAdmin.username = user.username;
                                formDataAdmin.email = user.email;
                                setIsUpdate(true);
                                setAddAdmin(true);
                            }}
                            className='h-8 w-8 absolute -right-3 top-2 flex justify-center items-center rounded-full bg-[#fbecff] text-[#710093] border-[1px] border-[#AD48FF] hover:bg-[#deb6ff] cursor-pointer'>
                                <Image width={30} height={30} src='/edit.svg' alt="Dashboard" className={`w-3 h-3`}/>
                            </button>
                            <button onClick={()=>{setHapusNama(user.username);setIdUser(user.id)}} className='h-8 w-8 absolute -right-3 top-11 flex justify-center items-center rounded-full bg-[#ff4986] text-[#cf008a] border-[1px] border-[#930062] hover:bg-[#cf008a] cursor-pointer'>
                                <Image width={30} height={30} src='/trash.svg' alt="Dashboard" className='w-3 h-3'/>
                            </button>
                        </button>
                    ))}
                </div>
            </div>

            {/* EDIT USER */}
            {hapus || hapusNama !== "none" || addAdmin ?
            <div className='fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center'>n</div>
            : null
            }
            {hapus || hapusNama !== "none" || addAdmin ?
            <div className='fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center'>n</div>
            : null
            }
            {hapus &&
            <div className='fixed z-6 top-40 left-140 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                <p className='text-[12px] text-[#930062] w-30 text-center'>Yakin <span className='font-bold'>dihapus</span> semua ?</p>
                <button onClick={()=>handleDeleteAll('admin')} className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>
                    {isLoading ? "delete..." : "Yes"}
                </button>
                <button onClick={() => setHapus(false)} className={`fixed z-6 top-37 right-133 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
            }
            {addAdmin &&
            <div className='fixed z-6 top-30 left-100 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                <p className='w-full text-left text-lg font-bold text-[#710093]'>Add admin</p>
                <input type="text"
                    className='p-2 px-4 text-[12px] border rounded-lg w-100 bg-purple-50 border-purple-500' name="username"
                    placeholder="Username"
                    value={formDataAdmin.username}
                    onChange={handleChangeAdmin}/>
                <input type="email"
                    className='p-2 px-4 text-[12px] border rounded-lg w-100 bg-purple-50 border-purple-500'
                    name="email"
                    placeholder="Email"
                    value={formDataAdmin.email}
                    onChange={handleChangeAdmin}/>
                <input type="password"
                    className='p-2 px-4 text-[12px] border rounded-lg w-100 bg-purple-100 border-purple-500'
                    name="password"
                    placeholder="Password"
                    value={formDataAdmin.password}
                    onChange={handleChangeAdmin}/>
                <input type="password"
                    className='p-2 px-4 text-[12px] border rounded-lg w-100 bg-purple-100 border-purple-500'
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={formDataAdmin.confirm_password}
                    onChange={handleChangeAdmin}/>
                <button onClick={() => (handleCreateAdmin())} className='p-2 w-full rounded-md bg-purple-700 hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-white hover:text-white font-bold'>
                    {isLoading ? "Creating..." : "Create"}
                </button>
                <button onClick={() => (setAddAdmin(false),formDataAdmin.username = '',formDataAdmin.email = '',setIsUpdate(false))} className={`fixed z-6 top-27 right-103 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
            }
            {hapusNama !== "none" &&
            <div className='fixed z-6 top-40 left-140 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                <p className='text-[12px] text-[#930062] w-30 text-center'>Yakin <span className='font-bold'>{hapusNama}</span> dihapus ?</p>
                <button onClick={()=>(handleDelete(idUser))} className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>
                    {isLoading ? "Delete..." : "Yes"}
                </button>
                <button onClick={() => setHapusNama("none")} className={`fixed z-6 top-37 right-133 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
            }
            {/* <div className='fixed z-6 top-30 p-5 border-1 rounded-lg border-[#710093] bg-white flex flex-col gap-3'>
                <input type="text" className='border-1 hover:border-[1.5px] border-[#710093] bg-[#fcf1ff] p-2 pl-4 text-[12px] w-70 rounded-full' placeholder='Search'/>
                <input type="text" className='border-1 hover:border-[1.5px] border-[#710093] bg-[#fcf1ff] p-2 pl-4 text-[12px] w-70 rounded-full' placeholder='Search'/>
                <input type="text" className='border-1 hover:border-[1.5px] border-[#710093] bg-[#fcf1ff] p-2 pl-4 text-[12px] w-70 rounded-full' placeholder='Search'/>
            </div> */}
        </div>
    </>
  )
}
