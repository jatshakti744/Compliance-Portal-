import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { clientService } from "../../Services/clientService";

export default function ResearchCalls() {
  const [calls, setCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const data = await clientService.getResearchCalls();
        setCalls(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message || "Failed to load research calls");
      } finally {
        setLoading(false);
      }
    };
    fetchCalls();
  }, []);

  return (
    <>
      <PageMeta title="Research Calls | RAGCP" description="View research calls and tips." />
      <div className="p-4 md:p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Live Research Calls</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Exclusive SEBI compliant trading recommendations</p>
          </div>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
            ● Live Market
          </span>
        </div>
        
        {loading ? (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex justify-center">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl border border-red-100 dark:border-red-800 text-center">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <h3 className="text-lg font-bold text-red-800 dark:text-red-400 mb-1">Access Denied</h3>
            <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
            <a href="/client/subscriptions" className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">Check Subscription</a>
          </div>
        ) : calls.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No Active Calls</h3>
            <p className="text-gray-500 dark:text-gray-400">The Research Analyst has not published any live calls yet. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {calls.map(call => (
              <div key={call._id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 ${
                      call.type === 'Buy' ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 
                      call.type === 'Sell' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' : 
                      'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400'
                    }`}>
                      {call.type} CALL
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{call.title}</h3>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <p>{new Date(call.createdAt).toLocaleDateString()}</p>
                    <p>{new Date(call.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                  {call.content}
                </p>
                
                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Target Price</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">₹{call.targetPrice || '--'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Stop Loss</p>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">₹{call.stopLoss || '--'}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
                  <span>Analyst: {call.author?.name || 'Research Team'}</span>
                  <span className="flex items-center text-orange-500">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    Risk Declared
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
