import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  data: any;
  prev: () => void;
}

const Step4Review: React.FC<Props> = ({ data, prev }) => {
  const { register, loading } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register(data);
      // Redirect handled by parent
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6">Review & Submit</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="mb-4">
        <div><b>Organization:</b> {data.orgName}</div>
        <div><b>Address:</b> {data.orgAddress}</div>
        <div><b>Phone:</b> {data.orgPhone}</div>
      </div>
      <div className="mb-4">
        <div><b>Admin Name:</b> {data.adminName}</div>
        <div><b>Admin Email:</b> {data.adminEmail}</div>
      </div>
      <div className="mb-4">
        <div><b>Subscription:</b> {data.subscriptionName || data.subscriptionId}</div>
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={prev} className="bg-gray-300 text-gray-700 py-2 px-4 rounded">Back</button>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" disabled={loading}>
          {loading ? 'Registering...' : 'Submit & Register'}
        </button>
      </div>
    </form>
  );
};

export default Step4Review; 