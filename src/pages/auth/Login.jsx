import CommonForm from '@/components/common/form'
import { loginFormControls } from '../../config/index'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser ,loginUser } from '../../store/auth-slice/index'
import { useDispatch } from 'react-redux'
import { useToast } from '@/hooks/use-toast'



const initialState = {
  email : "",
  password : ""
}
export default function Login() {
  const {toast} = useToast()

  const [formData ,setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit  = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
    // .then(()=>navigate('/auth/login'))
    .then((data)=>{
      console.log(data)
      if(data?.payload?.success) {
        toast({
          title:data?.payload?.message ,
        })
      }else{
        toast({
          title:data?.payload?.message || "Invailed email or password" ,
          variant : 'destructive'
        })
      }
    })
  }
  return (
    <div className='mx-auto w-full max-w-md space-x-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold mb-[20px] tracking-tight text-foreground' >Welcome Back😊</h1>
      </div>
      <CommonForm 
       formControls={loginFormControls}
       buttonText={"Sign In"}
       formData={formData}
       setFormData={setFormData}
       onSubmit={onSubmit}
       />
        <p className='mt-2 text-center'>Don't have an account?
          <Link className='font-medium ml-2 text-primary hover:underline' to="/auth/register" >Sign Up </Link>
        </p>
    </div>
  )
}
