import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const AllProperties = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: properties= []} = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const res = await axiosSecure.get('/verifiedProperties');
      return res.data;
    }
  })

  return (
    <div className='my-8'>
      <h1 className='text-4xl text-center font-semibold font-serif my-8'>All Properties</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {
          properties ? properties.map(property => {
            return (
              <div key={property._id} className='flex justify-center items-center py-8 px-4 bg-base-300 rounded-lg'>
                <div className='flex-col justify-between items-center w-[300px]'>
                  <img src={property.propertyImage} className='h-[220px] w-[300px] rounded-lg' alt="" />
                  <h2 className='text-xl font-semibold font-serif h-[64px] w-[300px] text-primary'>
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
                    <button className='btn btn-secondary' onClick={()=>navigate(`/propertyDetails/${property._id}`)}>Details</button>
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

export default AllProperties