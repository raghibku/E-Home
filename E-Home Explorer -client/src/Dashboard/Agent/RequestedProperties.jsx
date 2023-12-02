import React, { useContext } from 'react'
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const RequestedProperties = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: offeredProperties = [], refetch } = useQuery({
    queryKey: ['offeredProperties'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agentOffers/${user.email}`);
      return res.data;
    }
  })

  const handleAccept = (id, propertyId) => {
    axiosSecure.patch(`/acceptOffer/${id}/${propertyId}`)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `Offer Accepted!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }
  const handleReject = id => {
    axiosSecure.patch(`/rejectOffer/${id}`)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({

            icon: "success",
            title: `Offer Rejected!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  return (
    <div>
      <h1 className='text-5xl font-bold text-primary text-center my-8'>Requested Properties</h1>
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

                Accept

              </th>
              <th>

                Reject

              </th>

            </tr>
          </thead>
          <tbody>
            {
              offeredProperties ?
                offeredProperties.map(property => {
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
                      {
                        property.offerStatus == 'pending' ?
                          <>
                            <th>
                              <button onClick={() => { handleAccept(property._id, property.propertyId) }} className='btn btn-secondary'>
                                Accept
                              </button>
                            </th>
                            <th>
                              <button className='btn btn-accent' onClick={() => handleReject(property._id)}>
                                Reject
                              </button>
                            </th>
                          </>
                          : (
                            property.offerStatus == 'accepted' ?

                            <th colSpan={2}>
                              <h1 className='text-xl font-semibold text-center'>Accepted</h1>
                            </th> 
                            :
                            <th colSpan={2}>
                              <h1 className='text-xl font-semibold text-center'>Rejected</h1>
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

export default RequestedProperties