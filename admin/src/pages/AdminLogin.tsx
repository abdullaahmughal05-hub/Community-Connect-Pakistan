
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.token) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminInfo", JSON.stringify(data.admin));

      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8F7F2]">
      {/* Left branding section */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#124B39] text-white p-16 flex-col justify-between relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #E7C77E 1.5px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#E7C77E] text-[#124B39] flex items-center justify-center">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h1 className="font-bold text-xl">Community Connect</h1>
              <p className="text-xs text-emerald-100">PAKISTAN</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="text-[#E7C77E] text-sm font-semibold tracking-[0.25em] mb-5">
            ADMINISTRATION PORTAL
          </p>

          <h2 className="text-5xl font-bold leading-tight mb-6">
            Empowering communities through meaningful connections.
          </h2>

          <p className="text-emerald-100 text-lg leading-8">
            Manage organizations, review registration requests, and help
            connect people with community services across Pakistan.
          </p>

          <div className="mt-10 text-3xl text-[#E7C77E]">
            خدمتِ خلق
          </div>
          <p className="text-emerald-200 text-sm mt-2">
            Serving communities, building a better Pakistan.
          </p>
        </div>

        <p className="relative z-10 text-sm text-emerald-200">
          © 2026 Community Connect Pakistan
        </p>
      </div>

      {/* Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-10">
            <div className="w-14 h-14 bg-[#124B39] text-[#E7C77E] rounded-2xl flex items-center justify-center">
              <ShieldCheck size={30} />
            </div>
          </div>

          <div className="mb-10">
            <p className="text-[#A64F37] font-semibold text-sm tracking-widest mb-3">
              ADMIN PORTAL
            </p>
            <h2 className="text-3xl font-bold text-[#183D31]">
              Welcome back
            </h2>
            <p className="text-gray-500 mt-3">
              Sign in to access your administration dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="flex items-center border border-gray-200 bg-white rounded-xl px-4 focus-within:border-[#124B39]">
                <Mail size={19} className="text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@communityconnect.pk"
                  className="w-full p-4 outline-none bg-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="flex items-center border border-gray-200 bg-white rounded-xl px-4 focus-within:border-[#124B39]">
                <Lock size={19} className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full p-4 outline-none bg-transparent text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-[#124B39]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#124B39] hover:bg-[#0D3C2E] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition"
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <ArrowRight size={19} />}
            </button>
          </form>

          <div className="mt-8 p-4 bg-[#EFEDE4] rounded-xl">
            <p className="text-xs font-bold text-[#124B39] mb-2">
              SECURE ADMIN LOGIN
            </p>
            <p className="text-xs text-gray-600">
              Enter your configured administrator email and password.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Credentials are verified by the backend server.
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            Authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
