"use client";
import AdminAboutUs from '@/lib/adminAboutUs';
import AdminNavbar from '@/lib/adminNavbar';

export default function page() {
  return (
    <div className='w-full flex flex-row items-center justify-start overflow-hidden'>
      <AdminNavbar active='photo2' />
      <AdminAboutUs />
    </div>
  )
}
