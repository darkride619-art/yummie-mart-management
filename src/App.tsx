import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ModeratorDashboard from "./pages/moderator/ModeratorDashboard";
import FinanceDashboard from "./pages/finance/FinanceDashboard";
import OnboardingDashboard from "./pages/onboarding/OnboardingDashboard";
import SupportDashboard from "./pages/support/SupportDashboard";
import DeliveryDashboard from "./pages/delivery/DeliveryDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/moderator/*" element={<ModeratorDashboard />} />
          <Route path="/finance/*" element={<FinanceDashboard />} />
          <Route path="/onboarding/*" element={<OnboardingDashboard />} />
          <Route path="/support/*" element={<SupportDashboard />} />
          <Route path="/delivery/*" element={<DeliveryDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
