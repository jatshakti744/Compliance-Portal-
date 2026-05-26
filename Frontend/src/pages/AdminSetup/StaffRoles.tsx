import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';

export default function StaffRoles() {
  const [staff, setStaff] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Staff', nismCertificateNumber: '', nismExpiryDate: '' });

  // Mock fetch
  useEffect(() => {
    // Ideally: fetch('/api/users/company/some-id')
    setStaff([
      { _id: '1', name: 'Rahul Sharma', email: 'rahul@alpha.com', role: 'Principal Officer', nismCertificateNumber: 'NISM-123', nismExpiryDate: '2027-10-12' },
      { _id: '2', name: 'Priya Verma', email: 'priya@alpha.com', role: 'Compliance Officer', nismCertificateNumber: 'NISM-456', nismExpiryDate: '2026-08-01' },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStaff([...staff, { ...formData, _id: Date.now().toString() }]);
    setShowForm(false);
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Staff & Roles Management" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin: Manage Staff & NISM</h2>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600">
          {showForm ? 'Cancel' : '+ Add Staff'}
        </button>
      </div>

      {showForm && (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl mb-6 border border-gray-200 dark:border-gray-800">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Name</label>
              <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Email</label>
              <input type="email" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Role</label>
              <select className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option>Principal Officer</option>
                <option>Compliance Officer</option>
                <option>Researcher</option>
                <option>Staff</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">NISM Cert No.</label>
              <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.nismCertificateNumber} onChange={e => setFormData({...formData, nismCertificateNumber: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">NISM Expiry Date</label>
              <input type="date" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.nismExpiryDate} onChange={e => setFormData({...formData, nismExpiryDate: e.target.value})} />
            </div>
            <div className="col-span-2 flex justify-end">
              <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">NISM No.</th>
              <th className="px-6 py-4">Expiry Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {staff.map((s: any) => (
              <tr key={s._id}>
                <td className="px-6 py-4 font-medium dark:text-white">{s.name}</td>
                <td className="px-6 py-4">{s.email}</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{s.role}</span></td>
                <td className="px-6 py-4">{s.nismCertificateNumber}</td>
                <td className="px-6 py-4 text-red-500 font-medium">{s.nismExpiryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
