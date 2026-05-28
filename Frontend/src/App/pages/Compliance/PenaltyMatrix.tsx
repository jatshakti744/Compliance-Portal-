import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { complianceService } from '../../services/complianceService';

export default function PenaltyMatrix() {
  const [matrix, setMatrix] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatrix = async () => {
      try {
        const data = await complianceService.getPenaltyMatrix();
        setMatrix(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatrix();
  }, []);

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
            {loading ? (
              <tr><td colSpan={4} className="text-center py-8"><div className="inline-block w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin"></div></td></tr>
            ) : matrix.map((row, index) => (
              <tr key={row._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 font-medium dark:text-white">{index + 1}</td>
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
