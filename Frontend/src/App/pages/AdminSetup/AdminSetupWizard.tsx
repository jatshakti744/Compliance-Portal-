import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import PageMeta from '../../components/common/PageMeta';
import { config } from '../../Utils/config';
import Alert from '../../components/ui/alert/Alert';

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

export default function AdminSetupWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ variant: "success" | "error" | "warning", title: string, message: string } | null>(null);

  const showToast = (variant: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ variant, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  const [poData, setPoData] = useState({ name: '', email: '', nismCertificateNumber: '', nismExpiryDate: '' });
  const [coData, setCoData] = useState({ name: '', email: '', nismCertificateNumber: '', nismExpiryDate: '' });
  const [policies, setPolicies] = useState([
    { title: 'Code of Conduct', content: '' },
    { title: 'Internal Trading Policy', content: '' },
    { title: 'Grievance Redressal Policy', content: '' }
  ]);

  const handlePolicyChange = (index: number, content: string) => {
    const newPolicies = [...policies];
    newPolicies[index].content = content;
    setPolicies(newPolicies);
  };

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const userCookie = getCookie("user");
      const user = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;
      if (!user?.companyId) throw new Error("No company ID found");

      const res = await fetch(`${config.base_url}/companies/${user.companyId}/setup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          principalOfficer: poData,
          complianceOfficer: coData,
          policies: policies
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to complete setup");
      }

      // Update local cookie
      const updatedUser = { ...user, profileCompleted: true };
      document.cookie = `user=${encodeURIComponent(JSON.stringify(updatedUser))}; path=/; max-age=86400`;

      showToast("success", "Setup Complete", "Your profile setup has been completed successfully!");
      // Delay reload to let user see the toast
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (err: any) {
      showToast("error", "Setup Failed", err.message || "An error occurred during setup.");
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta title="First Login Setup | RAGCP" description="Complete your company profile setup" />
      
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to RAGCP</h1>
          <p className="text-gray-500 dark:text-gray-400">Please complete your initial setup to start using the platform.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-10">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${currentStep >= step ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 rounded ${currentStep > step ? 'bg-brand-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden p-8">
          
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Principal Officer Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Full Name</label>
                  <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all" value={poData.name} onChange={e => setPoData({...poData, name: e.target.value})} placeholder="e.g. Rahul Sharma" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Email Address</label>
                  <input type="email" className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all" value={poData.email} onChange={e => setPoData({...poData, email: e.target.value})} placeholder="rahul@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">NISM Certificate No.</label>
                  <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all" value={poData.nismCertificateNumber} onChange={e => setPoData({...poData, nismCertificateNumber: e.target.value})} placeholder="e.g. NISM123456" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">NISM Expiry Date</label>
                  <input type="date" className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all" value={poData.nismExpiryDate} onChange={e => setPoData({...poData, nismExpiryDate: e.target.value})} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Compliance Officer Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Full Name</label>
                  <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all" value={coData.name} onChange={e => setCoData({...coData, name: e.target.value})} placeholder="e.g. Priya Singh" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Email Address</label>
                  <input type="email" className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all" value={coData.email} onChange={e => setCoData({...coData, email: e.target.value})} placeholder="priya@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">NISM Certificate No.</label>
                  <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all" value={coData.nismCertificateNumber} onChange={e => setCoData({...coData, nismCertificateNumber: e.target.value})} placeholder="e.g. NISM789012" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">NISM Expiry Date</label>
                  <input type="date" className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all" value={coData.nismExpiryDate} onChange={e => setCoData({...coData, nismExpiryDate: e.target.value})} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Internal Policies</h2>
              <p className="text-sm text-gray-500">Please provide the text for your internal policies as required by SEBI guidelines.</p>
              
              {policies.map((policy, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">{policy.title}</label>
                  <textarea rows={4} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all" value={policy.content} onChange={e => handlePolicyChange(index, e.target.value)} placeholder={`Enter ${policy.title} content here...`}></textarea>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-6">
            <button 
              onClick={handlePrev} 
              disabled={currentStep === 1 || loading}
              className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${currentStep === 1 ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              Back
            </button>
            
            {currentStep < 3 ? (
              <button 
                onClick={handleNext} 
                className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-brand-500/20"
              >
                Next Step
              </button>
            ) : (
              <button 
                onClick={handleSubmit} 
                disabled={loading}
                className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-green-500/20 flex items-center"
              >
                {loading ? 'Saving Setup...' : 'Complete Setup'}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {toast && (
        <div className="fixed bottom-6 right-6 z-[999999] shadow-xl rounded-xl transition-all duration-300">
          <Alert variant={toast.variant as any} title={toast.title} message={toast.message} />
        </div>
      )}
    </>
  );
}
