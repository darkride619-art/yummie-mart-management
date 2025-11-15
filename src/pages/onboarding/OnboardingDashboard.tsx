import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { UserCheck } from "lucide-react";
import SellerKYC from "./SellerKYC";

const navItems = [
  { title: "Seller KYC", path: "/onboarding/kyc", icon: <UserCheck className="w-4 h-4" /> },
];

const OnboardingDashboard = () => {
  return (
    <DashboardLayout title="Onboarding Dashboard" navItems={navItems}>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding/kyc" replace />} />
        <Route path="/kyc" element={<SellerKYC />} />
      </Routes>
    </DashboardLayout>
  );
};

export default OnboardingDashboard;
