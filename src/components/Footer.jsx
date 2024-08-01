import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <h4 className="text-xl font-bold mb-2">Blood Bank Management System</h4>
          <p>© 2024 All Rights Reserved</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" className="text-white hover:text-gray-400" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" className="text-white hover:text-gray-400" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" className="text-white hover:text-gray-400" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
