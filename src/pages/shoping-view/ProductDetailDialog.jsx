import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DialogContent ,Dialog ,DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { StarIcon } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function ProductDetailDialog({open , setOpen , productDetails , handleAddCart}) {
  const {user} = useSelector(state => state.auth)

  console.log("productDetails" , productDetails?._id)

  return (
    <div className='w-auto h-screen  '>

    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTitle>

      </DialogTitle>
      <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:p-12 max-w-[90vw]   sm:max-w-[80vw] lg:max-w-[70vw] " >
        <div className='relative overflow-hidden rounded-lg' >
            <img src={productDetails?.image} alt="image" width={600} height={600} className='aspect-square w-full object-cover' />
        </div>
        <div  className=''>
          <div>
            <h1 className='text-3xl font-extrabold' >{productDetails?.title}</h1>
            <p className='text-muted-foreground'>{productDetails?.description}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? 'line-through ' : '' }`} >${productDetails?.price}</p>
            {
              productDetails?.salePrice >0 ? <p className='text-2xl font-bold text-muted-foreground'>${productDetails?.salePrice }</p> : null
            }
            
          </div>
          <div className='flex items-center gap-0.5 mt-2'>
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <span className='text-muted-foreground' >(4.5)</span>
          </div>
          <div className='mt-5 mb-5 '>
              <Button onClick={()=> handleAddCart(productDetails?._id)} className="w-full">Add to cart</Button>
          </div>
          <Separator/>
          <div className=' overflow-auto '>
            <h2 className='text-xl font-bold mb-4 w-full'>Reviews</h2>
            <div className='grid gap-6 overflow-y-auto w-full max-h-64'>
              <div className='flex gap-4 w-full'>
                <Avatar className="w-10 h-10 border" >
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <div className='flex items-center gap-2' >
                    <h3 className='font-bold'>Saurav kumar</h3>
                  </div>
                  <div className='flex items-center gap-0.5'>
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                  </div>
                  <p className='text-muted-foreground' >This is an awesome product</p>
                </div>
              </div>
              <div className='flex gap-4'>
                <Avatar className="w-10 h-10 border" >
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <div className='flex items-center gap-2' >
                    <h3 className='font-bold'>Saurav kumar</h3>
                  </div>
                  <div className='flex items-center gap-0.5'>
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                  </div>
                  <p className='text-muted-foreground' >This is an awesome product</p>
                </div>
              </div>
             
              <div className='flex gap-4'>
                <Avatar className="w-10 h-10 border" >
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className='grid gap-1'>
                  <div className='flex items-center gap-2' >
                    <h3 className='font-bold'>Saurav kumar</h3>
                  </div>
                  <div className='flex items-center gap-0.5'>
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                    <StarIcon className='w-5 h-5 fill-primary' />
                  </div>
                  <p className='text-muted-foreground' >This is an awesome product</p>
                </div>
              </div>
            </div>
            <div className='mt-6 flex gap-2 pb-1 pl-1'>
              <Input className="" placeholder="write a review...." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>

    </Dialog>
      </div>
            
  )
}
