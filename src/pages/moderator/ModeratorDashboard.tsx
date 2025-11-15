import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Star } from "lucide-react";
import ProductReviews from "./ProductReviews";

const navItems = [
  { title: "Product Reviews", path: "/moderator/reviews", icon: <Star className="w-4 h-4" /> },
];

const ModeratorDashboard = () => {
  return (
    <DashboardLayout title="Product Moderator Dashboard" navItems={navItems}>
      <Routes>
        <Route path="/" element={<Navigate to="/moderator/reviews" replace />} />
        <Route path="/reviews" element={<ProductReviews />} />
      </Routes>
    </DashboardLayout>
  );
};

export default ModeratorDashboard;
