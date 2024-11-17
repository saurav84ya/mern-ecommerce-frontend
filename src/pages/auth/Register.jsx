import CommonForm from '@/components/common/form'
import { registerFormControls } from '../../config/index'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../store/auth-slice/index'
import { useToast } from '@/hooks/use-toast'

const initialState = {
  userName : "",
  email : "",
  password : ""
}
export default function Register() {
  const {toast} = useToast()

  const [formData ,setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit  = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
    // .then(()=>navigate('/auth/login'))
    .then((data)=>{
      console.log(data)
      if(data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        })
        // navigate('/auth/login')
      }else{
        toast({
          title: data?.payload?.message || "server not responding" ,
          variant : 'destructive'
        })
      }
    })

  }
  return (
    <div className='mx-auto w-full max-w-md space-x-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold mb-[20px] tracking-tight text-foreground' >Create new Account</h1>
      </div>
      <CommonForm 
       formControls={registerFormControls}
       buttonText={"Sign Up"}
       formData={formData}
       setFormData={setFormData}
       onSubmit={onSubmit}
       />
        <p className='mt-2 text-center'>Already have an account?
          <Link className='font-medium ml-2 text-primary hover:underline' to="/auth/login" >Sign in </Link>
        </p>
    </div>
  )
}
