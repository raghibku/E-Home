import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageReviews = () => {

  const axiosSecure = useAxiosSecure();

  const { data: reviews = [],refetch } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosSecure.get('/reviews');
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
                text: "The review has been deleted.",
                icon: "success"
              });
            }
          })
      }
    });
  }
  return (
    <div>
      <h1 className='text-5xl font-bold text-primary text-center my-8'>Manage Reviews</h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Reviewer image</th>
              <th>

                Reviewer Name

              </th>
              <th>

                Reviewer Email

              </th>
              <th>

                Review

              </th>

              <th>

                Delete

              </th>

            </tr>
          </thead>
          <tbody>
            {
              reviews ?
                reviews.map(review => {
                  return (
                    <tr>
                      <td>
                        <img src={review?.reviewerImage} className='h-10 w-10 rounded-full' alt="" />
                      </td>
                      <th>
                        <h1 className='text-xl font-semibold'>{review.reviewerEmail}</h1>
                      </th>
                      <th>
                        <h1 className='text-xl font-semibold'>{review.reviewerName}</h1>
                      </th>
                      <th>
                        <h1 className='text-xl font-semibold'>{review.reviewText}</h1>
                      </th>

                      <th>
                        <button className='btn btn-accent' onClick={() => handleDelete(review._id)}>
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

export default ManageReviews