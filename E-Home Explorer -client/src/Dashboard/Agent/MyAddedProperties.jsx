import React, { useContext, useEffect } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
const MyAddedProperties = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate= useNavigate();

  const { data: addedProperties = [], refetch } = useQuery({
    queryKey: ['addedProperties'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agentProperties/${user.email}`);
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

        axiosSecure.delete(`/properties/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Property has been deleted.",
                icon: "success"
              });
            }
          })
      }
    });
  }


  return (
    <div className='my-8'>
      <h1 className='text-4xl text-center font-semibold font-serif my-8'>My Added Properties</h1>
      <div className='grid grid-cols-1 md:grid-cols-2  gap-4'>
        {
          addedProperties ? addedProperties.map(property => {
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
                      <img src={property.agentImage} className='h-10 w-10 rounded-full' alt="" />
                    </div>
                    <p>
                      Status : {property.verificationStatus}
                    </p>
                  </div>
                  <p className='text-primary text-xl'>{property.minPrice}$-{property.maxPrice}$</p>
                  <div className='flex justify-between items-center py-4'>
                    
                    {property.verificationStatus != 'rejected' &&
                      <button className='btn btn-primary' onClick={() => navigate(`/dashboard/updateProperty/${property._id}`)}>Update</button>
                    }
                    <button className='btn btn-secondary' onClick={() => handleDelete(property._id)}>Delete</button>
                  </div>
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

export default MyAddedProperties