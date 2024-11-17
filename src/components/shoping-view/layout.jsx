import React from 'react'
import { Outlet } from 'react-router-dom'
import ShopingViewHeader from './header'

export default function ShopingLayout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        <ShopingViewHeader/>
        <main  className='flex flex-col w-full' >
            <Outlet/>
        </main>
      
    </div>
  )
}
