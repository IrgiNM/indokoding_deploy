"use client";
import AdminDashboard from '@/lib/adminDashboard';
import AdminNavbar from '@/lib/adminNavbar';

export default function page() {
  return (
    <div className='w-full flex flex-row items-center justify-start overflow-hidden'>
      <AdminNavbar />
      <AdminDashboard />
    </div>
  )
}
