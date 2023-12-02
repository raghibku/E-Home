
import React, { useState } from 'react'
import useAxiosPublic from '../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query';

const LatestReviews = () => {
    const axiosPublic = useAxiosPublic();
    // const [reviews, setReviews] = useState([])
    // const res = axiosPublic.get('/latestReviews')
    // .then(res=>console.log(res.data))

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/latestReviews');
            
            return res.data;
        }
    })
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-center font-semibold font-serif my-8'>Latest Reviews</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' >
                {
                    reviews ?
                        reviews.map((review) => {
                            return (
                                // <div key={review._id} className='bg-neutral flex flex-col justify-center items-start w-[300px] p-4 rounded-lg overflow-y-auto gap-4'>
                                //     <p className='text-xl text-neutral-content '><span className='text-primary font-semibold'>Property Title:</span>{review.propertyTitle}</p>
                                //     <p className='text-xl text-neutral-content '><span className='text-primary font-semibold'>Review Description: </span>{review.reviewText}</p>
                                //     <div className='flex justify-center items-center'>
                                //         <p className='text-xl text-neutral-content '><span className='text-primary font-semibold'>Reviwer:</span>{review.reviewerName}</p>
                                //         <img src={review.reviewerImage} className='h-10 w-10 rounded-full' alt="" />
                                //     </div>

                                //     <p className='text-xl text-neutral-content '><span className='text-primary font-semibold'>Review Time:</span>{review.reviewTime}</p>


                                // </div>
                                <div className='flex flex-col justify-center items-center gap-2 bg-base-300 text-gray-200 hover:scale-110 transform transition duration-500 rounded-lg w-[250px] m-4 p-5 shadow-[0_35px_60px_-15px_rgba(58,191,248,0.3)]'>
                                    <div className='w-full flex justify-start items-start'>
                                        <img src=" /logos/icons8-quote-left-64.png" className='h-20' alt="" />
                                    </div>
                                    <p className='h-[120px] mb-4 overflow-auto'>{review.reviewText}</p>
                                    <p className='text-sm'>Property Title :<br/> {review.propertyTitle}</p>
                                    <p className='text-sm'>Review Date : {review.reviewTime}</p>
                                    


                                    <img src={review.reviewerImage} className='h-14' alt="" />
                                    <p>-{review.reviewerName}</p>
                                </div>
                            )
                        })
                        :
                        "loading.."
                }
            </div>
        </div>
    )
}

export default LatestReviews

