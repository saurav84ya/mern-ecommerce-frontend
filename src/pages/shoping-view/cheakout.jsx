import React, { useState } from "react";
import img from "../../assets/account.jpg";
import UserAddressDiv from "@/components/shoping-view/UserAddressDiv";
import { useSelector } from "react-redux";
import CartItemsContent from "@/components/shoping-view/CartItemsContent";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from '@/hooks/use-toast'

export default function ShoipngCheakout() {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);

  const totalPrice =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce((sum, currentItem) => {
          const price =
            currentItem?.salePrice > 0
              ? currentItem.salePrice
              : currentItem?.price;

          return sum + (price * currentItem?.quantity || 0);
        }, 0)
      : 0;




      const {toast} = useToast()


      const [selectedId,setCurrentSelectedId] = useState(null)
      const selectedAddress = {
        address : selectedId?.address,
        city : selectedId?.city,
        pincode : selectedId?.pincode,
        phone : selectedId?.phone,
        notes:selectedId?.notes
      } 
      const userId = user?.id
      const cartItem = cartItems.items

      console.log("userId",userId ,"selectedAddress" , selectedAddress , "cartItem",cartItem)

      const handleOrder = async()=>{
        if (selectedAddress && userId && cartItem.length > 0) {
          try {
              const response = await axios.post(`${import.meta.env.VITE_API_URL_SERVER}api/user/order/addOrder`, {
                  userId: userId,
                  address: selectedAddress,
                  productsListWithQuantity: cartItem,
              });
      
              console.log("Order successful:", response.data.success ,response.data.message ); // Logs on success
              if(response.data.success){
                toast({
                title :response.data.message  ,
              })
              }else{
                toast({
                title :response.data.message ,
                variant : 'destructive',
              })
              }
          } catch (error) {
              console.error("Error while ordering"); // Logs on failure
              toast({
                title : "something Went wrong",
                variant : 'destructive',
              })
          }
      } else {
        
          console.log("Error: Invalid input for order"); // Logs when input validation fails
          
      }
    }      

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <UserAddressDiv selectedId={selectedId} setCurrentSelectedId={setCurrentSelectedId}  />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item, i) => (
                <CartItemsContent key={i}  cartItems={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalPrice}</span>
            </div>
          </div>
          <div className="mt-4 w-full" >
            <Button onClick={()=>handleOrder()} >Checkout with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
