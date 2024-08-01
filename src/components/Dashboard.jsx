


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getDonors, addDonor, getPatients, addRequest } from '../services/BloodService';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from "axios"



const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [newRequest, setNewRequest] = useState({ name: '', bloodType: '', contact: '', city: '' });
  const [requests, setRequests] = useState([])
  const [donors, setDonors] = useState([])
  const [showAddDonorForm, setShowAddDonorForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonors = async () => {
      console.log("hello")
      try {
        const response = await getDonors();
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchDonors();
    fetchPatients();
  }, []);

  const REST_URL = 'http://localhost:9000/api/users'
  const REST_URL_DONOR = 'http://localhost:9000/api'

 const getDonors = async () => {
    return await axios.get(REST_URL_DONOR + '/donors');
  };

 const addDonor = (donor) => {
    return axios.post(REST_URL_DONOR + '/donors', donor);
  };
  const getPatients = () => {
    return axios.get(REST_URL_DONOR + '/patients');
  };

 const addRequest = (request) => axios.post(REST_URL_DONOR + '/requests', request)



  const donorColumnDefs = [
    { headerName: 'Name', field: 'name', sortable: true, filter: true, editable: true },
    { headerName: 'Blood Type', field: 'bloodType', sortable: true, filter: true, editable: true },
    { headerName: 'Contact', field: 'contact', sortable: true, filter: true, editable: true },
    { headerName: 'City', field: 'city', sortable: true, filter: true, editable: true },
    
  ];

  const patientColumnDefs = [
    { headerName: 'Patient Name', field: 'name', sortable: true, filter: true, editable: true },
    { headerName: 'Age', field: 'age', sortable: true, filter: true, editable: true },
    { headerName: 'Blood Group', field: 'bloodGroup', sortable: true, filter: true, editable: true },
    { headerName: 'Doctor', field: 'doctor', sortable: true, filter: true, editable: true },
    { headerName: 'Hospital', field: 'hospital', sortable: true, filter: true, editable: true },
  ];

  // const handleAddDonor = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await addDonor(newDonor);
  //     setDonors([...donors, response.data]);
  //     setNewDonor({ name: '', bloodType: '', contact: '', city: '' });
  //     setShowAddDonorForm(!showAddDonorForm)
  //   } catch (error) {
  //     console.error('Error adding donor:', error);
  //   }
  // };

  const handleAddRequest = async (e) => {
    e.preventDefault();
    try {
      console.log(newRequest)
      const response = await addRequest(newRequest)
      setRequests([...requests, response.data]);
      setNewRequest({ name: '', bloodType: '', contact: '', city: '' });
      setShowAddDonorForm(!showAddDonorForm)
    } catch (error) {
      console.error('Error adding donor:', error);
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      {/* Button to Show Add Donor Form */}
      <div className="mb-4 text-center">
        <button
          onClick={() => setShowAddDonorForm(!showAddDonorForm)}
          className="bg-[#EE4E4E] text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {showAddDonorForm ? 'Hide Add Donor Form' : 'Become a Donor'}
        </button>
      </div>

      {/* Add Donor Form */}
      <div className={`bg-white shadow-lg rounded-lg mb-8 overflow-hidden ${showAddDonorForm ? 'block' : 'hidden'}`}>
        <h2 className="text-2xl p-4 bg-gray-800 text-white">Add New Donor</h2>
        <form className="p-4" onSubmit={handleAddRequest}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={newRequest.name}
              onChange={(e) => setNewRequest({ ...newRequest, name: e.target.value })}
              className="border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Blood Type</label>
            <input
              type="text"
              value={newRequest.bloodType}
              onChange={(e) => setNewRequest({ ...newRequest, bloodType: e.target.value })}
              className="border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Contact</label>
            <input
              type="text"
              value={newRequest.contact}
              onChange={(e) => setNewRequest({ ...newRequest, contact: e.target.value })}
              className="border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
            <input
              type="text"
              value={newRequest.city}
              onChange={(e) => setNewRequest({ ...newRequest, city: e.target.value })}
              className="border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Add Donor
          </button>
        </form>
      </div>

      {/* List of Blood Donors */}
      <div className="bg-white shadow-lg rounded-lg mb-8 overflow-hidden">
        <h2 className="text-2xl p-4 bg-gray-800 text-white">List of Blood Donors</h2>
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
          <AgGridReact
            columnDefs={donorColumnDefs}
            rowData={donors}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={{ sortable: true, filter: true, editable: true }}
            rowSelection="single"
          />
        </div>
      </div>

      {/* List of Patients */}
      <div className="bg-white shadow-lg rounded-lg mb-8 overflow-hidden">
        <h2 className="text-2xl p-4 bg-gray-800 text-white">List of Patients</h2>
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
          <AgGridReact
            columnDefs={patientColumnDefs}
            rowData={patients}
            pagination={true}
            paginationPageSize={10}
            defaultColDef={{ sortable: true, filter: true, editable: true }}
            rowSelection="single"
          />
        </div>
      </div>

      {/* Button to Add Patient Info */}
      <div className="text-center">
        <button onClick={() => navigate('/patient-info')} className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400">
          Add Patient Information
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
