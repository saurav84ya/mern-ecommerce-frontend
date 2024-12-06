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

  if (isLoading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />
  ;

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
