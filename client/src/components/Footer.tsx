
import { Link } from "react-router-dom";
import { HandHeart, MapPin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#103D32] text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">

        <div>
          <div className="flex items-center gap-3">
            <HandHeart size={30} className="text-[#D8B56D]" />
            <h2 className="text-xl font-bold">
              Community Connect
            </h2>
          </div>

          <p className="mt-4 max-w-sm text-sm leading-7 text-emerald-100/70">
            Connecting people with organizations, welfare
            services and community initiatives across Pakistan.
          </p>
        </div>

        <div>
          <h3 className="mb-5 font-bold text-[#E8C77B]">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-sm text-emerald-100/80">
            <Link to="/">Home</Link>
            <Link to="/organizations">Organizations</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/cities">Explore Cities</Link>
            <Link to="/about">About Us</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-bold text-[#E8C77B]">
            Explore Pakistan
          </h3>

          <p className="flex items-center gap-2 text-sm text-emerald-100/80">
            <MapPin size={17} />
            Connecting communities nationwide
          </p>
        </div>

      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-sm text-emerald-100/60">
        © 2026 Community Connect Pakistan.
        Made with <Heart size={13} className="mx-1 inline text-red-300" />
        for Pakistan.
      </div>

    </footer>
  );
};

export default Footer;
