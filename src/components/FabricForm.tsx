import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { createFabric } from '../store/slices/fabricSlice';

export const FabricForm = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [length, setLength] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createFabric({ 
      name, 
      length: parseFloat(length)
    }));
    setName('');
    setLength('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Add New Fabric</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Fabric Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Cotton, Silk, Wool"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Length (meters)
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="e.g., 100"
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent transition"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
        >
          Add Fabric
        </button>
      </form>
    </div>
  );
};
