import React, { useEffect } from 'react'

export default function NoPage() {

  function redirect (){
    window.location.href = "/auth/login";
  }

  useEffect(()=>{
    redirect();
  },[])

  return (

    <div>
      did not founde rhe page
    </div>
  )
}
