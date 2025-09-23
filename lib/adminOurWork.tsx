import { getCookies } from '@/utils/tokenController';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export type OurWorkData = {
    id?: string; // tambahkan ID untuk operasi edit/delete
    title: string;
    description: string;
    file: File;
    newFile?: File; // URL gambar dari server
    fileName: string; // nama file di server
    tags: string[];
    createdAt: string;
};

export default function AdminOurWork() {
    const [tambahData, setTambahData] = useState(false);
    const [deleteAll, setDeleteAll] = useState(false);
    const [deleteData, setDeleteData] = useState("none");
    const [id, setId] = useState("");
    const [editData, setEditData] = useState<OurWorkData | null>(null);

    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newTag, setNewTag] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [newfilePreview, setNewFilePreview] = useState<string | null>(null);


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
        } catch {
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

    const [ourWorks, setOurWorks] = useState<OurWorkData[]>([]);
    useEffect(() => {
      const fetchOurWorks = async () => {
        try {
          // panggil backend API
          const res = await fetch("/api/getOurWorks");
          const data = await res.json();

          // Urutkan data berdasarkan pilihan sorting
          const sortedData = sortOurWorks(data, urutan);
          setOurWorks(sortedData);
        } catch {
          // console.error("Gagal fetch OurWorks:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchOurWorks();
    }, [urutan,deleteAll,deleteData,tambahData,editData]);

    // Fungsi untuk mengurutkan OurWorks
    const sortOurWorks = (data: OurWorkData[], order: string) => {
      const sortedData = [...data];

      switch (order) {
        case "A - Z":
          return sortedData.sort((a, b) => a.title.localeCompare(b.title));

        case "Z - A":
          return sortedData.sort((a, b) => b.title.localeCompare(a.title));

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

    const handleFileEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (editData) {
        setEditData({ ...editData, newFile: selectedFile ?? undefined });
      }
    
      if (selectedFile && selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setNewFilePreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setNewFilePreview(null);
      }
    };

    const handleOurWork = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!file) {
        alert("Pilih file dulu!");
        return;
      }
      if (!title || !tag || !description) {
        alert("isi field nya dulu!");
        return;
      }
    
      setLoading(true);
    
      const formData = new FormData();
      formData.append("title", title);
      formData.append("tags", tag); // pastikan nama field sesuai dengan API
      formData.append("description", description);
      formData.append("file", file);

      try {
        const res = await fetch("/api/ourWork", {
          method: "POST",
          body: formData,
        });
    
        if (res.ok) {
          alert("Berhasil upload!");
          // Reset form dan refresh data
          setTitle("");
          setTag("");
          setDescription("");
          setFile(null);
          setFilePreview(null);
          setTambahData(false);
          
        //   // Refresh data ourWorks
        //   const updatedRes = await fetch("/api/getOurWork");
        //   const updatedData = await updatedRes.json();
        //   setOurWorks(sortOurWorks(updatedData, urutan));
        } else {
          const data = await res.json();
          alert("Error: " + data.error);
        }
      } catch {
        // console.error("Upload error:", err);
        alert("Gagal upload!");
      } finally {
        setLoading(false);
      }
    };

    const handleEditOurWork = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editData) {
        alert("Data tidak valid!");
        return;
      }
    
      setLoading(true);
    
      try {
        // Membuat FormData untuk mengirim file dan data
        const formData = new FormData();
        formData.append("id", editData.id || "");
        formData.append("title", newTitle || "");
        formData.append("tags", newTag || "");
        formData.append("description", newDescription || "");
        formData.append("fileName", editData.fileName || "");
        
        // Jika ada file baru, tambahkan ke formData
        if (editData.newFile) {
          formData.append("file", editData.newFile);
        }
    
        const res = await fetch("/api/editOurWork", {
          method: "PUT", // Mengubah dari POST ke PUT
          body: formData, // Mengubah dari JSON.stringify ke FormData
          // Jangan set Content-Type header, browser akan mengatur otomatis untuk FormData
        });
    
        if (res.ok) {
          alert("Berhasil diedit!");
          setEditData(null); 
          setFilePreview(null);
          // Refresh data jika diperlukan
        } else {
          const data = await res.json();
          // console.error("Upload failed:", data);
          alert("Error: " + (data.error || "Terjadi kesalahan"));
        }
      } catch {
        alert("Gagal upload!");
      } finally {
        setLoading(false);
      }
    };

    async function handleDelete(id: string, fileName: string) {
      setLoading(true);
      try {
        const res = await fetch("/api/removeOurWork", {
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
        setDeleteData("none");
        alert("OurWork message berhasil dihapus");
      } catch {
        // console.error("Error:", error);
        alert("Gagal menghapus. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    }

    async function handleDeleteAll() {
      setLoading(true);
      try {
        const res = await fetch("/api/removeAllOurWork", {
          method: "DELETE",
        });
  
        if (!res.ok) {
          throw new Error("Gagal menghapus semua OurWork");
        }
  
        await res.json();
        alert("OurWork berhasil dihapus semua");
        setDeleteAll(false);
      } catch {
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
                <h1 className='font-semibold text-sm text-[#710093]'>Our Work Photos</h1>
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
                        setTambahData(!tambahData);
                    }} 
                    className='cursor-pointer text-[12px] font-bold p-2 px-5 text-white rounded-lg bg-[#ce2dff] hover:bg-[#e078ff] active:bg-[#390056]'>+ Data</button>
                    <button onClick={diKlik} className='cursor-pointer bg-white text-[#710093] font-semibold flex flex-row text-[12px] px-4 py-2 rounded-full hover:bg-[#f9e6ff] transition duration-200'>{urutan}
                        <Image width={30} height={30} src='/arrow-solid.svg' alt="Search" className={`w-2 h-2 mt-1.5 ${urutanActive ? 'rotate-0' : 'rotate-180'} ml-2`}/>
                    </button>
                    { urutanActive && 
                        <div className='absolute z-2 w-30 h-50 border-[1.5px] rounded-lg border-[#cb48f3] top-10 right-23 backdrop-blur-md flex flex-col justify-center items-center gap-2 px-4'>
                            <button onClick={az} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>A - Z</button>
                            <button onClick={za} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>Z - A</button>
                            <button onClick={newklik} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>New</button>
                            <button onClick={old} className='text-[12px] text-[#710093] hover:bg-[#f4e6ff] font-semibold w-full border py-2 rounded-full'>Old</button>
                        </div>
                    }
                    <button onClick={() => {
                        setDeleteAll(true);
                    }} 
                    className='cursor-pointer text-[12px] font-bold p-2 px-5 border-1 border-[#ec7eaf] text-[#93006e] rounded-lg bg-[#f9e6ff] hover:bg-[#ff1376] hover:border-[#ff1376] hover:text-white active:bg-[#93006e]'>Delete All</button>
                </div>
            </div>

            {/* LIST DATA */}
            <div className='flex flex-row flex-wrap h-full overflow-auto gap-x-5 gap-y-5 p-5 pt-5'>
                {ourWorks.map((data, index) => (
                    <div key={index} className='w-80 flex flex-col justify-start items-center p-7 px-5 pr-4 bg-white rounded-lg border-1 border-[#cb48f3] shadow-md gap-2 relative'>
                        <div className='flex flex-col gap-1'>
                        {typeof data.fileName === 'string' ? (
                        <Image 
                            width={300} 
                            height={300} 
                            src={data.fileName ? `/uploads/${data.fileName}` : "/default-image.png"} 
                            alt="our work" 
                            className='rounded-sm mb-2 object-cover w-full h-48'
                        />
                        ) : data.file instanceof File ? (
                        <div className="relative w-full h-48 mb-2">
                            <Image 
                            src={URL.createObjectURL(data.file)} 
                            alt="our work" 
                            fill
                            className='rounded-sm object-cover'
                            />
                        </div>
                        ) : (
                        <Image 
                            width={300} 
                            height={300} 
                            src="/default-image.png" 
                            alt="our work" 
                            className='rounded-sm mb-2 object-cover w-full h-48'
                        />
                        )}
                        </div>
                            <p className='text-[14px] w-full font-bold text-[#710093]'>{data.title}</p>
                            <div className='w-full flex flex-row flex-wrap gap-1'> 
                              {data.tags.map((tag, idx) => (
                                <p key={idx} className='text-[10px] px-2 py-1 rounded-full font-light text-[#710093] bg-purple-100 text-center'>{tag}</p>
                              ))}
                            </div>
                            <p className='text-[12px] w-full pr-5 mb-10 font-light text-justify'>{data.description}</p>
                        {/* Buttons at bottom right */}
                        <div className="absolute bottom-3 right-3 flex flex-row gap-2">
                            <button onClick={()=>{setDeleteData(data.title); setFilePreview(data.fileName); setId(data.id??"")}} className='h-8 w-8 flex justify-center items-center rounded-full bg-[#ff4986] text-[#cf008a] border-[1px] border-[#930062] hover:bg-[#cf008a] cursor-pointer'>
                                <Image width={30} height={30} src='/trash.svg' alt="Dashboard" className='w-3 h-3'/>
                            </button>
                            <button onClick={() => { setEditData(data); setNewTitle(data.title); setNewDescription(data.description); setNewTag((data.tags).join(",")); setFilePreview(data.fileName) }} className='h-8 w-8 flex justify-center items-center rounded-full bg-[#fbecff] text-[#710093] border-[1px] border-[#AD48FF] hover:bg-[#deb6ff] cursor-pointer'>
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
            <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
              <div className='relative z-6 -top-20 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                  <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                  <p className='text-[12px] text-[#930062] w-30 text-center'>Yakin <span className='font-bold'>dihapus</span> semua ?</p>
                  <button onClick={() => handleDeleteAll()} className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>
                    {loading ? "delete..." : "Yes"}
                  </button>
                  <button onClick={() => setDeleteAll(false)} className={`absolute z-6 -top-4 -right-4 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
                      <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                  </button>
              </div>
            </div>
            }
            {deleteData !== "none" &&
            <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
              <div className='relative z-6 -top-20 p-5 border-1 rounded-lg border-[#930062] bg-white flex flex-col gap-3 justify-center items-center'>
                  <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
                  <p className='text-[12px] text-[#930062] w-30 text-center'>Yakin <span className='font-bold'>{deleteData}</span> dihapus ?</p>
                  <button onClick={() => handleDelete(id,filePreview??"")} className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>
                    {loading ? "delete..." : "Yes"}
                  </button>
                  <button onClick={() => setDeleteData("none")} className={`absolute z-6 -top-4 -right-4 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]`}>
                      <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                  </button>
              </div>
            </div>
            }
            {tambahData &&
            <div className="fixed z-6 top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
                {filePreview && (
                    <div className="fixed z-6 top-0 left-230 w-100 h-full flex flex-col items-center justify-center bg-opacity-50" onClick={() => setFilePreview(null)}>
                        <p className='font-semibold text-purple-900 w-full'>old file :</p>
                        <div className="w-full">
                          <Image 
                              width={300} 
                              height={300} 
                              src={filePreview ? filePreview : "/default-image.png"} 
                              alt="our work" 
                              className='rounded-sm mb-2 h-40'
                          />
                        </div>
                    </div>
                )}
                <div className='bg-white border-1 border-[#930062] rounded-lg p-8 flex flex-col gap-4 relative w-[500px]'>
                    <h2 className="text-lg font-bold text-[#710093] mb-2">Tambah Data</h2>
                    <input 
                        onChange={handleFileChange}
                        type="file" accept="image/*" className="mb-2 border border-[#8eb0e5] rounded-lg p-2" />
                    <input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" placeholder="Title" className="bg-[#d9ebfc] text-sm text-[#00296c] px-4 py-2 border border-[#8eb0e5] rounded-lg" />
                    <input
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        type="text" placeholder="Tags (pisahkan dengan koma)" className="bg-[#d9ebfc] text-sm text-[#00296c] px-4 py-2 border border-[#8eb0e5] rounded-lg" />
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description" className="bg-[#d9ebfc] text-sm text-[#00296c] px-4 py-2 border border-[#8eb0e5] rounded-lg resize-none" rows={3} />

                    <button onClick={handleOurWork} className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button onClick={() => setTambahData(false)} className='absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]'>
                        <Image width={20} height={20} src="/close.svg" alt="Close" className="w-4"/>
                    </button>
                </div>
            </div>
            }
            {/* EDIT DATA POPUP */}
            {editData &&
            <div className='fixed z-6 top-0 left-0 w-full h-full flex items-center justify-center'>
                {filePreview && (
                    <div className="relative bg-white  z-6  top-0 w-100 p-10 border-1 rounded-lg mr-5 border-[#930062] flex flex-col items-center justify-center bg-opacity-50">
                        <p className='font-semibold text-purple-900 w-full'>old file :</p>
                        <div className="w-full">
                          <Image 
                              width={300} 
                              height={300} 
                              src={filePreview ? `/uploads/${filePreview}` : "/default-image.png"} 
                              alt="our work" 
                              className='rounded-sm mb-2 h-40'
                          />
                        </div>
                        {newfilePreview && (
                          <>
                            <p className='font-semibold text-purple-900 w-full mt-5'>new file :</p>
                            <div className="w-full">
                              <Image 
                                  width={300} 
                                  height={300} 
                                  src={newfilePreview ? newfilePreview : "/default-image.png"} 
                                  alt="our work" 
                                  className='rounded-sm mb-2 h-40'
                              />
                            </div>
                          </>
                        )}
                    </div>
                )}
                
                <div className='bg-white border-1 border-[#930062] rounded-lg p-8 flex flex-col gap-4 relative w-[500px]'>
                    <h2 className="text-lg font-bold text-[#710093] mb-2">Edit Data</h2>
                    <input onChange={handleFileEditChange} type="file" accept="image/*" className="mb-2 border border-[#8eb0e5] rounded-lg p-2" />
                    <input onChange={(e) => setNewTitle(e.target.value)} type="text" defaultValue={editData.title} className="bg-[#d9ebfc] text-sm text-[#00296c] px-4 py-2 border border-[#8eb0e5] rounded-lg" />
                    <input onChange={(e) => setNewTag(e.target.value)} type="text" defaultValue={editData.tags} className="bg-[#d9ebfc] text-sm text-[#00296c] px-4 py-2 border border-[#8eb0e5] rounded-lg" />
                    <textarea onChange={(e) => setNewDescription(e.target.value)} defaultValue={editData.description} className="bg-[#d9ebfc] text-sm text-[#00296c] px-4 py-2 border border-[#8eb0e5] rounded-lg resize-none" rows={3} />
                    <button onClick={handleEditOurWork} className='p-2 w-full rounded-md bg-[#e49fff] hover:bg-[#b700ff] active:bg-[#930062] text-[12px] text-[#9400cf] hover:text-white font-bold'>
                      {loading ? "Updating..." : "Update"}
                    </button>
                    <button onClick={() => (setEditData(null),setNewFilePreview(null),setFilePreview(null))} className='absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] border-1 border-[#6f09c3]'>
                        <Image width={20} height={20} src="/close.svg" alt="Close" className="w-4"/>
                    </button>
                </div>
            </div>
            }
        </div>
    </>
  )
}
