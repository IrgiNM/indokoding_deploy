"use client";
import AdminNavbar from '@/lib/adminNavbar';
import AdminOurWork from '@/lib/adminOurWork';

export default function page() {
  return (
    <div className='w-full flex flex-row items-center justify-start overflow-hidden'>
      <AdminNavbar active='photo1' />
      <AdminOurWork />
    </div>
  )
}
