import React, { useEffect } from 'react' 
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminProducts from './pages/admin-view/products'
import AdminOrders from './pages/admin-view/orders'
import AdminFeatures from './pages/admin-view/features'
import ShopingLayout from './components/shoping-view/layout'
import NoPage from './components/NoPage'
import ShopingHome from './pages/shoping-view/home'
import ShopingListing from './pages/shoping-view/listing'
import ShoipngCheakout from './pages/shoping-view/cheakout'
import ShopingAccount from './pages/shoping-view/account'
import CheckAuth from './components/common/check-auth'
import UnAuthPage from './components/UnAuthPage'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import AllUploadedProducts from './pages/admin-view/AllUploadedProducts'
import { AlarmCheck } from 'lucide-react'
import AllRegisterUsers from './pages/admin-view/AllRegisterUsers'



export default function App() {

  const {user , isAuthenticated , isLoading} = useSelector(state => state.auth )
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  },[dispatch])

  if(isLoading) return <div>Loading...</div>;

  // console.log("App.jsx" , isLoading,user)

  return (
    <div>

      <Routes>

        <Route path='/auth' element={<CheckAuth isAuthenticated={isAuthenticated} user={user} ><AuthLayout/></CheckAuth>} >
            <Route path='login' element={<Login/>} />
            <Route path='register' element={<Register/>} />
        </Route>

        <Route path='/admin' element={<CheckAuth isAuthenticated={isAuthenticated} user={user} ><AdminLayout/></CheckAuth>} >
            <Route path='dashboard' element={<AdminDashboard/>} />
            <Route path='products' element={<AllUploadedProducts/>} />
            <Route path='users' element={<AllRegisterUsers/>} />
            <Route path='orders' element={<AdminOrders/>} />
            <Route path='features' element={<AdminFeatures/>} />
        </Route>

        <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user} ><ShopingLayout/></CheckAuth>} >
          <Route path='home' element={<ShopingHome/>} />
          <Route path='listing' element={<ShopingListing/>} />
          <Route path='checkout' element={<ShoipngCheakout/>} />
          <Route path='account' element={<ShopingAccount/>} />
        </Route>

        <Route path='*' element={<NoPage/>} />
        <Route path='/unauth-page' element={<UnAuthPage/>} />


      </Routes>
    </div>
  )
}
