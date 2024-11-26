import React from 'react'
import accImg from '../../assets/account.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UserOrders from '@/components/shoping-view/UserOrders'
import UserAddressDiv from '@/components/shoping-view/UserAddressDiv'

export default function ShopingAccount() {
  return (
    <div className='flex flex-col' >
      <div className='relative h-[300px] w-full overflow-hidden ' >
        <img   src={accImg} alt="" className='h-full w-full object-cover object-center' />
      </div>
      <div className='container mx-auto grid grid-cols-1 gap-9 py-8'>
        <div className='flex flex-col rounded-lg border bg-background p-6 shadow-sm' >
          <Tabs defaultValue='orders'>
              <TabsList>
                <TabsTrigger value="orders" >Orders</TabsTrigger>
                <TabsTrigger value='address' >Address</TabsTrigger>
              </TabsList>
              <TabsContent value="orders" >
                  <UserOrders/>
              </TabsContent>
              <TabsContent value="address" >
                  <UserAddressDiv/>
              </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
