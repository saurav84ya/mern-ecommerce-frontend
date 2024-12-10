import Star from "@/components/Star";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogContent, Dialog, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { postReviewText } from "@/store/purchesedProductChque";
import { setProductDetails } from "@/store/shop/productSlice";
import { StarHalf, StarHalfIcon, StarIcon, Stars } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetailDialog({
  open,
  setOpen,
  productDetails,
  handleAddCart,
}) {
  const { user } = useSelector((state) => state.auth);
  const { purchases } = useSelector((state) => state.userPurchases);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState(1);

  // console.log("productDetails", productDetails?.averageReview);

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  function sendReview() {
    if (reviewText.length < 3) {
      // alert('Review is too short!');
      toast({
        title: "Review is too short!",
        variant: "destructive",
      });
      return;
    }

    const isPurchased = purchases.some(
      (purchase) => purchase.productId === productDetails?._id
    );

    if (isPurchased) {
      // console.log("Comment added");
      const review = {
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewText: reviewText,
        rating: stars,
      };
      // console.log("review",review)
      dispatch(postReviewText(review));
      // console.log("productDetails._id, reviewText" , productDetails._id, reviewText)
      setReviewText(""); // Clear the input field after submission
      toast({
        title: "review Added",
      });
    } else {
      // console.log("You are not purchased this product");
      toast({
        title: "You are not purchased this product",
        variant: "destructive",
      });
      setReviewText("");
    }
  }

  // const name = name

  // console.log("console name 1st latter with Uppercse ")

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
              <h1 className="text-3xl font-extrabold">
                {productDetails?.title}
              </h1>
              <p className="text-muted-foreground">
                {productDetails?.description}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p
                className={`text-3xl font-bold text-primary ${
                  productDetails?.salePrice > 0 ? "line-through " : ""
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
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(productDetails?.averageReview || 0)
                      ? "fill-primary" // Filled star
                      : "fill-muted" // Empty star
                  }`}
                />
              ))}
              <span className="text-muted-foreground ml-2">
                {`(${productDetails?.averageReview })`|| "No rating"}
              </span>
            </div>

            <div className="mt-5 mb-5">
              <Button
                onClick={() => handleAddCart(productDetails?._id)}
                className="w-full"
              >
                Add to cart
              </Button>
            </div>
            <Separator />
            <div className="overflow-auto">
              <h2 className="text-xl font-bold mb-4 w-full">Reviews</h2>
              <div className="grid gap-1 overflow-y-auto w-full max-h-64">
                {productDetails?.reviews?.map((x, i) => {
                  return (
                    <div key={i} className="flex gap-6">
                      <Avatar className="w-10- h-10">
                        <AvatarFallback>
                          {x.userName.charAt(0).toUpperCase() + name.slice(1)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">
                            {user.id === x.userId ? "You" : x.userName}
                          </h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <StarIcon
                              key={index}
                              className={`w-5 h-5 ${
                                index < x.rating
                                  ? "fill-primary"
                                  : "fill-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{x.reviewText}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-col  gap-2 pb-1 pl-1">
                <Star setStars={setStars} />
                <div className="flex">
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
