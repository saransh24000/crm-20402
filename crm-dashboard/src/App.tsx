import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    // Simple authentication check (in production, this would be an API call)
    if (username && password) {
      setIsAnimating(true);
      // Determine user role from username
      const roleCredentials: Record<string, { username: string; password: string }> = {
        Admin: { username: "admin@crm.com", password: "admin123" },
        Manager: { username: "manager@crm.com", password: "manager123" },
        Viewer: { username: "viewer@crm.com", password: "viewer123" },
        Recruiter: { username: "recruiter@crm.com", password: "recruiter123" },
        Sales: { username: "sales@crm.com", password: "sales123" },
      };
      
      // Find the role based on username
      let userRole = "User";
      for (const [role, creds] of Object.entries(roleCredentials)) {
        if (creds.username === username) {
          userRole = role;
          break;
        }
      }
      
      // Smooth transition animation
      setTimeout(() => {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", username);
        localStorage.setItem("userRole", userRole);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleLogout = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
      localStorage.removeItem("userRole");
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="relative">
      {!isAuthenticated ? (
        <div
          className={`transition-opacity duration-500 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <Login onLogin={handleLogin} />
        </div>
      ) : (
        <div
          className={`transition-opacity duration-500 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          <Dashboard onLogout={handleLogout} userRole={localStorage.getItem("userRole") || "User"} />
        </div>
      )}
    </div>
  );
}

export default App;
