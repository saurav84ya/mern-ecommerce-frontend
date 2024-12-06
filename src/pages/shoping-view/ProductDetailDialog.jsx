import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DialogContent ,Dialog ,DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { postReviewText } from '@/store/purchesedProductChque'
import { setProductDetails } from '@/store/shop/productSlice'
import { StarIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'



export default function ProductDetailDialog({ open, setOpen, productDetails, handleAddCart }) {
  const { user } = useSelector((state) => state.auth);
  const { purchases } = useSelector((state) => state.userPurchases);
  const dispatch = useDispatch();
  const {toast} = useToast()

  const [reviewText, setReviewText] = useState('');

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  function sendReview() {
    if (reviewText.length < 3) {
      // alert('Review is too short!');
      toast({
        title:"Review is too short!" ,
        variant : 'destructive'
      })
      return;
    }

    const isPurchased = purchases.some(
      (purchase) => purchase.productId === productDetails?._id
    );

    if (isPurchased) {
      console.log('Comment added');
      const review = {
        productId: productDetails?._id,
        userId: user?.id,
        userName : user?.userName,
        reviewText : reviewText
      }
      // console.log("review",review)
      dispatch(postReviewText(review));
      // console.log("productDetails._id, reviewText" , productDetails._id, reviewText)
      setReviewText(''); // Clear the input field after submission
      toast({
        title:"review Added" ,
      })
    } else {
      console.log('You are not purchased this product');
      toast({
        title:"You are not purchased this product" ,
        variant : 'destructive'
      })
      setReviewText(''); 
    }
  }

  return (
    <div className="w-auto">
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogTitle></DialogTitle>
        <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={productDetails?.image}
              alt="image"
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div>
            <div>
              <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
              <p className="text-muted-foreground">{productDetails?.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <p
                className={`text-3xl font-bold text-primary ${
                  productDetails?.salePrice > 0 ? 'line-through ' : ''
                }`}
              >
                ${productDetails?.price}
              </p>
              {productDetails?.salePrice > 0 ? (
                <p className="text-2xl font-bold text-muted-foreground">
                  ${productDetails?.salePrice}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-0.5 mt-2">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <span className="text-muted-foreground">(4.5)</span>
            </div>
            <div className="mt-5 mb-5">
              <Button onClick={() => handleAddCart(productDetails?._id)} className="w-full">
                Add to cart
              </Button>
            </div>
            <Separator />
            <div className="overflow-auto">
              <h2 className="text-xl font-bold mb-4 w-full">Reviews</h2>
              <div className="grid gap-6 overflow-y-auto w-full max-h-64">
                {/* Review List */}
                {/* ... */}
              </div>
              <div className="mt-6 flex gap-2 pb-1 pl-1">
                <Input
                  className=""
                  placeholder="Write a review..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <Button onClick={sendReview}>Submit</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
