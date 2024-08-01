


import React, { useState, useEffect } from 'react';
// import { getPatients, deletePatient, getDonors, deleteDonor, getRequests, delRequest, addDonor } from '../services/BloodService'; // Import your service to fetch data
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [newDonor, setNewDonor] = useState({ name: '', bloodType: '', contact: '', city: '' });
  const [view, setView] = useState('requests'); // State to toggle between views
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  const REST_URL = 'http://localhost:9000/api/users'
  const REST_URL_DONOR = 'http://localhost:9000/api'
 const getPatients = () => {
    return axios.get(REST_URL_DONOR + '/patients');
  };

 const deletePatient = (id) => {
    return axios.delete(REST_URL_DONOR + `/patient/${id}`)
  }

  const getDonors = async () => {
    return await axios.get(REST_URL_DONOR + '/donors');
  };
  const deleteDonor = (id) => {
    return axios.delete(REST_URL_DONOR + `/donor/${id}`)
  }
  const addDonor = (donor) => {
    return axios.post(REST_URL_DONOR + '/donors', donor);
  };
 const getRequests = async () => axios.get(REST_URL_DONOR + '/requests')
 const delRequest = (id) => axios.delete(REST_URL_DONOR + `/requests/${id}`)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    const fetchDonors = async () => {
      try {
        const response = await getDonors();
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching donors:', error);
      }
    };

    const fetchRequests = async () => {
      try {
        const response = await getRequests();
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchPatients();
    fetchDonors();
    fetchRequests();
  }, []);

  const handleDeletePatient = async (id) => {
    try {
      await deletePatient(id);
      setPatients(patients.filter(patient => patient.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleDeleteDonor = async (id) => {
    try {
      await deleteDonor(id);
      setDonors(donors.filter(donor => donor.id !== id));
    } catch (error) {
      console.error('Error deleting donor:', error);
    }
  };

  const handleAddDonor = async (request) => {
    try {
      const response = await addDonor({
        name: request.name,
        bloodType: request.bloodType,
        contact: request.contact,
        city: request.city
      });
      await delRequest(request.id);
      setRequests(requests.filter(r => r.id !== request.id));
      setDonors([...donors, response.data]);
      setNewDonor({ name: '', bloodType: '', contact: '', city: '' });
    } catch (error) {
      console.error('Error adding donor:', error);
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      await delRequest(id);
      setRequests(requests.filter(request => request.id !== id));
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  const handleShowDeleteModal = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      if (itemToDelete.type === 'patient') {
        await handleDeletePatient(itemToDelete.id);
      } else if (itemToDelete.type === 'donor') {
        await handleDeleteDonor(itemToDelete.id);
      } else if (itemToDelete.type === 'request') {
        await handleDeleteRequest(itemToDelete.id);
      }
    }
    setShowDeleteModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <aside className="w-full md:w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <nav>
          <button
            onClick={() => setView('requests')}
            className={`w-full text-left px-4 py-2 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none ${view === 'requests' ? 'bg-gray-700' : ''}`}
          >
            Donor Requests
          </button>
          <button
            onClick={() => setView('patients')}
            className={`w-full text-left px-4 py-2 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none ${view === 'patients' ? 'bg-gray-700' : ''}`}
          >
            Patient List
          </button>
          <button
            onClick={() => setView('donors')}
            className={`w-full text-left px-4 py-2 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none ${view === 'donors' ? 'bg-gray-700' : ''}`}
          >
            Donor List
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {view === 'patients' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">List of Patients</h2>
            {patients.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                {patients.map(patient => (
                  <div key={patient.id} className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105">
                    <h3 className="text-xl font-bold mb-4">{patient.name}</h3>
                    <p className="mb-2 mt-2"><strong>Age:</strong> {patient.age}</p>
                    <p className="mb-2 mt-2"><strong>Blood Group:</strong> {patient.bloodGroup}</p>
                    <p className="mb-2 mt-2"><strong>Doctor:</strong> {patient.doctor}</p>
                    <p className="mb-2 mt-2"><strong>Hospital:</strong> {patient.hospital}</p>
                    <button
                      type="button"
                      onClick={() => handleShowDeleteModal({ type: 'patient', id: patient.id })}
                      className="inline-block mt-4 rounded bg-red-600 px-4 py-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No patients found.</p>
            )}
          </div>
        )}
        {view === 'donors' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">List of Donors</h2>
            {donors.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                {donors.map(donor => (
                  <div key={donor.id} className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105">
                    <h3 className="text-xl font-bold mb-4">{donor.name}</h3>
                    <p className="mb-2 mt-2"><strong>Blood Type:</strong> {donor.bloodType}</p>
                    <p className="mb-2 mt-2"><strong>Contact:</strong> {donor.contact}</p>
                    <p className="mb-2 mt-2"><strong>City:</strong> {donor.city}</p>
                    <button
                      type="button"
                      onClick={() => handleShowDeleteModal({ type: 'donor', id: donor.id })}
                      className="inline-block mt-4 rounded bg-red-600 px-4 py-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No donors found.</p>
            )}
          </div>
        )}
        {view === 'requests' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Donor Requests</h2>
            {requests.length ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                {requests.map(request => (
                  <div key={request.id} className="bg-white p-6 rounded-lg shadow-lg transition transform hover:scale-105">
                    <h3 className="text-xl font-bold mb-4">{request.name}</h3>
                    <p className="mb-2 mt-2"><strong>Blood Type:</strong> {request.bloodType}</p>
                    <p className="mb-2 mt-2"><strong>Contact:</strong> {request.contact}</p>
                    <p className="mb-2 mt-2"><strong>City:</strong> {request.city}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        type="button"
                        onClick={() => handleAddDonor(request)}
                        className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mr-4"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => handleShowDeleteModal({ type: 'request', id: request.id })}
                        className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-red-700 focus:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No donor requests found.</p>
            )}
          </div>
        )}
      </main>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <p className="text-xl font-bold mb-4">Confirm Deletion</p>
            <p>Are you sure you want to delete this?</p>
            <div className="mt-4">
              <button
                onClick={() => handleConfirmDelete()}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md mr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;