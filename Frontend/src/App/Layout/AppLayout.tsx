import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, Navigate, useLocation } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
};

const AppLayout: React.FC = () => {
  const userCookie = getCookie("user");
  const location = useLocation();

  if (!userCookie) {
    return <Navigate to="/signin" replace />;
  }

  let user;
  try {
    user = JSON.parse(decodeURIComponent(userCookie));
  } catch (e) {
    // If cookie is malformed, clear it and force login
    document.cookie = 'user=; Max-Age=-99999999;';
    return <Navigate to="/signin" replace />;
  }

  const currentPath = location.pathname;
  const isProfileIncomplete = user.profileCompleted === false || user.profileCompleted === undefined;

  if (user.role === 'Admin' && isProfileIncomplete && currentPath !== '/admin/setup') {
    return <Navigate to="/admin/setup" replace />;
  }

  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
