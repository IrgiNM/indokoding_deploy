"use client";
import React from 'react'
import AdminNavbar from '@/lib/adminNavbar';
import AdminUsers from '@/lib/adminUsers';

export default function page() {
  return (
    <div className='w-full flex flex-row items-center justify-start overflow-hidden'>
      <AdminNavbar active='customer' />
      <AdminUsers />
    </div>
  )
}
