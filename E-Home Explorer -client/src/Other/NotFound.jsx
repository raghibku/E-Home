import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col justify-center items-center gap-4 h-screen'>
      <h1 className='text-5xl font-bold text-primary text-center my-8'>Page Not Found</h1>
      <img src="/images/undraw_Page_not_found_re_e9o6.png" className='max-w-md w-2/3' alt="" />
      <button onClick={()=>navigate('/')} className="btn btn-primary">Back To Home </button>
    </div>
  )
}

export default NotFound