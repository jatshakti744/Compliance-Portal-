import React, { useState } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';

export default function CompanyProfile() {
  const [formData, setFormData] = useState({
    name: 'Alpha Research Pvt Ltd',
    sebiRegNo: 'INH000001234',
    address: 'Mumbai, Maharashtra',
    email: 'admin@alpharesearch.com',
    phone: '+91-9876543210'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Company Profile (Admin Setup)" />
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Organization Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Company Name</label>
            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">SEBI Registration No.</label>
            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.sebiRegNo} readOnly title="Cannot edit SEBI Reg No directly" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Registered Email</label>
            <input type="email" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Contact Number</label>
            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Registered Office Address</label>
            <textarea rows={3} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
          </div>
          
          <div className="flex justify-end pt-4">
            <button type="submit" className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 font-medium transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
