
import { useEffect, useMemo, useState } from "react";

import {
  Search,
  ClipboardList,
  MapPin,
  Eye,
  CheckCircle,
  XCircle,
  X,
  Clock,
  RefreshCw,
  Globe,
  AlertCircle,
} from "lucide-react";

import AdminSidebar from "../components/AdminSidebar";

const API_URL = "http://localhost:5000/api/organizations";

type SubmissionStatus = "Pending" | "Approved" | "Rejected";

type Submission = {
  _id: string;
  organizationName: string;
  category: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  website?: string;
  description: string;
  services: string[];
  createdAt: string;
  status: SubmissionStatus;
};

const ManageSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Fetch real submissions from MongoDB
  const fetchSubmissions = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setError("Your admin session has expired. Please sign in again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        setError("Your session is invalid or expired. Please log in again.");
        return;
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load applications.");
      }

      setSubmissions(data.organizations || []);
    } catch (err) {
      console.error("Fetch submissions error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Search and filter submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) => {
      const matchesSearch =
        submission.organizationName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        submission.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All Statuses" ||
        submission.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [submissions, search, statusFilter]);

  // Approve or reject application through backend
  const updateStatus = async (
    id: string,
    status: "Approved" | "Rejected"
  ) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setError("Please log in again to manage applications.");
      return;
    }

    try {
      setUpdating(true);
      setError("");

      const response = await fetch(`${API_URL}/${id}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        throw new Error("Your session is invalid or expired. Please log in again.");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update application status.");
      }

      // Update UI only after the database confirms success
      const updatedOrganization: Submission = data.organization;

      setSubmissions((previous) =>
        previous.map((submission) =>
          submission._id === id ? updatedOrganization : submission
        )
      );

      setSelectedSubmission(updatedOrganization);
    } catch (err) {
      console.error("Update status error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update application status."
      );
    } finally {
      setUpdating(false);
    }
  };

  // Status badge styling
  const statusClass = (status: SubmissionStatus) => {
    if (status === "Approved") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-orange-100 text-orange-700";
  };

  // Format submission date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const pendingCount = submissions.filter(
    (submission) => submission.status === "Pending"
  ).length;

  const approvedCount = submissions.filter(
    (submission) => submission.status === "Approved"
  ).length;

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex">
      <AdminSidebar />

      <main className="flex-1 min-w-0 p-5 md:p-10">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-[#A64F37] font-semibold tracking-wider">
              APPLICATION MANAGEMENT
            </p>

            <h2 className="text-3xl font-bold text-[#183D31] mt-2">
              Registration Submissions
            </h2>

            <p className="text-gray-500 mt-2">
              Review and manage organization registration applications.
            </p>
          </div>

          <button
            onClick={fetchSubmissions}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#124B39] text-white font-semibold hover:bg-[#0D3C2E] disabled:opacity-50"
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />

            <div>
              <p className="font-semibold">Something went wrong</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-sm">
                Total Applications
              </p>
              <ClipboardList className="text-[#124B39]" size={20} />
            </div>

            <h3 className="text-2xl font-bold text-[#124B39] mt-3">
              {submissions.length}
            </h3>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-sm">
                Pending Review
              </p>
              <Clock className="text-orange-500" size={20} />
            </div>

            <h3 className="text-2xl font-bold text-orange-600 mt-3">
              {pendingCount}
            </h3>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-sm">
                Approved
              </p>
              <CheckCircle className="text-green-600" size={20} />
            </div>

            <h3 className="text-2xl font-bold text-green-700 mt-3">
              {approvedCount}
            </h3>
          </div>
        </div>

        {/* Search and filter */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by organization or email..."
                className="w-full border border-gray-200 rounded-lg py-3 pl-10 pr-3 outline-none focus:border-[#124B39]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-3 outline-none focus:border-[#124B39]"
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-[#183D31]">
              Applications ({filteredSubmissions.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[850px]">
              <thead className="bg-[#F8F7F2] text-gray-500 text-xs uppercase">
                <tr>
                  <th className="p-4">Organization</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">City</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center p-12 text-gray-500">
                      Loading applications from database...
                    </td>
                  </tr>
                ) : (
                  <>
                    {filteredSubmissions.map((submission) => (
                      <tr
                        key={submission._id}
                        className="border-t border-gray-100"
                      >
                        <td className="p-4">
                          <p className="font-semibold text-[#183D31]">
                            {submission.organizationName}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {submission.email}
                          </p>
                        </td>

                        <td className="p-4 text-sm text-gray-600">
                          {submission.category}
                        </td>

                        <td className="p-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin size={15} />
                            {submission.city}
                          </span>
                        </td>

                        <td className="p-4 text-sm text-gray-600">
                          {formatDate(submission.createdAt)}
                        </td>

                        <td className="p-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusClass(
                              submission.status
                            )}`}
                          >
                            {submission.status}
                          </span>
                        </td>

                        <td className="p-4">
                          <div className="flex justify-end">
                            <button
                              onClick={() =>
                                setSelectedSubmission(submission)
                              }
                              className="flex items-center gap-2 px-3 py-2 bg-[#E9F1EC] text-[#124B39] rounded-lg text-sm font-semibold hover:bg-[#DCEAE0]"
                            >
                              <Eye size={16} />
                              Review
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredSubmissions.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center p-10 text-gray-500"
                        >
                          No applications found.
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Review Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[#A64F37]">
                  APPLICATION REVIEW
                </p>

                <h3 className="text-xl font-bold text-[#183D31] mt-1">
                  {selectedSubmission.organizationName}
                </h3>
              </div>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-xs text-gray-400">Category</p>
                  <p className="font-semibold text-gray-800 mt-1">
                    {selectedSubmission.category}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">City</p>
                  <p className="font-semibold text-gray-800 mt-1">
                    {selectedSubmission.city}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="font-semibold text-gray-800 mt-1 break-all">
                    {selectedSubmission.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="font-semibold text-gray-800 mt-1">
                    {selectedSubmission.phone}
                  </p>
                </div>

                {selectedSubmission.website && (
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-400">Website</p>
                    <a
                      href={selectedSubmission.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-semibold text-[#145C45] mt-1 break-all hover:underline"
                    >
                      <Globe size={16} />
                      {selectedSubmission.website}
                    </a>
                  </div>
                )}

                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="font-semibold text-gray-800 mt-1">
                    {selectedSubmission.address}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-400">Description</p>
                  <p className="text-gray-700 mt-1 leading-7">
                    {selectedSubmission.description}
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-xs text-gray-400">Services</p>
                  <p className="text-gray-700 mt-1 leading-7">
                    {Array.isArray(selectedSubmission.services)
                      ? selectedSubmission.services.join(", ")
                      : "No services provided"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Submission Date</p>
                  <p className="font-semibold text-gray-800 mt-1">
                    {formatDate(selectedSubmission.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">Current Status</p>

                  <span
                    className={`inline-block mt-1 text-xs font-semibold px-3 py-1.5 rounded-full ${statusClass(
                      selectedSubmission.status
                    )}`}
                  >
                    {selectedSubmission.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Approval and rejection buttons */}
            <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() =>
                  updateStatus(selectedSubmission._id, "Rejected")
                }
                disabled={
                  updating || selectedSubmission.status === "Rejected"
                }
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-50 text-red-700 font-semibold hover:bg-red-100 disabled:opacity-40"
              >
                <XCircle size={18} />
                {updating ? "Updating..." : "Reject"}
              </button>

              <button
                onClick={() =>
                  updateStatus(selectedSubmission._id, "Approved")
                }
                disabled={
                  updating || selectedSubmission.status === "Approved"
                }
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#124B39] text-white font-semibold hover:bg-[#0D3C2E] disabled:opacity-40"
              >
                <CheckCircle size={18} />
                {updating ? "Updating..." : "Approve"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSubmissions;
