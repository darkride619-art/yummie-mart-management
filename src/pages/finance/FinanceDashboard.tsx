import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Receipt } from "lucide-react";
import PaymentsInvoices from "./PaymentsInvoices";

const navItems = [
  { title: "Payments & Invoices", path: "/finance/payments", icon: <Receipt className="w-4 h-4" /> },
];

const FinanceDashboard = () => {
  return (
    <DashboardLayout title="Finance Dashboard" navItems={navItems}>
      <Routes>
        <Route path="/" element={<Navigate to="/finance/payments" replace />} />
        <Route path="/payments" element={<PaymentsInvoices />} />
      </Routes>
    </DashboardLayout>
  );
};

export default FinanceDashboard;
