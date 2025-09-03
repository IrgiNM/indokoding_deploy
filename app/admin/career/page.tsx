"use client";
import AdminCareer from '@/lib/adminCareer';
import AdminNavbar from '@/lib/adminNavbar';

export default function page() {
  return (
    <div className='w-full flex flex-row items-center justify-start overflow-hidden'>
      <AdminNavbar active='suitcase'/>
      <AdminCareer />
    </div>
  )
}
