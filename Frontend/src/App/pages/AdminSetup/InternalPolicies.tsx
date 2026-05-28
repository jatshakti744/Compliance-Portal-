import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { adminService } from '../../Services/adminService';
import Alert from '../../components/ui/alert/Alert';

export default function InternalPolicies() {
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ variant: "success" | "error" | "warning", title: string, message: string } | null>(null);

  const showToast = (variant: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ variant, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const company = await adminService.getCompanyProfile();
        // Fallback to defaults if no policies configured yet
        setPolicies(company.policies?.length > 0 ? company.policies : [
          { title: 'Conflict of Interest Policy', content: 'Employees must declare all personal trades within 7 days. Front-running is strictly prohibited as per SEBI regulations.', lastUpdated: company.createdAt || new Date().toISOString() },
          { title: 'Client Grievance Redressal', content: 'All complaints must be registered on the SCORES portal and addressed within 21 days maximum.', lastUpdated: company.createdAt || new Date().toISOString() },
        ]);
      } catch (err: any) {
        showToast("error", "Error", "Failed to fetch policies.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Internal Policies" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">SEBI Mandated Policies</h2>
        <button onClick={() => showToast("warning", "Coming Soon", "PDF upload and dynamic policy editor will be available in the next release.")} className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20">
          + Upload New Policy
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((p, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{p.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 h-10 overflow-hidden">{p.content}</p>
              <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-100 dark:border-gray-800 mt-2">
                <span className="text-gray-500">Updated: {new Date(p.lastUpdated).toLocaleDateString()}</span>
                <button onClick={() => showToast("warning", "Coming Soon", "Policy Editor is currently disabled.")} className="text-brand-500 hover:text-brand-600 font-medium">Edit / View</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[999999] shadow-xl rounded-xl transition-all duration-300">
          <Alert variant={toast.variant as any} title={toast.title} message={toast.message} />
        </div>
      )}
    </div>
  );
}
