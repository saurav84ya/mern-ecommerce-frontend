import ProductFilter from '@/components/shoping-view/ProductFilter'
import ShopingProductTile from '@/components/shoping-view/ShopingProductTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts } from '@/store/shop/productSlice'
import { DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ShopingListing() {
  const dispatch = useDispatch()
  const {productList} = useSelector(state=> state.shopProducts)
  useEffect(()=>{
    dispatch(fetchAllFilteredProducts())
  },[dispatch])

  const [filter , setFilters] = useState({})
  const [sort ,setSort] = useState(null)

  const handleSort = (value) => {
    setSort(value )
  }
  console.log(filter)

  function handleFilter(getSectionId, getCurrentOption) {
  
    // Create a copy of the current filter state
    const cpyFilter = { ...filter };
  
    // Check if the section already exists in the filter
    if (!cpyFilter[getSectionId]) {
      // If the section does not exist, initialize it with the current option
      cpyFilter[getSectionId] = [getCurrentOption];
    } else {
      // If the section exists, check if the option is already selected
      const currentOptions = cpyFilter[getSectionId];
      if (currentOptions.includes(getCurrentOption)) {
        // If the option is already selected, remove it (toggle off)
        cpyFilter[getSectionId] = currentOptions.filter((option) => option !== getCurrentOption);
  
        // If no options are left for the section, delete the section
        if (cpyFilter[getSectionId].length === 0) {
          delete cpyFilter[getSectionId];
        }
      } else {
        // Otherwise, add the new option to the section (toggle on)
        cpyFilter[getSectionId] = [...currentOptions, getCurrentOption];
      }
    }
  
    setFilters(cpyFilter); // Update the state with the new filter object
  }
  
  

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 '>
      <ProductFilter filter={filter} handleFilter={handleFilter}  />
      <div className='rounded-lg   w-full shadow-sm'>
        <div className='p-4 border-b flex flex-col items-center justify-between'>
         <div className='flex items-center justify-around w-full ' >
         <h2 className='text-lg font-extrabold' >All Products</h2>
          <div className='flex items-center gap-2' >
            <span className='text-muted-foreground'>{productList.length} Products</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1" >
              <ArrowUpDown className='h-4 w-4' />
              <span>Sort By</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent   align="end" className='w-[100px' >
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} >
                {
                  sortOptions.map(s => 
                  <DropdownMenuRadioItem className='cursor-pointer' value={s.id} key={s.id}>
                      {s.label}s
                  </DropdownMenuRadioItem>)
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
         </div>
                {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-col-4 gap-4 p-4'> */}
                <div className='flex flex-wrap justify-center ' >
                    {
                      productList && productList.length > 0 ? 
                      productList.map((p,i) => <ShopingProductTile key={i} product={p} />) : null
                    }
                </div>
        </div>
      </div>
    </div>
  )
}
