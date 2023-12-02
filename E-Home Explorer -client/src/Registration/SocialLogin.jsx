import React from 'react'
import { useContext } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { AuthContext } from '../provider/AuthProvider'
import useAxiosPublic from '../hooks/useAxiosPublic'
import { useNavigate } from 'react-router-dom'

const SocialLogin = () => {
    const {googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result=>{
            console.log(result.user)
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                photoURL: result.user?.photoURL
            }
            axiosPublic.post('/users',userInfo)
            .then(res=>{
                console.log(res.data)
                navigate('/')
            })
        })
    }
  return (
    <div>
        <div>
            <button 
            onClick={handleGoogleSignIn}
            className='btn btn-secondary flex items-center'>
                <FaGoogle/>
                Login With Google
            </button>
        </div>
    </div>
  )
}

export default SocialLogin