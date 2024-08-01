import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import HomeImage from '../assets/home.jpg'
import { useAuth } from './AuthContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css'
import Footer from './Footer';
import Slide2 from '../assets/slide2.jpg'
import Slide3 from '../assets/slide3.png'
import Slide4 from '../assets/slide4.webp'

const HomePage = ({ admin, isAuthenticated }) => {
    const homeData = [
        {
            id: 1,
            image: "",
            heading: "",
            para: "",
            button: ""
        },
        {
            id: 2,
            image: "",
            heading: "",
            para: "",
            button: ""
        },
        {
            id: 3,
            image: "",
            heading: "",
            para: "",
            button: ""
        },
        {
            id: 4,
            image: "",
            heading: "",
            para: "",
            button: ""
        }
    ]
    const [data, setData] = useState(homeData)

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        arrows: false
    };
    const navigate = useNavigate();

    const { adminUser } = useAuth();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleDashboardClick = () => {
        navigate('/dashboard');
    };

    const handleAdminDashboardClick = () => {
        navigate('/admin-dashboard')
    }



    return (
        <div>
            <Slider className='rounded-lg' {...settings}>
                <div>
                    <img src="https://plasmagen.com/carousel/images/1.jpg" alt="Image 1" className="carousel-image" />
                </div>
                <div>
                    <img src={Slide2} alt="Image 2" className="carousel-image" />
                </div>
                <div>
                    <img src={Slide3} alt="Image 3" className="carousel-image" />
                </div>
                <div>
                    <img src={Slide4} alt="Image 4" className="carousel-image" />
                </div>
            </Slider>
            <div className="info-section bg-white p-8">
                <h1 className="text-4xl font-bold mb-4 text-center text-[#EE4E4E]">Blood Bank Management System</h1>
                <p className="text-lg mb-8 text-gray-700">
                    Blood banks are specialized facilities essential for collecting, processing, and distributing blood and its components to hospitals and healthcare centers. They ensure a safe and adequate blood supply for medical treatments, surgeries, emergencies, and patients with various conditions.
                    Blood donation, a voluntary act, involves individuals donating blood without monetary compensation, contributing to community health and lifesaving transfusion therapies. Donors undergo health screenings to ensure their blood is safe, with donations categorized into whole blood or specific components like plasma or platelets.
                    Blood donation drives promote community solidarity and educate the public on the critical need for regular donations to sustain blood supplies globally, thereby supporting public health and emergency response efforts.
                </p>

            </div>
                <div className='flex flex-wrap items-center justify-evenly' >
                <div className="w-[300px] h-[400px] mt-[50px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                        <NavLink to="/" className='flex items-center justify-center p-5' >
                            <img className="rounded-t-lg h-[70px] w-[70px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgRqUH2XBwACbszyH6MR1_qqseVys3K65GGA&s" alt="" />
                        </NavLink>
                        <div className="p-5">
                            <NavLink to="/">
                                <h5 className="text-[#EE4E4E] mb-2 text-2l font-bold tracking-tight text-gray-900 dark:text-white">Blood Management</h5>
                            </NavLink>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Blood management involves the effective and efficient use of blood and its components through techniques like patient blood management (PBM), reducing unnecessary transfusions, enhancing patient outcomes,
                             and optimizing blood resource utilization in healthcare settings.</p>
                            {/* <NavLink to="/"  className="bg-[#EE4E4E] inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </NavLink> */}
                        </div>
                    </div>
                    <div className="mt-[50px] w-[300px] h-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <NavLink to="/" className='flex items-center justify-center p-5' >
                            <img className="rounded-t-lg h-[70px] w-[70px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdO2DCDcfM7yDAtEo797CkSw_njibgz-lOgw&s" alt="" />
                        </NavLink>
                        <div className="p-5">
                            <NavLink to="/">
                                <h5 className="text-[#EE4E4E] mb-2 text-2l font-bold tracking-tight text-gray-900 dark:text-white">Donor Management</h5>
                            </NavLink>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Blood donor management involves recruiting, screening, and retaining donors,
                             ensuring the safety and adequacy of the blood supply, coordinating donation drives, and maintaining donor records to meet the ongoing needs of patients requiring transfusions.</p>
                            {/* <NavLink to="/" className="bg-[#EE4E4E] inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </NavLink> */}
                        </div>
                    </div>
                    <div className="mt-[50px] w-[300px] h-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <NavLink to="/" className='flex items-center justify-center p-5' >
                            <img className="rounded-t-lg h-[70px] w-[70px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDaEhIJwP71ZN_h_HjE5a4MnoTK9jEsOGuA&s" alt="" />
                        </NavLink>
                        <div className="p-5">
                            <NavLink to="/" >
                                <h5 className="text-[#EE4E4E] mb-2 text-2l font-bold tracking-tight text-gray-900 dark:text-white">User Management</h5>
                            </NavLink>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Blood bank application user management involves registering users, verifying donor eligibility, scheduling appointments,
                             tracking donations, managing user profiles, ensuring compliance with regulations, maintaining confidentiality, and 
                            enhancing donor and recipient experiences.</p>
                            {/* <NavLink to="/" className="bg-[#EE4E4E] inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </NavLink> */}
                        </div>
                    </div>
                    <div className="mt-[50px] w-[300px] h-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <NavLink to="/" className='flex items-center justify-center p-5' >
                            <img className="rounded-t-lg h-[70px] w-[70px]" src="https://media.istockphoto.com/id/951722588/vector/logout-icon-in-flat-style.jpg?b=1&s=170x170&k=20&c=YOQPNgqB4SRbIHmnV5DpyRknkEa-NwDbpS5p-2dXDoQ=" alt="" />
                        </NavLink>
                        <div className="p-5">
                            <NavLink to="/" >
                                <h5 className="text-[#EE4E4E] mb-2 text-2l font-bold tracking-tight text-gray-900 dark:text-white">Hospital Management</h5>
                            </NavLink>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            Blood bank hospital management involves coordinating blood collection, storage, and distribution, ensuring compliance with regulations, maintaining inventory, managing donor and recipient records,
                             and enhancing patient care through efficient blood resource utilization.</p>
                            {/* <NavLink to="/"  className="bg-[#EE4E4E] inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </NavLink> */}
                        </div>
                    </div>
                </div>
                    
            <div className='mt-[50px]' >
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
