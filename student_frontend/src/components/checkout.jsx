import { useEffect, useState } from "react";
import { useStripe,  CardElement } from "@stripe/react-stripe-js";

function Checkout({bookingData}) {
    const [sessionId, setSessionId] = useState(null);
    const stripe = useStripe();
    // const elements = useElements();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/create-checkout-session/", {
            method: "POST",
            headers: {"Content-Type": "application/json"}
    })
            .then(res => res.json())
            .then(data => setSessionId(data.sessionId));
    }, []);

    const handlePayment = async () => {
        if (!stripe || !sessionId) return;
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) console.error(error);
    };

    return (
        <div className="m-8">
            {/* <h2>Booking Payment</h2> */}
            {/* <p className="mb-2">Booking for: {bookingData.first_name} {bookingData.last_name}</p>
            <p className="mb-4">Email: {bookingData.email}</p> */}
            <CardElement />
            <button className="bg-blue-600 text-white mt-8 p-2 border rounded-lg hover:bg-blue-700" onClick={handlePayment} disabled={!sessionId}>
                Make Payment
            </button>
        </div>
    );
}

export default Checkout;
