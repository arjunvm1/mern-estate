import React from 'react'

function PaymentFailure() {
  return (
    <>
       <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-12 text-center">
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          We encountered an issue processing your payment. Please try again.
        </p>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
          Retry Payment
        </button>
      </div>
    </div>
    </>
  )
}

export default PaymentFailure