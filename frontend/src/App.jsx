import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import DashboardTemplate from './components/templates/DashboardTemplate';
import OwnerOverview from './pages/dashboard/OwnerOverview';
import KosList from './pages/dashboard/KosList';
import KosForm from './pages/dashboard/KosForm';
import DashboardMessages from './pages/dashboard/DashboardMessages';
import DashboardSettings from './pages/dashboard/DashboardSettings';
import DashboardReviews from './pages/dashboard/DashboardReviews';
import { useAuthStore } from './store/useAuthStore';

// Protected Route Wrapper (contoh sederhana)
const ProtectedRoute = ({ children, roleRequired }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roleRequired && user?.role !== roleRequired) return <Navigate to="/" replace />;
  
  return children;
};

import PublicTemplate from './components/templates/PublicTemplate';
import Home from './pages/public/Home';
import KosDetail from './pages/public/KosDetail';
import Profile from './pages/public/Profile';
import LiveChat from './pages/public/LiveChat';
import AdminTemplate from './components/templates/AdminTemplate';
import AdminOverview from './pages/admin/AdminOverview';
import AdminVerification from './pages/admin/AdminVerification';
import AdminUsers from './pages/admin/AdminUsers';
import AdminKos from './pages/admin/AdminKos';
import AdminFacilities from './pages/admin/AdminFacilities';
import AdminReviews from './pages/admin/AdminReviews';
import AdminSavedKos from './pages/admin/AdminSavedKos';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicTemplate />}>
          <Route path="/" element={<Home />} />
          <Route path="/kos/:id" element={<KosDetail />} />
          
          {/* Protected Profile Route (menggunakan template public) */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Standalone Pages */}
        <Route path="/live-chat" element={<LiveChat />} />

        {/* Dashboard Owner Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute roleRequired="OWNER">
            <DashboardTemplate />
          </ProtectedRoute>
        }>
          <Route index element={<OwnerOverview />} />
          <Route path="kos" element={<KosList />} />
          <Route path="kos/new" element={<KosForm />} />
          <Route path="reviews" element={<DashboardReviews />} />
          <Route path="messages" element={<DashboardMessages />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={
          <ProtectedRoute roleRequired="ADMIN">
            <AdminTemplate />
          </ProtectedRoute>
        }>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="kos" element={<AdminKos />} />
          <Route path="verification" element={<AdminVerification />} />
          <Route path="facilities" element={<AdminFacilities />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="saved-kos" element={<AdminSavedKos />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
