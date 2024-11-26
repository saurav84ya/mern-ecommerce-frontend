import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

import ProductFilter from '@/components/shoping-view/ProductFilter';
import ShopingProductTile from '@/components/shoping-view/ShopingProductTile';
import ProductDetailDialog from './ProductDetailDialog';

import { filterOptions, sortOptions } from '@/config';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/productSlice';
import { addToCart, fetchCartItems } from '@/store/cart-slice';
import { useToast } from '@/hooks/use-toast';

// Helper function to create query strings from filter parameters
const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      queryParams.push(`${key}=${encodeURIComponent(value.join(','))}`);
    }
  }
  return queryParams.join('&');
};

export default function ShopingListing() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(state => state.shoppingProducts);
  const {user} = useSelector(state => state.auth)
  const {cartItems , isLoading} = useSelector(state => state.shoppingCart)
  const {toast} = useToast()
 
  const [filter, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailDialog, setOpenDetailDialog] = useState(false);


  // Fetch product details when a product is clicked
  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
  };


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

  // Load initial filter values from sessionStorage
  useEffect(() => {
    const storedFilter = sessionStorage.getItem("filter");
    if (storedFilter) {
      setFilters(JSON.parse(storedFilter));
    }
  }, []);

  // Update URL query params whenever the filter changes
  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const queryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filter, setSearchParams]);

  // Fetch filtered and sorted products
  useEffect(() => {
    const queryParams = createSearchParamsHelper(filter);
    dispatch(fetchAllFilteredProducts({ query: queryParams, sort }));
  }, [filter, sort, dispatch]);

  // Update sort state when a sorting option is selected
  const handleSort = (value) => {
    setSort(value);
  };

  // Handle filter changes
  const handleFilter = (sectionId, currentOption) => {
    sessionStorage.removeItem('filter')
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const currentOptions = updatedFilters[sectionId] || [];

      if (currentOptions.includes(currentOption)) {
        const newOptions = currentOptions.filter(option => option !== currentOption);
        if (newOptions.length > 0) {
          updatedFilters[sectionId] = newOptions;
        } else {
          delete updatedFilters[sectionId];
        }
      } else {
        updatedFilters[sectionId] = [...currentOptions, currentOption];
      }

      return updatedFilters;
    });
  };

  // Open product detail dialog when product details are available
  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]   gap-6 p-4 md:p-6">
      {/* Filter Component */}
      <ProductFilter filter={filter} handleFilter={handleFilter} />

      {/* Products Listing Section */}
      <div className="rounded-lg w-full shadow-sm">
        <div className="p-4 border-b flex flex-col items-center justify-between">
          <div className="flex items-center justify-around w-full">
            <h2 className="text-lg font-extrabold">All Products</h2>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{productList.length} Products</span>

              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ArrowUpDown className="h-4 w-4" />
                    <span>Sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[100px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                    {sortOptions.map((s) => (
                      <DropdownMenuRadioItem 
                        key={s.id} 
                        value={s.id} 
                        className="cursor-pointer"
                      >
                        {s.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Product Tiles */}
          <div className="flex flex-wrap justify-center">
            {productList.length > 0
              ? productList.map((product, index) => (
                  <ShopingProductTile
                    key={index}
                    handleGetProductDetails={handleGetProductDetails}
                    product={product}
                    handleAddCart={handleAddCart}
                  />
                ))
              : <p>No products available.</p>}
          </div>
        </div>
      </div>

      {/* Product Detail Dialog */}
      <ProductDetailDialog 
        open={openDetailDialog} 
        setOpen={setOpenDetailDialog} 
        productDetails={productDetails} 
        handleAddCart={handleAddCart}
      />
    </div>
  );
}
