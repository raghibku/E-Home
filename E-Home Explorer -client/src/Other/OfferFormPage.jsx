import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../provider/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2'


const OfferFormPage = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const property = useLoaderData();
    const { _id, propertyTitle, propertyLocation,propertyImage, agentName, agentEmail, minPrice, maxPrice } = property;


    const handleOffer = event => {
        event.preventDefault();

        const form = event.target;
        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const buyingDate = form.buyingDate.value;
        const offeredAmount = form.offeredAmount.value;


        const newOffer = {
            propertyId: _id,
            propertyTitle,
            propertyLocation,
            propertyImage,
            agentName,
            agentEmail,
            buyerName,
            buyerEmail,
            buyingDate,
            offeredAmount,
            offerStatus: 'pending',
        }
        console.log(newOffer)
        axiosSecure.post('/offers', newOffer)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire({
                        
                        icon: "success",
                        title: `Offer Made`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                    
                }

            })
    }
    return (
        <div className='flex flex-col justify-center items-center p-4 bg-base-200'>

            <h1 className='text-5xl font-bold text-primary text-center my-8'>Make An Offer</h1>
            <form onSubmit={handleOffer} className="flex flex-col gap-2 text-xl w-full md:w-2/3">


                Property Title:<input className="my-2 border p-2 rounded-lg text-gray-200" readOnly={true} type="text" defaultValue={propertyTitle} placeholder="propertyTitle" name="propertyTitle" />

                Property Location:<input className="my-2 border p-2 rounded-lg text-gray-200" defaultValue={propertyLocation} readOnly={true} type="text" name="propertyLocation" />

                Agent Name:<input className="my-2 border p-2 rounded-lg text-gray-200" defaultValue={agentName} readOnly={true} type="text" placeholder="Agent Name" name="agentName" />


                Buyer Name:<input className="my-2 border p-2 rounded-lg text-gray-200" readOnly={true} type="text" value={user?.displayName} name="buyerName" />

                Buyer Email:<input className="my-2 border p-2 rounded-lg text-gray-200" readOnly={true} type="email" value={user?.email} name="buyerEmail" />


                Offered Amount ({minPrice}-{maxPrice}):<input className="my-2 border p-2 rounded-lg text-gray-200" type="number" required placeholder="" name="offeredAmount" min={minPrice} max={maxPrice} />

                Buying Date:<input className="my-2 border p-2 rounded-lg text-gray-200" required type="date" placeholder="YYYY-MM-DD" name="buyingDate" />


                <button className="btn btn-primary" type="submit">Offer</button>

            </form>
            <ToastContainer />
        </div>

    )
}

export default OfferFormPage