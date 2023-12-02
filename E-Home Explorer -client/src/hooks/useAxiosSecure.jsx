import axios from 'axios'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider';

export const axiosSecure = axios.create({
    baseURL: 'https://e-home-explorer-server.vercel.app'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext)
    //request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        // console.log('request hit by interceptor')
        config.headers.authorization = `Bearer ${token}`
        return config;
    },function(error){
        return Promise.reject(error)
    }
    )
    
    axiosSecure.interceptors.response.use(
        function(response){
            
        return response;
    },async (error)=>{
        const status= error.response.status
        console.log('status error in the interceptor',status)
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login')
        }
        return Promise.reject(error);
    })
    return axiosSecure;
}



export default useAxiosSecure