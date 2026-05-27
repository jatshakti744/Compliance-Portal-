import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { complianceService } from '../../services/complianceService';
import { fDate } from '../../utils/Date_format';

export default function ComplianceLogs() {
  const [logs, setLogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ companyId: '60d0fe4f5311236168a109ca', ruleName: '', violationStatus: true, penaltyAmount: 0, details: '' }); // Hardcoded company for now

  const fetchLogs = async () => {
    try {
      const data = await complianceService.getLogsByCompany('60d0fe4f5311236168a109ca');
      setLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await complianceService.createLog(formData);
      setShowForm(false);
      fetchLogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Compliance Logs & Alerts" />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Active Violations & Audits</h2>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          {showForm ? 'Cancel' : '+ Log Violation manually'}
        </button>
      </div>

      {showForm && (
        <div className="p-6 bg-red-50 dark:bg-red-900/10 rounded-xl mb-6 border border-red-200 dark:border-red-800">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm mb-1 text-red-700">Rule Violated</label><input required className="w-full p-2 border rounded" value={formData.ruleName} onChange={e => setFormData({...formData, ruleName: e.target.value})} placeholder="e.g. NISM Certificate Expired" /></div>
            <div><label className="block text-sm mb-1 text-red-700">Penalty Amount (₹)</label><input required type="number" className="w-full p-2 border rounded" value={formData.penaltyAmount} onChange={e => setFormData({...formData, penaltyAmount: Number(e.target.value)})} /></div>
            <div className="col-span-2"><label className="block text-sm mb-1 text-red-700">Details</label><input required className="w-full p-2 border rounded" value={formData.details} onChange={e => setFormData({...formData, details: e.target.value})} /></div>
            <div className="col-span-2 text-right">
              <button type="submit" className="px-6 py-2 bg-red-500 text-white rounded">Save Log</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full whitespace-nowrap text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Rule Name</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4 text-red-500">Penalty</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {logs.map((log: any) => (
              <tr key={log._id}>
                <td className="px-6 py-4">{fDate(log.createdAt)}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{log.ruleName}</td>
                <td className="px-6 py-4">{log.details}</td>
                <td className="px-6 py-4 font-medium text-red-500">₹{log.penaltyAmount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${log.resolved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {log.resolved ? 'Resolved' : 'Action Required'}
                  </span>
                </td>
              </tr>
            ))}
            {logs.length === 0 && <tr><td colSpan={5} className="text-center py-4">No violations found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
