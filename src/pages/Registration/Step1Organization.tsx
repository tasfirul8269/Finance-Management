import React, { useState } from 'react';

interface Props {
  next: (data: any) => void;
  defaultValues?: any;
}

const Step1Organization: React.FC<Props> = ({ next, defaultValues }) => {
  const [name, setName] = useState(defaultValues?.orgName || '');
  const [address, setAddress] = useState(defaultValues?.orgAddress || '');
  const [phone, setPhone] = useState(defaultValues?.orgPhone || '');
  const [logo, setLogo] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    next({ orgName: name, orgAddress: address, orgPhone: phone, orgLogo: logo });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6">Organization Information</h2>
      <div className="mb-4">
        <label className="block mb-1">Organization Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border px-3 py-2 rounded" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Address</label>
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full border px-3 py-2 rounded" />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Phone</label>
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border px-3 py-2 rounded" />
      </div>
      <div className="mb-6">
        <label className="block mb-1">Logo (optional)</label>
        <input type="file" accept="image/*" onChange={e => setLogo(e.target.files?.[0] || null)} />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Next</button>
    </form>
  );
};

export default Step1Organization; 