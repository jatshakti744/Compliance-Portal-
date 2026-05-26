import React, { useState } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';

export default function PenaltyMatrix() {
  const [matrix] = useState([
    { id: 1, req: "SEBI registration mandatory", freq: "Before commencement", penalty: "Heavy Penalty / Block" },
    { id: 2, req: "Minimum qualification requirements for RA", freq: "At appointment", penalty: "₹10,000 per violation" },
    { id: 3, req: "Mandatory NISM certifications", freq: "Before acting as RA", penalty: "Block Onboarding" },
    { id: 4, req: "Designation of Principal Officer", freq: "Continuous compliance", penalty: "₹5,000 per violation" },
    { id: 5, req: "Appointment of Compliance Officer", freq: "Continuous compliance", penalty: "₹20,000" },
    { id: 6, req: "Part-time RA client limit ≤75", freq: "Continuous compliance", penalty: "₹10,000 per violation" },
    { id: 7, req: "Terms and conditions disclosure", freq: "Before onboarding", penalty: "₹1,000 per client" }
  ]);

  return (
    <div>
      <PageBreadcrumb pageTitle="SEBI Compliance Penalty Matrix" />
      
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="font-semibold text-gray-800 dark:text-white">Reference Matrix from Documents</h3>
          <p className="text-sm text-gray-500 mt-1">This matrix drives the automated compliance warnings and audit logs in the system.</p>
        </div>
        <table className="w-full whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
            <tr>
              <th className="px-6 py-4 font-semibold">Sr. No</th>
              <th className="px-6 py-4 font-semibold">Compliance Requirement</th>
              <th className="px-6 py-4 font-semibold">Frequency</th>
              <th className="px-6 py-4 font-semibold text-red-500">Related Penalty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {matrix.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 font-medium dark:text-white">{row.id}</td>
                <td className="px-6 py-4 whitespace-normal min-w-[300px]">{row.req}</td>
                <td className="px-6 py-4">{row.freq}</td>
                <td className="px-6 py-4 font-medium text-red-500 dark:text-red-400">{row.penalty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
