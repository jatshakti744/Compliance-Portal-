import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { clientService } from "../../Services/clientService";
import { superAdminService } from "../../Services/superAdminService";
import { adminService } from "../../Services/adminService";
import DataTable from "../../components/common/DataTable";

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  
  const userCookie = getCookie("user");
  const user = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;
  const isSuperAdmin = user?.role === 'Super Admin';
  const isAdmin = user?.role === 'Admin';

  useEffect(() => {
    if (isSuperAdmin) {
      superAdminService.getCompanies({ limit: 100 })
        .then(res => setCompanies(res.data))
        .catch(console.error);
    } else if (isAdmin) {
      adminService.getDashboardData().then(setData).catch(console.error);
    } else {
      clientService.getDashboardData().then(setData).catch(console.error);
    }
  }, [isSuperAdmin, isAdmin]);

  const recentCompanies = companies.slice(0, 5); // Just show top 5

  if (isSuperAdmin) {
    const total = companies.length;
    const active = companies.filter(c => c.isActive).length;
    const disabled = total - active;
    const completed = companies.filter(c => c.profileCompleted).length;

    return (
      <>
        <PageMeta title="Super Admin Dashboard | RAGCP" description="Platform Overview" />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Platform Overview</h2>
          <p className="text-gray-500 text-sm">Welcome back, Super Admin. Here is the summary of all registered RA Entities.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total RA Entities</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Active Entities</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{active}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Disabled Entities</h3>
            <p className="text-3xl font-bold text-red-500">{disabled}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Profiles Completed</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{completed}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recently Onboarded Entities</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Company Name</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">SEBI Reg No</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Email</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCompanies.map((company) => (
                  <tr key={company._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 font-medium">{company.companyName}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{company.sebiRegNo}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{company.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${company.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {company.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentCompanies.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">No companies found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta title="Dashboard | RAGCP" description="Main dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Clients</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{data?.clients || '--'}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Active Subscriptions</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{data?.subscriptions || '--'}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Pending KYC</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{data?.pending || '--'}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Compliance Alerts</h3>
          <p className="text-3xl font-bold text-red-500">{data?.alerts || '--'}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Welcome to RAGCP Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400">The central hub for all your compliance and research activities.</p>
        </div>
      </div>
    </>
  );
}
