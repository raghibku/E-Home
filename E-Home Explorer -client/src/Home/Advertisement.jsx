import React, { useEffect, useState } from 'react'

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Advertisement = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { data: properties = [] } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const res = await axiosPublic.get('/advertiseFeaturedProperty');
      return res.data;
    }
  })

  return (
    <div className='flex justify-center items-center'>
      <div className='my-8 mx-auto'>
        <h1 className='text-3xl md:text-4xl  text-center font-semibold font-serif my-8'>Featured Properties</h1>
        <div className='grid grid-cols-1  lg:grid-cols-3 gap-8'>
          {
            properties ? properties.map(property => {
              return (
                <div key={property._id} className='flex justify-center items-center py-8 px-4 bg-base-300 rounded-lg hover:scale-110 transform transition duration-500 shadow-[0_35px_60px_-15px_rgba(58,191,248,0.3)]'>
                  <div className='flex-col justify-between items-center w-[300px]'>
                    <img src={property?.propertyImage} className='h-[220px] w-[300px] rounded-lg' alt="" />
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
                      <>
                        {property.verificationStatus === 'verified' ?
                          <img src='/logos/icons8-verified-64 (1).png' className='h-10 w-10' alt="" /> :
                          <h1>status:{property.verificationStatus}</h1>
                        }
                      </>
                    </div>

                    <div className='flex justify-between items-center py-4'>
                      <p className='text-primary text-xl'>{property.minPrice}$-{property.maxPrice}$</p>
                      <button className='btn btn-secondary' onClick={() => navigate(`/propertyDetails/${property._id}`)}>Details</button>
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
    </div>
  )
}

export default Advertisement