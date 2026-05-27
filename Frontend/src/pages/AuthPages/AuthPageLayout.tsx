import React from "react";
import { Link } from "react-router";
import { useTheme } from "../../context/ThemeContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen flex transition-colors duration-300 selection:bg-blue-500 selection:text-white bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      {/* Left side: Forms */}
      <div className="flex-1 flex flex-col px-6 py-6 sm:px-12 sm:py-8 lg:px-20 relative overflow-y-auto">
        
        {/* Header (Logo & Theme Toggle) */}
        <div className="flex items-center justify-between w-full z-20 mb-8 sm:mb-12">
          <Link to="/" className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0">
               <div className="w-5 h-5 rounded-sm bg-white relative">
                  <div className="absolute top-1 left-1 w-1 h-1 bg-blue-600 rounded-full"></div>
                  <div className="absolute top-1 right-1 w-1 h-1 bg-blue-600 rounded-full"></div>
                  <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-blue-600 rounded-full"></div>
               </div>
             </div>
             <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">RAGCP</span>
          </Link>

          <button onClick={toggleTheme} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 shrink-0">
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto my-auto relative z-10 pb-8">
          {children}
        </div>
      </div>

      {/* Right side: Branding/Illustration */}
      <div className="hidden lg:flex lg:flex-1 bg-gray-950 relative overflow-hidden flex-col justify-center items-center p-12 border-l border-gray-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
           <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 mb-8 border border-blue-500/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
           </div>
           <h2 className="text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">
             Streamline your <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Compliance Operations</span>
           </h2>
           <p className="text-lg text-gray-400 leading-relaxed">
             Join thousands of Research Analysts and Entities securely managing their SEBI requirements, audits, and KRA processes on RAGCP.
           </p>
        </div>
        
        {/* Abstract decorative elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)] z-0 pointer-events-none"></div>
      </div>
    </div>
  );
}
