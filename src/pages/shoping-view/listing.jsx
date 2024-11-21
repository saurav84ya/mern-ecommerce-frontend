import ProductFilter from '@/components/shoping-view/ProductFilter'
import ShopingProductTile from '@/components/shoping-view/ShopingProductTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { filterOptions, sortOptions } from '@/config'
import { fetchAllFilteredProducts } from '@/store/shop/productSlice'
import { DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSearchParams, useSearchParams } from 'react-router-dom'

// Helper function to create query string from filter params
const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',');
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join('&');
}

export default function ShopingListing() {
  const dispatch = useDispatch();
  const { productList } = useSelector(state => state.shopProducts);
  
  const [filter, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Set initial filter values from sessionStorage
  useEffect(() => {
    setFilters(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, []);

  // Update query params in the URL when filter changes
  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQueryString = createSearchParamsHelper(filter);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filter, setSearchParams]); // Make sure to add `filter` as a dependency

  // Fetch products based on filters and sort
  useEffect(() => {
    const queryParams = createSearchParamsHelper(filter);
    dispatch(fetchAllFilteredProducts({ query: queryParams, sort }));
  }, [filter, sort, dispatch]); // Include `filter`, `sort`, and `dispatch` dependencies

  // Handle sorting
  const handleSort = (value) => {
    setSort(value);
  };

  // Handle filter changes
  function handleFilter(getSectionId, getCurrentOption) {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const currentOptions = updatedFilters[getSectionId] || [];

      if (currentOptions.includes(getCurrentOption)) {
        const newOptions = currentOptions.filter(
          (option) => option !== getCurrentOption
        );
        if (newOptions.length > 0) {
          updatedFilters[getSectionId] = newOptions;
        } else {
          delete updatedFilters[getSectionId];
        }
      } else {
        updatedFilters[getSectionId] = [...currentOptions, getCurrentOption];
      }

      return updatedFilters;
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filter} handleFilter={handleFilter} />
      <div className="rounded-lg w-full shadow-sm">
        <div className="p-4 border-b flex flex-col items-center justify-between">
          <div className="flex items-center justify-around w-full">
            <h2 className="text-lg font-extrabold">All Products</h2>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{productList.length} Products</span>
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
                      <DropdownMenuRadioItem className="cursor-pointer" value={s.id} key={s.id}>
                        {s.label}s
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            {productList && productList.length > 0
              ? productList.map((p, i) => <ShopingProductTile key={i} product={p} />)
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
