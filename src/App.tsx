import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import BudgetProposals from './pages/BudgetProposals';
import SalaryManagement from './pages/SalaryManagement';
import ClientManagement from './pages/ClientManagement';
import InvoiceManagement from './pages/InvoiceManagement';
import EarningsExpenses from './pages/EarningsExpenses';
import Layout from './components/Layout';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import { useAuth, AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Registration from './pages/Registration/Registration';

const ProtectedSuperAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.role !== 'super_admin') return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/super-admin" element={<ProtectedSuperAdminRoute><SuperAdminDashboard /></ProtectedSuperAdminRoute>} />
              <Route path="/app" element={<Layout />}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="budget-proposals" element={<BudgetProposals />} />
                <Route path="salary-management" element={<SalaryManagement />} />
                <Route path="clients" element={<ClientManagement />} />
                <Route path="invoices" element={<InvoiceManagement />} />
                <Route path="earnings-expenses" element={<EarningsExpenses />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;