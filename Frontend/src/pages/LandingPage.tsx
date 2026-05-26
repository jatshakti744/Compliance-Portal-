
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 dark:bg-gray-900">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Research Analyst Governance & Compliance Platform
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
          The ultimate platform for managing RA Entities, Compliance, KRA, and Research Publications securely and efficiently.
        </p>
        
        <div className="flex gap-6 justify-center">
          <Link 
            to="/signin" 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/signup" 
            className="px-8 py-3 bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-semibold rounded-lg shadow-md transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-400 dark:border-blue-500"
          >
            Sign Up
          </Link>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Compliance Engine</h3>
          <p className="text-gray-600 dark:text-gray-400">Automated alerts for deposit, certificate expiry, and KYC verification tracking.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Research Module</h3>
          <p className="text-gray-600 dark:text-gray-400">Publish Trading Calls, Model Portfolios with integrated TNC and Consent management.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Staff Management</h3>
          <p className="text-gray-600 dark:text-gray-400">Assign roles, manage NISM certifications and restrict access based on compliance status.</p>
        </div>
      </div>
    </div>
  );
}
