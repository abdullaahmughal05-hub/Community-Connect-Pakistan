import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageOrganizations from "./pages/ManageOrganizations";
import ManageSubmissions from "./pages/ManageSubmissions";
import AdminSettings from "./pages/AdminSettings";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/organizations" element={<ManageOrganizations />} />
          <Route path="/submissions" element={<ManageSubmissions />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Route>

        {/* Default routes */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;