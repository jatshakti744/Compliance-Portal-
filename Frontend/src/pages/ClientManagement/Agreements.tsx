import React, { useState } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';

export default function Agreements() {
  const [agreements, setAgreements] = useState([
    { id: 1, client: 'Ramesh Singh', agreementType: 'Research Subscription Agreement', dateSent: '2026-05-20', signed: true, signDate: '2026-05-21' },
    { id: 2, client: 'Suresh Kumar', agreementType: 'Risk Profiling Consent', dateSent: '2026-05-22', signed: false, signDate: null },
  ]);

  return (
    <div>
      <PageBreadcrumb pageTitle="Client Agreements & eSign" />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Agreements Tracker</h2>
        <button className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600">Send New Agreement</button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
            <tr>
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">Agreement Type</th>
              <th className="px-6 py-4">Date Sent</th>
              <th className="px-6 py-4">eSign Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {agreements.map(a => (
              <tr key={a.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 font-medium dark:text-white">{a.client}</td>
                <td className="px-6 py-4">{a.agreementType}</td>
                <td className="px-6 py-4">{a.dateSent}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${a.signed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {a.signed ? `Signed on ${a.signDate}` : 'Pending eSign'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {a.signed ? (
                    <button className="text-brand-500 hover:text-brand-600 font-medium">Download PDF</button>
                  ) : (
                    <button className="text-orange-500 hover:text-orange-600 font-medium">Resend Link</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
