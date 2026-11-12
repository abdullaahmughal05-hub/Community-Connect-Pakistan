
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
  Heart,
  Building2,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/organizations/approved";

type Organization = {
  _id: string;
  organizationName: string;
  category: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  description: string;
  services: string[];
};

const getOrganizationStyle = (category: string) => {
  const styles: Record<string, { initials: string; color: string }> = {
    Healthcare: {
      initials: "HC",
      color: "bg-emerald-100 text-emerald-800",
    },
    Education: {
      initials: "ED",
      color: "bg-blue-100 text-blue-800",
    },
    "Food & Hunger Relief": {
      initials: "FH",
      color: "bg-orange-100 text-orange-800",
    },
    Environment: {
      initials: "EN",
      color: "bg-green-100 text-green-800",
    },
    "Child Welfare": {
      initials: "CW",
      color: "bg-purple-100 text-purple-800",
    },
    "Disaster Relief": {
      initials: "DR",
      color: "bg-amber-100 text-amber-800",
    },
    "Employment & Skills": {
      initials: "ES",
      color: "bg-indigo-100 text-indigo-800",
    },
  };

  return (
    styles[category] || {
      initials: "OR",
      color: "bg-gray-100 text-gray-800",
    }
  );
};

const OrganizationDetails = () => {
  const { id } = useParams();

  const [organization, setOrganization] =
    useState<Organization | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch approved organizations and find the requested MongoDB ID
  const fetchOrganization = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load organization details."
        );
      }

      const foundOrganization = (data.organizations || []).find(
        (org: Organization) => org._id === id
      );

      setOrganization(foundOrganization || null);
    } catch (err) {
      console.error("Organization details error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FAF8F1] px-6 text-center">
        <RefreshCw
          size={35}
          className="animate-spin text-[#145C45]"
        />

        <p className="mt-5 font-semibold text-[#174B39]">
          Loading organization details...
        </p>
      </div>
    );
  }

  // API error
  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FAF8F1] px-6 text-center">
        <AlertCircle size={50} className="text-red-600" />

        <h1 className="mt-5 text-3xl font-bold text-[#174B39]">
          Unable to Load Organization
        </h1>

        <p className="mt-3 max-w-lg text-slate-500">
          {error}
        </p>

        <button
          onClick={fetchOrganization}
          className="mt-6 rounded-xl bg-[#145C45] px-6 py-3 font-bold text-white hover:bg-[#103D32]"
        >
          Try Again
        </button>

        <Link
          to="/organizations"
          className="mt-4 text-sm font-semibold text-[#145C45] hover:underline"
        >
          Back to Organizations
        </Link>
      </div>
    );
  }

  // Organization not found or not approved
  if (!organization) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FAF8F1] px-6 text-center">
        <Building2 size={55} className="text-[#A64F37]" />

        <h1 className="mt-5 text-3xl font-bold text-[#174B39]">
          Organization Not Found
        </h1>

        <p className="mt-3 text-slate-500">
          This organization does not exist or has not been approved for public listing.
        </p>

        <Link
          to="/organizations"
          className="mt-6 rounded-xl bg-[#145C45] px-6 py-3 font-bold text-white hover:bg-[#103D32]"
        >
          Back to Organizations
        </Link>
      </div>
    );
  }

  const style = getOrganizationStyle(organization.category);

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${organization.address}, ${organization.city}, Pakistan`
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF8F1]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#124B39] px-6 py-16 text-white">

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent 0px, transparent 22px, #E9C982 23px, transparent 24px), repeating-linear-gradient(-45deg, transparent 0px, transparent 22px, #E9C982 23px, transparent 24px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl">

          <Link
            to="/organizations"
            className="inline-flex items-center gap-2 text-sm text-emerald-100 hover:text-[#E7C77E]"
          >
            <ArrowLeft size={17} />
            Back to Organizations
          </Link>

          <div className="mt-10 flex flex-col items-start gap-6 md:flex-row md:items-center">

            <div
              className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-3xl font-bold ${style.color}`}
            >
              {style.initials}
            </div>

            <div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-[#E7C77E]">
                {organization.category}
              </span>

              <h1 className="mt-5 text-3xl font-bold md:text-5xl">
                {organization.organizationName}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-emerald-100/80">
                <MapPin size={18} />
                {organization.city}, Pakistan
              </p>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-2 w-full bg-[#A64F37]" />
      </section>

      {/* Main Details */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-3">

        {/* Left Content */}
        <div className="space-y-8 lg:col-span-2">

          {/* About */}
          <div className="rounded-2xl border border-[#E8E0D2] bg-white p-8">

            <h2 className="text-2xl font-bold text-[#174B39]">
              About Organization
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              {organization.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded-full bg-[#E8F0E9] px-4 py-2 text-sm font-semibold text-[#145C45]">
                {organization.category}
              </span>

              <span className="rounded-full bg-[#F5EBDD] px-4 py-2 text-sm font-semibold text-[#A64F37]">
                {organization.city}
              </span>

            </div>
          </div>

          {/* Services */}
          <div className="rounded-2xl border border-[#E8E0D2] bg-white p-8">

            <h2 className="text-2xl font-bold text-[#174B39]">
              Services Provided
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Services provided by this organization.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">

              {organization.services?.length > 0 ? (
                organization.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 rounded-xl bg-[#F5F3E9] p-4"
                  >
                    <div className="rounded-lg bg-[#145C45] p-2 text-white">
                      <Heart size={17} />
                    </div>

                    <span className="text-sm font-medium text-[#174B39]">
                      {service}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  No services have been listed yet.
                </p>
              )}

            </div>
          </div>

          {/* Location */}
          <div className="rounded-2xl border border-[#E8E0D2] bg-white p-8">

            <h2 className="text-2xl font-bold text-[#174B39]">
              Location
            </h2>

            <p className="mt-4 flex items-start gap-3 text-slate-600">
              <MapPin className="mt-1 shrink-0 text-[#A64F37]" />
              {organization.address}, {organization.city}, Pakistan
            </p>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#145C45] px-5 py-3 text-sm font-bold text-white hover:bg-[#103D32]"
            >
              Open in Google Maps
              <ExternalLink size={16} />
            </a>

          </div>

        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">

          <div className="rounded-2xl border border-[#E8E0D2] bg-white p-7">

            <h2 className="text-xl font-bold text-[#174B39]">
              Contact Information
            </h2>

            <div className="mt-7 space-y-6">

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-[#E8F0E9] p-3 text-[#145C45]">
                  <Phone size={20} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Phone Number
                  </p>

                  <a
                    href={`tel:${organization.phone}`}
                    className="mt-1 text-sm font-semibold text-slate-700 hover:text-[#145C45]"
                  >
                    {organization.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-[#F5EBDD] p-3 text-[#A64F37]">
                  <Mail size={20} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Email Address
                  </p>

                  <a
                    href={`mailto:${organization.email}`}
                    className="mt-1 break-all text-sm font-semibold text-slate-700 hover:text-[#145C45]"
                  >
                    {organization.email}
                  </a>
                </div>
              </div>

              {/* Website */}
              {organization.website && (
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-[#E8F0E9] p-3 text-[#145C45]">
                    <Globe size={20} />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Website
                    </p>

                    <a
                      href={organization.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 break-all text-sm font-semibold text-[#145C45] hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              )}

            </div>

            <div className="mt-8 border-t border-[#E8E0D2] pt-6">

              <a
                href={`tel:${organization.phone}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#145C45] py-4 font-bold text-white hover:bg-[#103D32]"
              >
                <Phone size={18} />
                Contact Organization
              </a>

            </div>
          </div>

          {/* Verification Notice */}
          <div className="rounded-2xl border border-[#E8E0D2] bg-[#F1EBDD] p-6">

            <div className="flex items-center gap-3 text-[#145C45]">
              <ShieldCheck size={24} />
              <h3 className="font-bold">
                Listing Information
              </h3>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              This organization has been approved by the Community Connect Pakistan administrator and is listed in the public directory.
            </p>

          </div>

        </aside>

      </section>
    </div>
  );
};

export default OrganizationDetails;
