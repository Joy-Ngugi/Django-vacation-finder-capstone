import { useEffect, useState } from "react";
import { useStripe, CardElement } from "@stripe/react-stripe-js";

function Checkout({ bookingData }) {
  const [sessionId, setSessionId] = useState(null);
  const stripe = useStripe();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/create-checkout-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setSessionId(data.sessionId));
  }, []);

  const handlePayment = async () => {
    if (!stripe || !sessionId) return;
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) console.error(error);
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white rounded-2xl shadow-md border border-blue-100 p-6">
      <h2 className="text-xl font-bold mb-1">Booking Payment</h2>
      {bookingData && (
        <p className="text-sm text-gray-500 mb-6">
          {bookingData.first_name} {bookingData.last_name}
        </p>
      )}

      <div className="border border-blue-200 rounded-lg p-4 bg-white mb-6">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#1f2937',
                '::placeholder': { color: '#9ca3af' },
              },
              invalid: { color: '#dc2626' },
            },
          }}
        />
      </div>

      <button
        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePayment}
        disabled={!sessionId}
      >
        {sessionId ? 'Make Payment' : 'Loading...'}
      </button>
    </div>
  );
}

export default Checkout;