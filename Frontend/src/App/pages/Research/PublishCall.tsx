import React, { useState, useEffect } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';
import { researchService } from '../../Services/researchService';
import Alert from '../../components/ui/alert/Alert';

export default function PublishCall() {
  const [formData, setFormData] = useState({
    type: 'Buy',
    title: '',
    content: '',
    targetPrice: '',
    stopLoss: '',
    tncAccepted: false,
    conflictOfInterest: false,
    internalPolicyRead: false
  });
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ variant: "success" | "error" | "warning", title: string, message: string } | null>(null);
  const [recentCalls, setRecentCalls] = useState<any[]>([]);

  // Autocomplete state
  const [stockQuery, setStockQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingStocks, setLoadingStocks] = useState(false);

  const showToast = (variant: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ variant, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchRecentCalls = async () => {
    try {
      const data = await researchService.getResearchCalls();
      if (Array.isArray(data)) {
        setRecentCalls(data.slice(0, 3)); // Only show top 3 recent
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecentCalls();
  }, []);

  // Handle stock search debouncing
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (stockQuery.length >= 2) {
        setLoadingStocks(true);
        const results = await researchService.searchStocks(stockQuery);
        setSuggestions(results);
        setShowSuggestions(true);
        setLoadingStocks(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [stockQuery]);

  const handleSelectStock = (stock: any) => {
    const stockStr = `${stock.symbol} - ${stock.companyName}`;
    setFormData({ ...formData, title: stockStr });
    setStockQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showToast("error", "Missing Stock", "Please select a stock or enter a title.");
      return;
    }
    if (!formData.tncAccepted || !formData.conflictOfInterest || !formData.internalPolicyRead) {
      showToast("error", "Compliance Required", "You must accept all SEBI regulations, conflict of interest, and internal policies.");
      return;
    }
    setLoading(true);
    try {
      await researchService.publishCall(formData);
      showToast("success", "Research Published", "Successfully published! Clients have been notified via Email.");
      setPublished(true);
      setFormData({ type: 'Buy', title: '', content: '', targetPrice: '', stopLoss: '', tncAccepted: false, conflictOfInterest: false, internalPolicyRead: false });
      fetchRecentCalls(); // Refresh the recent calls list
      setTimeout(() => setPublished(false), 3000);
    } catch (err: any) {
      showToast("error", "Action Failed", err.message || "Failed to publish research call.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Publish Research Call" />
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Create New Research Call</h2>
        
        {published && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
            Successfully published! Clients have been notified via Email and In-App Push.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Call Type</label>
            <select className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option>Buy</option>
              <option>Sell</option>
              <option>Hold</option>
              <option>Trading Call</option>
              <option>Model Portfolio</option>
            </select>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Stock / Title</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" 
              required 
              placeholder="Type to search stock (e.g. RELIANCE) or enter custom title" 
              value={stockQuery || formData.title} 
              onChange={e => {
                setStockQuery(e.target.value);
                setFormData({...formData, title: e.target.value});
              }}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            
            {showSuggestions && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {loadingStocks ? (
                  <div className="p-3 text-sm text-gray-500 text-center">Searching...</div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((s, idx) => (
                    <div 
                      key={idx} 
                      className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-0"
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent blur
                        handleSelectStock(s);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-800 dark:text-white">{s.symbol}</span>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300">{s.exchange}</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{s.companyName}</div>
                    </div>
                  ))
                ) : stockQuery.length >= 2 ? (
                  <div className="p-3 text-sm text-gray-500 text-center">No stocks found matching "{stockQuery}"</div>
                ) : null}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Target Price</label>
              <input type="number" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.targetPrice} onChange={e => setFormData({...formData, targetPrice: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Stop Loss</label>
              <input type="number" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required value={formData.stopLoss} onChange={e => setFormData({...formData, stopLoss: e.target.value})} />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Analysis / Content</label>
            <textarea rows={5} className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required placeholder="Provide detailed rationale..." value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})}></textarea>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">SEBI Disclosures (Mandatory)</h3>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" checked={formData.conflictOfInterest} onChange={e => setFormData({...formData, conflictOfInterest: e.target.checked})} />
              <span className="text-sm text-gray-600 dark:text-gray-400">I declare that I have no personal conflict of interest in this stock and have not traded in it contrary to this recommendation in the past 30 days.</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" checked={formData.tncAccepted} onChange={e => setFormData({...formData, tncAccepted: e.target.checked})} />
              <span className="text-sm text-gray-600 dark:text-gray-400">I accept the standard terms & conditions for publishing research as per SEBI regulations.</span>
            </label>
            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" checked={formData.internalPolicyRead} onChange={e => setFormData({...formData, internalPolicyRead: e.target.checked})} />
              <span className="text-sm text-gray-600 dark:text-gray-400">I confirm that this call strictly adheres to the company's internal research policies.</span>
            </label>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={loading || !formData.tncAccepted || !formData.conflictOfInterest || !formData.internalPolicyRead} className={`px-6 py-3 text-white rounded-lg font-medium transition-colors ${(!formData.tncAccepted || !formData.conflictOfInterest || !formData.internalPolicyRead || loading) ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/20'}`}>
              {loading ? 'Publishing...' : 'Publish to Clients'}
            </button>
          </div>
        </form>
      </div>

      {recentCalls.length > 0 && (
        <div className="max-w-3xl mx-auto mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recently Published Calls</h2>
          <div className="space-y-4">
            {recentCalls.map(c => (
              <div key={c._id} className="p-4 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800 dark:text-white">{c.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${c.type === 'Buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.type}</span>
                </div>
                <div className="text-sm text-gray-500 mb-2">Target: ₹{c.targetPrice} | Stop Loss: ₹{c.stopLoss}</div>
                <div className="text-xs text-gray-400">Published on {new Date(c.createdAt).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[999999] shadow-xl rounded-xl transition-all duration-300">
          <Alert variant={toast.variant as any} title={toast.title} message={toast.message} />
        </div>
      )}
    </div>
  );
}
