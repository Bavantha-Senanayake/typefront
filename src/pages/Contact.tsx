export const Contact = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-6">Get in touch with us.</p>
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800">Email</h3>
            <p className="text-gray-600">contact@example.com</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Phone</h3>
            <p className="text-gray-600">(555) 123-4567</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Address</h3>
            <p className="text-gray-600">123 Main St, City, State 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
};