import { useAppSelector } from '../store/hooks';

export const GlobalLoader = () => {
  const { loading } = useAppSelector((state) => state.user);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 flex items-center space-x-4 shadow-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    </div>
  );
};