import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShopingLayout from "./components/shoping-view/layout";
import NoPage from "./components/NoPage";
import ShopingHome from "./pages/shoping-view/home";
import ShopingListing from "./pages/shoping-view/listing";
import ShoipngCheakout from "./pages/shoping-view/cheakout";
import ShopingAccount from "./pages/shoping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./components/UnAuthPage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import AllUploadedProducts from "./pages/admin-view/AllUploadedProducts";
import AllRegisterUsers from "./pages/admin-view/AllRegisterUsers";
import { Skeleton } from "./components/ui/skeleton";
import Search from "./pages/shoping-view/Search";

export default function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // console.log(user?.id , user?.userName,isAuthenticated)
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

 if (isLoading) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 px-4">
      <div className="text-lg font-semibold text-gray-800 mb-2">
        Just a moment...
      </div>
      <p className="text-base text-gray-600">
        Our server might take a little longer to start as it's hosted on a free plan. 
        Thank you for your patience!
      </p>
      <div className="mt-4">
        <svg
          className="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          ></path>
        </svg>
      </div>
    </div>
  );
}


  return (
    <div>
      <Routes>
        {/* Redirect from "/" to "/auth/login" */}
        <Route path="/" element={<Navigate to="/auth/login" />} />

        {/* Auth Routes */}
        <Route
          path="/auth"
          element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AuthLayout /></CheckAuth>}
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckAuth>}
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AllUploadedProducts />} />
          <Route path="users" element={<AllRegisterUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shopping Routes */}
        <Route
          path="/shop"
          element={<CheckAuth isAuthenticated={isAuthenticated} user={user}><ShopingLayout /></CheckAuth>}
        >
          <Route path="home" element={<ShopingHome />} />
          <Route path="listing" element={<ShopingListing />} />
          <Route path="checkout" element={<ShoipngCheakout />} />
          <Route path="account" element={<ShopingAccount />} />
          <Route path="search" element={<Search />} />
        </Route>

        {/* Handle 404 - No Page */}
        <Route path="*" element={<NoPage />} />
        <Route path="/unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
}
