import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Banner from '../assets/banner-2.webp';
// import { createUser } from '../services/BloodService';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for validation errors
  const [errors, setErrors] = useState({});
  const REST_URL = 'http://localhost:9000/api/users'
 const createUser = (user) => axios.post(REST_URL + '/register', user)

 const validateName = (name, fieldName) => {
  let tempErrors = { ...errors };

  if (!name) {
    tempErrors[fieldName] = `${fieldName === 'firstName' ? 'First' : 'Last'} Name is required.`;
  } else if (/^[^a-zA-Z]/.test(name)) {
    tempErrors[fieldName] = `${fieldName === 'firstName' ? 'First' : 'Last'} Name cannot start with a number or special character.`;
  } else {
    delete tempErrors[fieldName];
  }

  setErrors(tempErrors);
};

 const validatePassword = (password) => {
  let tempErrors = { ...errors };

  if (!password) {
    tempErrors.password = "Password is required.";
  } else if (password.length < 6) {
    tempErrors.password = "Password must be at least 6 characters.";
  } else {
    delete tempErrors.password;
  }

  setErrors(tempErrors);
};

const validateConfirmPassword = (confirmPassword) => {
  let tempErrors = { ...errors };

  if (confirmPassword !== password) {
    tempErrors.confirmPassword = "Passwords do not match.";
  } else {
    delete tempErrors.confirmPassword;
  }

  setErrors(tempErrors);
};

const validateEmail = (email) => {
  let tempErrors = { ...errors };

  if (!email) {
    tempErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    tempErrors.email = "Email address is invalid.";
  } else {
    delete tempErrors.email;
  }

  setErrors(tempErrors);
};

  const validate = () => {
    let tempErrors = {};
    if (!firstName) tempErrors.firstName = "First Name is required.";
    else if (/^[^a-zA-Z]/.test(firstName)) tempErrors.firstName = "First Name cannot start with a number or special character.";
    if (!lastName) tempErrors.lastName = "Last Name is required.";
    else if (/^[^a-zA-Z]/.test(lastName)) tempErrors.lastName = "Last Name cannot start with a number or special character.";
    if (!email) tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Email address is invalid.";
    if (!password) tempErrors.password = "Password is required.";
    else if (password.length < 6) tempErrors.password = "Password must be at least 6 characters.";
    if (password !== confirmPassword) tempErrors.confirmPassword = "Passwords do not match.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const user = { firstName, lastName, email, password };

    try {
      await createUser(user);
      navigate('/login');
    } catch (error) {
      alert("User already registered, Please Login");
      console.error(error);
    }
  };

  return (
    <div  className="container mx-auto">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-custom">
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover"
            style={{ "backgroundImage": `url(${Banner})`, "backgroundPosition": "center", "backgroundSize": "cover", "backgroundRepeat": "no-repeat" }}
          ></div>
          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      validateName(e.target.value, 'firstName');
                    }}
                  />
                  {errors.firstName && <p className="text-xs italic text-red-500">{errors.firstName}</p>}
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      validateName(e.target.value, 'lastName');
                    }}
                  />
                  {errors.lastName && <p className="text-xs italic text-red-500">{errors.lastName}</p>}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);

                  }}
                />
                {errors.email && <p className="text-xs italic text-red-500">{errors.email}</p>}
              </div>
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                  />
                  {errors.password && <p className="text-xs italic text-red-500">{errors.password}</p>}
                </div>
                <div className="md:ml-2">
                  <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                    Confirm Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="c_password"
                    type="password"
                    placeholder="******************"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      validateConfirmPassword(e.target.value);
                    }}
                  />
                  {errors.confirmPassword && <p className="text-xs italic text-red-500">{errors.confirmPassword}</p>}
                </div>
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleRegister}
                >
                  Register Account
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <NavLink
                  to="/login" className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                >
                  Already have an account? Login!
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
