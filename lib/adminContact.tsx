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
          subjek: "Permintaan Penawaran",
          nama: "Andi Saputra",
          email: "andi@example.com",
          tanggal: "2025-08-11",
          isi: "Halo, saya ingin menanyakan harga untuk pemesanan 100 kaos custom.",
          dibacaOleh: ["admin1", "admin2"],
          status: "dibaca",
        },
        {
          subjek: "Revisi Desain",
          nama: "Budi Hartono",
          email: "budi@example.com",
          tanggal: "2025-08-10",
          isi: "Tolong revisi desain bagian depan dengan warna biru navy.",
          dibacaOleh: ["admin2"],
          status: "dibaca",
        },
        {
          subjek: "Konfirmasi Pembayaran",
          nama: "Citra Lestari",
          email: "citra@example.com",
          tanggal: "2025-08-09",
          isi: "Saya sudah melakukan pembayaran via transfer BCA, mohon konfirmasinya.",
          dibacaOleh: [],
          status: "bdibaca",
        },
        {
          subjek: "Permintaan Desain Baru",
          nama: "Dian Pratama",
          email: "dian@example.com",
          tanggal: "2025-08-08",
          isi: "Saya ingin memesan kaos dengan desain khusus bertema retro.",
          dibacaOleh: ["admin1"],
          status: "dibaca",
        },
        {
          subjek: "Pengiriman Terlambat",
          nama: "Eka Wulandari",
          email: "eka@example.com",
          tanggal: "2025-08-07",
          isi: "Pesanan saya belum sampai, padahal sudah lewat estimasi pengiriman.",
          dibacaOleh: ["admin3"],
          status: "bdibaca",
        },
        {
          subjek: "Pertanyaan Tentang Bahan",
          nama: "Fajar Nugroho",
          email: "fajar@example.com",
          tanggal: "2025-08-06",
          isi: "Bahan cotton combed 30s dan 24s bedanya apa ya?",
          dibacaOleh: [],
          status: "dibaca",
        },
        {
          subjek: "Pembatalan Pesanan",
          nama: "Gita Anggraini",
          email: "gita@example.com",
          tanggal: "2025-08-05",
          isi: "Saya ingin membatalkan pesanan karena ada perubahan kebutuhan.",
          dibacaOleh: ["admin1", "admin2"],
          status: "dibaca",
        },
        {
          subjek: "Permintaan Diskon",
          nama: "Hadi Santoso",
          email: "hadi@example.com",
          tanggal: "2025-08-04",
          isi: "Apakah ada diskon untuk pembelian di atas 50 pcs?",
          dibacaOleh: [],
          status: "dibaca",
        },
        {
          subjek: "Perubahan Alamat Pengiriman",
          nama: "Indah Permata",
          email: "indah@example.com",
          tanggal: "2025-08-03",
          isi: "Alamat pengiriman saya berubah, mohon update ke alamat baru.",
          dibacaOleh: ["admin2"],
          status: "dibaca",
        },
        {
          subjek: "Testimoni Positif",
          nama: "Joko Susanto",
          email: "joko@example.com",
          tanggal: "2025-08-02",
          isi: "Kaosnya bagus sekali, jahitan rapi dan bahan nyaman dipakai!",
          dibacaOleh: ["admin1", "admin3"],
          status: "dibaca",
        },
      ];
      
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    function truncateTextByChar(text: string, charLimit: number): string {
        if (text.length <= charLimit) return text;
        return text.slice(0, charLimit) + '...';
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
                    <button className='text-[12px] font-bold p-2 px-5 border-1 border-[#7e8bec] text-[#001893] flex flex-row gap-2 rounded-lg bg-[#e6edff] hover:bg-[#7e8bec] hover:text-white active:bg-[#001893] cursor-pointer'>
                        <Image width={30} height={30} src='/email-dibuka-blue.svg' alt="Dashboard" className='w-3 h-3 mt-[.5px]'/>
                        Dibaca semua</button>
                    <button onClick={() => {
                        setHapus(true);
                    }} 
                    className='cursor-pointer text-[12px] font-bold p-2 px-5 border-1 border-[#ec7eaf] text-[#93006e] rounded-lg bg-[#f9e6ff] hover:bg-[#ff1376] hover:border-[#ff1376] hover:text-white active:bg-[#93006e]'>Delete All</button>
                </div>
            </div>

            {/* LIST USERS */}
            <div className='flex flex-row flex-wrap gap-x-5 gap-y-1 p-5 pt-30'>
                {listUsers.map((user, index) => (
                    <div key={index} className='w-full flex flex-row justify-start items-center p-3 px-4 pr-10 bg-white rounded-lg border-1 border-[#cb48f3] shadow-md gap-2 relative'>
                        <div className='flex flex-col'>
                            <p className='text-[13px] font-bold text-[#710093]'>{truncateTextByChar(user.subjek,60)} <span className='font-light text-[10px] text-[#00930f] ml-2'>{user.tanggal}</span></p>
                            <p className='text-[12px] font-light'>from 
                                <span className='text-[#004793]'> {user.nama} -</span>
                                <span className='text-[#004793]'> {user.email} -</span>
                                <span> {user.isi}</span>
                            </p>
                        </div>
                        <button onClick={()=>{setHapusNama(user.nama);}} className='h-8 w-8 absolute right-3 top-4 flex justify-center items-center rounded-full bg-[#ffa0c0] text-[#cf008a] border-[1px] border-[#930062] hover:bg-[#cf008a] cursor-pointer'>
                            <Image width={30} height={30} src='/trash.svg' alt="Dashboard" className='w-3 h-3'/>
                        </button>
                        {user.status === 'bdibaca' ?
                        <Image width={30} height={30} src='/email-blue.svg' alt="Dashboard" className='w-4 h-4 absolute right-15 top-6'/>
                        :
                        <Image width={30} height={30} src='/email-dibuka.svg' alt="Dashboard" className='w-4 h-4 absolute right-15 top-6'/>
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
