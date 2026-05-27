import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';

export default function OnboardingKYC() {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', pan: '', aadhaar: '', kraStatus: 'Pending' });

  useEffect(() => {
    setClients([
      { _id: '1', name: 'Ramesh Singh', email: 'ramesh@test.com', pan: 'ABCDE1234F', aadhaar: '123456789012', kycStatus: 'Verified', kraStatus: 'Verified' },
      { _id: '2', name: 'Suresh Kumar', email: 'suresh@test.com', pan: 'VWXYZ9876Q', aadhaar: '987654321098', kycStatus: 'Pending', kraStatus: 'Pending' },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClients([...clients, { ...formData, _id: Date.now().toString(), kycStatus: 'Pending' }]);
    setShowForm(false);
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Client Onboarding & KYC" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Manage Clients</h2>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600">
          {showForm ? 'Cancel' : '+ Onboard Client'}
        </button>
      </div>

      {showForm && (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl mb-6 border border-gray-200 dark:border-gray-800">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1 dark:text-gray-300">Name</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label><input type="email" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1 dark:text-gray-300">PAN Card</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white uppercase" maxLength={10} required value={formData.pan} onChange={e => setFormData({...formData, pan: e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1 dark:text-gray-300">Aadhaar</label><input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" maxLength={12} required value={formData.aadhaar} onChange={e => setFormData({...formData, aadhaar: e.target.value})} /></div>
            <div className="col-span-2 flex justify-end">
              <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">Submit to KRA & Save</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
            <tr>
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">PAN</th>
              <th className="px-6 py-4">Aadhaar</th>
              <th className="px-6 py-4">KYC Status</th>
              <th className="px-6 py-4">KRA Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {clients.map((c: any) => (
              <tr key={c._id}>
                <td className="px-6 py-4 font-medium dark:text-white">{c.name}<br/><span className="text-xs text-gray-400">{c.email}</span></td>
                <td className="px-6 py-4">{c.pan}</td>
                <td className="px-6 py-4">XXXX-XXXX-{c.aadhaar.slice(-4) || 'XXXX'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${c.kycStatus === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{c.kycStatus}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${c.kraStatus === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{c.kraStatus}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-500 hover:text-brand-600 text-sm font-medium">Verify Manually</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
