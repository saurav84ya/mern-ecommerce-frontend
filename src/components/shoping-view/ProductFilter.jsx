import { filterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

export default function ProductFilter({handleFilter , filter}) {
  return (
    <div className='bg-background rounded-lg flex  sm:flex-col    shadow-sm'>
      <div className='p-4 border-b '>
        <h2 className='text-lg font-extrabold'>Filters</h2>  
      </div>      
      <div className='p-4 space-y-4 ' >
        {
            Object.keys(filterOptions).map((i) => (
              <Fragment key={i} >
                <div>
                  <h3 className='text-base font-bold mb-1'>{i}</h3>
                  <div>
                    {
                      filterOptions[i].map(j =><Label key={j.id} className="flex font-medium items-center gap-2 mb-1 " >
                        <Checkbox onCheckedChange={()=> handleFilter(i , j.id)}  /> 
                        {j.label}
                      </Label> )
                    } 
                  </div>
                </div>
                <Separator/>
              </Fragment>
            ))
        }
      </div>
    </div>
  )
}
