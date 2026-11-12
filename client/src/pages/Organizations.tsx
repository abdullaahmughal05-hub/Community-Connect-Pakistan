import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import OrganizationPhoto from "../components/OrganizationPhoto";

import {
  Search,
  MapPin,
  Phone,
  ArrowRight,
  Building2,
  SlidersHorizontal,
  Heart,
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
  imageUrl?: string;
  imageSource?: string;
  imageCredit?: string;
};

const categories = [
  "All Categories",
  "Education",
  "Healthcare",
  "Food & Hunger Relief",
  "Environment",
  "Child Welfare",
  "Disaster Relief",
  "Employment & Skills",
];

const cities = [
  "All Cities",
  "Islamabad",
  "Rawalpindi",
  "Lahore",
  "Karachi",
  "Peshawar",
  "Multan",
  "Quetta",
];

const Organizations = () => {
  const [searchParams] = useSearchParams();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const initialCategory = searchParams.get("category") || "All Categories";

  const [selectedCategory, setSelectedCategory] = useState(
    categories.includes(initialCategory)
      ? initialCategory
      : "All Categories"
  );

  const [selectedCity, setSelectedCity] = useState(
    searchParams.get("city") || "All Cities"
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch approved organizations from MongoDB
  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load organizations."
        );
      }

      setOrganizations(data.organizations || []);
    } catch (err) {
      console.error("Fetch organizations error:", err);

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
    fetchOrganizations();
  }, []);

  // Include categories and cities found in MongoDB
  const availableCategories = useMemo(() => {
    return [
      "All Categories",
      ...new Set([
        ...categories.filter((item) => item !== "All Categories"),
        ...organizations.map((org) => org.category),
      ]),
    ];
  }, [organizations]);

  const availableCities = useMemo(() => {
    return [
      "All Cities",
      ...new Set([
        ...cities.filter((item) => item !== "All Cities"),
        ...organizations.map((org) => org.city),
      ]),
    ];
  }, [organizations]);

  // Search and filters
  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        org.organizationName.toLowerCase().includes(searchText) ||
        org.description.toLowerCase().includes(searchText) ||
        org.category.toLowerCase().includes(searchText) ||
        org.city.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "All Categories" ||
        org.category === selectedCategory;

      const matchesCity =
        selectedCity === "All Cities" ||
        org.city === selectedCity;

      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [organizations, search, selectedCategory, selectedCity]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All Categories");
    setSelectedCity("All Cities");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F1]">

      {/* Page Hero */}
      <section className="relative overflow-hidden bg-[#124B39] px-6 py-20 text-center text-white">

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent 0px, transparent 22px, #E9C982 23px, transparent 24px), repeating-linear-gradient(-45deg, transparent 0px, transparent 22px, #E9C982 23px, transparent 24px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[3px] text-[#E7C77E]">
            Community Directory
          </p>

          <h1 className="mt-5 text-4xl font-bold md:text-5xl">
            Discover Organizations
          </h1>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-emerald-50/80">
            Explore organizations and community initiatives
            working to make a difference throughout Pakistan.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 h-2 w-full bg-[#A64F37]" />
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[3px] text-[#A64F37]">
            Find the right organization
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#174B39]">
            Organizations Across Pakistan
          </h2>

          <p className="mt-3 text-slate-600">
            Search and filter organizations according to your needs.
          </p>
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-[#E8E0D2] bg-white p-5 shadow-sm">

          <div className="mb-5 flex items-center gap-2 font-bold text-[#174B39]">
            <SlidersHorizontal size={19} />
            Search & Filters
          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {/* Search */}
            <div className="flex items-center gap-3 rounded-xl border border-[#E8E0D2] px-4">
              <Search size={19} className="text-[#145C45]" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search organizations..."
                className="w-full bg-transparent py-4 text-sm outline-none"
              />
            </div>

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-[#E8E0D2] bg-[#FFFCF5] px-4 py-4 text-sm outline-none focus:border-[#145C45]"
            >
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* City */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="rounded-xl border border-[#E8E0D2] bg-[#FFFCF5] px-4 py-4 text-sm outline-none focus:border-[#145C45]"
            >
              {availableCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <strong className="text-[#145C45]">
                {filteredOrganizations.length}
              </strong>{" "}
              organizations
            </p>

            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-[#A64F37] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 rounded-2xl bg-white p-12 text-center text-[#145C45]">
            <RefreshCw size={30} className="mx-auto animate-spin" />
            <p className="mt-4 font-semibold">
              Loading approved organizations...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <AlertCircle size={35} className="mx-auto text-red-600" />

            <h3 className="mt-4 font-bold text-red-700">
              Unable to Load Organizations
            </h3>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <button
              onClick={fetchOrganizations}
              className="mt-5 rounded-lg bg-[#145C45] px-6 py-3 text-sm font-bold text-white"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Organization Cards */}
        {!loading && !error && (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredOrganizations.map((org) => (
                <div
                  key={org._id}
                  className="overflow-hidden rounded-2xl border border-[#E8E0D2] bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Organization Photograph */}
                  <div className="relative">
                    <OrganizationPhoto
                      src={org.imageUrl}
                      name={org.organizationName}
                      credit={org.imageSource}
                      className="h-48 w-full"
                    />

                    <button
                      aria-label={`Save ${org.organizationName}`}
                      className="absolute right-4 top-4 rounded-full bg-white p-2 text-slate-500 hover:text-red-500"
                    >
                      <Heart size={18} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="p-6">

                    <span className="rounded-full bg-[#E8F0E9] px-3 py-1 text-xs font-bold text-[#145C45]">
                      {org.category}
                    </span>

                    <h3 className="mt-4 text-lg font-bold text-[#174B39]">
                      {org.organizationName}
                    </h3>

                    <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
                      {org.description}
                    </p>

                    <div className="mt-5 space-y-3 text-sm text-slate-600">

                      <div className="flex items-center gap-2">
                        <MapPin
                          size={17}
                          className="shrink-0 text-[#A64F37]"
                        />
                        {org.address}, {org.city}, Pakistan
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone
                          size={16}
                          className="shrink-0 text-[#A64F37]"
                        />
                        {org.phone}
                      </div>

                    </div>

                    <div className="mt-6 border-t border-[#E8E0D2] pt-5">
                      <Link
                        to={`/organizations/${org._id}`}
                        className="flex items-center justify-between font-bold text-[#145C45] hover:text-[#A64F37]"
                      >
                        View Organization Details
                        <ArrowRight size={18} />
                      </Link>
                    </div>

                  </div>
                </div>
              ))}

            </div>

            {/* No Results */}
            {filteredOrganizations.length === 0 && (
              <div className="mt-10 rounded-2xl border border-dashed border-[#DCCFB8] bg-white px-6 py-16 text-center">

                <Building2
                  size={45}
                  className="mx-auto text-[#A64F37]"
                />

                <h3 className="mt-5 text-xl font-bold text-[#174B39]">
                  No Organizations Found
                </h3>

                <p className="mt-3 text-sm text-slate-500">
                  Try changing your search or selecting a different city or category.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-6 rounded-lg bg-[#145C45] px-6 py-3 text-sm font-bold text-white"
                >
                  Reset Filters
                </button>

              </div>
            )}

            {/* Disclaimer */}
            <p className="mt-10 text-center text-xs text-slate-400">
              Only administrator-approved organizations are displayed in this directory.
            </p>
          </>
        )}

      </section>
    </div>
  );
};

export default Organizations;