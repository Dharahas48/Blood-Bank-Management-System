// import React, { useState } from 'react';
// import axios from 'axios';

// const PatientInfo = () => {
//   const [patientName, setPatientName] = useState('');
//   const [hospitalName, setHospitalName] = useState('');
//   const [doctorName, setDoctorName] = useState('');

//   const handlePatientInfo = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/patient-info', { patientName, hospitalName, doctorName });
//       console.log('Patient information saved:', response.data);
//     } catch (error) {
//       console.error('Error saving patient information:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form onSubmit={handlePatientInfo} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//         <h2 className="text-xl mb-4">Patient Information</h2>
//         <div className="mb-4">
//           <label className="block mb-1" htmlFor="patientName">Patient Name</label>
//           <input
//             type="text"
//             id="patientName"
//             value={patientName}
//             onChange={(e) => setPatientName(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1" htmlFor="hospitalName">Hospital Name</label>
//           <input
//             type="text"
//             id="hospitalName"
//             value={hospitalName}
//             onChange={(e) => setHospitalName(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1" htmlFor="doctorName">Doctor Name</label>
//           <input
//             type="text"
//             id="doctorName"
//             value={doctorName}
//             onChange={(e) => setDoctorName(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded"
//             required
//           />
//         </div>
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Save Information</button>
//       </form>
//     </div>
//   );
// };

// export default PatientInfo;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { addPatient } from '../services/BloodService';
import axios from 'axios';

const PatientInfo = ({patients, setPatients}) => {
  const [newPatient, setNewPatient] = useState({ name: '', age: '', bloodGroup: '', doctor: '', hospital: '' });
  // const [patients, setPatients] = useState([])
  const [patientForm, setPatientForm] = useState(true)
  const navigate = useNavigate();

  const REST_URL = 'http://localhost:9000/api/users'
  const addPatient = (patient) => axios.post(REST_URL + '/patients', patient)


  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const response = await addPatient(newPatient);
    //   setPatients([...patients, response.data]);
    //   setNewPatient({ name: '', age: '', bloodGroup: '', doctor: '', hospital: '' })
    //   setPatientForm(false)
    //   navigate('/dashboard');
    // } catch (error) {
    //   console.error('Error adding patient:', error);
    // }
    try {
      console.log(newPatient)
      const name = newPatient.name;
      const age = newPatient.age;
      const bloodGroup = newPatient.bloodGroup;
      const doctor = newPatient.doctor;
      const hospital = newPatient.hospital;
      const patientDetails = {
        name,
        age,
        bloodGroup,
        doctor,
        hospital
      }
      navigate("/payment", { state: { patientDetails } })
    } catch(error){
      console.error(error)
    }

  };

  return (
    <div className={`p-4 ${patientForm ? 'block' : 'hidden'}`}>
      <h2 className="text-xl mb-4">Patient Info</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Patient Name</label>
          <input
            type="text"
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Age</label>
          <input
            type="number"
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Blood Type</label>
          <input
            type="text"
            value={newPatient.bloodGroup}
            onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}
            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Doctor name</label>
          <input
            type="text"
            value={newPatient.doctor}
            onChange={(e) => setNewPatient({ ...newPatient, doctor: e.target.value })}
            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Hospital</label>
          <input
            type="text"
            value={newPatient.hospital}
            onChange={(e) => setNewPatient({ ...newPatient, hospital: e.target.value })}
            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full"
            required
          />
        </div>
        {/* <button type="submit" className="bg-green-700 text-white font-bold py-2 px-4 rounded mr-[50px]">Add Patient</button> */}
        <button type="submit" className="bg-green-700 text-white font-bold py-2 px-4 rounded mr-[50px]">Pay </button>
        <button onClick={() => navigate('/dashboard')} className="bg-red-500 text-white font-bold py-2 px-4 rounded">cancel</button>
      </form>
    </div>
  );
};

export default PatientInfo;