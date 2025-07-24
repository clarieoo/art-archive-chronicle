import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import CuratorDashboard from "./pages/dashboard/CuratorDashboard";
import ProfessorDashboard from "./pages/dashboard/ProfessorDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ReviewArts from "./pages/admin/ReviewArts";
import Categories from "./pages/admin/Categories";
import Reports from "./pages/admin/Reports";
import { UploadArt } from "./pages/curator/UploadArt";
import { ReviewArts as ProfessorReviewArts } from "./pages/professor/ReviewArts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Website Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<DashboardLayout userRole="admin" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="arts" element={<ReviewArts />} />
            <Route path="categories" element={<Categories />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* Curator Dashboard Routes */}
          <Route path="/curator" element={<DashboardLayout userRole="curator" />}>
            <Route index element={<CuratorDashboard />} />
            <Route path="upload" element={<UploadArt />} />
          </Route>

          {/* Professor Dashboard Routes */}
          <Route path="/professor" element={<DashboardLayout userRole="professor" />}>
            <Route index element={<ProfessorDashboard />} />
            <Route path="review" element={<ProfessorReviewArts />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
