
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://source.unsplash.com/white-and-blue-glass-walled-high-rise-building-w3eFhqXjkZE)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-gray-100">
                <div className="max-w-xl ">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to E-Home</h1>
                    <p className="mb-5">Discover Your Dream Home with e-home</p>
                    <button className="btn btn-primary" onClick={()=>navigate('/allProperties')} >See Properties</button>
                </div>
            </div>
        </div>
    )
}

export default Banner