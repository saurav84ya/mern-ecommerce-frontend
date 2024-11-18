import React , {Fragment, useState} from 'react'
import { Button } from '@/components/ui/button'
import { Sheet ,SheetContent , SheetHeader, SheetTitle } from '@/components/ui/sheet'
import CommonForm from '@/components/common/form'
import { addProductFormElements } from '@/config';
import ProductimageUpload from '@/components/admin-view/image-upload';



const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

export default function AdminProducts() {

  function onSubmit (){
    console.log("Form submitted")
  }
  const [openAddProduct , setOpenAddProduct] = useState(false)
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState , setImageLoadingState] = useState(false)
  return (
    <Fragment>
      <div className='mb-5 flex justify-end'>
        <Button onClick ={() => setOpenAddProduct(true)}>Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        <Sheet open={openAddProduct} onOpenChange={()=>{setOpenAddProduct(false)}} >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader >
              <SheetTitle>Add New Oroduct</SheetTitle>
            </SheetHeader>
            <ProductimageUpload  imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            />
            
            <div className='py-6' >
                <CommonForm onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={ "Add"}
              formControls={addProductFormElements }
               />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  )
}
