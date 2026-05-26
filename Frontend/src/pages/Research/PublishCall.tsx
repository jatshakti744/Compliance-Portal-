import React, { useState } from 'react';
import PageBreadcrumb from '../../components/common/PageBreadCrumb';

export default function PublishCall() {
  const [formData, setFormData] = useState({
    type: 'Buy',
    title: '',
    content: '',
    targetPrice: '',
    stopLoss: '',
    tncAccepted: false,
    conflictOfInterest: false
  });
  const [published, setPublished] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tncAccepted || !formData.conflictOfInterest) {
      alert("You must accept SEBI Research Analyst regulations and conflict of interest policies before publishing.");
      return;
    }
    // API mock
    console.log("Publishing Research...", formData);
    setPublished(true);
    setTimeout(() => {
      setPublished(false);
      setFormData({ ...formData, title: '', content: '', targetPrice: '', stopLoss: '', tncAccepted: false, conflictOfInterest: false });
    }, 3000);
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
          
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Stock / Title</label>
            <input type="text" className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" required placeholder="e.g. Buy Reliance Ind." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
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
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className={`px-6 py-3 text-white rounded-lg font-medium transition-colors ${(!formData.tncAccepted || !formData.conflictOfInterest) ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-500 hover:bg-brand-600'}`}>
              Publish to Clients
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
