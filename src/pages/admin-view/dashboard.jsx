import React from 'react'
import AdminProducts from './products'
import DelateProduct from './DelateProduct'

export default function AdminDashboard() {
  return (
    <div className='relative w-full ' >
            <AdminProducts/>
            <DelateProduct/>
    </div>
  )
}
