import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2' 

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data: properties = [] ,refetch} = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const res = await axiosSecure.get('/properties');
      return res.data;
    }
  })
  const handleVerify = id => {
    axiosSecure.patch(`/verifyProperty/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        
                        icon: "success",
                        title: `property verified!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
  }
  const handleReject = id => {
    axiosSecure.patch(`/rejectProperty/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        
                        icon: "success",
                        title: `property rejected`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
  }
  return (
    <div>
      <h1 className='text-5xl font-bold text-primary text-center my-8'>Manage Properties</h1>
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

                agent Email

              </th>
              <th>

                agent Name

              </th>
              <th>

                Price Range

              </th>
              <th>

                Verify

              </th>
              <th>

                Reject

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
                        <h1 className='text-xl font-semibold'>{property.agentEmail}</h1>
                      </th>
                      <th>
                        <h1 className='text-xl font-semibold'>{property.agentName}</h1>
                      </th>
                      <th>
                        <h1 className='text-xl font-semibold'>{property.minPrice}$-{property.maxPrice}$</h1>
                      </th>
                      {
                        property.verificationStatus === 'pending' ?
                          <>
                            <th>
                              <button onClick={() => { handleVerify(property._id) }} className='btn btn-secondary'>
                                Verify
                              </button>
                            </th>
                            <th>
                              <button className='btn btn-accent' onClick={() => handleReject(property._id)}>
                                Reject
                              </button>
                            </th>
                          </>
                          :
                          (
                            property.verificationStatus === 'verified' ?
                              <th colSpan={2}>
                                <h1 className='text-xl font-semibold'>verified</h1>
                              </th> :
                              <th colSpan={2}>
                                <h1 className='text-xl font-semibold'>rejected</h1>
                              </th>
                          )
                      }

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

export default ManageProperties