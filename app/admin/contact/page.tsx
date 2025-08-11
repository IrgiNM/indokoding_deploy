"use client";
import React from 'react'
import AdminNavbar from '@/lib/adminNavbar';
import AdminMain from '@/lib/adminMain';
import AdminDashboard from '@/lib/adminDashboard';
import AdminContact from '@/lib/adminContact';

export default function page() {
  return (
    <div className='w-full flex flex-row items-center justify-start overflow-hidden'>
      <AdminNavbar active='message'/>
      <AdminContact />
    </div>
  )
}
