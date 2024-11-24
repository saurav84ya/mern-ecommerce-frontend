import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCartQuantity } from '@/store/cart-slice'
import { useToast } from '@/hooks/use-toast'

export default function CartItemsContent({cartItems}) {
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.auth)
    const {toast} = useToast()

    const handleCartItemDelate = (getCartItem) =>{
        try {
            dispatch(deleteCartItem({userId : user?.id,productId : getCartItem?.productId}))
            toast({
                title: "product Delated ",
              })
        } catch (error) {
            
        }

    }
    function handleUpdateQuantity(getCartItem,typeOfAction){
        dispatch(updateCartQuantity({ userId : user?.id, productId : getCartItem?.productId ,
                quantity : typeOfAction === 'plus' ? getCartItem.quantity + 1 : getCartItem.quantity -1
                    
            })).then(data => {
                console.log(data)
                if(data?.payload?.success){
                    toast({
                        title: data?.payload?.message,
                    })
                }
            })
    }
  return (
    <div className='flex items-center space-x-4' >
        <img src={cartItems?.image} alt="" 
        className='w-20 h-20 rounded object-cover' />

        <div className='flex-1' >
            <h3 className='font-extrabold'>{cartItems?.title}</h3>
            <div className='flex items-center mt-1 gap-1 ' >
                    
                    <Button
                    disabled = {cartItems?.quantity === 1}  onClick={()=>  handleUpdateQuantity(cartItems,"minus")} variant="outline" className="h-8 w-8 rounded-full" >
                    <Minus className='w-4 h-4' />
                    <span className='sr-only' >Decreas</span>
                </Button>
                <span>{cartItems?.quantity}</span>
                <Button
                    onClick={()=>  handleUpdateQuantity(cartItems,"plus")} variant="outline" className="h-8 w-8 rounded-full" >
                    <Plus className='w-4 h-4' />
                    <span className='sr-only' >Decreas</span>
                </Button>
            </div>
        </div>
        <div className='flex flex-col items-end'>
            <p className='font-semibold'>${((cartItems?.salePrice > 0 ?  cartItems?.salePrice :  cartItems?.price ) * cartItems?.quantity).toFixed(2)}</p>
            <Trash onClick={()=>handleCartItemDelate(cartItems)}  className='cursor-pointer mt-1' size={20} />
        </div>
    </div>
  )
}
