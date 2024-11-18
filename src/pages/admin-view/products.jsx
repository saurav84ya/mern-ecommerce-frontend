import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductimageUpload from "@/components/admin-view/image-upload";
import axios from "axios";
import { useToast } from '@/hooks/use-toast'


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
  const {toast} = useToast()
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  useEffect(() => {
    // Update formData with the uploaded image URL
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: uploadedImageUrl === "" ? null : uploadedImageUrl,
    }));
  }, [uploadedImageUrl]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit form data to the backend API
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_SERVER}api/admin/products/addProduct`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
        
      );

      console.log("Product added successfully:", response?.data);
      // Optionally, reset the form after successful submission
      if(response?.data.success){
        toast({
          title:response?.data.message ,
        })
        initialFormData.image = null
      }else {
        toast({
          title:response?.data.message ,
        })
      }
      setFormData(initialFormData);
      setOpenAddProduct(false);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <Fragment>
      <div className="mb-5 flex justify-end">
        <Button onClick={() => setOpenAddProduct(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet open={openAddProduct} onOpenChange={(isOpen) => setOpenAddProduct(isOpen)}>
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>

            {/* Image Upload Component */}
            <ProductimageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
            />

            {/* Form Component */}
            <div className="py-6">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={imageLoadingState ? "Uploading..." : "Add"}
                formControls={addProductFormElements}
                disabled={imageLoadingState}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}
