import { createBrowserRouter } from "react-router-dom";
import AllProperties from "../Home/AllProperties";
import Home from "../Home/Home";
import Layout from "../Layout/Layout";
import NotFound from "../Other/NotFound";
import Dashboard from "../Dashboard/Dashboard";
import MyProfile from "../Dashboard/MyProfile";
import WishList from "../Dashboard/RegularUser/WishList";
import PropertyBought from "../Dashboard/RegularUser/PropertyBought";
import MyReviews from "../Dashboard/RegularUser/MyReviews";
import Login from "../Registration/Login";
import SignUp from "../Registration/SignUp";
import PropertyDetails from "../Other/PropertyDetails";
import { axiosSecure } from "../hooks/useAxiosSecure";
import OfferFormPage from "../Other/OfferFormPage";
import AddProperty from "../Dashboard/Agent/AddProperty";
import MyAddedProperties from "../Dashboard/Agent/MyAddedProperties";
import MySoldProperties from "../Dashboard/Agent/MySoldProperties";
import RequestedProperties from "../Dashboard/Agent/RequestedProperties";
import ManageProperties from "../Dashboard/Admin/ManageProperties";
import ManageUsers from "../Dashboard/Admin/ManageUsers";
import ManageReviews from "../Dashboard/Admin/ManageReviews";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";
import AgentRoute from "./AgentRoute";
import Payment from "../Dashboard/RegularUser/Payment";
import Update from "../Dashboard/Agent/Update";
import AdvertiseProperty from "../Dashboard/Admin/AdvertiseProperty"

export const routes = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path:'/',
                element:<Home/>
            },
            {
                path: '/allProperties',
                element: <PrivateRoutes><AllProperties/></PrivateRoutes>
            },
            {
                path: '/propertyDetails/:id',
                element: <PrivateRoutes><PropertyDetails/></PrivateRoutes> ,
                loader: ({params})=>fetch(`https://e-home-explorer-server.vercel.app/properties/${params.id}`)
                
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <SignUp/>
                
            }
        ]

    },
    {
        path:'/dashboard',
        element: <PrivateRoutes><Dashboard/></PrivateRoutes>,
        children: [
            {
                path: '/dashboard/',
                element: <MyProfile/>
            },
            {
                path: '/dashboard/wishlist',
                element: <WishList/>
            },
            {
                path: '/dashboard/offer/:id',
                element: <OfferFormPage/>,
                loader: ({params})=>fetch(`https://e-home-explorer-server.vercel.app/properties/${params.id}`)
            },
            {
                path: '/dashboard/propertyBought',
                element: <PropertyBought/>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment/>
            },
            {
                path: '/dashboard/myReviews',
                element: <MyReviews/>
            },
            {
                path: '/dashboard/addProperty',
                element: <AgentRoute><AddProperty/></AgentRoute>
            },
            {
                path: '/dashboard/myAddedProperties',
                element: <AgentRoute><MyAddedProperties/></AgentRoute>
            },
            {
                path: '/dashboard/updateProperty/:id',
                element: <AgentRoute><Update/></AgentRoute>,
                loader: ({params})=>fetch(`https://e-home-explorer-server.vercel.app/properties/${params.id}`)
            },
            {
                path: '/dashboard/mySoldProperties',
                element: <AgentRoute><MySoldProperties/></AgentRoute>
            },
            {
                path: '/dashboard/requestedProperties',
                element: <AgentRoute><RequestedProperties/></AgentRoute>
            },
            {
                path: '/dashboard/manageProperties',
                element: <AdminRoute><ManageProperties/></AdminRoute> 
            },
            {
                path: '/dashboard/advertiseProperties',
                element: <AdminRoute><AdvertiseProperty/></AdminRoute> 
            },
            {
                path: '/dashboard/manageUsers',
                element: <AdminRoute><ManageUsers/></AdminRoute>
            },
            {
                path: '/dashboard/manageReviews',
                element: <AdminRoute><ManageReviews/></AdminRoute>
            },
        ]
    }
])