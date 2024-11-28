import React, { useState } from "react";
import img from "../../assets/account.jpg";
import UserAddressDiv from "@/components/shoping-view/UserAddressDiv";
import { useSelector } from "react-redux";
import CartItemsContent from "@/components/shoping-view/CartItemsContent";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export default function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);

  const [selectedId, setCurrentSelectedId] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(null);

  const { toast } = useToast();

  const totalPrice = cartItems?.items?.reduce((sum, item) => {
    const price = item?.salePrice > 0 ? item.salePrice : item?.price;
    return sum + (price * (item?.quantity || 0));
  }, 0) || 0;

  const selectedAddress = selectedId
    ? {
        address: selectedId?.address,
        city: selectedId?.city,
        pincode: selectedId?.pincode,
        phone: selectedId?.phone,
        notes: selectedId?.notes,
      }
    : null;

  const handleOrder = async () => {
    if (!selectedAddress || !user?.id || cartItems?.items?.length === 0) {
      toast({
        title: "Please select a valid address and add items to your cart.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_SERVER}api/user/order/addOrder`,
        {
          userId: user.id,
          address: selectedAddress,
          productsListWithQuantity: cartItems.items,
        }
      );

      if (response.data.success) {
        toast({ title: response.data.message });
        setIsOrderSuccessful(true);
      } else {
        toast({ title: response.data.message, variant: "destructive" });
        setIsOrderSuccessful(false);
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      toast({ title: "Something went wrong!", variant: "destructive" });
      setIsOrderSuccessful(false);
    } finally {
      setLoading(false);
      setShowBanner(true);
    }
  };

  return (
    <div className="flex flex-col relative">
      {/* Header Image */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} alt="Account" className="h-full w-full object-cover" />
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        {/* User Address */}
        <UserAddressDiv
          selectedId={selectedId}
          setCurrentSelectedId={setCurrentSelectedId}
        />

        {/* Cart Items */}
        <div className="flex flex-col gap-6">
          {cartItems?.items?.length > 0 ? (
            cartItems.items.map((item, index) => (
              <CartItemsContent key={index} cartItems={item} />
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}

          {/* Total Price */}
          <div className="mt-8 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>

          {/* Checkout Button */}
          <div className="mt-4">
            <Button
              onClick={handleOrder}
              disabled={loading}
              className={loading ? "cursor-not-allowed" : ""}
            >
              {loading ? "Processing..." : "Checkout with PayPal"}
            </Button>
          </div>
        </div>
      </div>

      {/* Order Status Banner */}
      {showBanner && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            {isOrderSuccessful ? (
              <>
                <h2 className="text-green-600 text-2xl font-bold mb-4">
                  Order Placed Successfully!
                </h2>
                <p className="text-gray-700 mb-6">
                  Thank you for your order. You can view your order history in
                  your account.
                </p>
                <Button>
                  <Link to="/shop/home">Back to Shop</Link>
                </Button>
                <Button className="ml-2" >
                  <Link to="/shop/account">Go to order</Link>
                </Button>
              </>
            ) : (
              <>
                <h2 className="text-red-600 text-2xl font-bold mb-4">
                  Order Failed!
                </h2>
                <p className="text-gray-700 mb-6">
                  Something went wrong. Please try again later.
                </p>
                <Button onClick={() => setShowBanner(false)}>Close</Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
