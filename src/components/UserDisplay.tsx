import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { fetchUser, clearUser } from '../store/slices/userSlice.ts';

export const UserDisplay = () => {
  const dispatch = useAppDispatch();
  const { currentUser, error } = useAppSelector((state) => state.user);
  const [userId, setUserId] = useState('');

  const handleFetch = () => {
    if (userId.trim()) {
      dispatch(fetchUser(userId));
    }
  };

  const handleClear = () => {
    dispatch(clearUser());
    setUserId('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-400">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fetch User</h2>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <button 
          onClick={handleFetch} 
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Fetch User
        </button>
        <button 
          onClick={handleClear} 
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Clear
        </button>
      </div>

      {error && <p className="text-red-600 font-medium">Error: {error}</p>}
      {currentUser && (
        <div className="bg-blue-900 text-white p-5 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-3">User Details:</h3>
          <p className="mb-2"><strong className="font-semibold">ID:</strong> {currentUser.id}</p>
          <p className="mb-2"><strong className="font-semibold">First Name:</strong> {currentUser.firstname}</p>
          <p><strong className="font-semibold">Age:</strong> {currentUser.age}</p>
        </div>
      )}
    </div>
  );
};
