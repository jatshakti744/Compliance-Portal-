import React, { useState } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';

export default function ManageCalls() {
  const [calls] = useState([
    { id: 1, title: 'Buy Reliance Ind.', type: 'Buy', target: 3000, date: '2026-05-25', status: 'Active' },
    { id: 2, title: 'Sell HDFC Bank', type: 'Sell', target: 1400, date: '2026-05-22', status: 'Closed (Target Hit)' },
  ]);

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
            {calls.map(c => (
              <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 font-medium dark:text-white">{c.title}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${c.type === 'Buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.type}</span>
                </td>
                <td className="px-6 py-4">₹{c.target}</td>
                <td className="px-6 py-4">{c.date}</td>
                <td className="px-6 py-4 font-medium">{c.status}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-500 hover:text-brand-600 mr-3 font-medium">Update</button>
                  <button className="text-gray-500 hover:text-gray-700 font-medium">Archive</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
