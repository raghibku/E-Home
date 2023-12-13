import React, { useContext, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2'
import { FacebookShareButton, FacebookIcon } from 'react-share';

const PropertyDetails = () => {
  const axiosSecure = useAxiosSecure();
  const property = useLoaderData();
  const { _id, propertyImage, propertyTitle, propertyLocation, agentName, agentImage, verificationStatus, minPrice, maxPrice, description } = property;
  const { user, loading } = useContext(AuthContext);
  const [currentUser, setcurrentUser] = useState(null);
  const [reviews, setreviews] = useState(null);
  const date = new Date();
  const shareUrl = window.location.href;

  useEffect(() => {
    if (!loading) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => setcurrentUser(res.data))
    }
  }, [loading])

  axiosSecure.get(`/reviews/${_id}`)
    .then(res => setreviews(res.data))

  const handleReview = event => {
    event.preventDefault();
    const form = event.target;
    const review = form.review.value;

    const newReview = {
      propertyId: _id,
      propertyTitle,
      reviewerName: currentUser?.name,
      reviewerEmail: currentUser?.email,
      reviewerImage: currentUser?.photoURL,
      reviewText: review,
      agentName,
      reviewTime: date.toISOString().slice(0, 10)
    }

    axiosSecure.post('/reviews', newReview)
      .then(res => {

        if (res.data.insertedId) {
          Swal.fire({
            title: "Posted!",
            text: "The review has been posted.",
            icon: "success"
          });
        }
      })
  }

  const handleAddToWishlist = id => {

    const latestWish = {
      email: user.email,
      propertyId: id,
    }
    axiosSecure.post('/wishlist', latestWish)
      .then(res => {
        console.log(res)
        if (res.data.insertedId) {
          Swal.fire({
            title: "Added!",
            text: "The property has been added to wishlist.",
            icon: "success"
          });
        }
      })
  }

  return (
    <div key={_id} className='flex flex-col justify-center items-center py-8 px-4 bg-base-300 rounded-lg '>
      <div className='flex-col justify-between items-center w-[350px] md:w-[650px] gap-6'>
        <img src={propertyImage} className='h-[220px] md:h-auto w-[350px] md:w-[650px] rounded-lg' alt="" />
        <h2 className='text-xl font-semibold font-serif  text-primary'>
          {propertyTitle}
        </h2>
        <p>{description}</p>

        <p>{propertyLocation}</p>
        <div className='flex justify-between items-center'>
          <div className='flex justify-start items-center gap-2'>
            <p>Agent:</p>
            <p>{agentName}</p>
            <img src={agentImage} className='h-10 w-10 rounded-full' alt="" />
          </div>
          <p>
            Status : {verificationStatus}
          </p>
        </div>
        <p className='text-primary text-xl'>{minPrice}$-{maxPrice}$</p>
        <div className='flex justify-between items-center py-4'>

          <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>Review</button>
          <button className='btn btn-secondary' onClick={() => { handleAddToWishlist(_id) }}>Add To Wishlist</button>
          <div>
            <FacebookShareButton
              url={`https://e-home-2593c.web.app/propertyDetails/${_id}`}
              image={propertyImage}
              quote={'CheckOut this property!'}
              hashtag="#EHome"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center my-12'>
        <h1 className='text-4xl text-center mb-8'>Reviews about the property</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {
            reviews ? reviews.map((review) => {
              return (
                <div className='bg-neutral h-[200px] w-[300px] p-4 rounded-lg overflow-y-auto'>
                  <p className='text-xl text-neutral-content py-6'>"{review.reviewText}"</p>
                  <p className='text-xl text-neutral-content font-semibold text-end'>-{review.reviewerName}</p>
                </div>
              )
            }) : "No reviews yet"
          }
        </div>
      </div>
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Please share your review!</h3>
          <form onSubmit={handleReview} className=' my-4 w-full flex flex-col gap-4 justify-center items-center'>
            <textarea placeholder="Review" name='review' className="textarea textarea-bordered textarea-lg w-full max-w-xs" ></textarea>
            <button className='btn btn-secondary' type="submit">Post</button>
          </form>
          <div className="modal-action flex justify-center items-center">
            <form method="dialog" className='flex flex-col justify-center items-center'>
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default PropertyDetails