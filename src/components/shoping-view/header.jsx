import { House, LogOut, Menu, ShoppingCart, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { DropdownMenu, DropdownMenuTrigger,DropdownMenuLabel } from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { DialogTitle } from '@radix-ui/react-dialog'; // Import DialogTitle
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'; // 
import { logoutUser } from '@/store/auth-slice'
import CartWrapper from './CartWrapper'
import { fetchCartItems } from '@/store/cart-slice'

function MenuItems (){
  return <div className=' flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row '>
    {
      shoppingViewHeaderMenuItems.map(m => <Link className='text-sm font-medium' key={m.id} to={m.path} >{m.label}</Link>)
    }
  </div>
}

function HeaderRightContent() {
  const {isAuthenticated , user} = useSelector((state)=> state.auth)
  const {cartItems} = useSelector((state)=> state.shoppingCart)

  const [openCartSheet , setOpenCartSheet] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
  },[dispatch])

  const  handleLogout = () => {
    // console.log("logout sucessfully")
    dispatch(logoutUser())
  }

  return <div className='flex lg:items-center lg:flex-row flex-col gap-4' >

    <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
    <Button variant="outline" size="icon" onClick={()=>setOpenCartSheet(true)} >
      <ShoppingCart className='w-6 h-6'/>
      <span className='sr-only'>
        User Cart
      </span>
    </Button>
    <CartWrapper cartItems={cartItems && cartItems.items && cartItems.items.length> 0 ? cartItems.items : []} />
    </Sheet>
    <DropdownMenu>
      <DropdownMenuTrigger  asChild>
          <Avatar className="bg-black" >
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()  }
            </AvatarFallback>
          </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56" >
        <DropdownMenuLabel>
              Logout
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem  onClick={()=> navigate('/shop/account')} >
        <User className='mr-2 h-4 w-4' />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}  >
        <LogOut className='mr-2 h-4 w-4' />
        Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}

export default function ShoppingViewHeader() {

  const {isAuthenticated , user} = useSelector((state)=> state.auth)
  
  return (
    <div  className='sticky top-0 z-40 w-full border-b bg-background    ' >
      <div className='flex h-16 items-center justify-between px-4 md:px-6' >
          <Link to="/shop/home" className='flex items-center gap-2' > 
          <House className='h-6 w-6' />
          <span>Ecommerce</span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className='h-6 w-6'/>
                <span className='sr-only' >Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs">
  {/* Add DialogTitle */}
  <DialogTitle>
    <VisuallyHidden>Header Menu</VisuallyHidden>
  </DialogTitle>
  <MenuItems />
  <HeaderRightContent />
</SheetContent>
          </Sheet>
          <div className='hidden lg:block'>
              <MenuItems/>
          </div>
        <div className='hidden lg:block' >
              <HeaderRightContent/>
            </div> 
         
      </div>
    </div>
  )
}
