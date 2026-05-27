
import { Link } from "react-router";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white transition-colors duration-300">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/95 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 transition-all">
        <div className="flex items-center justify-between px-6 py-4 md:px-12 max-w-[1400px] w-full mx-auto">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-blue-500/30">
              <div className="w-5 h-5 rounded-sm bg-white relative">
                 <div className="absolute top-1 left-1 w-1 h-1 bg-blue-600 rounded-full"></div>
                 <div className="absolute top-1 right-1 w-1 h-1 bg-blue-600 rounded-full"></div>
                 <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-blue-600 rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-white dark:to-gray-400">RAGCP</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold tracking-widest text-gray-500 dark:text-gray-400">
            <button onClick={() => scrollToSection('home')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">HOME</button>
            <button onClick={() => scrollToSection('compliance')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">COMPLIANCE</button>
            <button onClick={() => scrollToSection('research')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">RESEARCH</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">CONTACT</button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors">
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <Link to="/signin" className="text-[13px] font-bold text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition-colors tracking-wide">
              SIGN IN
            </Link>
            <Link 
              to="/signup" 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold rounded-lg tracking-wide transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            >
              SIGN UP
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors">
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <button 
              className="text-gray-600 dark:text-gray-300 p-2 hover:text-blue-600 dark:hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex flex-col gap-4 shadow-xl">
            <button onClick={() => scrollToSection('home')} className="text-left font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white py-2">HOME</button>
            <button onClick={() => scrollToSection('compliance')} className="text-left font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white py-2">COMPLIANCE ENGINE</button>
            <button onClick={() => scrollToSection('research')} className="text-left font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white py-2">RESEARCH MODULE</button>
            <button onClick={() => scrollToSection('contact')} className="text-left font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white py-2">CONTACT US</button>
            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2"></div>
            <Link to="/signin" className="font-bold text-gray-700 dark:text-gray-300 py-2">SIGN IN</Link>
            <Link to="/signup" className="text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg mt-2 shadow-lg">SIGN UP</Link>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 lg:pt-24 lg:pb-16 px-6 md:px-12 max-w-[1400px] w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col gap-6 order-2 lg:order-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="w-3.5 h-3.5 bg-blue-600 dark:bg-blue-500 rounded-sm"></div>
              <span className="text-[11px] sm:text-[13px] font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400 uppercase">
                The Ultimate Platform For RA Entities
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-extrabold leading-[1.1] tracking-tight text-gray-900 dark:text-white mb-2">
              Automate your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">compliance</span> <br className="hidden md:block" />
              workflow
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              Seamlessly manage RA Entities, KRA verifications, and Research Publications. Stay ahead of SEBI regulations, automate audits, and track NISM certifications—all in one secure platform.
            </p>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
               <button onClick={() => scrollToSection('compliance')} className="px-8 py-3.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors w-full sm:w-auto">
                 Explore Features
               </button>
               <Link to="/signup" className="px-8 py-3.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto text-center">
                 Get Started
               </Link>
            </div>
          </div>

          <div className="relative flex justify-center items-center w-full h-[300px] sm:h-[400px] lg:h-[450px] order-1 lg:order-2">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-blue-100 dark:bg-blue-600/20 rounded-full blur-[80px]"></div>
             <img 
               src="/hero_illustration.png" 
               alt="RAGCP Dashboard" 
               className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-xl object-contain drop-shadow-2xl"
             />
          </div>
        </div>
      </section>

      {/* Compliance Engine Section */}
      <section id="compliance" className="py-20 lg:py-32 bg-white dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-800/80">
        <div className="px-6 md:px-12 max-w-[1400px] w-full mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Robust Compliance Engine</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
              Navigate SEBI regulations with ease. Our automated tools ensure your operations remain 100% compliant by handling verifications and audits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-md dark:shadow-lg group">
               <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
               </div>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">SEBI Audit Readiness</h3>
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">Automate audit logs, maintain historical client data, and generate instant reports required by SEBI during regulatory inspections.</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-md dark:shadow-lg group">
               <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
               </div>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">KRA & KYC Tracking</h3>
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">Track Know Your Customer (KYC) statuses centrally. Sync with KYC Registration Agencies (KRA) to ensure every client is legally verified before onboarding.</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-md dark:shadow-lg group">
               <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">NISM Certifications</h3>
               <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">Monitor staff qualifications and NISM series certifications. Get automated alerts before expiry to ensure your workforce remains authorized to operate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 lg:py-32 px-6 md:px-12 max-w-[1400px] w-full mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 aspect-[4/3] flex items-center justify-center shadow-xl dark:shadow-2xl">
             {/* Mock UI for Research */}
             <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex flex-col p-6">
                <div className="w-full flex items-center gap-2 border-b border-gray-300 dark:border-gray-700 pb-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 h-5 w-36 bg-gray-300 dark:bg-gray-700/50 rounded flex items-center px-3"><span className="text-[10px] text-gray-600 dark:text-gray-400 font-mono tracking-wider">Research Pubs</span></div>
                </div>
                <div className="flex-1 flex flex-col gap-5 p-2">
                  <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  <div className="h-5 w-full bg-gray-200 dark:bg-gray-700/40 rounded-md mt-2"></div>
                  <div className="h-5 w-5/6 bg-gray-200 dark:bg-gray-700/40 rounded-md"></div>
                  <div className="h-5 w-4/6 bg-gray-200 dark:bg-gray-700/40 rounded-md"></div>
                  <div className="mt-auto flex justify-between items-end border-t border-gray-300 dark:border-gray-700 pt-6">
                    <div className="flex gap-3">
                      <div className="h-10 w-28 bg-blue-600/90 rounded-md"></div>
                      <div className="h-10 w-28 bg-emerald-600/90 rounded-md"></div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                </div>
             </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Advanced Research Publications</h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
              Empower your analysts to distribute high-quality research, model portfolios, and trading recommendations securely while strictly enforcing risk profiling constraints and mandatory disclaimers.
            </p>
            <ul className="space-y-5">
              {[
                'Publish Model Portfolios securely to verified clients.',
                'Enforce Risk Profiling before client access.',
                'Automate mandatory SEBI disclaimers on every report.',
                'Track engagement and delivery of stock recommendations.'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 mt-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 md:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 relative">
        <div className="px-6 md:px-12 max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
           <div className="flex flex-col justify-center">
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Get in touch</h2>
             <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-10 leading-relaxed">
               Ready to streamline your Research Analyst compliance? Contact us to schedule a demo and see how RAGCP can protect your entity.
             </p>
             <div className="space-y-8">
                <div className="flex items-center gap-5 text-gray-700 dark:text-gray-300">
                   <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm">
                     <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                   </div>
                   <div>
                     <p className="text-sm text-gray-500 font-bold tracking-wider mb-1">EMAIL</p>
                     <p className="text-lg font-medium text-gray-900 dark:text-white">hello@ragcp.com</p>
                   </div>
                </div>
                <div className="flex items-center gap-5 text-gray-700 dark:text-gray-300">
                   <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm">
                     <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                   </div>
                   <div>
                     <p className="text-sm text-gray-500 font-bold tracking-wider mb-1">PHONE</p>
                     <p className="text-lg font-medium text-gray-900 dark:text-white">+91 98765 43210</p>
                   </div>
                </div>
             </div>
           </div>

           <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl dark:shadow-2xl">
              <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-400">First Name</label>
                    <input type="text" className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="John" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-400">Last Name</label>
                    <input type="text" className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-400">Work Email</label>
                  <input type="email" className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" placeholder="john@company.com" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-400">Message</label>
                  <textarea rows={5} className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3.5 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none" placeholder="Tell us about your requirements..."></textarea>
                </div>
                <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors shadow-lg shadow-blue-500/20">
                  Send Message
                </button>
              </form>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-900 py-10 text-center px-6">
         <p className="text-gray-600 dark:text-gray-500 font-medium">© {new Date().getFullYear()} RAGCP. All rights reserved.</p>
         <p className="text-gray-500 dark:text-gray-600 text-sm mt-2">A comprehensive compliance platform for Research Analysts in India.</p>
      </footer>
    </div>
  );
}

