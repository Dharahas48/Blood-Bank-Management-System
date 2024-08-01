import React from 'react'

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-red-600 mb-6 text-center">About Blood Bank Management System</h1>
          <p className="text-gray-700 mb-8 leading-relaxed text-center">
            The Blood Bank Management System is designed to efficiently manage blood donation and transfusion services. It helps in maintaining a database of donors, managing blood inventory, tracking blood requests, and facilitating blood transfusion services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-red-600 mb-4">Purpose</h2>
              <p className="text-gray-700 mb-6">
                The primary purpose of the Blood Bank Management System is to ensure a reliable and efficient process for blood donation and transfusion. It aims to streamline the management of donor information, blood inventory, and recipient details to ensure that blood is available when needed.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-red-600 mb-4">Features</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Donor Registration and Management</li>
                <li>Blood Inventory Management</li>
                <li>Blood Request and Allocation</li>
                <li>Compatibility Checking for Blood Transfusion</li>
                <li>Donation and Transfusion Records</li>
                <li>Reporting and Analytics</li>
                <li>Secure Login for Admin and Users</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-semibold text-red-600 mb-4">Benefits</h2>
          <ul className="list-disc list-inside text-gray-700 mb-8 space-y-2">
            <li>Efficient Management of Blood Donation Process</li>
            <li>Accurate and Up-to-date Donor and Blood Inventory Records</li>
            <li>Timely Fulfillment of Blood Requests</li>
            <li>Reduced Risk of Transfusion Errors</li>
            <li>Enhanced Reporting and Analytics for Better Decision Making</li>
            <li>Improved Security and Privacy of Donor Information</li>
          </ul>

          <h2 className="text-3xl font-semibold text-red-600 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-6">
            For more information about the Blood Bank Management System, please contact us at:
          </p>
          <p className="text-gray-700 mb-6">
            Email: <a href="mailto:support@bloodbank.com" className="text-red-600 underline">support@bloodbank.com</a>
          </p>
          <p className="text-gray-700">
            Phone: <a href="tel:+1234567890" className="text-red-600 underline">+1 (234) 567-890</a>
          </p>
        </div>
      </div>
    </div>
  )
}
