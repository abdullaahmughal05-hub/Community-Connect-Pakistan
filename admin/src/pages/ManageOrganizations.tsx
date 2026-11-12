import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Search,
  Plus,
  MapPin,
  Pencil,
  Trash2,
  X,
  RefreshCw,
} from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

const API_URL = "http://localhost:5000/api/organizations";

type OrganizationStatus = "Approved" | "Pending" | "Rejected";

type Organization = {
  _id: string;
  organizationName: string;
  email: string;
  phone: string;
  website?: string;
  category: string;
  city: string;
  address: string;
  description: string;
  services: string[];
  status: OrganizationStatus;
  createdAt?: string;
};

type OrganizationForm = {
  organizationName: string;
  email: string;
  phone: string;
  website: string;
  category: string;
  city: string;
  address: string;
  description: string;
  services: string;
  status: OrganizationStatus;
};

const emptyForm: OrganizationForm = {
  organizationName: "",
  email: "",
  phone: "",
  website: "",
  category: "Community Welfare",
  city: "Lahore",
  address: "",
  description: "",
  services: "",
  status: "Pending",
};

const categories = [
  "Community Welfare",
  "Child Welfare",
  "Education",
  "Healthcare",
  "Food & Hunger Relief",
  "Environment",
  "Disaster Relief",
  "Humanitarian Aid",
  "Child Protection",
  "Emergency and Social Welfare",
  "Disability Support",
  "Women Empowerment",
  "Animal Welfare",
];

const cities = ["Lahore", "Karachi", "Peshawar", "Islamabad", "Rawalpindi"];

const ManageOrganizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<OrganizationForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const getToken = () => localStorage.getItem("adminToken");

  const apiRequest = async (url: string, options: RequestInit = {}) => {
    const token = getToken();
    if (!token) {
      throw new Error("Your admin session is missing. Please sign in again.");
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));
    if (response.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminInfo");
      throw new Error("Your session has expired. Please sign in again.");
    }
    if (!response.ok || data.success === false) {
      throw new Error(data.message || "The request could not be completed.");
    }
    return data;
  };

  const loadOrganizations = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiRequest(API_URL);
      setOrganizations(Array.isArray(data.organizations) ? data.organizations : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load organizations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadOrganizations();
  }, []);

  const filteredOrganizations = useMemo(() => {
    const query = search.trim().toLowerCase();
    return organizations.filter((org) => {
      const matchesSearch =
        !query ||
        org.organizationName.toLowerCase().includes(query) ||
        org.email.toLowerCase().includes(query) ||
        org.phone.toLowerCase().includes(query) ||
        org.description.toLowerCase().includes(query);
      const matchesCategory = categoryFilter === "All Categories" || org.category === categoryFilter;
      const matchesCity = cityFilter === "All Cities" || org.city === cityFilter;
      const matchesStatus = statusFilter === "All Statuses" || org.status === statusFilter;
      return matchesSearch && matchesCategory && matchesCity && matchesStatus;
    });
  }, [organizations, search, categoryFilter, cityFilter, statusFilter]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  const openEditModal = (org: Organization) => {
    setEditingId(org._id);
    setForm({
      organizationName: org.organizationName,
      email: org.email,
      phone: org.phone,
      website: org.website || "",
      category: org.category,
      city: org.city,
      address: org.address,
      description: org.description,
      services: (org.services || []).join(", "),
      status: org.status,
    });
    setError("");
    setShowModal(true);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    const payload = {
      organizationName: form.organizationName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      website: form.website.trim(),
      category: form.category,
      city: form.city,
      address: form.address.trim(),
      description: form.description.trim(),
      services: form.services.split(",").map((service) => service.trim()).filter(Boolean),
      status: form.status,
    };

    try {
      if (editingId) {
        await apiRequest(`${API_URL}/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
        setNotice("Organization updated successfully.");
      } else {
        await apiRequest(API_URL, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setNotice("Organization added successfully.");
      }
      setShowModal(false);
      setEditingId(null);
      setForm(emptyForm);
      await loadOrganizations();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save organization.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this organization permanently from the database?")) return;
    setError("");
    setNotice("");
    try {
      await apiRequest(`${API_URL}/${id}`, { method: "DELETE" });
      setOrganizations((current) => current.filter((org) => org._id !== id));
      setNotice("Organization deleted successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete organization.");
    }
  };

  const handleStatusChange = async (id: string, status: OrganizationStatus) => {
    setError("");
    setNotice("");
    try {
      const data = await apiRequest(`${API_URL}/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setOrganizations((current) =>
        current.map((org) => (org._id === id ? data.organization : org))
      );
      setNotice(`Status changed to ${status}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update status.");
    }
  };

  const approvedCount = organizations.filter((org) => org.status === "Approved").length;
  const pendingCount = organizations.filter((org) => org.status === "Pending").length;
  const rejectedCount = organizations.filter((org) => org.status === "Rejected").length;

  const inputClass = "w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-[#124B39] focus:ring-1 focus:ring-[#124B39]";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-5 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-[#A64F37] font-semibold tracking-wider">MANAGEMENT</p>
            <h2 className="text-3xl font-bold text-[#183D31] mt-2">Organizations</h2>
            <p className="text-gray-500 mt-2">Manage organization records stored in MongoDB.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => void loadOrganizations()} className="border border-gray-200 bg-white text-[#124B39] px-4 py-3 rounded-xl flex items-center gap-2 font-semibold">
              <RefreshCw size={18} /> Refresh
            </button>
            <button onClick={openAddModal} className="bg-[#124B39] hover:bg-[#0D3C2E] text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold">
              <Plus size={19} /> Add Organization
            </button>
          </div>
        </div>

        {notice && <div className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-800 p-3 text-sm">{notice}</div>}
        {error && !showModal && <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 p-3 text-sm">{error}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-7">
          {[
            ["Total Organizations", organizations.length, "text-[#124B39]"],
            ["Approved", approvedCount, "text-green-700"],
            ["Pending", pendingCount, "text-orange-600"],
            ["Rejected", rejectedCount, "text-red-600"],
          ].map(([label, value, color]) => (
            <div key={String(label)} className="bg-white border border-gray-100 rounded-xl p-5">
              <p className="text-gray-500 text-sm">{label}</p>
              <h3 className={`text-2xl font-bold mt-2 ${color}`}>{value}</h3>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search size={19} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search organizations..." className={`${inputClass} pl-10`} />
            </div>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className={inputClass}>
              <option>All Categories</option>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className={inputClass}>
              <option>All Cities</option>
              {cities.map((city) => <option key={city}>{city}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={inputClass}>
              <option>All Statuses</option>
              <option>Approved</option><option>Pending</option><option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-[#183D31]">Organization Listings ({filteredOrganizations.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1050px]">
              <thead className="bg-[#F8F7F2] text-gray-500 text-xs uppercase">
                <tr>
                  <th className="p-4">Organization</th><th className="p-4">Category</th><th className="p-4">City</th><th className="p-4">Contact</th><th className="p-4">Status</th><th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="text-center p-10 text-gray-500">Loading organizations from MongoDB...</td></tr>
                ) : filteredOrganizations.map((org) => (
                  <tr key={org._id} className="border-t border-gray-100 align-top">
                    <td className="p-4 max-w-xs">
                      <div className="font-semibold text-[#183D31]">{org.organizationName}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{org.description}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{org.category}</td>
                    <td className="p-4 text-sm text-gray-600"><span className="flex items-center gap-1"><MapPin size={15} />{org.city}</span></td>
                    <td className="p-4 text-xs text-gray-600"><div>{org.email}</div><div className="mt-1">{org.phone}</div>{org.website && <a className="text-blue-700 underline mt-1 inline-block" href={org.website} target="_blank" rel="noreferrer">Website</a>}</td>
                    <td className="p-4">
                      <select value={org.status} onChange={(e) => void handleStatusChange(org._id, e.target.value as OrganizationStatus)} className={`text-xs font-semibold px-2 py-2 rounded-lg border ${org.status === "Approved" ? "bg-green-50 text-green-700 border-green-200" : org.status === "Rejected" ? "bg-red-50 text-red-700 border-red-200" : "bg-orange-50 text-orange-700 border-orange-200"}`}>
                        <option value="Pending">Pending</option><option value="Approved">Approved</option><option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-4"><div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditModal(org)} title="Edit organization" className="p-2 text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg"><Pencil size={17} /></button>
                      <button onClick={() => void handleDelete(org._id)} title="Delete organization" className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"><Trash2 size={17} /></button>
                    </div></td>
                  </tr>
                ))}
                {!loading && filteredOrganizations.length === 0 && <tr><td colSpan={6} className="text-center p-10 text-gray-500">No organizations found in the database.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <div><h3 className="text-xl font-bold text-[#183D31]">{editingId ? "Edit Organization" : "Add Organization"}</h3><p className="text-sm text-gray-500 mt-1">All required fields must be completed.</p></div>
              <button type="button" onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100"><X size={20} /></button>
            </div>
            {error && <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 p-3 text-sm">{error}</div>}
            <form onSubmit={handleSave} className="space-y-4">
              <div><label className={labelClass}>Organization Name *</label><input required value={form.organizationName} onChange={(e) => setForm({ ...form, organizationName: e.target.value })} className={inputClass} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={labelClass}>Email *</label><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Phone *</label><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} /></div>
                <div><label className={labelClass}>Website</label><input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputClass} placeholder="https://" /></div>
                <div><label className={labelClass}>Category *</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass}>{categories.map((category) => <option key={category}>{category}</option>)}</select></div>
                <div><label className={labelClass}>City *</label><select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass}>{cities.map((city) => <option key={city}>{city}</option>)}</select></div>
                <div><label className={labelClass}>Status *</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as OrganizationStatus })} className={inputClass}><option>Pending</option><option>Approved</option><option>Rejected</option></select></div>
              </div>
              <div><label className={labelClass}>Full Address *</label><input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} /></div>
              <div><label className={labelClass}>Description *</label><textarea required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass} /></div>
              <div><label className={labelClass}>Services (separate with commas)</label><input value={form.services} onChange={(e) => setForm({ ...form, services: e.target.value })} className={inputClass} placeholder="Food support, education, healthcare" /></div>
              <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-gray-200 rounded-xl py-3 font-semibold">Cancel</button><button disabled={saving} type="submit" className="flex-1 bg-[#124B39] text-white rounded-xl py-3 font-semibold hover:bg-[#0D3C2E] disabled:opacity-60">{saving ? "Saving..." : editingId ? "Save Changes" : "Add Organization"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrganizations;
