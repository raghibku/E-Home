import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";
const NavBarA = () => {
    const [nav, setNav] = useState(false);
    const navlinks = <>
        <li><NavLink to='/'>Home</NavLink> </li>
        <li><NavLink to='/allProperties'>All Properties</NavLink> </li>
        {/* <li><NavLink to='/dashboard'>Dashboard</NavLink> </li> */}
    </>
    const userNavlinks = <>
        {
            currentUser?.role ? (
                currentUser.role === 'agent' || currentUser.role === 'fraud' ? (
                    <>

                        <li >
                            <NavLink to="/dashboard">
                                My Profile</NavLink>
                        </li>
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
                            <li >
                                <NavLink to="/dashboard">
                                    My Profile</NavLink>
                            </li>
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
                    <li >
                        <NavLink to="/dashboard">
                            My Profile</NavLink>
                    </li>
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
    </>


    return (
        <div className='bg-black w-full h-20 flex justify-between items-center'>
            <div className="left text-white ml-8">
                <h1 className='text-4xl font-signature'>Raghib Shahriar</h1>
            </div>
            <div className="right mr-4">

                {/* <ul className="hidden md:flex justify-between items-center">

                    <li className='px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-110 duration-100'><a href="">Home</a></li>
                    <li className='px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-110 duration-100'><a href="">About</a></li>
                    <li className='px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-110 duration-100'><a href="">Portfolio</a></li>
                    <li className='px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-110 duration-100'><a href="">Experience</a></li>
                    <li className='px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-110 duration-200'><a href="">Contact</a></li>
                </ul> */}
                <ul className="hidden md:flex">
                    {navlinks}
                    {userNavlinks}
                </ul>
            </div>
            <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden">
                {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
            </div>
            {nav &&
                (<ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
                    {/* {links.map(({ id, link }) => (
                        <li
                            key={id}
                            className="px-4 cursor-pointer capitalize py-6 text-4xl"
                        >
                            <Link
                                onClick={() => setNav(!nav)}
                                to={link}
                                smooth
                                duration={500}
                            >
                                {link}
                            </Link>
                        </li>
                    ))} */}
                    {navlinks}
                    {userNavlinks}
                </ul>)
            }
        </div>


    )
}

export default NavBarA