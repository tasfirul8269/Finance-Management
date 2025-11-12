import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SuperAdminDashboard: React.FC = () => {
  const { user, token } = useAuth();
  const [orgs, setOrgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'super_admin') {
      navigate('/login');
      return;
    }
    fetch('/api/organizations', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setOrgs(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch organizations');
        setLoading(false);
      });
  }, [user, token, navigate]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Organizations</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Subscription</th>
            <th className="p-2 border">Admins</th>
            <th className="p-2 border">Created</th>
          </tr>
        </thead>
        <tbody>
          {orgs.map(org => (
            <tr key={org._id} className="border-b">
              <td className="p-2 border">{org.name}</td>
              <td className="p-2 border">{org.subscription?.name || 'N/A'}</td>
              <td className="p-2 border">{org.admins?.map((a: any) => a.name).join(', ')}</td>
              <td className="p-2 border">{new Date(org.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminDashboard; 