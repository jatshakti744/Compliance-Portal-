import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { adminService } from '../../Services/adminService';
import Alert from '../../components/ui/alert/Alert';

export default function CompanyProfile() {
  const [formData, setFormData] = useState({
    companyName: '',
    sebiRegNo: '',
    address: '',
    email: '',
    mobile: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ variant: "success" | "error" | "warning", title: string, message: string } | null>(null);

  const showToast = (variant: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ variant, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const company = await adminService.getCompanyProfile();
        setFormData({
          companyName: company.companyName || '',
          sebiRegNo: company.sebiRegNo || '',
          address: company.address || '',
          email: company.email || '',
          mobile: company.mobile || ''
        });
      } catch (err: any) {
        showToast("error", "Error", "Failed to fetch company profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminService.updateCompanyProfile(formData);
      showToast("success", "Profile Updated", "Your company details have been successfully updated.");
    } catch (err: any) {
      showToast("error", "Update Failed", err.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Company Profile (Admin Setup)" />
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Organization Details</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Company Name</label>
              <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">SEBI Registration No.</label>
              <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-gray-50 dark:bg-gray-800/50" required value={formData.sebiRegNo} readOnly title="Cannot edit SEBI Reg No directly. Contact support." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Registered Email</label>
              <input type="email" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Contact Number</label>
              <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Registered Office Address</label>
              <textarea rows={3} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
            </div>
            
            <div className="flex justify-end pt-4">
              <button type="submit" disabled={saving} className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 font-medium transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[999999] shadow-xl rounded-xl transition-all duration-300">
          <Alert variant={toast.variant as any} title={toast.title} message={toast.message} />
        </div>
      )}
    </div>
  );
}
