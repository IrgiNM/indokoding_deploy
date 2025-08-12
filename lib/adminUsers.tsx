import Image from 'next/image'
import React, { useState } from 'react'

export default function AdminUsers() {
    const [edit, setEdit] = useState('none');
    const [hapus, setHapus] = useState(false);
    const [hapusNama, setHapusNama] = useState("none");

    const [urutan, setUrutan] = useState("A - Z");
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

    const listUsers = [
        {
          nama: "IrgiNM",
          emal: "irginazwamustofa@gmail.com",
          tanggal: "01/08/2024",
        },
        {
          nama: "Tantriiii",
          emal: "handa.r@example.com",
          tanggal: "02/08/2024",
        },
        {
          nama: "Budi Santoso",
          emal: "budi.santoso@example.com",
          tanggal: "03/08/2024",
        },
        {
          nama: "Citra Ayu",
          emal: "citra.ayu@example.com",
          tanggal: "04/08/2024",
        },
        {
          nama: "Dewi Lestari",
          emal: "dewi.lestari@example.com",
          tanggal: "05/08/2024",
        },
        {
          nama: "Eka Pratama",
          emal: "eka.pratama@example.com",
          tanggal: "06/08/2024",
        },
        {
          nama: "Fajar Nugraha",
          emal: "fajar.nugraha@example.com",
          tanggal: "07/08/2024",
        },
        {
          nama: "Gilang Saputra",
          emal: "gilang.saputra@example.com",
          tanggal: "08/08/2024",
        },
        {
          nama: "Hani Putri",
          emal: "hani.putri@example.com",
          tanggal: "09/08/2024",
        },
        {
          nama: "Indra Wijaya",
          emal: "indra.wijaya@example.com",
          tanggal: "10/08/2024",
        },
        {
          nama: "Joko Purnomo",
          emal: "joko.purnomo@example.com",
          tanggal: "11/08/2024",
        },
        {
          nama: "Kirana Salsabila",
          emal: "kirana.salsabila@example.com",
          tanggal: "12/08/2024",
        },
      ];
      
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    
  return (
    <>
        <div className='w-full h-1000 pl-50 flex flex-col bg-[#eff3ff]'>
            {/* TITLE */}
            <div className='fixed z-2 w-266 flex flex-row justify-between p-2 px-4 bg-white border-b-[1px] border-[#f6d7ff]'>
                <h1 className='font-semibold text-sm text-[#710093]'>Users List</h1>
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
                    <input type="date" className='hover:bg-[#f9e6ff] text-[12px] font-semibold text-[#710093] px-4 rounded-full border-1 border-[#d37eec] flex justify-start'/>
                    <button onClick={diKlik} className='cursor-pointer bg-white text-[#710093] font-semibold flex flex-row text-[12px] px-4 py-2 rounded-full hover:bg-[#f9e6ff] transition duration-200'>{urutan}
                        <Image width={30} height={30} src='/arrow-solid.svg' alt="Search" className={`w-2 h-2 mt-1.5 ${urutanActive ? 'rotate-0' : 'rotate-180'} ml-2`}/>
                    </button>
                    { urutanActive && 
                        <div className='absolute z-2 w-30 h-50 border-[1.5px] rounded-lg border-[#cb48f3] top-10 right-43 backdrop-blur-md flex flex-col justify-center items-center gap-2 px-4'>
                            <button onClick={az} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>A - Z</button>
                            <button onClick={za} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>Z - A</button>
                            <button onClick={newklik} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>New</button>
                            <button onClick={old} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>Old</button>
                        </div>
                    }
                    <button className='text-[12px] font-bold p-2 px-5 border-1 border-[#d37eec] text-[#710093] rounded-lg bg-[#f9e6ff] hover:bg-[#d37eec] hover:text-white active:bg-[#710093] cursor-pointer'>Reset</button>
                    <button onClick={() => {
                        setHapus(true);
                    }} 
                    className='cursor-pointer text-[12px] font-bold p-2 px-5 border-1 border-[#ec7eaf] text-[#93006e] rounded-lg bg-[#f9e6ff] hover:bg-[#ff1376] hover:border-[#ff1376] hover:text-white active:bg-[#93006e]'>Delete All</button>
                </div>
            </div>

            {/* LIST USERS */}
            <div className='flex flex-row flex-wrap gap-x-5 gap-y-5 p-5 pt-30'>
                {listUsers.map((user, index) => (
                    <div key={index} className='w-80 flex flex-row justify-start items-center p-3 px-4 pr-10 bg-white rounded-lg border-1 border-[#cb48f3] shadow-md gap-2 relative'>
                    <div className='w-15 h-15 bg-blue-100 flex justify-center items-center rounded-full font-bold text-2xl text-blue-700'>{user.nama.charAt(0)}</div>
                        <div className='flex flex-col'>
                            <p className='text-[13px] font-bold text-[#710093]'>{user.nama} <span className='font-light text-[10px] ml-2'>{user.tanggal}</span></p>
                            <p className='text-[12px] font-light'>{user.emal}</p>
                        </div>
                        <button
                        onClick={() => {
                            if (edit === 'none' || edit !== user.nama) {
                                setEdit(user.nama);
                            }else {
                                setEdit('none');
                            }
                        }}
                        className='h-8 w-8 absolute -right-3 top-2 flex justify-center items-center rounded-full bg-[#fbecff] text-[#710093] border-[1px] border-[#AD48FF] hover:bg-[#deb6ff] cursor-pointer'>
                            <Image width={30} height={30} src='/arrow-solid.svg' alt="Dashboard" className={`w-2 h-2 ${edit === user.nama ? '-rotate-90' : 'rotate-180' }`}/>
                        </button>
                        <button onClick={()=>{setHapusNama(user.nama);}} className='h-8 w-8 absolute -right-3 top-11 flex justify-center items-center rounded-full bg-[#ff4986] text-[#cf008a] border-[1px] border-[#930062] hover:bg-[#cf008a] cursor-pointer'>
                            <Image width={30} height={30} src='/trash.svg' alt="Dashboard" className='w-3 h-3'/>
                        </button>
                        { edit === user.nama &&
                        <div className='absolute z-2 p-2 border-[1.5px] rounded-lg border-[#cb48f3] -top-3 right-7 backdrop-blur-xl flex flex-col justify-center items-center gap-2 px-4'>
                            <button className=' w-27 text-[12px] font-light p-2 px-5 border-1 border-[#7ea8ec] text-[#002593] rounded-lg bg-[#e6f5ff] hover:bg-[#7ea8ec] hover:text-white active:bg-[#002593] flex flex-row justify-between'>Message <span className='font-bold'>0</span></button>
                            <button className='w-27 text-[12px] font-light p-2 px-5 border-1 border-[#d37eec] text-[#710093] rounded-lg bg-[#f9e6ff] hover:bg-[#d37eec] hover:text-white active:bg-[#710093] flex flex-row justify-between'>JoinUs <span className='font-bold'>0</span></button>
                            <button className='w-27 text-[12px] font-light p-2 px-5 border-1 border-[#7eec8e] text-[#00934c] rounded-lg bg-[#e6ffee] hover:bg-[#7eec8e] hover:text-white active:bg-[#00934c] flex flex-row justify-between'>Career <span className='font-bold'>0</span></button>
                        </div>
                        }
                    </div>
                ))}
            </div>

            {/* EDIT USER */}
            {hapus || hapusNama !== "none" ?
            <div className='fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center'>n</div>
            : null
            }
            {hapus || hapusNama !== "none" ?
            <div className='fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center'>n</div>
            : null
            }
            {hapus &&
            <div className='fixed z-6 top-40 left-140 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                <p className='text-[12px] text-[#930062] w-30 text-center'>Yakin <span className='font-bold'>dihapus</span> semua ?</p>
                <button className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>Yes</button>
                <button onClick={() => setHapus(false)} className={`fixed z-6 top-37 right-133 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
            }
            {hapusNama !== "none" &&
            <div className='fixed z-6 top-40 left-140 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                <p className='text-[12px] text-[#930062] w-30 text-center'>Yakin <span className='font-bold'>{hapusNama}</span> dihapus ?</p>
                <button className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>Yes</button>
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
