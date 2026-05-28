import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { adminService } from '../../Services/adminService';
import Alert from '../../components/ui/alert/Alert';

export default function StaffRoles() {
  const [staff, setStaff] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Staff', nismCertificateNumber: '', nismExpiryDate: '' });
  const [toast, setToast] = useState<{ variant: "success" | "error" | "warning", title: string, message: string } | null>(null);

  const showToast = (variant: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ variant, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchStaff = async () => {
    try {
      const data = await adminService.getStaffList();
      setStaff(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      showToast("error", "Error", "Failed to fetch staff members.");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminService.createStaff(formData);
      showToast("success", "Staff Created", `${formData.name} has been added as a ${formData.role}.`);
      setShowForm(false);
      setFormData({ name: '', email: '', role: 'Staff', nismCertificateNumber: '', nismExpiryDate: '' });
      fetchStaff();
    } catch (err: any) {
      showToast("error", "Action Failed", err.message || "Could not create staff.");
    } finally {
      setLoading(false);
    }
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
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl mb-6 border border-gray-200 dark:border-gray-800 shadow-sm animate-fade-in">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Name</label>
              <input type="text" className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Rahul Sharma" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Email</label>
              <input type="email" className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="rahul@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Role</label>
              <select className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option>Principal Officer</option>
                <option>Compliance Officer</option>
                <option>Researcher</option>
                <option>Staff</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">NISM Cert No.</label>
              <input type="text" className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" required value={formData.nismCertificateNumber} onChange={e => setFormData({...formData, nismCertificateNumber: e.target.value})} placeholder="NISM-XXXXXX" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">NISM Expiry Date</label>
              <input type="date" className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" required value={formData.nismExpiryDate} onChange={e => setFormData({...formData, nismExpiryDate: e.target.value})} />
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-end mt-2">
              <button type="submit" disabled={loading} className="px-6 py-2.5 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Staff & Credentials'}
              </button>
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
              <tr key={s._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 font-medium dark:text-white">{s.name}</td>
                <td className="px-6 py-4">{s.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    s.role === 'Principal Officer' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' :
                    s.role === 'Compliance Officer' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' :
                    s.role === 'Researcher' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>{s.role}</span>
                </td>
                <td className="px-6 py-4">{s.nismCertificateNumber || '-'}</td>
                <td className="px-6 py-4">
                  {s.nismExpiryDate ? (
                    new Date(s.nismExpiryDate) < new Date() ? 
                      <span className="text-red-500 font-medium bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded">Expired: {new Date(s.nismExpiryDate).toLocaleDateString()}</span> : 
                      <span className="text-green-600 dark:text-green-400 font-medium">{new Date(s.nismExpiryDate).toLocaleDateString()}</span>
                  ) : '-'}
                </td>
              </tr>
            ))}
            {staff.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No staff members found. Click "+ Add Staff" to add your team.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[999999] shadow-xl rounded-xl transition-all duration-300">
          <Alert variant={toast.variant as any} title={toast.title} message={toast.message} />
        </div>
      )}
    </div>
  );
}
