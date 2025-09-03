"use client";
import AdminJoinUs from '@/lib/adminJoinUs';
import AdminNavbar from '@/lib/adminNavbar';

export default function page() {
  return (
    <div className='w-full flex flex-row items-center justify-start overflow-hidden'>
      <AdminNavbar active='email'/>
      <AdminJoinUs />
    </div>
  )
}
