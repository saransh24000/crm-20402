import React, { useState } from "react";
import { Lock, User, Eye, EyeOff } from "lucide-react";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });

  // Login credentials for each role
  const roleCredentials: Record<string, { username: string; password: string }> = {
    Admin: { username: "admin@crm.com", password: "admin123" },
    Manager: { username: "manager@crm.com", password: "manager123" },
    Viewer: { username: "viewer@crm.com", password: "viewer123" },
    Recruiter: { username: "recruiter@crm.com", password: "recruiter123" },
    Sales: { username: "sales@crm.com", password: "sales123" },
  };

  const roles = ["Admin", "Manager", "Viewer", "Recruiter", "Sales"];

  const handleRoleClick = (role: string) => {
    const credentials = roleCredentials[role];
    if (credentials) {
      setUsername(credentials.username);
      setPassword(credentials.password);
      setSelectedRole(role);
    }
  };

  // 3D mouse tracking for card tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setCardRotation({ x: rotateX, y: rotateY });
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setCardRotation({ x: 0, y: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setIsLoading(true);
      // Simulate login delay for smooth animation
      setTimeout(() => {
        onLogin(username, password);
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background with clouds and stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50">
        {/* Cloud effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-32 bg-white rounded-full blur-3xl opacity-60"></div>
          <div className="absolute top-40 right-20 w-80 h-40 bg-white rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-32 left-1/4 w-72 h-36 bg-white rounded-full blur-3xl opacity-55"></div>
          <div className="absolute bottom-20 right-1/3 w-60 h-32 bg-white rounded-full blur-3xl opacity-45"></div>
        </div>
        {/* Star-like specks */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full blur-sm opacity-70"></div>
        <div className="absolute top-32 left-32 w-1.5 h-1.5 bg-white rounded-full blur-sm opacity-60"></div>
        <div className="absolute bottom-40 right-32 w-2 h-2 bg-white rounded-full blur-sm opacity-65"></div>
        <div className="absolute bottom-28 right-20 w-1.5 h-1.5 bg-white rounded-full blur-sm opacity-55"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-sm">
        <div
          className="bg-white/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/30 transition-transform duration-300 ease-out"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            transform: `perspective(1000px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg) scale3d(1, 1, 1)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Header with Padlock Icon */}
          <div 
            className="text-center mb-6 transition-transform duration-500"
            style={{
              transform: `translateZ(50px) translateY(${cardRotation.x * 0.5}px)`,
            }}
          >
            <div className="flex justify-center mb-3">
              <Lock 
                size={40} 
                className="text-cyan-400 transition-all duration-500" 
                strokeWidth={1.5}
                style={{
                  transform: `translateZ(30px) rotateY(${cardRotation.y * 0.3}deg)`,
                  filter: `drop-shadow(0 0 ${Math.abs(cardRotation.y) * 2}px rgba(56, 189, 248, 0.5))`,
                }}
              />
            </div>
            <h1 
              className="text-2xl font-bold text-blue-900 uppercase tracking-wide transition-all duration-500"
              style={{
                transform: `translateZ(40px)`,
                textShadow: `0 ${cardRotation.x * 0.5}px ${Math.abs(cardRotation.x) * 2}px rgba(0, 0, 0, 0.2)`,
              }}
            >
              LOGIN
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field */}
            <div 
              className="relative transition-transform duration-500"
              style={{
                transform: `translateZ(30px) translateY(${cardRotation.x * 0.3}px)`,
              }}
            >
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="USERNAME"
                className="w-full px-3 py-3 pr-10 rounded-xl bg-white/30 backdrop-blur-sm border border-cyan-300/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm hover:shadow-lg"
                style={{
                  transform: `translateZ(20px)`,
                  boxShadow: `0 ${Math.abs(cardRotation.x) * 0.5}px ${Math.abs(cardRotation.x) * 2}px rgba(56, 189, 248, 0.2)`,
                }}
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <User 
                  size={18} 
                  className="text-cyan-400 transition-transform duration-300" 
                  strokeWidth={1.5}
                  style={{
                    transform: `translateZ(25px) rotateY(${cardRotation.y * 0.2}deg)`,
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div 
              className="relative transition-transform duration-500"
              style={{
                transform: `translateZ(30px) translateY(${cardRotation.x * 0.3}px)`,
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PASSWORD"
                className="w-full px-3 py-3 pr-10 rounded-xl bg-white/30 backdrop-blur-sm border border-cyan-300/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm hover:shadow-lg"
                style={{
                  transform: `translateZ(20px)`,
                  boxShadow: `0 ${Math.abs(cardRotation.x) * 0.5}px ${Math.abs(cardRotation.x) * 2}px rgba(56, 189, 248, 0.2)`,
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 hover:text-cyan-500 transition-all duration-300"
                style={{
                  transform: `translateZ(25px) rotateY(${cardRotation.y * 0.2}deg)`,
                }}
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={1.5} />
                ) : (
                  <Eye size={18} strokeWidth={1.5} />
                )}
              </button>
            </div>

            {/* Role Selection Buttons */}
            <div className="space-y-2">
              <p className="text-xs text-gray-600 text-center font-medium">
                Quick Login (Click to fill credentials)
              </p>
              <div className="grid grid-cols-5 gap-1.5">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleRoleClick(role)}
                    className={`py-2 px-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wide transition-all duration-300 backdrop-blur-sm border ${
                      selectedRole === role
                        ? "bg-cyan-400/40 border-cyan-400 text-cyan-700 shadow-lg scale-105"
                        : "bg-white/20 border-cyan-300/50 text-gray-700 hover:bg-white/30 hover:scale-105"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-white uppercase tracking-wide text-sm shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              style={{
                background: "linear-gradient(90deg, #60a5fa 0%, #38bdf8 30%, #ffffff 50%, #38bdf8 70%, #60a5fa 100%)",
                backgroundSize: "200% 100%",
                boxShadow: `0 ${4 + Math.abs(cardRotation.x) * 0.5}px ${15 + Math.abs(cardRotation.x) * 2}px rgba(56, 189, 248, 0.4)`,
                transform: `translateZ(40px) translateY(${cardRotation.x * 0.4}px) rotateX(${cardRotation.x * 0.1}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <span
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                  animation: "shimmer 3s infinite",
                }}
              ></span>
              <span className="relative z-10">
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </span>
                ) : (
                  "SIGN IN"
                )}
              </span>
            </button>

            {/* Request Access Button */}
            <button
              type="button"
              onClick={() => {
                alert("Request Access functionality would be implemented here");
              }}
              className="w-full py-3 rounded-xl font-semibold text-gray-700 uppercase tracking-wide text-sm bg-white/20 backdrop-blur-sm border border-cyan-300/50 hover:bg-white/30 hover:border-cyan-400/70 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg"
              style={{
                transform: `translateZ(35px) translateY(${cardRotation.x * 0.3}px)`,
                boxShadow: `0 ${2 + Math.abs(cardRotation.x) * 0.3}px ${8 + Math.abs(cardRotation.x) * 1.5}px rgba(0, 0, 0, 0.1)`,
              }}
            >
              Request Access
            </button>

            {/* Links */}
            <div className="flex justify-between text-xs">
              <a
                href="#"
                className="text-gray-600 hover:text-cyan-400 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Forgot Password functionality would be implemented here");
                }}
              >
                Forgot Password?
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-cyan-400 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Create Account functionality would be implemented here");
                }}
              >
                Create Account
              </a>
            </div>

            {/* Social Login Icons */}
            <div className="flex justify-center gap-3 pt-3">
              {/* Facebook */}
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border border-cyan-300/50 flex items-center justify-center text-white hover:bg-white/40 hover:scale-110 transition-all duration-300"
                onClick={() => alert("Facebook login would be implemented here")}
              >
                <span className="text-base font-bold text-blue-600">f</span>
              </button>
              {/* Google */}
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border border-cyan-300/50 flex items-center justify-center text-white hover:bg-white/40 hover:scale-110 transition-all duration-300"
                onClick={() => alert("Google login would be implemented here")}
              >
                <span className="text-base font-bold text-red-500">G</span>
              </button>
              {/* Twitter */}
              <button
                type="button"
                className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border border-cyan-300/50 flex items-center justify-center text-white hover:bg-white/40 hover:scale-110 transition-all duration-300"
                onClick={() => alert("Twitter login would be implemented here")}
              >
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* CSS Animation for shimmer effect and 3D animations */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes float3D {
          0%, 100% {
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: translateY(-10px) rotateX(2deg) rotateY(-1deg);
          }
          50% {
            transform: translateY(-5px) rotateX(0deg) rotateY(1deg);
          }
          75% {
            transform: translateY(-10px) rotateX(-2deg) rotateY(-1deg);
          }
        }
        
        @keyframes glow3D {
          0%, 100% {
            filter: drop-shadow(0 0 5px rgba(56, 189, 248, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(56, 189, 248, 0.6));
          }
        }
        
        .login-card-3d {
          animation: float3D 6s ease-in-out infinite;
        }
        
        .lock-icon-3d {
          animation: glow3D 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Login;

