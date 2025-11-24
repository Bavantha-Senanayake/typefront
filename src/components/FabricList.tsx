import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchFabrics, deleteFabric, updateFabric, issueFabric } from '../store/slices/fabricSlice';
import { fetchIssuedFabrics } from '../store/slices/issuedSlice';
import type { Fabric } from '../types/fabric.types';

export const FabricList = () => {
  const dispatch = useAppDispatch();
  const { fabrics, error } = useAppSelector((state) => state.fabric);
  const [editingFabric, setEditingFabric] = useState<Fabric | null>(null);
  const [editLength, setEditLength] = useState('');
  const [issuingFabric, setIssuingFabric] = useState<Fabric | null>(null);
  const [issueLength, setIssueLength] = useState('');

  useEffect(() => {
    dispatch(fetchFabrics());
  }, [dispatch]);

  const handleDelete = async (name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      await dispatch(deleteFabric(name));
      dispatch(fetchFabrics());
    }
  };

  const handleEdit = (fabric: Fabric) => {
    setEditingFabric(fabric);
    setEditLength(fabric.length.toString());
  };

  const handleUpdate = async () => {
    if (editingFabric) {
      await dispatch(updateFabric({ 
        name: editingFabric.name, 
        data: { length: parseFloat(editLength) } 
      }));
      setEditingFabric(null);
      setEditLength('');
      dispatch(fetchFabrics());
    }
  };

  const handleIssue = (fabric: Fabric) => {
    setIssuingFabric(fabric);
    setIssueLength('');
  };

  const handleIssueSubmit = async () => {
    if (issuingFabric) {
      await dispatch(issueFabric({ 
        name: issuingFabric.name, 
        length: parseFloat(issueLength) 
      }));
      setIssuingFabric(null);
      setIssueLength('');
      dispatch(fetchFabrics());
      dispatch(fetchIssuedFabrics());
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Fabric Inventory</h2>
        <span className="ml-auto bg-blue-900 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {fabrics.length} items
        </span>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {fabrics.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-lg font-medium">No fabrics in inventory</p>
            <p className="text-sm mt-1">Add your first fabric to get started</p>
          </div>
        ) : (
          fabrics.map((fabric) => (
            <div 
              key={fabric.name} 
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 capitalize mb-1">
                    {fabric.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                      <strong>{fabric.length}m</strong>
                    </span>
                    <span className="text-xs text-gray-400">
                      Updated: {new Date(fabric.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleIssue(fabric)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
                  >
                    Issue
                  </button>
                  <button
                    onClick={() => handleEdit(fabric)}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(fabric.name)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingFabric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Update {editingFabric.name}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Length (meters)
                </label>
                <input
                  type="number"
                  value={editLength}
                  onChange={(e) => setEditLength(e.target.value)}
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditingFabric(null)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Issue Modal */}
      {issuingFabric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Issue {issuingFabric.name}</h3>
            <div className="bg-blue-900/10 border border-blue-900/30 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-900 font-semibold">
                <strong>Available:</strong> {issuingFabric.length}m
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Length to Issue (meters)
                </label>
                <input
                  type="number"
                  value={issueLength}
                  onChange={(e) => setIssueLength(e.target.value)}
                  step="0.01"
                  min="0"
                  max={issuingFabric.length}
                  placeholder="Enter length to issue"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleIssueSubmit}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Issue Fabric
                </button>
                <button
                  onClick={() => setIssuingFabric(null)}
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
