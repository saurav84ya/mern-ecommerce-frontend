import { toast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AllUploadedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showOptions, setShowOptions] = useState(null);

  // Function to fetch products data
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL_SERVER}api/admin/products/fetchAllProducts`
      );

      const data = response.data.data;

      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        throw new Error("Unexpected response format.");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Unable to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch products data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Close options dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showOptions && !event.target.closest(".options-dropdown")) {
        setShowOptions(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  // Handle delete product
  const handleDelete = async (id) => {
    if (!id) {
      toast({
        title: "Please enter a valid product ID.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const result = await axios.delete(
        `${import.meta.env.VITE_API_URL_SERVER}api/admin/products/delateProduct/${id}`
      );

      toast({
        title: result?.data.message,
      });
      fetchData(); // Refresh the product list
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Failed to delete product.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle update product
  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
    setShowOptions(null);
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL_SERVER}api/admin/products/editProducts/${selectedProduct._id}`,
        selectedProduct
      );
      setShowForm(false);
      fetchData(); // Refresh the product list
      toast({
        title: "Product updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Product update failed.",
        variant: "destructive",
      });
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle options dropdown
  const handleOptionsClick = (id) => {
    setShowOptions((prev) => (prev === id ? null : id));
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">All Uploaded Products</h2>

      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="relative border p-4 rounded"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 rounded mb-2"
            />
            <p>ID: {product._id}</p>
            <p>Name: {product.title}</p>


            {/* Three-dot icon */}
            <div
              className="absolute top-1 right-1 h-8 w-8 flex justify-center items-center rounded-lg bg-orange-200"
            >
              <i
                className="ri-edit-fill cursor-pointer text-lg"
                onClick={() => handleOptionsClick(product._id)}
              ></i>
            </div>

            {/* Options dropdown */}
            {showOptions === product._id && (
              <div className="absolute top-0 right-0 bg-white shadow-md rounded options-dropdown">
                <button
                  className="block px-4 py-2 text-left hover:bg-gray-200"
                  onClick={() => handleUpdateClick(product)}
                >
                  Update Product
                </button>
                <button
                  className="block px-4 py-2 text-left text-red-500 hover:bg-gray-200"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete Product
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Update Product Form */}
      {showForm && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="text-lg font-bold mb-4">Update Product</h3>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="title"
                value={selectedProduct.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="text"
                name="description"
                value={selectedProduct.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="text"
                name="category"
                value={selectedProduct.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="number"
                name="price"
                value={selectedProduct.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="number"
                name="salePrice"
                value={selectedProduct.salePrice}
                onChange={handleInputChange}
                placeholder="Sale Price"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="number"
                name="totalStock"
                value={selectedProduct.totalStock}
                onChange={handleInputChange}
                placeholder="Total Stock"
                className="w-full p-2 mb-2 border rounded"
              />
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded"
              >
                Update
              </button>
              <button
                type="button"
                className="w-full p-2 mt-2 bg-gray-500 text-white rounded"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
