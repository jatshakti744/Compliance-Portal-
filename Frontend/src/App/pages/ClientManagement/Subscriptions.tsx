import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { adminService } from '../../Services/adminService';
import Alert from '../../components/ui/alert/Alert';

export default function Subscriptions() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ variant: "success" | "error" | "warning", title: string, message: string } | null>(null);

  const showToast = (variant: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ variant, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await adminService.getClientList();
        setClients(Array.isArray(data) ? data : []);
      } catch (err: any) {
        showToast("error", "Error", "Failed to fetch clients.");
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Client Subscriptions & Payments" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Active Subscriptions</h2>
        <button onClick={() => showToast("warning", "Coming Soon", "Payment Gateway integration is pending.")} className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20">
          + Record Manual Payment
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
            <tr>
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">Plan Name</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Expiry Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8"><div className="inline-block w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div></td></tr>
            ) : clients.map((c: any) => {
              // Mocking subscription data based on client creation date for now
              const isActive = c.subscriptionActive !== false; // Assuming true by default if not set
              const expiryDate = new Date(c.createdAt);
              expiryDate.setFullYear(expiryDate.getFullYear() + 1);

              return (
                <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium dark:text-white">{c.user?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-300">Annual Advisory Plan</td>
                  <td className="px-6 py-4">₹15,000</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
                      {isActive ? 'Active' : 'Expired'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{expiryDate.toLocaleDateString()}</td>
                </tr>
              )
            })}
            {!loading && clients.length === 0 && (
              <tr><td colSpan={5} className="text-center py-8 text-gray-500">No active client subscriptions.</td></tr>
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
