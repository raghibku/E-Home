import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { AuthContext } from '../../provider/AuthProvider'
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const MyReviews = () => {


  const { user, loading } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userReviews/${user.email}`);
      return res.data;
    }
  })


  const handleDelete = id => {
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
        axiosSecure.delete(`/reviews/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "The offer has been deleted.",
                icon: "success"
              });
            }
          })
      }
    });
  }

  return (
    <div>
      <h1 className='text-4xl font-serif font-semibold my-8'>My Reviews</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          reviews ? reviews.map((review) => {
            return (
              <div key={review._id} className='bg-neutral flex flex-col justify-center items-start w-[300px] p-4 rounded-lg overflow-y-auto gap-4'>
                <p className='text-xl text-neutral-content '><span className='text-primary font-semibold'>Property Title:</span>{review.propertyTitle}</p>
                <p className='text-xl text-neutral-content '><span className='text-primary font-semibold'>Agent:</span>{review.agentName}</p>
                <p className='text-xl text-neutral-content '><span className='text-primary font-semibold'>Review Time:</span>{review.reviewTime}</p>

                <p className='text-xl text-neutral-content '><span className='text-primary font-semibold'>Review Description: </span>{review.reviewText}</p>
                <button className='btn btn-secondary' onClick={()=>handleDelete(review._id)}>Delete</button>
              </div>
            )
          }) : "No reviews yet"
        }
      </div>
    </div>
  )
}

export default MyReviews