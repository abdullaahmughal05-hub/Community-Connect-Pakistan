
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Building2,
  ArrowRight,
  Map,
  Landmark,
} from "lucide-react";

const cities = [
  {
    name: "Islamabad",
    province: "Federal Capital Territory",
    description: "Explore community organizations and welfare initiatives in Pakistan's capital.",
    organizations: 2,
    initials: "ISB",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "Rawalpindi",
    province: "Punjab",
    description: "Discover local welfare services and community support initiatives.",
    organizations: 1,
    initials: "RWP",
    color: "bg-orange-100 text-orange-800",
  },
  {
    name: "Lahore",
    province: "Punjab",
    description: "Find educational, healthcare and community development organizations.",
    organizations: 1,
    initials: "LHR",
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "Karachi",
    province: "Sindh",
    description: "Explore community organizations and social welfare services.",
    organizations: 1,
    initials: "KHI",
    color: "bg-rose-100 text-rose-800",
  },
  {
    name: "Peshawar",
    province: "Khyber Pakhtunkhwa",
    description: "Discover organizations supporting communities across Peshawar.",
    organizations: 1,
    initials: "PEW",
    color: "bg-purple-100 text-purple-800",
  },
  {
    name: "Multan",
    province: "Punjab",
    description: "Explore local community services and welfare initiatives.",
    organizations: 0,
    initials: "MUX",
    color: "bg-amber-100 text-amber-800",
  },
  {
    name: "Quetta",
    province: "Balochistan",
    description: "Discover community development and social support initiatives.",
    organizations: 0,
    initials: "UET",
    color: "bg-teal-100 text-teal-800",
  },
  {
    name: "Faisalabad",
    province: "Punjab",
    description: "Find organizations working towards community improvement.",
    organizations: 0,
    initials: "FSD",
    color: "bg-indigo-100 text-indigo-800",
  },
  {
    name: "Hyderabad",
    province: "Sindh",
    description: "Explore community organizations and social services.",
    organizations: 0,
    initials: "HDD",
    color: "bg-pink-100 text-pink-800",
  },
];

const Cities = () => {
  const [search, setSearch] = useState("");

  const filteredCities = useMemo(() => {
    return cities.filter((city) =>
      `${city.name} ${city.province}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#FAF8F1]">

      {/* Hero */}
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
            Explore by location
          </p>

          <h1 className="mt-5 text-4xl font-bold md:text-5xl">
            Discover Communities Across Pakistan
          </h1>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-emerald-50/80">
            Find welfare organizations, community initiatives
            and social services operating in cities across Pakistan.
          </p>

          {/* Search */}
          <div className="mx-auto mt-9 flex max-w-xl items-center gap-3 rounded-xl bg-white px-5 py-2 text-slate-700">
            <Search size={21} className="text-[#145C45]" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a city or province..."
              className="w-full bg-transparent py-3 text-sm outline-none"
            />
          </div>

        </div>

        <div className="absolute bottom-0 left-0 h-2 w-full bg-[#A64F37]" />
      </section>

      {/* Cities */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[3px] text-[#A64F37]">
            Find organizations near you
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#174B39]">
            Explore Pakistani Cities
          </h2>

          <p className="mt-3 text-slate-600">
            Select a city to discover organizations and services available there.
          </p>
        </div>

        {/* City Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {filteredCities.map((city) => (

            <Link
              key={city.name}
              to={`/organizations?city=${encodeURIComponent(city.name)}`}
              className="group overflow-hidden rounded-2xl border border-[#E8E0D2] bg-white transition hover:-translate-y-1 hover:border-[#145C45] hover:shadow-lg"
            >

              {/* Card Header */}
              <div className="relative flex h-36 items-center justify-center bg-[#F0EFE5]">

                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-lg font-bold ${city.color}`}>
                  {city.initials}
                </div>

                <div className="absolute right-5 top-5 rounded-full bg-white p-2 text-[#145C45]">
                  <MapPin size={19} />
                </div>

              </div>

              {/* Card Content */}
              <div className="p-6">

                <p className="text-xs font-bold uppercase tracking-widest text-[#A64F37]">
                  {city.province}
                </p>

                <h3 className="mt-2 text-xl font-bold text-[#174B39]">
                  {city.name}
                </h3>

                <p className="mt-3 min-h-14 text-sm leading-6 text-slate-500">
                  {city.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#E8E0D2] pt-5">

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Building2 size={17} className="text-[#145C45]" />
                    {city.organizations} demo listings
                  </div>

                  <ArrowRight
                    size={19}
                    className="text-[#A64F37] transition group-hover:translate-x-1"
                  />

                </div>

              </div>

            </Link>
          ))}

        </div>

        {filteredCities.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#DCCFB8] bg-white py-16 text-center">
            <Map size={40} className="mx-auto text-[#A64F37]" />

            <h3 className="mt-4 text-xl font-bold text-[#174B39]">
              No Cities Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try searching for another city.
            </p>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-slate-400">
          City counts are demonstration values and will be calculated from MongoDB later.
        </p>

      </section>

      {/* CTA */}
      <section className="bg-[#124B39] px-6 py-16 text-center text-white">

        <Landmark size={40} className="mx-auto text-[#E7C77E]" />

        <h2 className="mt-5 text-3xl font-bold">
          Every City Has a Story of Service
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-emerald-50/80">
          Help communities discover organizations working
          towards a better future for Pakistan.
        </p>

        <Link
          to="/organizations"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#E7C77E] px-7 py-3 font-bold text-[#174B39] hover:bg-[#F2DDAE]"
        >
          Explore Organizations
          <ArrowRight size={18} />
        </Link>

      </section>

    </div>
  );
};

export default Cities;
