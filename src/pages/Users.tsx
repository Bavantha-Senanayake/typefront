import { UserForm } from '../components/UserForm.tsx';
import { UserDisplay } from '../components/UserDisplay.tsx';

export const Users = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">User Management</h1>
      <div className="max-w-2xl mx-auto space-y-6">
        <UserForm />
        <UserDisplay />
      </div>
    </div>
  );
};