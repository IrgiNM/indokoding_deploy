import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { User } from './adminDashboard';
import { useRouter } from 'next/navigation';
import { getCookies } from '@/utils/tokenController';

export default function AdminJoinUs() {
    const [edit, setEdit] = useState('none');
    const [hapus, setHapus] = useState(false);
    const [detail, setDetail] = useState(false);
    const [hapusNama, setHapusNama] = useState("none");

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

    const [urutan, setUrutan] = useState("A - Z");
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

    const [pickNama, setPickNama] = useState('none');
    const [pickEmail, setPickEmail] = useState('none@gmail.com');
    const [pickTanggal, setPickTanggal] = useState('0-0-2025');
    const [pickPesan, setPickPesan] = useState('none');
    const [pickGaji, setPickGaji] = useState(200.321);
    const [pickPosition, setPickPosition] = useState('Web Frontend');

    const listUsers = [
        {
          nama: "Andi Saputra",
          tanggal: "2025-08-11",
          email: "andi@example.com",
          from: "Jakarta",
          Position: "Web Frontend",
          gaji: 500,
          pesan: "Mengajukan kenaikan gaji karena penambahan tanggung jawab.",
          dibacaOleh: ["admin1", "admin2"],
          status: "baru",
        },
        {
          nama: "Budi Hartono",
          tanggal: "2025-08-10",
          email: "budi@example.com",
          from: "Bandung",
          Position: "Web Backend",
          gaji: 433.33,
          pesan: "Meminta izin cuti selama 5 hari untuk keperluan keluarga.",
          dibacaOleh: ["admin2"],
          status: "proses",
        },
        {
          nama: "Velly Rhis Faulina",
          tanggal: "2025-08-09",
          email: "citra@example.com",
          from: "Surabaya",
          Position: "Web Frontend",
          gaji: 533.33,
          pesan: "Memberikan laporan progres proyek terakhir. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ullam tenetur unde doloribus, tempore repudiandae accusantium perferendis nemo ducimus iusto architecto at laudantium! Voluptate tempora, earum, consequatur atque aperiam nesciunt possimus facilis officia assumenda veritatis dolorum, illum beatae dolorem. Numquam, doloremque quisquam! A odit magnam nobis! Impedit fugiat consequuntur libero odio, reiciendis alias doloremque optio, a modi, quasi beatae? In veniam ipsum quam adipisci, suscipit numquam aliquid debitis neque earum quo at voluptas? Voluptatem et porro, aliquam natus at, repellendus eum nihil velit culpa sed quos enim aspernatur illum fugit doloribus fugiat eligendi eaque ut? Modi esse sed libero voluptas. iusto architecto at laudantium! Voluptate tempora, earum, consequatur atque aperiam nesciunt possimus facilis officia assumenda veritatis dolorum, illum beatae dolorem. Numquam, doloremque quisquam! A odit magnam nobis! Impedit fugiat consequuntur libero odio, reiciendis alias doloremque optio, a modi, quasi beatae? In veniam ipsum quam adipisci, suscipit numquam aliquid debitis neque earum quo at voluptas? Voluptatem et porro, aliquam natus at, repellendus eum nihil velit culpa sed quos enim aspernatur illum fugit doloribus fugiat eligendi eaque ut? Modi esse sed libero voluptas.",
          dibacaOleh: [],
          status: "selesai",
        },
        {
          nama: "Kireisa Hana Mustofa",
          tanggal: "2025-08-08",
          email: "dian@example.com",
          from: "Yogyakarta",
          Position: "Django Developer",
          gaji: 466.67,
          pesan: "Mengajukan permintaan pelatihan tambahan.",
          dibacaOleh: ["admin1"],
          status: "baru",
        },
        {
          nama: "Eka Wulandari",
          tanggal: "2025-08-07",
          email: "eka@example.com",
          from: "Semarang",
          Position: "Android Developer",
          gaji: 480,
          pesan: "Melaporkan keterlambatan proyek karena faktor cuaca.",
          dibacaOleh: ["admin3"],
          status: "proses",
        },
        {
          nama: "Fajar Nugroho",
          tanggal: "2025-08-06",
          email: "fajar@example.com",
          from: "Makassar",
          Position: "Android Developer",
          gaji: 460,
          pesan: "Meminta upgrade laptop kerja untuk menunjang performa.",
          dibacaOleh: [],
          status: "baru",
        },
        {
          nama: "Gita Anggraini",
          tanggal: "2025-08-05",
          email: "gita@example.com",
          from: "Medan",
          Position: "IOS Developer",
          gaji: 513.33,
          pesan: "Memberikan testimoni positif atas kerja sama tim.",
          dibacaOleh: ["admin1", "admin2"],
          status: "selesai",
        },
        {
          nama: "Hadi Santoso",
          tanggal: "2025-08-04",
          email: "hadi@example.com",
          from: "Bali",
          Position: "Web Frontend",
          gaji: 500,
          pesan: "Mengajukan perubahan jam kerja.",
          dibacaOleh: [],
          status: "baru",
        },
        {
          nama: "Indah Permata",
          tanggal: "2025-08-03",
          email: "indah@example.com",
          from: "Palembang",
          Position: "Django Developer",
          gaji: 486.67,
          pesan: "Meminta klarifikasi terkait proyek baru.",
          dibacaOleh: ["admin2"],
          status: "proses",
        },
        {
          nama: "Joko Susanto",
          tanggal: "2025-08-02",
          email: "joko@example.com",
          from: "Lampung",
          Position: "Administrator",
          gaji: 520,
          pesan: "Memberikan laporan akhir bulan.",
          dibacaOleh: ["admin1", "admin3"],
          status: "selesai",
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
                <h1 className='font-semibold text-sm text-[#710093]'>JoinUs Inbox List</h1>
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
                    <button className='hover:bg-purple-50 p-2 hover:border hover:border-[#e079ff] rounded-full'>
                        <Image width={140} height={140} src="/love.svg" alt="MySQL" className="w-4" />
                    </button>
                    <input type="date" className='hover:bg-[#f9e6ff] text-[12px] font-semibold text-[#710093] px-4 rounded-full border-1 border-[#d37eec] flex justify-start'/>
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
                    <button className='text-[12px] font-bold p-2 px-5 border-1 border-[#d37eec] text-[#710093] rounded-lg bg-[#f9e6ff] hover:bg-[#d37eec] hover:text-white active:bg-[#710093] cursor-pointer'>Reset</button>
                    <button className='text-[12px] font-bold p-2 px-5 border-1 border-[#7e8bec] text-[#001893] flex flex-row gap-2 rounded-lg bg-[#e6edff] hover:bg-[#7e8bec] hover:text-white active:bg-[#001893] cursor-pointer'>
                        <Image width={30} height={30} src='/email-dibuka-blue.svg' alt="Dashboard" className='w-3 h-3 mt-[.5px]'/>
                        Read All</button>
                    <button onClick={() => {
                        setHapus(true);
                    }} 
                    className='cursor-pointer text-[12px] font-bold p-2 px-5 border-1 border-[#ec7eaf] text-[#93006e] rounded-lg bg-[#f9e6ff] hover:bg-[#ff1376] hover:border-[#ff1376] hover:text-white active:bg-[#93006e]'>Delete All</button>
                </div>
            </div>

            {/* LIST USERS */}
            <div className='flex flex-row flex-wrap gap-x-5 gap-y-1 p-5 pt-30'>
                {listUsers.map((user, index) => (
                    
                        <div className={`w-full flex flex-row justify-start items-center p-3 px-4 pr-10 bg-white rounded-lg border-1 border-[#cb48f3] hover:bg-purple-50 shadow-md gap-2 relative`}>
                            <Image width={30} height={30} src={
                                user.Position === 'Web Frontend' ? '/code.svg' :
                                user.Position === 'Web Backend' ? '/server.svg' :
                                user.Position === 'Django Developer' ? '/django.svg' :
                                user.Position === 'Android Developer' ? '/android.svg' :
                                user.Position === 'IOS Developer' ? '/apple.svg' :
                                user.Position === 'Administrator' ? '/admin.svg' :
                                '/code.svg'
                            } alt="Dashboard" className='w-8 border-1 border-purple-300 rounded-full h-8 p-2 absolute'/>
                            <button key={index} onClick={() => {
                                klikDetail();
                                setPickNama(user.nama);
                                setPickEmail(user.email);
                                setPickTanggal(user.tanggal);
                                setPickPesan(user.pesan);
                                user.status = 'dibaca';
                            }} className='w-full flex items-start justify-start pl-10'>
                                <div className='flex flex-col items-start'>
                                    <p className={`text-[13px] font-bold text-[#710093] ${user.dibacaOleh.length > 0 ? 'opacity-30' : 'opacity-100'}`}>{truncateTextByChar(user.nama,60)} <span className='font-light text-[10px] text-[#00930f] ml-2'>{user.tanggal}</span></p>
                                    <p className='text-[12px] font-light'>from 
                                        <span className='text-[#004793]'> {truncateTextByChar(user.from,10)} -</span>
                                        <span className='text-[#004793]'> {user.email} -</span>
                                        <span> {truncateTextByChar(user.pesan,70)}</span>
                                    </p>
                                </div>
                            </button>
                            <button onClick={()=>{setHapusNama(user.nama);}} className='h-8 w-8 absolute right-3 top-4 flex justify-center items-center rounded-full bg-[#ffa0c0] text-[#cf008a] border-[1px] border-[#930062] hover:bg-[#cf008a] cursor-pointer'>
                                <Image width={30} height={30} src='/trash.svg' alt="Dashboard" className='w-3 h-3'/>
                            </button>
                            {user.status === 'bdibaca' ?
                            <Image width={30} height={30} src='/email-blue.svg' alt="Dashboard" className='w-4 h-4 absolute right-15 top-6'/>
                            :
                            <Image width={30} height={30} src='/email-dibuka.svg' alt="Dashboard" className='w-4 h-4 absolute right-15 top-6'/>
                            }
                            {user.dibacaOleh.length > 0 && user.dibacaOleh.map((admin, idx) => (
                                <button onClick={() => {
                                    if (edit === 'none' || edit !== user.nama) {
                                        setEdit(user.nama);
                                    }else {
                                        setEdit('none');
                                    }
                                }}>
                                    <Image width={30} height={30} src='/eye.svg' alt="Dashboard" className='w-4 h-4 absolute right-24 top-6 cursor-pointer'/>
                                </button>
                            ))}
                            {user.dibacaOleh.length > 0  && edit === user.nama ?
                                <div className='absolute z-1 w-30 border-[1.5px] rounded-lg border-[#cb48f3] top-4 right-30 backdrop-blur-md flex flex-col justify-center items-center gap-2 py-4'>
                                    {user.dibacaOleh.map((admin, idx) => (
                                        <p key={idx} className='text-[12px] font-semibold text-[#710093]'>{admin}</p>
                                    ))}
                                </div>
                            : null}
                            <p className='text-[12px] font-bold text-[#009351] absolute w-20 border border-[#009351] bg-[#effff4] flex flex-row gap-2 p-2 right-32 top-4 rounded-md'>
                                <Image width={140} height={140} src="/dollar-green.svg" alt="MySQL" className="w-2" />
                                {user.gaji.toFixed(2)}
                            </p>
                            <p className='absolute top-1 right-37 text-[12px] text-[#710093] p-0 px-2 rounded-md bg-purple-100'>Rate</p>
                            <button className='absolute top-4 right-55 p-2 hover:border hover:border-[#e079ff] rounded-full'>
                                <Image width={140} height={140} src="/love.svg" alt="MySQL" className="w-4" />
                            </button>
                        </div>
                    
                ))}
            </div>

            {/* EDIT USER */}
            {hapus || hapusNama !== "none" || detail ?
            <div className='fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center'></div>
            : null
            }
            {hapus || hapusNama !== "none" || detail ?
            <div className='fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center'></div>
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
                <p className='text-[12px] text-[#930062] w-30 text-center'>Yakin <span className='font-bold'>Message ini</span> dihapus ?</p>
                <button className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>Yes</button>
                <button onClick={() => setHapusNama("none")} className={`fixed z-6 top-37 right-133 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
            }
            {detail &&
                <div className='fixed w-150 z-6 top-20 left-90 p-7 border-1 rounded-lg border-[#930062] bg-white flex flex-col justify-center items-start'>
                    
                    <div className='flex flex-row gap-2 mb-7 items-center'>
                        <div className='w-13 h-13 bg-blue-100 flex justify-center items-center rounded-full font-bold text-[25px] text-blue-700'>{pickNama.charAt(0)}</div>
                        <div className='flex flex-col'>
                            <p className='text-[20px] text-[#710093] gap-2 font-bold flex flex-row items-center'>{pickNama} <h1 className='text-[12px] mt-1 font-semibold text-[#710093]'>{pickTanggal}</h1></p>
                            <p className='text-[12px] text-[#710093]'>{pickEmail}</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <div className='p-2 pl-3 gap-2 border-2 border-[#c77fd6] text-[12px] text-[#710093] font-bold flex flex-row items-center w-101 bg-[#ffffff] rounded-md'>
                            <Image width={30} height={30} src={
                                pickPosition === 'Web Frontend' ? '/code.svg' :
                                pickPosition === 'Web Backend' ? '/server.svg' :
                                pickPosition === 'Django Developer' ? '/django.svg' :
                                pickPosition === 'Android Developer' ? '/android.svg' :
                                pickPosition === 'IOS Developer' ? '/apple.svg' :
                                pickPosition === 'Administrator' ? '/admin.svg' :
                                '/code.svg'
                            } alt="Dashboard" className='w-8 border-1 border-purple-300 rounded-full h-8 p-2'/>
                            {pickPosition}
                        </div>
                        <div className='p-3 gap-2 border-2 border-[#7fd6af] text-[#007541] font-bold flex flex-row bg-[#effff4] rounded-md'>
                            <Image width={140} height={140} src="/dollar-green.svg" alt="MySQL" className="w-2" />
                            {pickGaji.toFixed(2)}
                        </div>
                    </div>
                    
                    <p className='max-h-50 pr-5 mt-3 overflow-auto text-[12px] text-justify'><span className='text-[#710093] font-semibold'>Pesan : </span>{pickPesan}</p>

                    <button onClick={() => klikDetail()} className={`fixed z-6 top-16 right-73 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}>
                        <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                    </button>
                </div>
            }
            
        </div>
    </>
  )
}
