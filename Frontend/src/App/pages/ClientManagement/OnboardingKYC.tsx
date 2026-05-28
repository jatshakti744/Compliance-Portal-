import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { adminService } from '../../Services/adminService';
import Alert from '../../components/ui/alert/Alert';

export default function OnboardingKYC() {
  const [clients, setClients] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', pan: '', aadhaar: '' });
  const [toast, setToast] = useState<{ variant: "success" | "error" | "warning", title: string, message: string } | null>(null);

  const showToast = (variant: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ variant, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchClients = async () => {
    try {
      const data = await adminService.getClientList();
      setClients(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      showToast("error", "Error", "Failed to fetch clients.");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminService.createClient(formData);
      showToast("success", "Client Created", "Client has been onboarded and account credentials generated.");
      setShowForm(false);
      setFormData({ name: '', email: '', phone: '', pan: '', aadhaar: '' });
      fetchClients();
    } catch (err: any) {
      showToast("error", "Action Failed", err.message || "Could not onboard client.");
    } finally {
      setLoading(false);
    }
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
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl mb-6 border border-gray-200 dark:border-gray-800 shadow-sm animate-fade-in">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div><label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Full Name</label><input type="text" className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Rahul Kumar" /></div>
            <div><label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Email Address</label><input type="email" className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="rahul@example.com" /></div>
            <div><label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Phone Number</label><input type="tel" className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="9876543210" /></div>
            <div><label className="block text-sm font-medium mb-1.5 dark:text-gray-300">PAN Card</label><input type="text" className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white uppercase focus:ring-2 focus:ring-brand-500 outline-none" maxLength={10} required value={formData.pan} onChange={e => setFormData({...formData, pan: e.target.value})} placeholder="ABCDE1234F" /></div>
            <div><label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Aadhaar Number</label><input type="text" className="w-full p-2.5 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none" maxLength={12} required value={formData.aadhaar} onChange={e => setFormData({...formData, aadhaar: e.target.value})} placeholder="123456789012" /></div>
            <div className="col-span-1 md:col-span-2 flex justify-end mt-2">
              <button type="submit" disabled={loading} className="px-6 py-2.5 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50">
                {loading ? 'Creating...' : 'Submit to KRA & Save Client'}
              </button>
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
              <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4 font-medium dark:text-white">
                  {c.user?.name || c.name || 'N/A'}<br/>
                  <span className="text-xs text-gray-400 font-normal">{c.user?.email || c.email || 'No email'}</span>
                </td>
                <td className="px-6 py-4">{c.pan}</td>
                <td className="px-6 py-4">XXXX-XXXX-{c.aadhaar ? c.aadhaar.slice(-4) : 'XXXX'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${c.kycStatus === 'Verified' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'}`}>{c.kycStatus}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${c.kraStatus === 'Verified' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400'}`}>{c.kraStatus}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => showToast("warning", "Coming Soon", "Manual verification will be integrated with KRA API.")} className="text-brand-500 hover:text-brand-600 text-sm font-medium">Verify Manually</button>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No clients found. Click "+ Onboard Client" to add your first client.
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
