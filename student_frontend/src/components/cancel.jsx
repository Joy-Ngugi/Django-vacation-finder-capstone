function Cancel() {
    return (
        <div className="max-w-md mx-auto p-20 text-center rounded-lg shadow-lg bg-blue-100 text-green-700 my-20 ">
            <div className="max-w-md p-6 text-center rounded-lg shadow-lg bg-red-100">
                <h2 className="text-2xl font-bold text-red-700">Payment Cancelled ❌</h2>
                <p className="mt-2 text-lg text-gray-700">
                    Your payment was not completed. Please try again.
                </p>
            </div>
            
        </div>
    );
}

export default Cancel;

