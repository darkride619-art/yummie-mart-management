import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Headphones } from "lucide-react";
import SupportTickets from "./SupportTickets";

const navItems = [
  { title: "Support Tickets", path: "/support/tickets", icon: <Headphones className="w-4 h-4" /> },
];

const SupportDashboard = () => {
  return (
    <DashboardLayout title="Support Dashboard" navItems={navItems}>
      <Routes>
        <Route path="/" element={<Navigate to="/support/tickets" replace />} />
        <Route path="/tickets" element={<SupportTickets />} />
      </Routes>
    </DashboardLayout>
  );
};

export default SupportDashboard;
