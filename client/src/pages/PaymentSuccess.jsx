import React from 'react'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
  return (
    <>
       <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-12 text-center">
        <svg
          className="w-16 h-16 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your transaction has been completed successfully.
        </p>
        <Link to={'/'}>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
          Return Home
        </button>
        </Link>
      </div>
    </div>
    </>
  )
}

export default PaymentSuccess