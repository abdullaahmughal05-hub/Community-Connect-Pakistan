
import { Link } from "react-router-dom";
import {
  HeartHandshake,
  Target,
  Eye,
  Users,
  Search,
  MapPin,
  Building2,
  ArrowRight,
  HandHeart,
  ShieldCheck,
  Globe,
} from "lucide-react";

const About = () => {
  const benefits = [
    {
      icon: Search,
      title: "Easy Discovery",
      description:
        "Help people find community organizations and social services through one accessible platform.",
    },
    {
      icon: MapPin,
      title: "Location Based Search",
      description:
        "Discover organizations according to their cities and geographical locations.",
    },
    {
      icon: Building2,
      title: "Organization Visibility",
      description:
        "Give community organizations a dedicated space to introduce their work and services.",
    },
    {
      icon: Users,
      title: "Stronger Communities",
      description:
        "Make it easier for people to connect with initiatives that support their communities.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F1]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#124B39] px-6 py-24 text-center text-white">

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
            Our Story & Purpose
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
            Connecting People.
            <br />
            <span className="text-[#E7C77E]">
              Strengthening Communities.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-emerald-50/80 md:text-lg">
            A platform dedicated to bringing community organizations,
            welfare services and social initiatives across Pakistan
            closer to the people who need them.
          </p>

          <div className="mt-9 text-2xl font-bold text-[#E7C77E]">
            خدمتِ خلق
          </div>

          <p className="mt-2 text-xs tracking-[3px] text-emerald-100/70">
            THE SPIRIT OF SERVING HUMANITY
          </p>

        </div>

        <div className="absolute bottom-0 left-0 h-2 w-full bg-[#A64F37]" />
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid items-center gap-12 md:grid-cols-2">

          <div>
            <p className="text-sm font-bold uppercase tracking-[3px] text-[#A64F37]">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-[#174B39] md:text-4xl">
              Making Community Services Easier to Discover
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Pakistan has many organizations, welfare institutions
              and community initiatives working to improve people's
              lives. However, finding the right organization,
              understanding its services and accessing its contact
              information can sometimes be difficult.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Community Connect Pakistan aims to address this
              challenge by bringing information about community
              service organizations together in one organized
              and accessible digital directory.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              Our platform organizes listings by service category
              and city, helping visitors discover organizations
              according to their needs and location.
            </p>
          </div>

          <div className="rounded-3xl border border-[#E6DCC8] bg-[#F1EBDD] p-10 text-center">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#145C45] text-[#E7C77E]">
              <HandHeart size={45} />
            </div>

            <h3 className="mt-7 text-3xl font-bold text-[#174B39]">
              خدمتِ خلق
            </h3>

            <p className="mt-3 text-sm font-semibold tracking-[3px] text-[#A64F37]">
              SERVING HUMANITY
            </p>

            <p className="mx-auto mt-6 max-w-sm leading-8 text-slate-600">
              We believe that discovering organizations doing
              meaningful work should be simple, accessible
              and convenient for everyone.
            </p>

          </div>

        </div>
      </section>

      {/* Mission and Vision */}
      <section className="border-y border-[#E8E0D2] bg-[#F2EFE5] py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[3px] text-[#A64F37]">
              What Drives Us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#174B39]">
              Our Mission & Vision
            </h2>
          </div>

          <div className="grid gap-7 md:grid-cols-2">

            <div className="rounded-2xl border border-[#E8E0D2] bg-white p-9">

              <div className="inline-flex rounded-xl bg-[#E8F0E9] p-4 text-[#145C45]">
                <Target size={32} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#174B39]">
                Our Mission
              </h3>

              <p className="mt-5 leading-8 text-slate-600">
                To provide a centralized digital platform where
                people can discover community organizations,
                explore their services, access contact details
                and find relevant initiatives across Pakistani cities.
              </p>

            </div>

            <div className="rounded-2xl border border-[#E8E0D2] bg-white p-9">

              <div className="inline-flex rounded-xl bg-[#F5EBDD] p-4 text-[#A64F37]">
                <Eye size={32} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#174B39]">
                Our Vision
              </h3>

              <p className="mt-5 leading-8 text-slate-600">
                To become a comprehensive community-service
                directory for Pakistan, making information about
                welfare organizations and social initiatives
                easier for everyone to access.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[3px] text-[#A64F37]">
            What We Offer
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#174B39]">
            One Platform, Multiple Possibilities
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            A structured way to discover and connect with
            community organizations across Pakistan.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-2xl border border-[#E8E0D2] bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="inline-flex rounded-xl bg-[#E8F0E9] p-4 text-[#145C45]">
                  <Icon size={27} />
                </div>

                <h3 className="mt-6 text-lg font-bold text-[#174B39]">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {benefit.description}
                </p>

              </div>
            );
          })}

        </div>
      </section>

      {/* Values */}
      <section className="border-y border-[#E8E0D2] bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[3px] text-[#A64F37]">
              Our Principles
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#174B39]">
              The Values Behind Our Platform
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">

            <div className="text-center">
              <HeartHandshake size={38} className="mx-auto text-[#145C45]" />
              <h3 className="mt-5 font-bold text-[#174B39]">
                Compassion
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Promoting awareness of organizations dedicated to
                helping people and communities.
              </p>
            </div>

            <div className="text-center">
              <ShieldCheck size={38} className="mx-auto text-[#A64F37]" />
              <h3 className="mt-5 font-bold text-[#174B39]">
                Transparency
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Encouraging accurate organization information
                and responsible listing management.
              </p>
            </div>

            <div className="text-center">
              <Globe size={38} className="mx-auto text-[#145C45]" />
              <h3 className="mt-5 font-bold text-[#174B39]">
                Accessibility
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Making community service information easier
                to discover across different cities.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#124B39] px-6 py-20 text-center text-white">

        <HeartHandshake size={45} className="mx-auto text-[#E7C77E]" />

        <h2 className="mt-6 text-3xl font-bold md:text-4xl">
          Be Part of the Community
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-8 text-emerald-50/80">
          Whether you represent an organization or want to
          discover community services, you can be part of
          a connected and supportive community.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">

          <Link
            to="/organizations"
            className="rounded-xl bg-[#E7C77E] px-7 py-3 font-bold text-[#174B39] hover:bg-[#F2DDAE]"
          >
            Explore Organizations
          </Link>

          <Link
            to="/register"
            className="rounded-xl border border-white/40 px-7 py-3 font-bold text-white hover:bg-white/10"
          >
            Register Organization
          </Link>

        </div>

      </section>

    </div>
  );
};

export default About;
