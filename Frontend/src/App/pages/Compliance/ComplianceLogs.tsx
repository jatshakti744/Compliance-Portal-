import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { complianceService } from '../../services/complianceService';
import { fDate } from '../../utils/Date_format';
import Alert from '../../components/ui/alert/Alert';

export default function ComplianceLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ action: 'VIOLATION_DETECTED', ruleName: '', violationStatus: true, penaltyAmount: 0, details: '' });
  const [toast, setToast] = useState<{ variant: "success" | "error" | "warning", title: string, message: string } | null>(null);

  const showToast = (variant: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ variant, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchLogs = async () => {
    try {
      const data = await complianceService.getLogs();
      setLogs(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      showToast("error", "Error", "Failed to fetch compliance logs.");
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await complianceService.createLog(formData);
      showToast("success", "Violation Logged", "The manual violation log has been saved.");
      setShowForm(false);
      setFormData({ action: 'VIOLATION_DETECTED', ruleName: '', violationStatus: true, penaltyAmount: 0, details: '' });
      fetchLogs();
    } catch (err: any) {
      showToast("error", "Action Failed", err.message || "Failed to create log.");
    } finally {
      setLoading(false);
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
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Action Type</th>
              <th className="px-6 py-4">Performed By</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4">Status / Penalty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {logs.map((log: any) => (
              <tr key={log._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  {fDate(log.createdAt)}<br/>
                  <span className="text-xs text-gray-400">{new Date(log.createdAt).toLocaleTimeString()}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    log.action === 'RESEARCH_PUBLISHED' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                    log.action === 'CLIENT_ONBOARDED' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' :
                    log.action === 'STAFF_CREATED' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' :
                    'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                  }`}>
                    {log.action.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium dark:text-white">
                  {log.performedBy?.name || 'System'}<br/>
                  <span className="text-xs text-gray-400 font-normal">{log.performedBy?.role || 'Auto'}</span>
                </td>
                <td className="px-6 py-4 whitespace-pre-wrap max-w-xs">{log.details}</td>
                <td className="px-6 py-4">
                  {log.violationStatus ? (
                    <div>
                      <span className={`px-2 py-1 rounded text-xs ${log.resolved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {log.resolved ? 'Resolved' : 'Action Required'}
                      </span>
                      {log.penaltyAmount > 0 && <div className="text-red-500 font-medium mt-1">Penalty: ₹{log.penaltyAmount}</div>}
                    </div>
                  ) : (
                    <span className="text-green-500 font-medium text-xs">OK</span>
                  )}
                </td>
              </tr>
            ))}
            {logs.length === 0 && <tr><td colSpan={5} className="text-center py-8 text-gray-500">No logs found</td></tr>}
          </tbody>
        </table>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[999999] shadow-xl rounded-xl transition-all duration-300">
          <Alert variant={toast.variant as any} title={toast.title} message={toast.message} />
        </div>
      )}
    </div>
  );
}
