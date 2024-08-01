import React, { useState } from 'react';
import { useNavigate, useSearchParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import Banner from '../assets/banner-2.webp';

const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:10000/api/reset/password', {
        token,
        newPassword,
      });

      if (response.status === 200) {
        setMessage('Password reset successfully!');
        navigate('/login');
      }
    } catch (error) {
      setMessage('Failed to reset password. Please try again.');
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
          <p className="text-xl text-gray-600 text-center">Reset Password</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              New Password
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-8">
            <button
              className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
              onClick={handlePasswordReset}
            >
              Reset Password
            </button>
          </div>
          {message && (
            <div className="mt-4 text-red-500 text-center">
              {message}
            </div>
          )}
          <div className="mt-4 flex items-center w-full text-center">
            <NavLink to="/login" className="text-xs text-gray-500 capitalize text-center w-full">
              Remembered your password?
              <span className="text-blue-700"> Login</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;