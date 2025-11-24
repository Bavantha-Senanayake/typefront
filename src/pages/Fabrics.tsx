import { useState } from 'react';
import { FabricForm } from '../components/FabricForm';
import { FabricList } from '../components/FabricList';
import { IssuedFabricList } from '../components/IssuedFabricList';

type TabType = 'add' | 'inventory' | 'issued';

export const Fabrics = () => {
  const [activeTab, setActiveTab] = useState<TabType>('add');

  const menuItems = [
    {
      id: 'add' as TabType,
      label: 'Add Inventory',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'inventory' as TabType,
      label: 'Show Inventory',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'issued' as TabType,
      label: 'Issued Inventory',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
            Fabric Management Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your fabric inventory with ease
          </p>
        </div>

        {/* Dashboard Layout */}
        <div className="flex gap-6">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-8">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-blue-900 text-white shadow-md transform scale-105'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className={activeTab === item.id ? 'text-white' : 'text-gray-500'}>
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'add' && <FabricForm />}
            {activeTab === 'inventory' && <FabricList />}
            {activeTab === 'issued' && <IssuedFabricList />}
          </div>
        </div>
      </div>
    </div>
  );
};
