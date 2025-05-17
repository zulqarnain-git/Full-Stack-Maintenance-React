
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Import pages
import LoginPage from "./pages/LoginPage";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientsPage from "./pages/admin/ClientsPage";
import RepresentativesPage from "./pages/admin/RepresentativesPage";
import ContractsPage from "./pages/admin/ContractsPage";
import RequestsPage from "./pages/admin/RequestsPage";
import ReportsPage from "./pages/admin/ReportsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import ContractUploadPage from "./pages/admin/ContractUploadPage";

// Client pages
import ClientDashboard from "./pages/client/ClientDashboard";
import NewRequestForm from "./pages/client/NewRequestForm";
import ClientRequestsPage from "./pages/client/RequestsPage";
import ClientReportsPage from "./pages/client/ReportsPage";
import ClientSettingsPage from "./pages/client/SettingsPage";

// Representative pages
import RepresentativeDashboard from "./pages/representative/RepresentativeDashboard";
import RepresentativeRequestsPage from "./pages/representative/RequestsPage";
import SchedulePage from "./pages/representative/SchedulePage";
import RepresentativeReportsPage from "./pages/representative/ReportsPage";
import RepresentativeSettingsPage from "./pages/representative/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Navigate to="/login" />} />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/clients" element={<ClientsPage />} />
          <Route path="/admin/representatives" element={<RepresentativesPage />} />
          <Route path="/admin/contracts" element={<ContractsPage />} />
          <Route path="/admin/requests" element={<RequestsPage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
          <Route path="/admin/upload" element={<ContractUploadPage />} />
          
          {/* Client routes */}
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/new-request" element={<NewRequestForm />} />
          <Route path="/client/requests" element={<ClientRequestsPage />} />
          <Route path="/client/reports" element={<ClientReportsPage />} />
          <Route path="/client/settings" element={<ClientSettingsPage />} />
          
          {/* Representative routes */}
          <Route path="/representative/dashboard" element={<RepresentativeDashboard />} />
          <Route path="/representative/requests" element={<RepresentativeRequestsPage />} />
          <Route path="/representative/schedule" element={<SchedulePage />} />
          <Route path="/representative/reports" element={<RepresentativeReportsPage />} />
          <Route path="/representative/settings" element={<RepresentativeSettingsPage />} />
          
          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
