import React, { useContext } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const WishList = () => {
  const axiosSecure = useAxiosSecure();
  const {user,loading}= useContext(AuthContext);
  const navigate = useNavigate();

  const { data: properties = [],refetch } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${user.email}`);
      return res.data;
    }
  })
  const handleRemove =(email,id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/wishlist/${email}/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "The product has been removed from wishlist.",
                icon: "success"
              });
            }
          })
      }
    });
  }
  return (
    <div className='my-8'>
      <h1 className='text-4xl text-center font-semibold font-serif my-8'>My WishList</h1>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-4'>
        {
          properties ? properties.map(property => {
            return (
              <div key={property._id} className='flex justify-center items-center py-8 px-4 bg-base-300 rounded-lg'>
                <div className='flex-col justify-between items-center w-[280px]'>
                  <img src={property?.propertyImage} className='h-[190px] w-[280px] rounded-lg' alt="" />
                  <h2 className='text-xl font-semibold font-serif h-[64px] w-[280px] text-primary'>
                    {property.propertyTitle}
                  </h2>

                  <p>{property.propertyLocation}</p>
                  <div className='flex justify-between items-center'>
                    <div className='flex justify-start items-center gap-2'>
                      <p>Agent:</p>
                      <p>{property.agentName}</p>
                      <img src={property.agentImage} className='h-10 w-10 rounded-full' alt="" />
                    </div>
                    <p>
                      Status : {property.verificationStatus}
                    </p>
                  </div>

                  <div className='flex justify-between items-center py-4'>
                    <p className='text-primary text-xl'>{property.minPrice}$-{property.maxPrice}$</p>
                    <button className='btn btn-primary' onClick={() =>{handleRemove(user.email,property._id)}}>Remove</button>
                  </div>
                  <button onClick={() => navigate(`/dashboard/offer/${property._id}`)} className='py-4 w-full bg-secondary text-2xl font-bold rounded-md'>Make An Offer</button>
                </div>
              </div>
            )
          })

            :
            <p>Loading....</p>
        }
      </div>
    </div>
  )
}

export default WishList