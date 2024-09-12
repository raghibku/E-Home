import React, { useContext, useEffect, useState } from 'react'
import { FaHome, FaSearch } from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { data: currentUser = [] } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            console.log(user.email)
            console.log(res.data)
            return res.data;
        }
    })


    return (
        
        <div className="flex flex-col md:flex-row">
            {/* dashboard side bar */}
            <div className="md:w-64 md:min-h-screen bg-blue-400 text-white md:text-2xl font-semibold ">
                <ul className="grid grid-cols-2 md:grid-cols-1 menu p-4">
                    {
                        currentUser?.role ? (
                            currentUser.role === 'agent' || currentUser.role ===  'fraud' ? (
                                <>
                                    
                                    <button className='btn glass text-white col-span-2 md:col-span-1' onClick={()=>navigate('/dashboard')}>
                                        My Profile
                                    </button>
                                    {
                                        currentUser.role === 'agent' ?
                                            <li>
                                                <NavLink to="/dashboard/addProperty">
                                                    Add Property</NavLink>
                                            </li> : <></>
                                    }
                                    <li>
                                        <NavLink to="/dashboard/myAddedProperties">
                                            My Added Properties</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/mySoldProperties">
                                            My Sold Properties</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/requestedProperties">
                                            Requested Properties</NavLink>
                                    </li>
                                </>
                            )
                                :
                                (
                                    <>
                                        <button className='btn glass text-white col-span-2 md:col-span-1' onClick={()=>navigate('/dashboard')}>
                                        My Profile
                                    </button>
                                        <li>
                                            <NavLink to="/dashboard/manageProperties">

                                                Manage Properties</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/manageUsers">

                                                Manage Users</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/manageReviews">

                                                Manage Reviews</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/advertiseProperties">

                                                Advertise Property</NavLink>
                                        </li>
                                    </>
                                )
                        ) :
                            (<>
                                <button className='btn glass text-white col-span-2 md:col-span-1' onClick={()=>navigate('/dashboard')}>
                                        My Profile
                                    </button>
                                <li>
                                    <NavLink to="/dashboard/wishlist">

                                        Wish List</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/propertyBought">

                                        Property Bought</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myReviews">

                                        My Reviews</NavLink>
                                </li>
                            </>)
                        // }

                    }
                </ul>
                    <div className="divider"></div>
                <ul className="grid grid-cols-2 md:grid-cols-1 menu p-4">
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/allProperties">
                            <FaSearch></FaSearch>
                            All Properties</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Dashboard