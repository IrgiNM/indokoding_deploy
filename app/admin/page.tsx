"use client"
import Decorations from '@/components/DecorationAdmin';
import PopUpLogin from '@/components/popUpLogin';
import { getCookies } from '@/utils/tokenController';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const AdminPage = () => {
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
          router.push("/admin/dashboard");
        } else {
          // setToken(undefined);
        }
      } catch (error) {
        // // console.error("Gagal mengambil cookies:", error);
        // setToken(undefined);
      }
    };
  
    fetchCookies();
  }, [router]);

  return (
    <div className='w-full flex flex-col items-center bg-[#A1D6FF] justify-center overflow-hidden z-10'>
      {/* <AdminHeader /> */}
      <Decorations />
      {/* <LoginForm /> */}
      <PopUpLogin onClick={()=>{}} isClose={false} isRole="admin"/>
    </div>
  );
};

export default AdminPage;