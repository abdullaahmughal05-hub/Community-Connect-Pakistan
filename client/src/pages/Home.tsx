
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Heart,
  GraduationCap,
  Stethoscope,
  Utensils,
  Leaf,
  Users,
  ShieldCheck,
  ArrowRight,
  HandHeart,
  Building2,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "Education", icon: GraduationCap, color: "bg-blue-50 text-blue-800" },
  { name: "Healthcare", icon: Stethoscope, color: "bg-rose-50 text-rose-800" },
  { name: "Food & Hunger Relief", icon: Utensils, color: "bg-orange-50 text-orange-800" },
  { name: "Environment", icon: Leaf, color: "bg-green-50 text-green-800" },
  { name: "Child Welfare", icon: Users, color: "bg-purple-50 text-purple-800" },
  { name: "Disaster Relief", icon: ShieldCheck, color: "bg-amber-50 text-amber-800" },
];

const cities = [
  "Islamabad",
  "Rawalpindi",
  "Lahore",
  "Karachi",
  "Peshawar",
  "Multan",
];

const organizations = [
  {
    name: "Community Care Foundation",
    category: "Healthcare",
    city: "Islamabad",
    initials: "CC",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "Education for Everyone",
    category: "Education",
    city: "Lahore",
    initials: "EE",
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "Hope Food Network",
    category: "Food & Hunger Relief",
    city: "Karachi",
    initials: "HF",
    color: "bg-orange-100 text-orange-800",
  },
];

const Home = () => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="bg-[#FAF8F1] text-[#24352D]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#124B39] text-white">

        {/* Decorative geometric background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent 0px, transparent 22px, #E9C982 23px, transparent 24px),
              repeating-linear-gradient(-45deg, transparent 0px, transparent 22px, #E9C982 23px, transparent 24px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-[#D8B56D]/30" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#D8B56D]/20" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center md:py-32">

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#D8B56D]/40 bg-white/10 px-5 py-2 text-sm text-[#F2DDAE]">
            <HandHeart size={17} />
            United by Humanity, Connected by Community
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Find Good.
            <br />
            <span className="text-[#E7C77E]">
              Discover Those Who Do It.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-emerald-50/80 md:text-lg">
            Discover welfare organizations, community initiatives
            and people working to create a better Pakistan.
          </p>

          {/* Search */}
          <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3 rounded-2xl bg-[#FFFCF5] p-3 shadow-2xl md:flex-row">

            <div className="flex flex-1 items-center gap-3 px-3">
              <Search className="shrink-0 text-[#145C45]" size={22} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="What service or organization are you looking for?"
                className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 border-t border-[#E8E0D2] px-3 md:border-l md:border-t-0">
              <MapPin size={19} className="text-[#145C45]" />

              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-transparent py-3 text-sm text-slate-700 outline-none"
              >
                <option value="">All Cities</option>
                {cities.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <Link
              to={`/organizations${search || city ? `?search=${encodeURIComponent(search)}&city=${encodeURIComponent(city)}` : ""}`}
              className="rounded-xl bg-[#145C45] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#0D402F] md:flex md:items-center"
            >
              Search Organizations
            </Link>

          </div>

          <p className="mt-6 text-xs tracking-wide text-[#E7C77E]">
            خدمت خلق • Community • Compassion • Connection
          </p>
        </div>

        {/* Ajrak-inspired bottom border */}
        <div className="h-2 bg-[#A64F37]" />
        <div className="h-1 bg-[#D8B56D]" />
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid items-center gap-12 md:grid-cols-2">

          <div>
            <p className="text-sm font-bold uppercase tracking-[3px] text-[#A64F37]">
              Our Purpose
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#174B39] md:text-4xl">
              Every Good Deed Deserves to Be Discovered.
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Across Pakistan, countless organizations are working
              to support people, improve communities and create
              opportunities. Our platform brings their work together
              in one accessible place.
            </p>

            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 font-bold text-[#145C45] hover:gap-3"
            >
              Learn About Our Mission
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative rounded-3xl border border-[#E6DCC8] bg-[#F1EBDD] p-8 md:p-12">

            <div className="absolute right-5 top-5 text-5xl text-[#C8A96B]/30">
              ✳
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#145C45] text-[#E7C77E]">
                <HandHeart size={38} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#174B39]">
                خدمتِ خلق
              </h3>

              <p className="mt-2 text-sm tracking-wide text-[#A64F37]">
                THE SPIRIT OF COMMUNITY SERVICE
              </p>

              <p className="mx-auto mt-5 max-w-sm leading-7 text-slate-600">
                A platform built around compassion, collective
                responsibility and the spirit of helping others.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-[#E8E0D2] bg-[#F2EFE5] py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[3px] text-[#A64F37]">
                Explore by purpose
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#174B39]">
                Community Services
              </h2>

              <p className="mt-3 text-slate-600">
                Find organizations according to the services they provide.
              </p>
            </div>

            <Link
              to="/categories"
              className="inline-flex items-center gap-2 font-bold text-[#145C45]"
            >
              View All Categories <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  to={`/categories?category=${encodeURIComponent(category.name)}`}
                  className="group rounded-2xl border border-[#E7DECF] bg-[#FFFCF5] p-5 transition hover:-translate-y-1 hover:border-[#145C45] hover:shadow-lg"
                >
                  <div className={`inline-flex rounded-xl p-3 ${category.color}`}>
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-5 text-sm font-bold text-[#174B39]">
                    {category.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-between text-[#A64F37]">
                    <span className="text-xs font-medium">Explore</span>
                    <ChevronRight size={17} />
                  </div>
                </Link>
              );
            })}

          </div>
        </div>
      </section>

      {/* CITIES */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[3px] text-[#A64F37]">
            Discover by location
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#174B39]">
            Explore Communities Across Pakistan
          </h2>

          <p className="mt-3 text-slate-600">
            Find organizations and services operating in your city.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {cities.map((item) => (
            <Link
              key={item}
              to={`/cities?city=${encodeURIComponent(item)}`}
              className="rounded-full border border-[#DCCFB8] bg-[#FFFCF5] px-6 py-3 text-sm font-semibold text-[#174B39] transition hover:border-[#145C45] hover:bg-[#145C45] hover:text-white"
            >
              <MapPin size={15} className="mr-2 inline" />
              {item}
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/cities"
            className="inline-flex items-center gap-2 font-bold text-[#A64F37]"
          >
            Explore All Cities <ArrowRight size={18} />
          </Link>
        </div>

      </section>

      {/* FEATURED ORGANIZATIONS */}
      <section className="border-y border-[#E8E0D2] bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[3px] text-[#A64F37]">
                Discover and connect
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#174B39]">
                Featured Organizations
              </h2>

              <p className="mt-3 text-slate-600">
                Get to know community initiatives and welfare services.
              </p>
            </div>

            <Link
              to="/organizations"
              className="inline-flex items-center gap-2 font-bold text-[#145C45]"
            >
              Explore All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            {organizations.map((org) => (
              <div
                key={org.name}
                className="overflow-hidden rounded-2xl border border-[#E8E0D2] bg-[#FFFCF5] transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-36 items-center justify-center bg-[#EDEFE5]">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold ${org.color}`}>
                    {org.initials}
                  </div>
                </div>

                <div className="p-6">
                  <span className="rounded-full bg-[#E8F0E9] px-3 py-1 text-xs font-bold text-[#145C45]">
                    {org.category}
                  </span>

                  <h3 className="mt-4 font-bold text-[#174B39]">
                    {org.name}
                  </h3>

                  <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={15} />
                    {org.city}, Pakistan
                  </p>

                  <Link
                    to="/organizations"
                    className="mt-6 flex items-center gap-2 border-t border-[#E8E0D2] pt-4 text-sm font-bold text-[#A64F37]"
                  >
                    Explore Organization
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}

          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Demonstration listings only. These are not verified organizations.
          </p>
        </div>
      </section>

      {/* REGISTER CTA */}
      <section className="relative overflow-hidden bg-[#124B39] px-6 py-20 text-center text-white">

        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full border border-[#D8B56D]/20" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[#E7C77E]">
            <Building2 size={30} />
          </div>

          <h2 className="mt-7 text-3xl font-bold md:text-4xl">
            Your Organization Can Make a Difference.
          </h2>

          <p className="mt-5 leading-8 text-emerald-50/80">
            Are you working for a community, running a welfare
            organization or providing social services? Join our
            directory and make your work easier to discover.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#E7C77E] px-7 py-4 font-bold text-[#174B39] transition hover:bg-[#F2DDAE]"
          >
            Register Your Organization
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-16 border-t border-white/20 pt-6 text-sm text-[#E7C77E]">
          پاکستان زندہ باد
        </div>
      </section>

    </div>
  );
};

export default Home;
