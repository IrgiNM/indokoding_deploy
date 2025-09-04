import { getCookies } from '@/utils/tokenController';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type OurWorkData = {
    title: string;
    description: string;
    image: string;
    tags: string[];
};

export default function AdminOurWork() {
    const [tambahData, setTambahData] = useState(false);
    const [deleteAll, setDeleteAll] = useState(false);
    const [deleteData, setDeleteData] = useState("none");
    const [editData, setEditData] = useState<OurWorkData | null>(null);

    // const [token, setToken] = useState<User>();
    const router = useRouter();
    
    useEffect(() => {
      const fetchCookies = async () => {
        try {
          const savedToken = await getCookies(); // <- pakai await
    
          if (savedToken) {
            // Parse JSON kalau cookies disimpan sebagai string
            const parsed = typeof savedToken === "string" ? JSON.parse(savedToken) : savedToken;
            // Ambil token dan simpan ke state
            // setToken(parsed);
            if(parsed.role==="guest"){
                router.push("/");
            }
            console.log("Token dari cookies:", parsed);
          } else {
            // setToken(undefined);
            router.push("/admin");
          }
        } catch (error) {
          console.error("Gagal mengambil cookies:", error);
        //   setToken(undefined);
        }
      };
    
      fetchCookies();
    }, [router]);

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

    const listData = [
        {
            title: 'Equusbook',
            description: 'Kami pernah mengembangkan Equusbook, marketplace berbasis Next.js dan Tailwind CSS untuk jual beli kuda, horsebox, dan properti equestrian di Inggris. Platform ini mendukung iklan gratis dan navigasi yang mudah bagi komunitas berkuda.',
            image: '/assets/image/ourwork/porto1.avif',
            tags: ['next js ', 'tailwindcss ', 'market place'],
        },
        {
            title: 'Home and Gift Center',
            description: 'Kami pernah mengembangkan Home and Gift Center, sebuah platform e-commerce berbasis Next.js dan Tailwind CSS yang dirancang untuk menjual produk dekorasi rumah dan hadiah. Toko online ini menawarkan fitur pencarian produk, kategori, filter harga, serta tampilan galeri yang ramah pengguna.',
            image: '/assets/image/ourwork/porto2.avif',
            tags: ['next js ', 'tailwindcss ', 'e-commerce']
        },
        {
            title: 'Thirsty Camel',
            description: 'Kami pernah mengembangkan Thirsty Camel, sebuah platform katalog produk dan sistem pemesanan internal berbasis Next.js dan Tailwind CSS. Platform ini memungkinkan pengguna untuk melihat detail produk seperti ukuran, harga, dan stok secara real-time, serta mempermudah proses pemesanan barang seperti seragam atau merchandise.',
            image: '/assets/image/ourwork/porto3.avif',
            tags: ['next js ', 'tailwindcss ', 'product catalog'],
        },
        {
            title: 'Greene King Venue Finder',
            description: 'Kami pernah mengembangkan Greene King Venue Finder, sebuah platform pencarian lokasi pub dan restoran di Inggris. Dibuat dengan Next.js dan Tailwind CSS, sistem ini memungkinkan pengguna mencari venue berdasarkan lokasi saat ini, radius jarak, dan ukuran grup. Platform ini terintegrasi dengan Google Maps untuk pengalaman pencarian yang interaktif dan mudah digunakan.',
            image: '/assets/image/ourwork/porto4.avif',
            tags: ['next js ', 'tailwindcss ', 'map integration '],
        },
        {
            title: 'ASCC Artist-in-Residence Program',
            description: 'Kami pernah membangun ASCC Artist-in-Residence Program, sebuah platform untuk mendukung seniman dalam program residensi di Sheikh Abdullah Al-Salem Cultural Centre, Kuwait. Dibuat dengan Next.js dan Tailwind CSS, sistem ini menyediakan informasi tentang fasilitas studio, tujuan program, dan akses pendaftaran daring yang mudah.',
            image: '/assets/image/ourwork/porto5.avif',
            tags: ['next js ', 'tailwindcss ', 'culture ', 'residency '],
        },
        {
            title: 'Thermo Fisher - Who The One?',
            description: 'Kami pernah mengembangkan Who The One?, sebuah platform untuk Thermo Fisher yang dirancang untuk membantu pengguna menemukan produk dan solusi yang tepat. Dibuat dengan Next.js dan Tailwind CSS, sistem ini menyediakan antarmuka yang intuitif dan mudah digunakan, memungkinkan pengguna untuk menjelajahi katalog produk dengan cepat dan efisien.',
            image: '/assets/image/ourwork/porto6.avif',
            tags: ['next js ', 'tailwindcss ', 'product discovery '],
        },
      ];

      
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    
  return (
    <>
        <div className='w-full h-1000 pl-50 flex flex-col bg-[#eff3ff]'>
            {/* TITLE */}
            <div className='fixed z-2 w-266 flex flex-row justify-between p-2 px-4 bg-white border-b-[1px] border-[#f6d7ff]'>
                <h1 className='font-semibold text-sm text-[#710093]'>Our Work Photos</h1>
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
                    <button onClick={() => {
                        setTambahData(!tambahData);
                    }} 
                    className='cursor-pointer text-[12px] font-bold p-2 px-5 text-white rounded-lg bg-[#ce2dff] hover:bg-[#e078ff] active:bg-[#390056]'>+ Data</button>
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
                        setDeleteAll(true);
                    }} 
                    className='cursor-pointer text-[12px] font-bold p-2 px-5 border-1 border-[#ec7eaf] text-[#93006e] rounded-lg bg-[#f9e6ff] hover:bg-[#ff1376] hover:border-[#ff1376] hover:text-white active:bg-[#93006e]'>Delete All</button>
                </div>
            </div>

            {/* LIST DATA */}
            <div className='flex flex-row flex-wrap gap-x-5 gap-y-5 p-5 pt-30'>
                {listData.map((data, index) => (
                    <div key={index} className='w-80 flex flex-col justify-start items-center p-7 px-5 pr-4 bg-white rounded-lg border-1 border-[#cb48f3] shadow-md gap-2 relative'>
                        <div className='flex flex-col gap-1'>
                            <Image width={300} height={300} src={data.image ?? "/default-image.png"} alt="our work" className='rounded-sm mb-2' />
                            <p className='text-[14px] font-bold text-[#710093]'>{data.title}</p>
                            <p className='text-[12px] font-light text-[#710093]'>{data.tags}</p>
                            <p className='text-[12px] pr-5 font-light text-justify'>{data.description}</p>
                        </div>
                        {/* Buttons at bottom right */}
                        <div className="absolute bottom-3 right-3 flex flex-row gap-2">
                            <button onClick={()=>{setDeleteData(data.title);}} className='h-8 w-8 flex justify-center items-center rounded-full bg-[#ff4986] text-[#cf008a] border-[1px] border-[#930062] hover:bg-[#cf008a] cursor-pointer'>
                                <Image width={30} height={30} src='/trash.svg' alt="Dashboard" className='w-3 h-3'/>
                            </button>
                            <button onClick={() => { setEditData(data); }} className='h-8 w-8 flex justify-center items-center rounded-full bg-[#fbecff] text-[#710093] border-[1px] border-[#AD48FF] hover:bg-[#deb6ff] cursor-pointer'>
                                <Image width={30} height={30} src='/edit.svg' alt="Dashboard" className='w-3 h-3'/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* EDIT DATA */}
            {deleteAll || deleteData !== "none" || tambahData  || editData ?
            <div className='fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center'>n</div>
            : null
            }
            {deleteAll || deleteData !== "none" || tambahData || editData ?
            <div className='fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center'>n</div>
            : null
            }
            {deleteAll &&
            <div className='fixed z-6 top-40 left-140 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                <p className='text-[12px] text-[#930062] w-30 text-center'>Yakin <span className='font-bold'>dihapus</span> semua ?</p>
                <button className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>Yes</button>
                <button onClick={() => setDeleteAll(false)} className={`fixed z-6 top-37 right-133 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
            }
            {deleteData !== "none" &&
            <div className='fixed z-6 top-40 left-140 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                <p className='text-[12px] text-[#930062] w-30 text-center'>Yakin <span className='font-bold'>{deleteData}</span> dihapus ?</p>
                <button className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>Yes</button>
                <button onClick={() => setDeleteData("none")} className={`fixed z-6 top-37 right-133 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
            }
            {tambahData &&
            <div className='fixed z-6 top-0 left-0 w-full h-full flex items-center justify-center'>
                <div className='bg-white border-1 border-[#930062] rounded-lg p-8 flex flex-col gap-4 relative w-[500px]'>
                    <h2 className="text-lg font-bold text-[#710093] mb-2">Tambah Data</h2>
                    <input type="file" accept="image/*" className="mb-2 border border-[#8eb0e5] rounded-lg p-2" />
                    <input type="text" placeholder="Title" className="bg-[#d9ebfc] text-sm text-[#00296c] px-4 py-2 border border-[#8eb0e5] rounded-lg" />
                    <input type="text" placeholder="Tags (pisahkan dengan koma)" className="bg-[#d9ebfc] text-sm text-[#00296c] px-4 py-2 border border-[#8eb0e5] rounded-lg" />
                    <textarea placeholder="Description" className="bg-[#d9ebfc] text-sm text-[#00296c] px-4 py-2 border border-[#8eb0e5] rounded-lg resize-none" rows={3} />
                    <button className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>Save</button>
                    <button onClick={() => setTambahData(false)} className='absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]'>
                        <Image width={20} height={20} src="/close.svg" alt="Close" className="w-4"/>
                    </button>
                </div>
            </div>
            }
            {/* EDIT DATA POPUP */}
            {editData &&
            <div className='fixed z-6 top-0 left-0 w-full h-full flex items-center justify-center'>
                <div className='bg-white border-1 border-[#930062] rounded-lg p-8 flex flex-col gap-4 relative w-[500px]'>
                    <h2 className="text-lg font-bold text-[#710093] mb-2">Edit Data</h2>
                    <Image width={160} height={160} src={editData.image ?? "/default-image.png"} alt="Edit Image" className='items-center rounded-sm mb-2' />
                    <input type="file" accept="image/*" className="mb-2 border border-[#8eb0e5] rounded-lg p-2" />
                    <input type="text" defaultValue={editData.title} className="bg-[#d9ebfc] text-sm text-[#00296c] px-4 py-2 border border-[#8eb0e5] rounded-lg" />
                    <input type="text" defaultValue={editData.tags} className="bg-[#d9ebfc] text-sm text-[#00296c] px-4 py-2 border border-[#8eb0e5] rounded-lg" />
                    <textarea defaultValue={editData.description} className="bg-[#d9ebfc] text-sm text-[#00296c] px-4 py-2 border border-[#8eb0e5] rounded-lg resize-none" rows={3} />
                    <button className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>Update</button>
                    <button onClick={() => setEditData(null)} className='absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]'>
                        <Image width={20} height={20} src="/close.svg" alt="Close" className="w-4"/>
                    </button>
                </div>
            </div>
            }
        </div>
    </>
  )
}
