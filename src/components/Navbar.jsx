import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";
import BloodDrop from '../assets/bloodDrop.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout, adminUser, adminLogout } = useAuth();
  const [activeItem, setActiveItem] = useState('Home');
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const items = [
    { id: 1, names: "Home", path: "/" },
    { id: 2, names: "About us", path: "/about" },
    // { id: 3, names: "Payment", path: "/payment" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    adminLogout();
    navigate('/');
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#EE4E4E] border-gray-200 dark:bg-gray-900 shadow-custom">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={BloodDrop} className="h-8 rounded" alt="Blood Bank Logo" />
          <span className="text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BLOOD BANK</span>
        </a>
        <div className="bg-[#EE4E4E] flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {(user || adminUser) && (
            <>
              <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded={isDropdownOpen} onClick={toggleDropdown}>
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9p_svIjwA810BURgFBTU0V6fNjiU9MRbUXQ&s" alt="User Photo" />
              </button>
              <div ref={dropdownRef} className={`z-50 ${isDropdownOpen ? 'block' : 'hidden'} absolute top-[40px] right-[40px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                <div className="px-4 py-3">
                  {adminUser ? (
                    <>
                      <span className="block text-sm text-black-900 dark:text-white">Admin</span>
                      <span className="block text-sm text-gray-900 dark:text-white">{adminUser.firstName + " " + adminUser.lastName}</span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{adminUser.email}</span>
                    </>
                  ) : (
                    <>
                      <span className="block text-sm text-gray-900 dark:text-white">{user.firstName + " " + user.lastName}</span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
                    </>
                  )}
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  {adminUser ? (
                    <li>
                      <NavLink to="/admin-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</NavLink>
                    </li>
                  ) : (
                    <li>
                      <NavLink to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</NavLink>
                    </li>
                  )}
                  <li>
                    <NavLink to="/" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</NavLink>
                  </li>
                </ul>
              </div>
            </>
          )}
          <button onClick={toggleMenu} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded={isOpen}>
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            )}
          </button>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`} id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {items.map((item) => (
              <li key={item.id}>
                <NavLink to={item.path}
                  className={`text-white block py-2 px-3 rounded md:p-0 ${activeItem === item.names ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 hover:text-black md:dark:hover:bg-transparent'}`}
                  aria-current={activeItem === item.names ? 'page' : undefined}
                  onClick={() => handleItemClick(item.names)}
                >
                  {item.names}
                </NavLink>
              </li>
            ))}
            {!user && !adminUser && (
              <>
                {/* <NavLink to="/admin-login"
                  className={`text-white block py-2 px-3 rounded md:p-0 ${activeItem === "Admin" ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}
                  aria-current={activeItem === "Admin" ? 'page' : undefined}
                  onClick={() => handleItemClick("Admin")}
                >
                  Admin
                </NavLink> */}
                <NavLink to="/login"
                  className={`text-white block py-2 px-3 rounded md:p-0 ${activeItem === "Login" ? 'text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500' : 'text-gray-900 hover:bg-gray-100 hover:text-black md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}
                  aria-current={activeItem === "Login" ? 'page' : undefined}
                  onClick={() => handleItemClick("Login")}
                >
                  Login
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
