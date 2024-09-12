

import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const Navbar = () => {

  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then()
      .catch()
  }

  const { data: currentUser = [] } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      console.log(user.email)
      console.log(res.data)
      return res.data;
    }
  })

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
                          Agent DashBoard</NavLink>
                      </li>
{/*                       
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
                      </li> */}
                    </>
                  )
                    :
                    (
                      <>
                        <li >
                          <NavLink to="/dashboard">
                            Admin Dashboard</NavLink>
                        </li>
                        {/* <li>
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
                        </li> */}
                      </>
                    )
                ) :
                  (<>
                    <li >
                      <NavLink to="/dashboard">
                        My Dashboard</NavLink>
                    </li>
                    {/* <li>
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
                    </li> */}
                  </>)
                // }

              }
  </>
  return (
    <div className='w-full flex justify-center items-center '>
      <div className="navbar flex justify-between  bg-neutral w-full px-4 lg:px-12">
        <div className="navbar-start w-min md:w-full" >
          <div className="flex justify-center items-center ">
            <img className="hidden h-14 lg:flex" src="/logos/EH12.png"  alt="" />
            <h1 className="hidden lg:flex text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-400">EHome</h1>
            

          </div>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden ">

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navlinks}
              {userNavlinks}
            </ul>
          </div>

        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-4 mx-4 gap-4 text-white">
            {navlinks}
            {userNavlinks}
          </ul>
        </div>
        <div className="navbar-end flex justify-center items-center w-fit  md:w-full text-white gap-2">

          {
            user ?
              <div className="flex justify-between gap-2 items-center">
                <img src={user?.photoURL} className=' md:flex rounded-full h-10 w-10' alt="" />
                <h1 className='text-xs lg:text-2xl font-semibold w-min md:w-fit'>{user?.displayName}</h1>

                <button onClick={handleLogOut} className="btn">Log out</button>
              </div> :
              <div className="flex justify-between items-center">

                <Link to='/login'>
                  <button className="btn ">Login</button>
                </Link>

              </div>
          }
        </div>
      </div>
    </div>

  )
}

export default Navbar