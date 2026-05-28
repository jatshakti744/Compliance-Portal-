import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { adminService } from '../../Services/adminService';
import Alert from '../../components/ui/alert/Alert';

export default function Agreements() {
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
      <PageBreadcrumb pageTitle="Client Agreements & eSign" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Agreements Tracker</h2>
        <button onClick={() => showToast("warning", "Coming Soon", "Bulk Send eSign will be available in the next release.")} className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20">
          Send New Agreement
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
            <tr>
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">Agreement Type</th>
              <th className="px-6 py-4">Date Sent</th>
              <th className="px-6 py-4">eSign Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8"><div className="inline-block w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div></td></tr>
            ) : clients.map((c: any) => {
              const isSigned = c.kycStatus === 'Verified';
              return (
                <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium dark:text-white">{c.user?.name || 'Unknown'}</td>
                  <td className="px-6 py-4">Research Subscription Agreement</td>
                  <td className="px-6 py-4">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${isSigned ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400'}`}>
                      {isSigned ? 'Signed' : 'Pending eSign'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {isSigned ? (
                      <button onClick={() => showToast("warning", "Coming Soon", "PDF Download will be available shortly.")} className="text-brand-500 hover:text-brand-600 font-medium">Download PDF</button>
                    ) : (
                      <button onClick={() => showToast("success", "Sent", `Agreement link resent to ${c.user?.email}`)} className="text-orange-500 hover:text-orange-600 font-medium">Resend Link</button>
                    )}
                  </td>
                </tr>
              )
            })}
            {!loading && clients.length === 0 && (
              <tr><td colSpan={5} className="text-center py-8 text-gray-500">No clients onboarded yet.</td></tr>
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
