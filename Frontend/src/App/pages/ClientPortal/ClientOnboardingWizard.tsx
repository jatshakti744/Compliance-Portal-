import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import PageMeta from '../../components/common/PageMeta';
import Alert from '../../components/ui/alert/Alert';
import { clientService } from '../../Services/clientService';

export default function ClientOnboardingWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ variant: "success" | "error" | "warning", title: string, message: string } | null>(null);

  const showToast = (variant: "success" | "error" | "warning", title: string, message: string) => {
    setToast({ variant, title, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Step 1 State
  const [kycData, setKycData] = useState({ pan: '', aadhaar: '' });
  // Step 2 State
  const [agreements, setAgreements] = useState({
    termsAccepted: false,
    consentGiven: false,
    researchDeclaration: false,
    isSigned: false
  });
  // Step 3 State
  const [selectedPlan, setSelectedPlan] = useState('');

  const handleNext = () => {
    if (currentStep === 1) {
      if (!kycData.pan || !kycData.aadhaar) return showToast("error", "Missing Details", "Please provide PAN and Aadhaar.");
      showToast("success", "KRA Verified", "Mock KRA check passed.");
    }
    if (currentStep === 2) {
      if (!agreements.isSigned) return showToast("error", "eSign Required", "Please complete Aadhaar eSign.");
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSign = () => {
    if (!agreements.termsAccepted || !agreements.consentGiven || !agreements.researchDeclaration) {
      return showToast("error", "Incomplete", "Please accept all declarations first.");
    }
    setLoading(true);
    setTimeout(() => {
      setAgreements({ ...agreements, isSigned: true });
      showToast("success", "Signed Successfully", "Agreement has been digitally signed.");
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = async () => {
    if (!selectedPlan) return showToast("error", "Select Plan", "Please select a subscription plan.");
    
    setLoading(true);
    try {
      await clientService.completeOnboarding({
        kycData,
        agreementsSigned: true,
        subscriptionPlan: selectedPlan
      });

      showToast("success", "Onboarding Complete", "Your profile setup has been completed successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err: any) {
      showToast("error", "Onboarding Failed", err.message || "An error occurred during onboarding.");
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta title="Client Onboarding | RAGCP" description="Complete your KYC and Agreements" />
      
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Your Portal</h1>
          <p className="text-gray-500 dark:text-gray-400">Complete these 3 simple steps to start receiving Research Calls.</p>
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
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">KYC & KRA Verification</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">PAN Number</label>
                  <input type="text" maxLength={10} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl uppercase focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all" value={kycData.pan} onChange={e => setKycData({...kycData, pan: e.target.value})} placeholder="ABCDE1234F" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Aadhaar Number</label>
                  <input type="text" maxLength={12} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none dark:text-white transition-all" value={kycData.aadhaar} onChange={e => setKycData({...kycData, aadhaar: e.target.value})} placeholder="123456789012" />
                </div>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg text-sm">
                Your details will be automatically verified against SEBI registered KRA (NSDL/CVL/CAMS).
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Agreements & eSign</h2>
              
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 h-40 overflow-y-auto mb-4 text-sm text-gray-600 dark:text-gray-400">
                <p className="font-semibold mb-2">Research Subscription Agreement</p>
                <p>This agreement is entered between the Research Analyst and the Client. By signing this, you agree to the terms and conditions outlined as per SEBI (Research Analysts) Regulations, 2014.</p>
                <p className="mt-2">1. The Research Analyst will provide trading calls.<br/>2. The client understands the risks of the stock market.<br/>3. Past performance is not indicative of future results.</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={agreements.termsAccepted} onChange={e => setAgreements({...agreements, termsAccepted: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
                  <span className="text-gray-700 dark:text-gray-300">I accept the Terms and Conditions.</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={agreements.consentGiven} onChange={e => setAgreements({...agreements, consentGiven: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
                  <span className="text-gray-700 dark:text-gray-300">I give my consent to receive research alerts.</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" checked={agreements.researchDeclaration} onChange={e => setAgreements({...agreements, researchDeclaration: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
                  <span className="text-gray-700 dark:text-gray-300">I have read the conflict of interest and risk declaration.</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-center border-t border-gray-100 dark:border-gray-700">
                {agreements.isSigned ? (
                  <div className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-bold flex items-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    <span>Digitally Signed via Aadhaar</span>
                  </div>
                ) : (
                  <button onClick={handleSign} disabled={loading} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-600/30">
                    {loading ? 'Processing eSign...' : 'Mock Aadhaar eSign'}
                  </button>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Payment & Subscription</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  onClick={() => setSelectedPlan('Basic')}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedPlan === 'Basic' ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10' : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'}`}
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Basic Plan</h3>
                  <p className="text-3xl font-bold text-brand-500 my-2">₹5,000<span className="text-sm text-gray-500 font-normal">/mo</span></p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mt-4">
                    <li>✓ 5 Trading Calls per day</li>
                    <li>✓ Weekly Market Report</li>
                  </ul>
                </div>
                <div 
                  onClick={() => setSelectedPlan('Premium')}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${selectedPlan === 'Premium' ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10' : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'}`}
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Premium Advisory</h3>
                  <p className="text-3xl font-bold text-brand-500 my-2">₹15,000<span className="text-sm text-gray-500 font-normal">/yr</span></p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mt-4">
                    <li>✓ Unlimited Trading Calls</li>
                    <li>✓ Dedicated RM Support</li>
                    <li>✓ Model Portfolio Access</li>
                  </ul>
                </div>
              </div>
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
                disabled={loading || !selectedPlan}
                className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-green-500/20 flex items-center disabled:opacity-50"
              >
                {loading ? 'Processing Payment...' : 'Pay with Razorpay'}
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
