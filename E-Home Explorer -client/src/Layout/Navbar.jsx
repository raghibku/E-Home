

import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom"
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {

  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut()
      .then()
      .catch()
  }

  const navlinks = <>
    <li><NavLink to='/'>Home</NavLink> </li>
    <li><NavLink to='/allProperties'>All Properties</NavLink> </li>
    <li><NavLink to='/dashboard'>Dashboard</NavLink> </li>
    

  </>
  return (
    <div className='w-full flex justify-center items-center '>
      <div className="navbar flex justify-between  bg-primary w-full px-4 lg:px-12">
        <div className="navbar-start w-min md:w-full" >
          <div className="flex justify-center items-center gap-3">
            <h1 className="text-gray-200 hidden lg:flex text-3xl font-serif font-extrabold">E-Home</h1>
            <img className="hidden lg:flex" src="/logos/icons8-home-64.png" alt="" />

          </div>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden ">

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navlinks}
            </ul>
          </div>

        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-4 mx-4 gap-4 text-white">
            {navlinks}
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