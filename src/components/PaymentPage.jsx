import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { addPatient } from '../services/BloodService';
import axios from 'axios';

const PaymentPage = ({ patients, setPatients }) => {
    const location = useLocation();
    const { patientDetails } = location.state;
    const [amount, setAmount] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [units, setUnits] = useState(1); // Start from 1 unit by default
    const navigate = useNavigate();
    const pname = patientDetails.name;
    const page = patientDetails.age;
    const pbloodGroup = patientDetails.bloodGroup;
    const pdoctor = patientDetails.doctor;
    const phospital = patientDetails.hospital;
    const [newPatient, setNewPatient] = useState({ name: pname, age: page, bloodGroup: pbloodGroup, doctor: pdoctor, hospital: phospital });

    const REST_URL = 'http://localhost:9000/api'
    const addPatient = (patient) => axios.post(REST_URL + '/patients', patient)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addPatient(newPatient);
            setPatients([...patients, response.data]);
            setNewPatient({ name: '', age: '', bloodGroup: '', doctor: '', hospital: '' })
        } catch (error) {
            console.error('Error adding patient:', error);
        }
        const paymentDetails = {
            amount,
            name,
            email,
            units,
            date: new Date().toLocaleString(),
        };
        // Pass payment details to receipt page
        navigate('/receipt', { state: { paymentDetails } });
    };

    useEffect(() => {
        setAmount(units * 1500);
    }, [units])

    const incrementUnits = () => {
        if (units < 8) { // Max 8 units restriction
            setUnits(prevUnits => prevUnits + 1);
        }
    };

    const decrementUnits = () => {
        if (units > 1) {
            setUnits(prevUnits => prevUnits - 1);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Payment Page</h1>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Units of Blood</label>
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={decrementUnits}
                            className="bg-blue-500 text-white font-bold py-1 px-2 rounded-l hover:bg-blue-600"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={units}
                            className="mt-1 p-2 w-full text-center border-t border-b border-gray-300"
                            readOnly
                        />
                        <button
                            type="button"
                            onClick={incrementUnits}
                            className="bg-blue-500 text-white font-bold py-1 px-2 rounded-r hover:bg-blue-600"
                        >
                            +
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Amount</label>
                    <div>Rs.{amount}</div>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                >
                    Pay Now
                </button>
            </form>
        </div>
    );
};

export default PaymentPage;
