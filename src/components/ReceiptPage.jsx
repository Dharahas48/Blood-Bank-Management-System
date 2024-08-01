// ReceiptPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const ReceiptPage = () => {
    const location = useLocation();
    const { paymentDetails } = location.state;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-3xl font-bold mb-6">Payment Receipt</h1>
                <div className="mb-4">
                    <strong>Name:</strong> {paymentDetails.name}
                </div>
                <div className="mb-4">
                    <strong>Email:</strong> {paymentDetails.email}
                </div>
                <div className="mb-4">
                    <strong>Number of units blood: </strong> {paymentDetails.units}
                </div>
                <div className="mb-4">
                    <strong>Amount:</strong> Rs. {paymentDetails.amount}/-
                </div>
                <div className="mb-4">
                    <strong>Date:</strong> {paymentDetails.date}
                </div>
                <button
                    onClick={() => window.print()}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
                >
                    Print Receipt
                </button>
            </div>
        </div>
    );
};

export default ReceiptPage;
