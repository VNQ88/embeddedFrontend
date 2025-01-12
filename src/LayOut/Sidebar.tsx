import React from 'react';

const SideBar = () => {
  return (
    <div className="w-48 bg-gray-800 text-white h-full p-4 flex flex-col">
      <div className="mb-6">
        <img
          src="https://ddk.1cdn.vn/thumbs/540x360/2023/12/12/cdnphoto.dantri.com.vn-aiwv-caenstalckj4xm3ndz33qs-thumb_w-1020-2023-12-12-_ronaldo-crop-1702337355016.jpeg"
          alt="Logo"
          className="w-24 h-24 mx-auto rounded-full shadow-lg object-cover"
        />
        <p className="text-center mt-2 text-lg font-semibold">DashBoard</p>
      </div>
      <ul className="space-y-4">
        <li><a href="/dashboard" className="hover:text-blue-400">Hệ thống</a></li>
        <li><a href="/dashboard/admin" className="hover:text-blue-400">Account</a></li>
      </ul>
    </div>
  );
};

export default SideBar;
