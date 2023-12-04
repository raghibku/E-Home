import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../provider/AuthProvider'
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyProfile = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // const currentUser = axiosSecure.get(`/users/${user.email}`)
  // console.log(currentUser)
  const [currentUser, setcurrentUser] = useState(null);

  useEffect(() => {
    if (!loading) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res=>setcurrentUser(res.data))
    }
  }, [loading])
  return (
    <div className='flex flex-col justify-center items-center gap-6'>
      <h1 className='text-4xl font-bold font-serif text-center'>MyProfile</h1>
      {
        currentUser? 
        <div  className='flex flex-col justify-center items-center gap-6 text-center'>
          <h1 className='text-xl md:text-2xl font-semibold'>Name: {currentUser.name}</h1>
          <h1 className='text-xl md:text-2xl font-semibold'>Email: {currentUser.email}</h1>
          <h1 className='text-xl md:text-2xl font-semibold'> {currentUser?.role}</h1>
          <img className="mask mask-circle w-[300px]" src={currentUser?.photoURL} />

          {/* <img src={currentUser?.photoURL} className='w-[300px] rounded-md' alt="" /> */}
        </div>:
        "loading"
      }
    </div>
  )
}

export default MyProfile