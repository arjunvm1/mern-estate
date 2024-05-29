import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const PayNow = ({ offer, _id, name, regularPrice, discountPrice, imageUrls }) => {
  const makePayment = async () => {
    try {
      const stripe = await loadStripe("pk_test_51PL0KmSH9zyCSmg8Y7BNcZ7Z36hlaXJP94PtHItT371ViB2uXxMLcTiEMtv7PGLIGGbah8U5uPWEX1sGEyHUNaDC00sADEvkno");
      
      const products = [{
        offer, 
        _id, 
        name, 
        regularPrice, 
        discountPrice, 
        imageUrls
      }];
      
      const response = await fetch('/api/stripe/checkout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button onClick={makePayment} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
      Make payment
    </button>
  );
};

export default PayNow;
