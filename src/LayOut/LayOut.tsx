import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const LayOut = () => {
  return (
    <div className="flex h-screen">
      {/* SideBar chiếm toàn bộ chiều cao */}
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}
        <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default LayOut;
