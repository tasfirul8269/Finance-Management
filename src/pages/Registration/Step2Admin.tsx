import React, { useState } from 'react';

interface Props {
  next: (data: any) => void;
  prev: () => void;
  defaultValues?: any;
}

const Step2Admin: React.FC<Props> = ({ next, prev, defaultValues }) => {
  const [name, setName] = useState(defaultValues?.adminName || '');
  const [email, setEmail] = useState(defaultValues?.adminEmail || '');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    next({ adminName: name, adminEmail: email, adminPassword: password });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6">Admin Information</h2>
      <div className="mb-4">
        <label className="block mb-1">Full Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border px-3 py-2 rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border px-3 py-2 rounded" required />
      </div>
      <div className="mb-6">
        <label className="block mb-1">Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" required />
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={prev} className="bg-gray-300 text-gray-700 py-2 px-4 rounded">Back</button>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Next</button>
      </div>
    </form>
  );
};

export default Step2Admin; 