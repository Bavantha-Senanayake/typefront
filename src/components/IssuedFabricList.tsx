import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchIssuedFabrics, addTypeToIssued } from '../store/slices/issuedSlice';
import type { IssuedFabric } from '../types/issued.types';

export const IssuedFabricList = () => {
  const dispatch = useAppDispatch();
  const { issuedFabrics, error } = useAppSelector((state) => state.issued);
  const [selectedFabric, setSelectedFabric] = useState<IssuedFabric | null>(null);
  const [fabricType, setFabricType] = useState('');

  useEffect(() => {
    dispatch(fetchIssuedFabrics());
  }, [dispatch]);

  const handleAddType = (fabric: IssuedFabric) => {
    setSelectedFabric(fabric);
    setFabricType(fabric.type || '');
  };

  const handleSubmitType = async () => {
    if (selectedFabric && fabricType.trim()) {
      await dispatch(addTypeToIssued({ 
        fabricName: selectedFabric.fabricName, 
        type: fabricType.trim() 
      }));
      setSelectedFabric(null);
      setFabricType('');
      dispatch(fetchIssuedFabrics());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Issued Fabrics</h2>
        <span className="ml-auto bg-blue-900 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {issuedFabrics.length} issued
        </span>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {issuedFabrics.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium">No issued fabrics</p>
            <p className="text-sm mt-1">Issue fabrics to see them here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-900 text-white border-b-2 border-blue-800">
                  <th className="px-4 py-3 text-left text-sm font-bold text-white">Fabric Name</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-white">Total Issued</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-white">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-white">Issued Date</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-white">Last Updated</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-white">Action</th>
                </tr>
              </thead>
              <tbody>
                {issuedFabrics.map((issued, index) => (
                  <tr 
                    key={index}
                    className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-4 font-semibold text-gray-800 capitalize">
                      {issued.fabricName}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        {issued.totalIssuedLength}m
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {issued.type ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          {issued.type}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm italic">Not assigned</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {new Date(issued.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {new Date(issued.updatedAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => handleAddType(issued)}
                        className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
                      >
                        {issued.type ? 'Update Type' : 'Add Type'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Update Type Modal */}
      {selectedFabric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {selectedFabric.type ? 'Update' : 'Add'} Type for {selectedFabric.fabricName}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fabric Type
                </label>
                <select
                  value={fabricType}
                  onChange={(e) => setFabricType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
                  <option value="">Select type...</option>
                  <option value="cutting">Cutting</option>
                  <option value="sewing">Sewing</option>
                  <option value="finishing">Finishing</option>
                  <option value="printing">Printing</option>
                  <option value="dyeing">Dyeing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmitType}
                  disabled={!fabricType.trim()}
                  className="flex-1 bg-blue-900 hover:bg-blue-800 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
                >
                  {selectedFabric.type ? 'Update' : 'Add'} Type
                </button>
                <button
                  onClick={() => setSelectedFabric(null)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
