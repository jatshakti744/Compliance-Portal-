import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import LandingPage from "./pages/LandingPage";
import CompaniesDashboard from "./pages/Companies/CompaniesDashboard";

// Admin Setup
import CompanyProfile from "./pages/AdminSetup/CompanyProfile";
import StaffRoles from "./pages/AdminSetup/StaffRoles";
import InternalPolicies from "./pages/AdminSetup/InternalPolicies";

// Client Management
import OnboardingKYC from "./pages/ClientManagement/OnboardingKYC";
import Agreements from "./pages/ClientManagement/Agreements";
import Subscriptions from "./pages/ClientManagement/Subscriptions";

// Research Module
import PublishCall from "./pages/Research/PublishCall";
import ManageCalls from "./pages/Research/ManageCalls";

// Compliance Engine
import ComplianceLogs from "./pages/Compliance/ComplianceLogs";
import PenaltyMatrix from "./pages/Compliance/PenaltyMatrix";

// Client Portal
import MySubscriptions from "./pages/ClientPortal/MySubscriptions";
import ResearchCalls from "./pages/ClientPortal/ResearchCalls";

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
