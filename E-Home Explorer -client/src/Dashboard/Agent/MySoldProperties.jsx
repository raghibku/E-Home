import React, { useContext } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2' 
import { AuthContext } from '../../provider/AuthProvider';

const MySoldProperties = () => {
  const {user}=useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: properties = [] ,refetch} = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agentPropertiesSold/${user.email}`);
      return res.data;
    }
  })
  return (
    <div>
    <h1 className='text-5xl font-bold text-primary text-center my-8'>My Sold Properties</h1>
    <h1 className='text-4xl font-bold text-primary text-center my-8'>Total Sold Properties : {properties?properties.length:'0'}</h1>
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Property Title</th>
            <th>

              Property Location

            </th>
            <th>

              Buyer Email

            </th>
            <th>

              Buyer Name

            </th>
            <th>

              Sold Price 

            </th>
           
          </tr>
        </thead>
        <tbody>
          {
            properties ?
              properties.map(property => {
                return (
                  <tr>
                    <td>
                      <h1 className='text-xl font-bold'>{property.propertyTitle}</h1>
                    </td>
                    <th>
                      <h1 className='text-xl font-semibold'>{property.propertyLocation}</h1>
                    </th>
                    <th>
                      <h1 className='text-xl font-semibold'>{property.buyerEmail}</h1>
                    </th>
                    <th>
                      <h1 className='text-xl font-semibold'>{property.buyerName}</h1>
                    </th>
                    <th>
                      <h1 className='text-xl font-semibold'>{property.offeredAmount}$</h1>
                    </th>
                    
                  </tr>
                )
              }) : <tr><td><span className="loading loading-spinner text-primary"></span></td></tr>
          }
        </tbody>

      </table>
    </div>

  </div>
  )
}

export default MySoldProperties