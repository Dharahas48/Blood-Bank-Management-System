
import React, { useState } from 'react';
// import { resetPasswordRequest } from '../services/BloodService'; // Import the service function
import Banner from '../assets/banner-2.webp';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const REST_URL_EMAIL = 'http://localhost:9000/api';

  const resetPasswordRequest = (email) => {
    return axios.post(REST_URL_EMAIL + '/send-password/reset-email', { email });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPasswordRequest(email);
      if (response.status === 200) {
        setMessage('Password reset email sent. Check your email for instructions.');
      } else {
        setError('Failed to send reset email. Please try again later.');
      }
    } catch (error) {
      setError('Failed to send reset email. Please try again later.');
      console.error('Error sending reset email:', error);
    }
  };


  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full h-[500px]">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{ backgroundImage: `url(${Banner})` }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">Forgot Password</p>
          <form onSubmit={handleResetPassword}>
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
            <div className="mt-8">
            <button
                className="bg-blue-500 rounded-full text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-700"
                type="submit"
              >
                Send Reset Email
              </button>
            </div>
            {message && (
              <div className="mt-4 text-green-500 text-center">
                {message}
              </div>
            )}
            {error && (
              <div className="mt-4 text-red-500 text-center">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;