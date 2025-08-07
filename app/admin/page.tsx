import React from 'react';
import AdminHeader from '@/components/AdminHeader';
import LoginForm from '@/components/LoginAdmin';
import Decorations from '@/components/DecorationAdmin';


const AdminPage = () => {
  return (
    <div className='w-full flex flex-col items-center bg-[#A1D6FF] justify-center overflow-hidden z-10'>
      {/* <AdminHeader /> */}
      <Decorations />
      <LoginForm />
    </div>
  );
};

export default AdminPage;