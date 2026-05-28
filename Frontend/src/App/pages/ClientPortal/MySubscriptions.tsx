import React, { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { clientService } from "../../Services/clientService";

export default function MySubscriptions() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await clientService.getMyProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <PageMeta title="My Subscriptions | RAGCP" description="View your active subscriptions." />
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Active Plans</h1>
        
        {loading ? (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex justify-center">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : profile?.subscriptionActive ? (
          <div className="bg-gradient-to-br from-brand-500 to-brand-700 p-8 rounded-2xl shadow-lg text-white">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">Active</span>
                <h2 className="text-3xl font-bold mt-4">{profile.subscriptionPlan || 'Custom'} Plan</h2>
                <p className="text-brand-100 mt-2">You have full access to Research Calls & Portfolios</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-brand-200">Valid Until</p>
                <p className="font-bold text-xl">{new Date(profile.subscriptionExpiry).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="mt-8 border-t border-white/20 pt-6">
              <h3 className="font-semibold mb-3">Plan Benefits:</h3>
              <ul className="space-y-2 text-sm text-brand-50">
                <li className="flex items-center">✓ Daily Trading Calls (Buy/Sell/Hold)</li>
                <li className="flex items-center">✓ Special Model Portfolios Access</li>
                <li className="flex items-center">✓ Direct RM Support & Compliance Alerts</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No Active Subscription</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">You currently do not have any active plans. Please subscribe to unlock SEBI registered research calls.</p>
            <a href="/client/onboarding" className="inline-block px-6 py-2.5 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors">View Pricing Plans</a>
          </div>
        )}
      </div>
    </>
  );
}
