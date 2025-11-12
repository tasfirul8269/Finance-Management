import React, { useEffect, useState } from 'react';

interface Props {
  next: (data: any) => void;
  prev: () => void;
  defaultValues?: any;
}

const Step3Subscription: React.FC<Props> = ({ next, prev, defaultValues }) => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>(defaultValues?.subscriptionId || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/subscriptions')
      .then(res => res.json())
      .then(data => {
        setSubscriptions(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    next({ subscriptionId: selected });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6">Choose a Subscription</h2>
      {loading ? <div>Loading...</div> : (
        <div className="mb-6 grid grid-cols-1 gap-4">
          {subscriptions.map(sub => (
            <label key={sub._id} className={`border rounded p-4 flex items-center cursor-pointer ${selected === sub._id ? 'border-blue-600' : 'border-gray-300'}`}>
              <input
                type="radio"
                name="subscription"
                value={sub._id}
                checked={selected === sub._id}
                onChange={() => setSelected(sub._id)}
                className="mr-4"
                required
              />
              <div>
                <div className="font-bold">{sub.name} {sub.isFree && <span className="text-green-600">(Free)</span>}</div>
                <div className="text-sm text-gray-600">{sub.features?.join(', ')}</div>
                <div className="text-blue-600 font-semibold">{sub.isFree ? 'Free' : `$${sub.price}/mo`}</div>
              </div>
            </label>
          ))}
        </div>
      )}
      <div className="flex justify-between">
        <button type="button" onClick={prev} className="bg-gray-300 text-gray-700 py-2 px-4 rounded">Back</button>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700" disabled={!selected}>Next</button>
      </div>
    </form>
  );
};

export default Step3Subscription; 