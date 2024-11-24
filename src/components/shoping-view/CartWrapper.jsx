import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import CartItemsContent from './CartItemsContent'
import { Button } from '../ui/button'

export default function CartWrapper({cartItems}) {
    const totalCartAmount = cartItems && cartItems.length>0 ?
    cartItems.reduce((sum,currentItem) => sum + (
        currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price
    )* currentItem?.quantity , 0 ) : 0 
  return (
    <SheetContent className="sm:max-w-md  " >
        <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className='mt-8 space-y-4'>
            {
                cartItems && cartItems.length> 0 ? 
                cartItems.map((item,i) => <CartItemsContent key={i} cartItems={item} />) : null
            }
        </div>
       <div className=' absolute w-[90%] buttom-2 '>
       <div className='mt-4 space-y-4 w-full flex justify-between  items-center'>
            <span className='font-bold' >Total</span>
            <span className='font-bold'  >${totalCartAmount}</span>
        </div>
        <Button className="w-full mt-3 " >Checkout</Button>
       </div>
    </SheetContent>
  )
}
