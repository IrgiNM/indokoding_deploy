import React from 'react';

const AdminHeader = () => {
  return (
    <header className="w-full h-[100px] flex items-center justify-between px-6 bg-[#A1D6FF]">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-blue-500">Home</a></li>
          <li><a href="#" className="text-blue-500">Settings</a></li>
          <li><a href="#" className="text-blue-500">Logout</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;