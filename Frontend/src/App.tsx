import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./App/pages/AuthPages/SignIn";
import SignUp from "./App/pages/AuthPages/SignUp";
import NotFound from "./App/pages/OtherPage/NotFound";
import UserProfiles from "./App/pages/UserProfiles";
import AppLayout from "./App/Layout/AppLayout";
import { ScrollToTop } from "./App/components/common/ScrollToTop";
import Home from "./App/pages/Dashboard/Home";
import LandingPage from "./App/pages/LandingPage";
import CompaniesDashboard from "./App/pages/Companies/CompaniesDashboard";

// Admin Setup
import CompanyProfile from "./App/pages/AdminSetup/CompanyProfile";
import StaffRoles from "./App/pages/AdminSetup/StaffRoles";
import InternalPolicies from "./App/pages/AdminSetup/InternalPolicies";
import AdminSetupWizard from "./App/pages/AdminSetup/AdminSetupWizard";

// Client Management
import OnboardingKYC from "./App/pages/ClientManagement/OnboardingKYC";
import Agreements from "./App/pages/ClientManagement/Agreements";
import Subscriptions from "./App/pages/ClientManagement/Subscriptions";

// Research Module
import PublishCall from "./App/pages/Research/PublishCall";
import ManageCalls from "./App/pages/Research/ManageCalls";

// Compliance Engine
import ComplianceLogs from "./App/pages/Compliance/ComplianceLogs";
import PenaltyMatrix from "./App/pages/Compliance/PenaltyMatrix";

// Client Portal
import MySubscriptions from "./App/pages/ClientPortal/MySubscriptions";
import ResearchCalls from "./App/pages/ClientPortal/ResearchCalls";
import ClientOnboardingWizard from "./App/pages/ClientPortal/ClientOnboardingWizard";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/companies" element={<CompaniesDashboard />} />
            
            {/* Admin Setup */}
            <Route path="/admin/setup" element={<AdminSetupWizard />} />
            <Route path="/admin/profile" element={<CompanyProfile />} />
            <Route path="/admin/staff" element={<StaffRoles />} />
            <Route path="/admin/policies" element={<InternalPolicies />} />

            {/* Client Management */}
            <Route path="/clients/onboarding" element={<OnboardingKYC />} />
            <Route path="/clients/agreements" element={<Agreements />} />
            <Route path="/clients/subscriptions" element={<Subscriptions />} />

            {/* Research Module */}
            <Route path="/research/publish" element={<PublishCall />} />
            <Route path="/research/manage" element={<ManageCalls />} />

            {/* Compliance Engine */}
            <Route path="/compliance/logs" element={<ComplianceLogs />} />
            <Route path="/compliance/matrix" element={<PenaltyMatrix />} />
            {/* Client Portal (For end-users) */}
            <Route path="/client/subscriptions" element={<MySubscriptions />} />
            <Route path="/client/research-calls" element={<ResearchCalls />} />
            <Route path="/client/onboarding" element={<ClientOnboardingWizard />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
