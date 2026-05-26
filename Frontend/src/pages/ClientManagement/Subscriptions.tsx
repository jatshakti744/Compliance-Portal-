import React, { useState } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';

export default function Subscriptions() {
  const [subs] = useState([
    { id: 1, client: 'Ramesh Singh', plan: 'Premium Equities', amount: 5000, status: 'Active', expiry: '2026-11-20' },
    { id: 2, client: 'Anjali Sharma', plan: 'Basic Options', amount: 2000, status: 'Expired', expiry: '2026-04-10' }
  ]);

  return (
    <div>
      <PageBreadcrumb pageTitle="Client Subscriptions & Payments" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Active Subscriptions</h2>
        <button className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600">+ Record Manual Payment</button>
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
            {subs.map(s => (
              <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 font-medium dark:text-white">{s.client}</td>
                <td className="px-6 py-4">{s.plan}</td>
                <td className="px-6 py-4">₹{s.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4">{s.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
