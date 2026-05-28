import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { researchService } from '../../Services/researchService';
import { fDate } from '../../utils/Date_format';
import Alert from '../../components/ui/alert/Alert';

export default function ManageCalls() {
  const [calls, setCalls] = useState<any[]>([]);
  const [toast, setToast] = useState<{ variant: "success" | "error" | "warning", title: string, message: string } | null>(null);

  const showToast = (variant: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ variant, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchCalls = async () => {
    try {
      const data = await researchService.getResearchCalls();
      setCalls(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      showToast("error", "Error", "Failed to fetch research calls.");
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Manage Research Calls" />
      
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mt-6">
        <table className="w-full whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
            <tr>
              <th className="px-6 py-4">Call Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Target Price</th>
              <th className="px-6 py-4">Date Published</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {calls.map((c: any) => (
              <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 font-medium dark:text-white">
                  {c.title}<br/>
                  <span className="text-xs text-gray-400 font-normal">Author: {c.author?.name || 'Admin'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${c.type === 'Buy' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>{c.type}</span>
                </td>
                <td className="px-6 py-4 font-medium">₹{c.targetPrice || '-'}</td>
                <td className="px-6 py-4">{fDate(c.createdAt)}</td>
                <td className="px-6 py-4 font-medium">
                  <span className={`px-2 py-1 rounded text-xs ${c.status === 'Published' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>{c.status}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => showToast("warning", "Coming Soon", "Status update feature will be available shortly.")} className="text-brand-500 hover:text-brand-600 mr-3 font-medium">Update</button>
                  <button onClick={() => showToast("warning", "Coming Soon", "Archive feature will be available shortly.")} className="text-gray-500 hover:text-gray-700 font-medium">Archive</button>
                </td>
              </tr>
            ))}
            {calls.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  No research calls published yet. Go to "Publish Call" to create your first recommendation.
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
