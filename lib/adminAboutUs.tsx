import { getCookies } from '@/utils/tokenController';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export type AboutImage = {
    id?: string; // tambahkan ID untuk operasi edit/delete
    file: File;
    fileName: string; // nama file di server
    createdAt: string;
};

export type AboutText = {
    id: string;
    values: string[];
    createdAt: string;
}

export default function AdminUsers() {
    const [tambah, setTambah] = useState(false);
    const [hapus, setHapus] = useState(false);
    const [show, setShow] = useState(false);
    const [full, setFull] = useState(false);
    const [fullGambar, setFullGambar] = useState('none');
    const [hapusNama, setHapusNama] = useState("none");
    const [file, setFile] = useState<File | null>(null);
    const [deleteData, setDeleteData] = useState("none");
    const [id, setId] = useState("");

    const [valuesShow, setValuesShow] = useState<AboutText[]>([]);
    const [values, setValues] = useState<string[]>([""]);
    const addInput = () => {
      setValues([...values, ""]); // tambahkan input baru (kosong)
    };
    
    const [loading, setLoading] = useState(false);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    
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

            const res = await fetch("/api/cekAdminUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                email: parsed.email,
                role: parsed.role,
                }),
            });

            if(!res.ok){
                router.push("/");
            }
          } else {
            router.push("/admin");
          }
        } catch (error) {
          // console.error("Gagal mengambil cookies:", error);
        }
      };
    
      fetchCookies();
    }, [router]);

    const [urutan, setUrutan] = useState("New");
    const [urutanActive, setUrutanActive] = useState(false);
    const diKlik = () => {
        setUrutanActive(!urutanActive);
    }
    const newklik = () => {
        setUrutan("New");
        setUrutanActive(false);
    }
    const old = () => {
        setUrutan("Old");
        setUrutanActive(false);
    }

      const [aboutImage, setAboutImage] = useState<AboutImage[]>([]);
      useEffect(() => {
        const fetchAboutImage = async () => {
          try {
            // panggil backend API
            const res = await fetch("/api/getAboutImage");
            const data = await res.json();
          
            // Urutkan data berdasarkan pilihan sorting
            const sortedData = sortAboutImage(data, urutan);
            setAboutImage(sortedData);
          } catch (err) {
            // // console.error("Gagal fetch AboutImage:", err);
          } finally {
            setLoading(false);
          }
        };
        fetchAboutImage();
      }, [urutan,deleteData,tambah,hapus]);
      
      useEffect(() => {
        const fetchAboutText = async () => {
          try {
            // panggil backend API
            const res = await fetch("/api/getAboutText");
            const data = await res.json();
            // Urutkan data berdasarkan pilihan sorting
            setValuesShow(data);
            // setShowArray(data[0]?.values ?? []);
          } catch (err) {
            // console.error("Gagal fetch AboutText:", err);
          } finally {
            setLoading(false);
          }
        };
        fetchAboutText();
      }, [values]);
  
      // Fungsi untuk mengurutkan AboutImage
      const sortAboutImage = (data: AboutImage[], order: string) => {
        const sortedData = [...data];
      
        switch (order) {
      
          case "New":
            return sortedData.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          
          case "Old":
            return sortedData.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          
          default:
            return sortedData;
        }
      };

      const handleChangeAbout = (index: number, newValue: string) => {
        const updated = [...values]; // copy array lama
        updated[index] = newValue;   // update sesuai index
        setValues(updated);          // simpan ke state
      };

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile ?? null);
      
        if (selectedFile && selectedFile.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            setFilePreview(reader.result as string);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          setFilePreview(null);
        }
      };

      const handleAboutImage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
          alert("Pilih file dulu!");
          return;
        }
      
        setLoading(true);
      
        const formData = new FormData();
        formData.append("file", file);
  
        try {
          const res = await fetch("/api/createAboutImage", {
            method: "POST",
            body: formData,
          });
      
          if (res.ok) {
            alert("Berhasil upload!");
            // Reset form dan refresh data
            setFile(null);
            setTambah(false);
            
          //   // Refresh data AboutImages
          //   const updatedRes = await fetch("/api/getAboutImage");
          //   const updatedData = await updatedRes.json();
          //   setAboutImages(sortAboutImages(updatedData, urutan));
          } else {
            const data = await res.json();
            alert("Error: " + data.error);
          }
        } catch (err) {
          // console.error("Upload error:", err);
          alert("Gagal upload!");
        } finally {
          setLoading(false);
        }
      };

      const handleAboutText = async () => {
        setLoading(true);
        try {
          const res = await fetch("/api/updateAboutText", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
      
          if (res.ok) {
            alert("Berhasil disimpan!");
            setValues([""]);
          } else {
            const data = await res.json();
            alert("Error: " + data.error);
          }
        } catch (err) {
          // console.error("Upload error:", err);
          alert("Gagal disimpan!");
        } finally {
          setLoading(false);
        }
      };

      async function handleDelete(id: string, fileName: string) {
        setLoading(true);
        try {
          const res = await fetch("/api/removeAboutImage", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id, file: fileName }),
          });
    
          if (!res.ok) {
            throw new Error("Gagal menghapus message");
          }
    
          await res.json();
          setHapusNama("none");
          alert("OurWork message berhasil dihapus");
        } catch (error) {
          // console.error("Error:", error);
          alert("Gagal menghapus. Silakan coba lagi nanti.");
        } finally {
          setLoading(false);
        }
      }
  
      async function handleDeleteAll() {
        setLoading(true);
        try {
          const res = await fetch("/api/removeAllAboutImage", {
            method: "DELETE",
          });
    
          if (!res.ok) {
            throw new Error("Gagal menghapus semua OurWork");
          }
    
          await res.json();
          alert("OurWork berhasil dihapus semua");
          setHapus(false);
        } catch (error) {
          // console.error("Error:", error);
          alert("Gagal menghapus semua OurWork. Silakan coba lagi nanti.");
        } finally {
          setLoading(false);
        }
      }
      
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    
  return (
    <>
        <div className='fixed top-0 bottom-0 right-0 left-45 flex flex-col bg-[#eff3ff]'>
            {/* TITLE */}
            <div className='relative z-2 w-full flex flex-row justify-between p-2 px-4 bg-white border-b-[1px] border-[#f6d7ff]'>
                <h1 className='font-semibold text-sm text-[#710093]'>Users List</h1>
                <p className='font-light text-[12px] text-[#00930f]'>today : <span className='font-bold'>{formattedDate}</span></p>
            </div>

            {/* SEARCH */}
            <div className='relative z-2 w-full p-3 pl-5 border-t-[1px] border-[#f6d7ff] bg-white flex flex-row  justify-between gap-4'>
                <div className='relative'>
                    
                    <input type="text" className='border-1 hover:border-[1.5px] border-[#710093] bg-[#fcf1ff] p-2 pl-4 text-[12px] w-70 rounded-full text-[#930062]' placeholder='Search'/>
                    <button className='cursor-pointer w-8 h-8 pt-1 absolute top-0 right-1'>
                        <Image width={30} height={30} src='/search.svg' alt="Search" className='w-4 h-4 ml-2'/>
                    </button>
                </div>
                
                <div className='relative flex flex-row gap-2'>
                    <button onClick={() => {
                        setTambah(!tambah);
                    }} 
                    className='cursor-pointer text-[12px] font-bold p-2 px-5 text-white rounded-lg bg-[#ce2dff] hover:bg-[#e078ff] active:bg-[#390056]'>+ Data</button>
                    
                    <button onClick={diKlik} className='cursor-pointer bg-white text-[#710093] font-semibold flex flex-row text-[12px] px-4 py-2 rounded-full hover:bg-[#f9e6ff] transition duration-200'>{urutan}
                        <Image width={30} height={30} src='/arrow-solid.svg' alt="Search" className={`w-2 h-2 mt-1.5 ${urutanActive ? 'rotate-0' : 'rotate-180'} ml-2`}/>
                    </button>
                    { urutanActive && 
                        <div className='absolute z-2 w-30 py-3 border-[1.5px] rounded-lg border-[#cb48f3] top-10 right-23 backdrop-blur-md flex flex-col justify-center items-center gap-2 px-4'>
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

        <div className='w-full relative pr-10'> {/* LIST USERS */}
            <div className="relative bg-white  w-full ml-5 border-1 border-[#cb48f3] p-4 shadow-md rounded-lg mt-5">
            <button onClick={() => {
                    setShow(true);
                }} 
                 className='absolute top-4 hover:bg-blue-100 left-5 text-[11px] border rounded-md py-1 px-2 text-blue-800'>
                <p>Show Current Text</p>
            </button>
            <label className="block text-xl font-bold text-center  text-purple-900 mb-2">SUBJECT</label>

            {values.map((val, index) => (
                <textarea
                key={index}
                value={val}
                onChange={(e) => handleChangeAbout(index, e.target.value)}
                placeholder={`Masukkan paragraf ${index+1} di sini`}
                className="w-full border text-purple-900 rounded-lg p-2 text-[12px] focus:outline-none focus:ring-2 border-purple-900 focus:ring-[#cb48f3]"
                />
            ))}

            <button onClick={addInput} className='p-2 w-full rounded-lg hover:bg-purple-50 text-[12px] font-semibold text-purple-800 border-purple-800'>+ add new paragraph</button>

            <button onClick={handleAboutText} className=' mt-3 w-full h-10 text-[12px] font-bold text-purple-800  bg-purple-200 hover:bg-purple-400 active:hover:bg-emerald-500 rounded-md'>
            {loading ? "submit..." : `Submit`}
            </button>
            </div>
            <div className='flex flex-row flex-wrap h-full overflow-auto gap-x-5 gap-y-5 p-5 pt-5 '>
                {aboutImage.map((user, index) => (
                    
                    <div key={index} className='w-80 h-70 flex flex-col justify-start items-center p-3 bg-white rounded-lg border-1 border-[#cb48f3] shadow-md gap-2 relative'>
                    <p className='text-[12px] font-bold text-purple-900'>Tanggal : <span className='font-semibold'>{user.createdAt}</span></p>
                    <div className='w-full flex justify-center items-center '>
                        <button onClick={() => {
                            setFull(true);
                            setFullGambar(user.fileName);
                        }} 
                        className='w-full'>
                        <Image width={70} height={70} src={`/uploads/aboutUs/${user.fileName}`} alt="Dashboard" className='w-full '/>
                        </button>
                    </div>

                    <button onClick={()=>{setHapusNama(user.fileName);setDeleteData(user.fileName); setFilePreview(user.fileName); setId(user.id??"")}} className='h-8 w-8 absolute -right-3 top-1 flex justify-center items-center rounded-full bg-[#ff4986] text-[#cf008a] border-[1px] border-[#930062] hover:bg-[#cf008a] cursor-pointer'>
                        <Image width={30} height={30} src='/trash.svg' alt="Dashboard" className='w-3 h-3'/>
                    </button>
                        
                        {/* { edit === user.nama &&
                        <div className='absolute z-2 p-2 border-[1.5px] rounded-lg border-[#cb48f3] -top-3 right-7 backdrop-blur-xl flex flex-col justify-center items-center gap-2 px-4'>
                            <button className=' w-27 text-[12px] font-light p-2 px-5 border-1 border-[#7ea8ec] text-[#002593] rounded-lg bg-[#e6f5ff] hover:bg-[#7ea8ec] hover:text-white active:bg-[#002593] flex flex-row justify-between'>Message <span className='font-bold'>0</span></button>
                            <button className='w-27 text-[12px] font-light p-2 px-5 border-1 border-[#d37eec] text-[#710093] rounded-lg bg-[#f9e6ff] hover:bg-[#d37eec] hover:text-white active:bg-[#710093] flex flex-row justify-between'>JoinUs <span className='font-bold'>0</span></button>
                            <button className='w-27 text-[12px] font-light p-2 px-5 border-1 border-[#7eec8e] text-[#00934c] rounded-lg bg-[#e6ffee] hover:bg-[#7eec8e] hover:text-white active:bg-[#00934c] flex flex-row justify-between'>Career <span className='font-bold'>0</span></button>
                        </div>
                        } */}
                    </div>
                ))}
            </div>
        </div>

            {/* EDIT USER */}
            {hapus || hapusNama !== "none" || tambah || show ||  full ?
            <div className='fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center'></div>
            : null
            }
            {hapus || hapusNama !== "none" || tambah || show ||  full ?
            <div className='fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center'></div>
            : null
            }
            {hapus &&
            <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
              <div className='relative z-6 -top-20 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                  <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                  <p className='text-[10px] text-[#930062] w-50 text-center  font-bold'>Remove All Images? <span className='font-normal'>You won’t be able to recover them</span></p>
                  <button onClick={() => handleDeleteAll()} className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>
                      {loading ? "Removing all..." : `Remove`}
                  </button>
                  <button onClick={() => setHapus(false)} className={`absolute z-6 -top-4 -right-4 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
                      <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                  </button>
              </div>
            </div>
            }
            {hapusNama !== "none" &&
            <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
              <div className='relative z-6 -top-20 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                  <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                  <p className='text-[12px] text-[#930062] w-30 text-center'>Confirm deletion?</p>
                  <button onClick={() => handleDelete(id,filePreview??"")} className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>
                      {loading ? "Removing..." : `Yes`}
                  </button>
                  <button onClick={() => setHapusNama("none")} className={`absolute z-6 -top-4 -right-4 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}>
                      <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                  </button>
              </div>
            </div>
            }
            {show &&
            <div className='fixed w-150  z-6 top-30 left-85 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                <h1 className='text-xl text-purple-900 font-bold'>About Us</h1>  
                {valuesShow[0].values.map((val, index) => (
                    <p key={index} className='lg:w-130 text-[12px] mb-1 lg:text-justify w-70 text-justify text-xs'>{val}</p>
                ))}
                
                <button onClick={() => setShow(false)} className={`fixed z-6 top-26 right-78 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
            }
            {full &&
            <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
              <div className='relative w-180 z-6 -top-20 p-5 flex flex-col gap-3 justify-center items-center'>
                  <Image width={200} height={200} src={`/uploads/aboutUs/${fullGambar}`} alt="Dashboard" className='w-full '/>
                  <button onClick={() => setFull(false)} className={`absolute z-6 top-5 -right-7 w-10 h-10 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}>
                      <Image width={140} height={140} src="/close.svg" alt="" className="w-3 "/>
                  </button>
              </div>
            </div>
            }
            {tambah &&
            <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
              <div className='relative z-6 -top-20 w-full h-full flex items-center justify-center'>
                  <div className='bg-white border-1 border-[#930062] rounded-lg p-8 flex flex-col items-center gap-4 relative w-[500px]'>
                      <h2 className="text-lg font-bold text-[#710093] mb-2">Tambah Data</h2>
                      {filePreview && (
                          <Image 
                              width={300} 
                              height={300} 
                              src={filePreview ? filePreview : "/default-image.png"} 
                              alt="our work" 
                              className='rounded-sm mb-2 w-auto h-40'
                          />
                      )}
                      <input 
                          onChange={handleFileChange}
                          type="file" accept="image/*" className="mb-2 border w-full border-[#8eb0e5] rounded-lg p-2" />
                      <button onClick={handleAboutImage} className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>
                          {loading ? "Saving..." : "Save"}
                      </button>
                      <button onClick={() => setTambah(false)} className='absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]'>
                          <Image width={20} height={20} src="/close.svg" alt="Close" className="w-4"/>
                      </button>
                  </div>
              </div>
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
