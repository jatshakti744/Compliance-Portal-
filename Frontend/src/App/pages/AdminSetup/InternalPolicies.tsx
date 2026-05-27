import React, { useState } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';

export default function InternalPolicies() {
  const [policies, setPolicies] = useState([
    { id: 1, title: 'Conflict of Interest Policy', content: 'Employees must declare all personal trades...', lastUpdated: '2026-01-10' },
    { id: 2, title: 'Client Grievance Redressal', content: 'All complaints must be addressed within 7 days...', lastUpdated: '2026-02-15' },
  ]);

  return (
    <div>
      <PageBreadcrumb pageTitle="Internal Policies" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">SEBI Mandated Policies</h2>
        <button className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600">+ Upload New Policy</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policies.map(p => (
          <div key={p.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{p.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{p.content}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Updated: {p.lastUpdated}</span>
              <button className="text-brand-500 hover:text-brand-600 font-medium">Edit / View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
