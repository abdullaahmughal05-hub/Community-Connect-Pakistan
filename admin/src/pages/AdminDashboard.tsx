
import {
  Building2,
  ClipboardList,
  Users,
  Settings,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Organizations", value: "06", icon: Building2 },
    { title: "Pending Submissions", value: "03", icon: ClipboardList },
    { title: "Approved Listings", value: "06", icon: Users },
    { title: "Total Categories", value: "09", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex">
      <AdminSidebar />

      <main className="flex-1 min-w-0 p-6 md:p-10">
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[#183D31]">
              Dashboard
            </h2>
            <p className="text-gray-500 mt-2">
              Welcome to Community Connect Pakistan administration.
            </p>
          </div>

          <span className="bg-[#124B39] text-white px-4 py-2 rounded-lg text-sm">
            Administrator
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="w-11 h-11 rounded-xl bg-[#E9F1EC] text-[#124B39] flex items-center justify-center mb-5">
                  <Icon size={22} />
                </div>

                <p className="text-gray-500 text-sm">{item.title}</p>

                <h3 className="text-3xl font-bold text-[#183D31] mt-2">
                  {item.value}
                </h3>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 mt-8 border border-gray-100">
          <h3 className="text-xl font-bold text-[#183D31]">
            Welcome to your Admin Dashboard
          </h3>

          <p className="text-gray-500 mt-3 leading-7">
            Manage organizations, review registration submissions,
            and maintain categories and cities from this portal.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
