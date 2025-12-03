"use client";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Navbar1 } from "@/components/navbar1";
import { Footer2 } from "@/components/footer2";
import DashboardHeader from "@/components/dashboard-header";

function LayoutContent({ children }) {
  const { isLoggedIn, loading } = useAuth();

  // Show nothing while checking auth state to prevent flash
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // If logged in, show dashboard header layout
  if (isLoggedIn) {
    return <DashboardHeader>{children}</DashboardHeader>;
  }

  // If not logged in, show default navbar/footer layout
  return (
    <>
      <Navbar1 />
      {children}
      <Footer2 />
    </>
  );
}

export function LayoutWrapper({ children }) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}
