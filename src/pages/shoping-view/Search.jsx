import ShopingProductTile from "@/components/shoping-view/ShopingProductTile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/cart-slice";
import { getSearchResults, resetSearchResults } from "@/store/search-slice";
import { fetchProductDetails } from "@/store/shop/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductDetailDialog from "./ProductDetailDialog";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shoppingProducts);

  const { user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { toast } = useToast();
  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        console.log("keyword",keyword)
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);



  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

//   console.log(searchResults, "searchResults");

function handleAddCart(getCurrentProductId){
    dispatch(addToCart({ userId : user?.id, productId : getCurrentProductId, quantity : 1 }))
    .then((data)=> {
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
        toast({
          title: data?.payload?.message,
        })
      }
    } )
  }



  return (
    <div className="container mt-[100px] mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      {!searchResults.length ? (
        <h1 className="text-5xl font-extrabold">No result found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((product , index) => (
          <ShopingProductTile
          key={index}
          handleAddCart={handleAddCart}
            product={product}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        handleAddCart={handleAddCart}
      />
    </div>
  );
}

export default SearchProducts;
