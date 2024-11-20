import ProductFilter from '@/components/shoping-view/ProductFilter'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu'
import { ArrowUpDown } from 'lucide-react'
import React from 'react'

export default function ShopingListing() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6 '>
      <ProductFilter/>
      <div className='rounded-lg  bg-background w-full shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold' >All Products</h2>
          <div className='flex items-center gap-2' >
            <span className='text-muted-foreground'>10 Products</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1" >
              <ArrowUpDown className='h-4 w-4' />
              <span>Sort By</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
              <DropdownMenuRadioGroup align="end" className='w-[100px' >
                {
                  sortOptions.map(s => <DropdownMenuRadioItem className='cursor-pointer  ' key={s.id}>
                      {s.label}
                  </DropdownMenuRadioItem>)
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
         
        </div>
      </div>
    </div>
  )
}
