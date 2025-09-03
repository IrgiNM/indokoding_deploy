"use client";
import AdminContact from '@/lib/adminContact';
import AdminNavbar from '@/lib/adminNavbar';

export default function page() {
  return (
    <div className='w-full flex flex-row items-center justify-start overflow-hidden'>
      <AdminNavbar active='message'/>
      <AdminContact />
    </div>
  )
}
