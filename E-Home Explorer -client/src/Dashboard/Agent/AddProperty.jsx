import React, { useContext } from 'react'
import { AuthContext } from '../../provider/AuthProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddProperty = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleAddProperty = event => {
    event.preventDefault();
    const form = event.target;
    const propertyTitle = form.propertyTitle.value;
    const propertyImage = form.propertyImage.value;
    const propertyLocation = form.propertyLocation.value;
    const description = form.description.value;
    const minPrice = form.minPrice.value;
    const maxPrice = form.maxPrice.value;


    const newProperty = {
      propertyTitle,
      propertyImage,
      propertyLocation,
      description,
      agentName: user?.displayName,
      agentEmail: user?.email,
      agentImage: user?.photoURL,
      minPrice:parseInt(minPrice),
      maxPrice:parseInt(maxPrice),
      verificationStatus: "pending",
    }

    console.log(newProperty)
    axiosSecure.post('/properties', newProperty)
        .then(res => {
            console.log(res.data)
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Property Added`,
                    showConfirmButton: false,
                    timer: 1500
                });


            }

        })

  }
  return (
    <div className='flex flex-col justify-center items-center p-4 bg-base-200'>

      <h1 className='text-5xl font-bold text-primary text-center my-8'>Add Property</h1>
      <form onSubmit={handleAddProperty} className="flex flex-col gap-2 text-xl w-full md:w-2/3">


        Property Title:<input className="my-2 border p-2 rounded-lg text-gray-200" type="text" placeholder="propertyTitle" name="propertyTitle" />

        Property Image:<input className="my-2 border p-2 rounded-lg text-gray-200" type="url" placeholder="propertyImage" name="propertyImage" />

        Property Location:<input className="my-2 border p-2 rounded-lg text-gray-200" type="text" name="propertyLocation" />

        Property Description:<input className="my-2 border p-2 rounded-lg text-gray-200" type="text" name="description" />

        Agent Name:<input className="my-2 border p-2 rounded-lg text-gray-200" defaultValue={user?.displayName} readOnly={true} type="text" placeholder="Agent Name" name="agentName" />

        Agent Email:<input className="my-2 border p-2 rounded-lg text-gray-200" readOnly={true} type="email" value={user?.email} name="agentEmail" />

        Minimum Price: <input type="number" className="my-2 border p-2 rounded-lg text-gray-200" name="minPrice" />

        Maximum Price: <input type="number" className="my-2 border p-2 rounded-lg text-gray-200" name="maxPrice" />

        <button className="btn btn-primary" type="submit">Add Property</button>

      </form>
      <ToastContainer />
    </div>
  )
}

export default AddProperty