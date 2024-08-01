import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext for authentication
import Login from './Login';

const AdminLogin = ({setAdmin, setIsAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const { adminLogin } = useAuth(); // Assuming you have an adminLogin function in your AuthContext
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(email==="hari@gmail.com" && password==="hari@4"){
            adminLogin({firstName: "Hari", lastName: "Meesala", email: "hari@gmail.com", password: "hari@4"})
            setIsAuthenticated(true)
            setAdmin(true)
            navigate('/admin-dashboard');
        }
        else{
            setError(true)
            console.log("Invalid Admin credentials")
        }
    } catch (error) {
      console.error('Admin login failed:', error);
    }
  };

  return (
    <div style={{backgroundImage: "url('https://sdamedicalcentreblr.com/wp-content/uploads/2023/05/Blood-donation.jpg')", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}} className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white  p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {error && <p className='text-[#C80036] text-[16px] text-center w-full' >Invalid credentials</p>}
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
