import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from './header'
import AdminSideBar from './sidebar'
import AdminProducts from '@/pages/admin-view/products'

export default function AdminLayout() {

  const [openSidebar , setOpenSidebar] = useState(false)
  return (
    <div className='flex min-h-screen w-full' >
        <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className='flex flex-1 flex-col' >
        <AdminHeader setOpen={setOpenSidebar}/>
            <main className='flex-1 flex bg-muted/40 p-4 md:p-6' >
                <Outlet/>
            </main>
      </div>
    </div>
  )
}
