import React, { useContext } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const PropertyBought = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: properties = [], refetch } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/${user.email}`);
      return res.data;
    }
  })
  // const handleDelete = id => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axiosSecure.delete(`/offers/${id}`)
  //         .then(res => {
  //           if (res.data.deletedCount > 0) {
  //             refetch();
  //             Swal.fire({
  //               title: "Deleted!",
  //               text: "The offer has been deleted.",
  //               icon: "success"
  //             });
  //           }
  //         })
  //     }
  //   });
  // }
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-4xl text-center font-semibold font-serif my-8'>Property Bought</h1>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-4'>
        {
          properties ? properties.map(property => {
            return (
              <div key={property._id} className='flex justify-center items-center py-8 px-4 bg-base-300 rounded-lg'>
                <div className='flex-col justify-between items-center w-[280px]'>
                  <img src={property.propertyImage} className='h-[190px] w-[280px] rounded-lg' alt="" />
                  <h2 className='text-xl font-semibold font-serif h-[64px] w-[280px] text-primary'>
                    {property.propertyTitle}
                  </h2>

                  <p>{property.propertyLocation}</p>
                  <div className='flex justify-between items-center'>
                    <div className='flex justify-start items-center gap-2'>
                      <p>Agent:</p>
                      <p>{property.agentName}</p>

                    </div>
                    <p>
                      Status : {property.offerStatus}
                    </p>
                  </div>

                  <div className='flex justify-between items-center py-4'>
                    <p className='text-primary text-xl'>Offered Amount:{property.offeredAmount}$</p>
                    {property.offerStatus === 'accepted' && (
                      <button className='btn btn-primary' onClick={() => { navigate(`/dashboard/payment/${property._id}`) }}>
                        Pay
                      </button>
                    )}
                  </div>
                  {/* <button onClick={() => navigate(`/dashboard/offer/${property._id}`)} className='py-4 w-full bg-secondary text-2xl font-bold rounded-md'>Make An Offer</button> */}
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

export default PropertyBought