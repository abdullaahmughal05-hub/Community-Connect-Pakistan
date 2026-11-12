
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Stethoscope,
  Utensils,
  Leaf,
  Users,
  ShieldCheck,
  BriefcaseBusiness,
  Home,
  HandHeart,
  ArrowRight,
  HeartHandshake,
} from "lucide-react";

const categories = [
  {
    name: "Education",
    description: "Organizations providing educational opportunities, scholarships, training and learning support.",
    icon: GraduationCap,
    count: 1,
    color: "bg-blue-50 text-blue-800",
  },
  {
    name: "Healthcare",
    description: "Hospitals, medical assistance organizations, health awareness and free treatment initiatives.",
    icon: Stethoscope,
    count: 1,
    color: "bg-rose-50 text-rose-800",
  },
  {
    name: "Food & Hunger Relief",
    description: "Organizations supporting food distribution, ration assistance and hunger prevention.",
    icon: Utensils,
    count: 1,
    color: "bg-orange-50 text-orange-800",
  },
  {
    name: "Environment",
    description: "Initiatives working on plantation, environmental protection and community cleanliness.",
    icon: Leaf,
    count: 1,
    color: "bg-green-50 text-green-800",
  },
  {
    name: "Child Welfare",
    description: "Organizations supporting children's rights, education, protection and development.",
    icon: Users,
    count: 1,
    color: "bg-purple-50 text-purple-800",
  },
  {
    name: "Disaster Relief",
    description: "Organizations providing emergency assistance, rescue support and disaster management.",
    icon: ShieldCheck,
    count: 1,
    color: "bg-amber-50 text-amber-800",
  },
  {
    name: "Employment & Skills",
    description: "Organizations offering vocational training, professional development and employment support.",
    icon: BriefcaseBusiness,
    count: 0,
    color: "bg-indigo-50 text-indigo-800",
  },
  {
    name: "Housing & Shelter",
    description: "Organizations helping people access shelter, housing assistance and basic living facilities.",
    icon: Home,
    count: 0,
    color: "bg-teal-50 text-teal-800",
  },
  {
    name: "Community Support",
    description: "Community initiatives supporting families, vulnerable individuals and social development.",
    icon: HandHeart,
    count: 0,
    color: "bg-pink-50 text-pink-800",
  },
];

const Categories = () => {
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
            Explore by purpose
          </p>

          <h1 className="mt-5 text-4xl font-bold md:text-5xl">
            Community Service Categories
          </h1>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-emerald-50/80">
            Discover organizations across Pakistan according
            to the community services and social work they provide.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 h-2 w-full bg-[#A64F37]" />
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-bold uppercase tracking-[3px] text-[#A64F37]">
              Find your cause
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#174B39]">
              Browse All Categories
            </h2>

            <p className="mt-3 text-slate-600">
              Select a service category to discover relevant organizations.
            </p>
          </div>

          <Link
            to="/organizations"
            className="inline-flex items-center gap-2 font-bold text-[#145C45]"
          >
            View All Organizations
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Category Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                to={`/organizations?category=${encodeURIComponent(category.name)}`}
                className="group rounded-2xl border border-[#E8E0D2] bg-white p-7 transition hover:-translate-y-1 hover:border-[#145C45] hover:shadow-lg"
              >

                <div className="flex items-start justify-between">

                  <div className={`rounded-2xl p-4 ${category.color}`}>
                    <Icon size={30} />
                  </div>

                  <span className="rounded-full bg-[#F2EFE5] px-3 py-1 text-xs font-semibold text-[#A64F37]">
                    {category.count} demo listings
                  </span>

                </div>

                <h3 className="mt-6 text-xl font-bold text-[#174B39]">
                  {category.name}
                </h3>

                <p className="mt-3 min-h-16 text-sm leading-7 text-slate-500">
                  {category.description}
                </p>

                <div className="mt-6 flex items-center justify-between border-t border-[#E8E0D2] pt-5">

                  <span className="text-sm font-bold text-[#145C45]">
                    Explore Organizations
                  </span>

                  <ArrowRight
                    size={19}
                    className="text-[#A64F37] transition group-hover:translate-x-1"
                  />

                </div>

              </Link>
            );
          })}

        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Organization counts are demonstration values and will be calculated from MongoDB later.
        </p>

      </section>

      {/* CTA */}
      <section className="bg-[#124B39] px-6 py-16 text-center text-white">

        <HeartHandshake size={42} className="mx-auto text-[#E7C77E]" />

        <h2 className="mt-5 text-3xl font-bold">
          Every Contribution Matters
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-emerald-50/80">
          Explore community initiatives and discover the organizations
          making a positive difference throughout Pakistan.
        </p>

        <Link
          to="/organizations"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#E7C77E] px-7 py-3 font-bold text-[#174B39] hover:bg-[#F2DDAE]"
        >
          Discover Organizations
          <ArrowRight size={18} />
        </Link>

      </section>

    </div>
  );
};

export default Categories;
