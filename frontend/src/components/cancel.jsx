function Cancel() {
  return (
    <div className="max-w-md mx-auto my-20 px-4">
      <div className="bg-white rounded-2xl shadow-md border border-red-100 p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-6">
          <span className="text-3xl">❌</span>
        </div>
        <h2 className="text-2xl font-bold text-red-700 mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-600">
          Your payment was not completed. Please try again.
        </p>
      </div>
    </div>
  );
}

export default Cancel;