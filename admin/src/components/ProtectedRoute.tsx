import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth/me";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminInfo");
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication verification failed:", error);
        // Do not clear a valid-looking token just because the server is offline.
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F2]">
        <p className="text-[#124B39] font-semibold">
          Verifying administrator access...
        </p>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;