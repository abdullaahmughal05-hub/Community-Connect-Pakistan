import { useEffect, useState } from "react";
import {
  User,
  Bell,
  ShieldCheck,
  Save,
  LogOut,
  Mail,
  Building2,
  LockKeyhole,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

type SettingsData = {
  name: string;
  email: string;
  applicationNotifications: boolean;
  organizationNotifications: boolean;
  emailNotifications: boolean;
};

const STORAGE_KEY = "communityAdminSettings";

const defaultSettings: SettingsData = {
  name: "Community Administrator",
  email: "admin@communityconnect.pk",
  applicationNotifications: true,
  organizationNotifications: true,
  emailNotifications: false,
};

const AdminSettings = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState<SettingsData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateField = (
    field: keyof SettingsData,
    value: string | boolean
  ) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
    setSavedMessage("");
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSavedMessage("Your settings have been saved successfully.");

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8F7F2]">
      <AdminSidebar />

      <main className="flex-1 min-w-0 p-5 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <p className="text-xs font-bold tracking-widest text-[#B45B3E] uppercase mb-2">
              ADMINISTRATION
            </p>

            <h1 className="text-3xl font-bold text-[#124B39]">
              Settings
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Manage your administrator profile and application preferences.
            </p>
          </div>

          {/* Success Message */}
          {savedMessage && (
            <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              <CheckCircle2 size={18} />
              {savedMessage}
            </div>
          )}

          <div className="space-y-6">
            {/* Admin Profile */}
            <section className="bg-white rounded-2xl border border-[#E9E3D7] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#E8F1EC] text-[#124B39] flex items-center justify-center">
                  <User size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-[#124B39]">
                    Administrator Profile
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage your displayed administrator information.
                  </p>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Administrator Name
                  </label>

                  <div className="relative">
                    <User
                      size={17}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <input
                      type="text"
                      value={settings.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-[#124B39] focus:ring-2 focus:ring-[#124B39]/10"
                      placeholder="Enter administrator name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-sm outline-none focus:border-[#124B39] focus:ring-2 focus:ring-[#124B39]/10"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section className="bg-white rounded-2xl border border-[#E9E3D7] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#FFF3E8] text-[#B45B3E] flex items-center justify-center">
                  <Bell size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-[#124B39]">
                    Notification Preferences
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Choose which notifications you want to enable.
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <label className="flex items-center justify-between gap-4 cursor-pointer">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      New Registration Applications
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Notifications for newly submitted organization applications.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={settings.applicationNotifications}
                    onChange={(e) =>
                      updateField("applicationNotifications", e.target.checked)
                    }
                    className="w-5 h-5 accent-[#124B39] cursor-pointer"
                  />
                </label>

                <div className="border-t border-gray-100" />

                <label className="flex items-center justify-between gap-4 cursor-pointer">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Organization Updates
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Notifications about organization listing changes.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={settings.organizationNotifications}
                    onChange={(e) =>
                      updateField("organizationNotifications", e.target.checked)
                    }
                    className="w-5 h-5 accent-[#124B39] cursor-pointer"
                  />
                </label>

                <div className="border-t border-gray-100" />

                <label className="flex items-center justify-between gap-4 cursor-pointer">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Email Notifications
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Email alerts for important admin activities.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      updateField("emailNotifications", e.target.checked)
                    }
                    className="w-5 h-5 accent-[#124B39] cursor-pointer"
                  />
                </label>
              </div>
            </section>

            {/* Security */}
            <section className="bg-white rounded-2xl border border-[#E9E3D7] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#F0EEFA] text-[#6554A4] flex items-center justify-center">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-[#124B39]">
                    Account & Security
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Administrator account information.
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                    <LockKeyhole size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Administrator Login
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Current demo login: admin@communityconnect.pk
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                    <Building2 size={19} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Portal
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Community Connect Pakistan — Admin Portal
                    </p>
                  </div>
                </div>

                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg p-3">
                  This is currently a frontend demo. Profile changes do not
                  update login credentials, and real password management will
                  be implemented with backend authentication.
                </p>
              </div>
            </section>

            {/* Save and Logout */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 pb-8">
              <button
                onClick={() => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminInfo");
  navigate("/login", { replace: true });
}}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold transition"
              >
                <LogOut size={17} />
                Logout
              </button>

              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#124B39] text-white hover:bg-[#0D3D2E] text-sm font-semibold transition shadow-sm"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;