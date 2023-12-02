import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Update = () => {
    const property = useLoaderData();
    console.log(property);
    const axiosSecure = useAxiosSecure();

    const handleUpdateProperty = event => {
        event.preventDefault();
        const form = event.target;
        const propertyTitle = form.propertyTitle.value;
        const propertyImage = form.propertyImage.value;
        const propertyLocation = form.propertyLocation.value;
        const minPrice = form.minPrice.value;
        const maxPrice = form.maxPrice.value;

        const updatedProperty = {
            propertyTitle,
            propertyImage,
            propertyLocation,
            minPrice: parseInt(minPrice),
            maxPrice: parseInt(maxPrice),
        }
        axiosSecure.patch(`/updateProperty/${property._id}`, updatedProperty)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Property Updated`,
                        showConfirmButton: false,
                        timer: 1500
                    });


                }

            })
    }
    return (
        <div className='flex flex-col justify-center items-center p-4 bg-base-200'>

            <h1 className='text-5xl font-bold text-primary text-center my-8'>Update Property</h1>
            <form onSubmit={handleUpdateProperty} className="flex flex-col gap-2 text-xl w-full md:w-2/3">


                Property Title:<input className="my-2 border p-2 rounded-lg text-gray-200" defaultValue={property.propertyTitle} type="text" placeholder="propertyTitle" name="propertyTitle" />

                Property Image:<input className="my-2 border p-2 rounded-lg text-gray-200" defaultValue={property.propertyImage} type="url" placeholder="propertyImage" name="propertyImage" />

                Property Location:<input className="my-2 border p-2 rounded-lg text-gray-200" defaultValue={property.propertyLocation} type="text" name="propertyLocation" />

                Agent Name:<input className="my-2 border p-2 rounded-lg text-gray-200" defaultValue={property.agentName} readOnly={true} type="text" placeholder="Agent Name" name="agentName" />

                Agent Email:<input className="my-2 border p-2 rounded-lg text-gray-200" readOnly={true} type="email" value={property.agentEmail} name="agentEmail" />

                Minimum Price: <input type="number" className="my-2 border p-2 rounded-lg text-gray-200" defaultValue={property.minPrice} name="minPrice" />

                Maximum Price: <input type="number" className="my-2 border p-2 rounded-lg text-gray-200" defaultValue={property.maxPrice} name="maxPrice" />

                <button className="btn btn-primary" type="submit">Update Property</button>

            </form>
            <ToastContainer />
        </div>
    )
}

export default Update