import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  })
  const handleMakeAdmin = id => {
    axiosSecure.patch(`/makeAdmin/${id}`)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({

            icon: "success",
            title: `User made Admin!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }
  const handleMakeAgent = id => {
    axiosSecure.patch(`/makeAgent/${id}`)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({

            icon: "success",
            title: `User made Agent!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }
  const handleFraud = (id, email) => {
    axiosSecure.patch(`/agentProperties/${email}`)
    axiosSecure.patch(`/makeFraud/${id}`)
      .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            icon: "success",
            title: `Agent marked as Fraud!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }
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

        axiosSecure.delete(`/users/${id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success"
              });
            }
          })
      }
    });
  }
  return (
    <div>
      <h1 className='text-5xl font-bold text-primary text-center my-8'>Manage Users</h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>User Name</th>
              <th>

                User Email

              </th>
              <th>

                Make Admin

              </th>
              <th>

                Make Agent

              </th>
              <th>

                Mark as Fraud

              </th>
              <th>

                Delete

              </th>

            </tr>
          </thead>
          <tbody>
            {
              users ?
                users.map(user => {
                  return (
                    <tr>
                      <td>
                        <h1 className='text-xl font-bold'>{user.name}</h1>
                      </td>
                      <th>
                        <h1 className='text-xl font-semibold'>{user.email}</h1>
                      </th>
                      {
                        user?.role == 'fraud' ?
                          <th colSpan={3}>
                            <h1 className='text-xl font-semibold text-center'>Marked as Fraud</h1>
                          </th>
                          :
                          <>
                            <th>
                              {
                                user?.role == 'admin' ? "Admin" :
                                  <button onClick={() => { handleMakeAdmin(user._id) }} className='btn btn-secondary'>
                                    MakeAdmin
                                  </button>
                              }

                            </th>
                            <th>
                              {
                                user?.role == 'agent' ? "Agent" :
                                  <button onClick={() => { handleMakeAgent(user._id) }} className='btn btn-secondary'>
                                    MakeAgent
                                  </button>
                              }

                            </th>
                            <th>
                              {
                                user?.role == 'agent' ?
                                  <button onClick={() => { handleFraud(user._id, user.email) }} className='btn btn-secondary'>
                                    Mark Fraud
                                  </button> : "Not Applicable"
                              }
                            </th>
                          </>
                      }

                      <th>
                        <button className='btn btn-accent' onClick={() => handleDelete(user._id)}>
                          Delete
                        </button>
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

export default ManageUsers