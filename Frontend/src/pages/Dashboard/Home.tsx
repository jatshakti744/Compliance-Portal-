import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { clientService } from "../../services/clientService";

export default function Home() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // In the future, this will fetch real dashboard metrics
    clientService.getDashboardData().then(setData).catch(console.error);
  }, []);

  return (
    <>
      <PageMeta
        title="Dashboard | RAGCP - Compliance Portal"
        description="Main dashboard for the Research Analyst Governance & Compliance Platform"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Placeholder Stat Cards */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Total Clients</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">--</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Active Subscriptions</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">--</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Pending KYC</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">--</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Compliance Alerts</h3>
          <p className="text-3xl font-bold text-red-500">--</p>
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
