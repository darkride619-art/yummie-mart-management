import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Package, Map, Camera, DollarSign } from "lucide-react";
import MyOrders from "./MyOrders";
import RouteView from "./RouteView";
import DeliveryProof from "./DeliveryProof";
import Earnings from "./Earnings";

const navItems = [
  { title: "My Orders", path: "/delivery/orders", icon: <Package className="w-4 h-4" /> },
  { title: "Route View", path: "/delivery/routes", icon: <Map className="w-4 h-4" /> },
  { title: "Delivery Proof", path: "/delivery/proof", icon: <Camera className="w-4 h-4" /> },
  { title: "Earnings", path: "/delivery/earnings", icon: <DollarSign className="w-4 h-4" /> },
];

const DeliveryDashboard = () => {
  return (
    <DashboardLayout title="Delivery Dashboard" navItems={navItems}>
      <Routes>
        <Route path="/" element={<Navigate to="/delivery/orders" replace />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/routes" element={<RouteView />} />
        <Route path="/proof" element={<DeliveryProof />} />
        <Route path="/earnings" element={<Earnings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DeliveryDashboard;
