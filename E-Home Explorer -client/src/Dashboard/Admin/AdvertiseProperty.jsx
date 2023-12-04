import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllProperties = () => {
    const [propertyIdList, setpropertyIdList] = useState([])
    const [count, setCount] = useState(0)
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const { data: ads = [],refetch } = useQuery({
        queryKey: ['ads'],
        queryFn: async () => {
            const res = await axiosSecure.get('/advertiseProperty');
            setCount(count+1);
            return res.data;
        }
    })
    useEffect(() => {
        const propIdList = ads.map(ad => ad.propertyId);
        setpropertyIdList(propIdList);
    }, [count])


    const { data: properties = [] } = useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const res = await axiosSecure.get('/verifiedProperties');
            return res.data;
        }
    })
    const handleAdvertise = id => {
        setCount(count+1);
        const newAdvert = { propertyId: id }
        axiosSecure.post('/advertiseProperty', newAdvert)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Added to Featured List`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleRemoveAdvertise = id => {
        setCount(count+1);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove Advertise!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/advertiseProperty/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The ad has been removed.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className='my-8 w-full'>
            <h1 className='text-4xl text-center font-semibold font-serif my-8'>Advertise Properties</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                {
                    properties ? properties.map(property => {
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
                                        {
                                            !propertyIdList.includes(property._id) &&
                                            <button className='btn btn-primary' onClick={() => handleAdvertise(property._id)}>Advertise</button>
                                        }
                                        {
                                            propertyIdList.includes(property._id) &&
                                            <button className='btn btn-secondary' onClick={() => handleRemoveAdvertise(property._id)}>Remove Advertise</button>
                                        }
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