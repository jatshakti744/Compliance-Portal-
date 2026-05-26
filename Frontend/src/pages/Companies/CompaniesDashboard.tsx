import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';

export default function CompaniesDashboard() {
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ companyName: '', sebiRegNo: '', email: '', mobile: '', address: '', validity: '' });

  const fetchCompanies = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/companies');
      const data = await res.json();
      setCompanies(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setShowForm(false);
        setFormData({ companyName: '', sebiRegNo: '', email: '', mobile: '', address: '', validity: '' });
        fetchCompanies();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await fetch(`http://localhost:5000/api/companies/${id}`, { method: 'DELETE' });
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Companies (Super Admin)" />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Registered RA Entities</h2>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">
          {showForm ? 'Cancel' : '+ Add New Company'}
        </button>
      </div>

      {showForm && (
        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl mb-6 border border-gray-200 dark:border-gray-800">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm mb-1">Company Name</label><input required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} /></div>
            <div><label className="block text-sm mb-1">SEBI Reg No.</label><input required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.sebiRegNo} onChange={e => setFormData({...formData, sebiRegNo: e.target.value})} /></div>
            <div><label className="block text-sm mb-1">Email</label><input required type="email" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></div>
            <div><label className="block text-sm mb-1">Mobile</label><input required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} /></div>
            <div><label className="block text-sm mb-1">Validity Date</label><input required type="date" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.validity} onChange={e => setFormData({...formData, validity: e.target.value})} /></div>
            <div><label className="block text-sm mb-1">Address</label><input required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} /></div>
            <div className="col-span-2 text-right">
              <button type="submit" className="px-6 py-2 bg-green-500 text-white rounded">Save Company</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
              <tr>
                <th className="px-6 py-4 font-semibold">Company Name</th>
                <th className="px-6 py-4 font-semibold">SEBI Reg No.</th>
                <th className="px-6 py-4 font-semibold">Validity</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {companies.map((company: any) => (
                <tr key={company._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{company.companyName}</td>
                  <td className="px-6 py-4">{company.sebiRegNo}</td>
                  <td className="px-6 py-4">{new Date(company.validity).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(company._id)} className="text-red-500 hover:text-red-600 font-medium">Delete</button>
                  </td>
                </tr>
              ))}
              {companies.length === 0 && <tr><td colSpan={4} className="text-center py-4">No companies found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
