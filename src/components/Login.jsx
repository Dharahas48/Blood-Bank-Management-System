

// import React, { useState } from "react";
// import { NavLink, useNavigate } from 'react-router-dom';
// import Banner from '../assets/banner-2.webp';
// import { getUser } from "../services/BloodService";
// import { useAuth } from './AuthContext';

// const Login = () => {
//   const [lemail, setLemail] = useState('');
//   const [lpassword, setLpassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState(''); // State for error message
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const user = { email: lemail, password: lpassword };
//     try {
//       const response = await getUser(user);
//       if (response.status === 200) {
//         login(response.data);
//         setErrorMessage(''); // Clear error message on successful login
//         navigate('/dashboard');
//       } else {
//         setErrorMessage('Invalid credentials'); // Set error message on failure
//         console.error('Login failed', response.statusText);
//       }
//     } catch (error) {
//       setErrorMessage('Invalid credentials'); // Set error message on error
//       console.error('Error logging in:', error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
//       <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full h-[500px]">
//         <div
//           className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
//           style={{ backgroundImage: `url(${Banner})` }}
//         ></div>
//         <div className="w-full p-8 lg:w-1/2">
        
//           <p className="text-xl text-gray-600 text-center">Welcome back!</p>
//           {errorMessage && (
//             <div className="mt-4 text-center">
//               <span className="text-red-500">{errorMessage}</span>
//             </div>
//           )}
//           <div className="mt-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
//             <input
//               className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
//               type="email"
//               onChange={(e) => setLemail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mt-4 flex flex-col justify-between">
//             <div className="flex justify-between">
//               <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//             </div>
//             <input
//               className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
//               type="password"
//               onChange={(e) => setLpassword(e.target.value)}
//             />
//             <a
//               href="#"
//               className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
//             >
//               Forget Password?
//             </a>
//           </div>
//           <div className="mt-8">
//             <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600" onClick={handleLogin}>
//               Login
//             </button>
//           </div>
          
//           <div className="mt-4 flex items-center w-full text-center">
//             <NavLink to="/register" className="text-xs text-gray-500 capitalize text-center w-full">
//               Don&apos;t have any account yet?
//               <span className="text-blue-700"> Sign Up</span>
//             </NavLink>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
// import { getUser } from '../services/BloodService';
import { useAuth } from './AuthContext';
import Banner from '../assets/banner-2.webp';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const REST_URL = 'http://localhost:9000/api/users'
 const getUser = (user) => axios.post(REST_URL + '/login', user )

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const response = await getUser(user);
      if (response.status === 200) {
        login(response.data); // Assuming login function sets user data in context
        setIsAuthenticated(true);

        // Determine role and navigate accordingly
        if (response.data.role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setErrorMessage('Invalid credentials');
        console.error('Login failed', response.statusText);
      }
    } catch (error) {
      setErrorMessage('Invalid credentials');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div style={{backgroundImage: "url('https://sdamedicalcentreblr.com/wp-content/uploads/2023/05/Blood-donation.jpg')", backgroundPosition: "center", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white bg-opacity-40 rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full h-[500px]">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(${Banner})`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <NavLink
              to="/forgot-password"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </NavLink>
          </div>
          <div className="mt-8">
            <button className="bg-blue-500 rounded-full text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-700" onClick={handleLogin}>
              Login
            </button>
          </div>
          {errorMessage && (
            <div className="mt-4 text-red-500 text-center">
              {errorMessage}
            </div>
          )}
          <div className="mt-4 flex items-center w-full text-center">
            <NavLink to="/register"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <span className="text-blue-500 hover:text-gray-900"> Sign Up</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
