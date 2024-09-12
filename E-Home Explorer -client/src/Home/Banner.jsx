
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate();
    return (
        
        <div className='flex justify-center items-center bg-gradient-to-r from-blue-400 to-pink-400 h-screen '>
            <div className='flex flex-col md:flex-row  justify-center items-center min-w-min gap-4 my-8 md:gap-10'>
                <div className='flex flex-col justify-center items-center text-white'>
                    <h1 className='text-4xl md:text-6xl font-bold font-serif text-center mt-10'>Welcome to <br /> E-Home</h1>
                    <img className="mask mask-squircle h-[300px] md:hidden " src="/images/BannerImage.jpg"/>

                    <p className="mb-5">Discover Your Dream Home with E-Home</p>
                    <button className="btn btn-secondary text-white mb-10" onClick={()=>navigate('/allProperties')} >See Properties</button>
                </div>
                <div className=''>
                <img className="mask mask-squircle md:h-[600px] hidden md:flex" src="/images/BannerImage.jpg"/>

                </div>
            </div>
        </div>
    )
}

export default Banner