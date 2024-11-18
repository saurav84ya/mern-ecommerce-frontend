import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { useToast } from '@/hooks/use-toast'


export default function DeleteProduct() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {toast} = useToast()


  // Function to handle delete request
  const onSubmit = async () => {
    if (!id) {
      alert("Please enter a valid product ID.");
      return;
    }

    try {
      setLoading(true);
      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL_SERVER}api/admin/products/delateProduct/${id}`
      );

      toast({
        title:result?.data.message ,
      })
      setId(""); // Reset input field
      setOpen(false); // Close the form after successful deletion
    } catch (error) {
        toast({
            title:response?.data.message ,
            distructive
          })
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      {!open ? (
        <div className=" flex justify-end " ><Button  onClick={() => setOpen(true)}>Delete Product By ID</Button></div>
      ) : (
        <div className="flex justify-center" >
            <div className="p-4 absolute h-auto rounded-sm  bg-black text-white text-center w-[100%] md:w-auto bg-black-blur ">
          <h2 className="mb-4 text-2xl ">Delete Product</h2>

          {/* Input Field for Product ID */}
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter Product ID"
            className="border p-2 mb-4 w-full text-black "
          />

          {/* Delete Button */}
          <Button onClick={onSubmit} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>

          {/* Cancel Button */}
          <Button
            onClick={() => {
              setId("");
              setOpen(false);
            }}
            className="ml-2"
          >
            Cancel
          </Button>
        </div>
        </div>
      )}
    </>
  );
}
