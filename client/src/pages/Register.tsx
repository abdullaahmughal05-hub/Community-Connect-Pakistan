
import { useState, type ChangeEvent, type FormEvent } from "react";

import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Send,
  HandHeart,
  CheckCircle,
  Globe,
  AlertCircle,
  ImagePlus,
  X,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/organizations/register";

const categories = [
  "Education",
  "Healthcare",
  "Food & Hunger Relief",
  "Environment",
  "Child Welfare",
  "Disaster Relief",
  "Employment & Skills",
  "Housing & Shelter",
  "Community Support",
];

const cities = [
  "Islamabad",
  "Rawalpindi",
  "Lahore",
  "Karachi",
  "Peshawar",
  "Multan",
  "Quetta",
  "Faisalabad",
  "Hyderabad",
];

const initialFormData = {
  name: "",
  category: "",
  city: "",
  address: "",
  phone: "",
  email: "",
  website: "",
  description: "",
  services: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    setError("");
  };

  const removePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setPhoto(null);
    setPhotoPreview("");

    const fileInput = document.getElementById(
      "organizationPhoto"
    ) as HTMLInputElement | null;

    if (fileInput) fileInput.value = "";
  };

  const resetForm = () => {
    removePhoto();
    setFormData(initialFormData);
    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const servicesArray = formData.services
        .split(/\n|,/)
        .map((service) => service.trim())
        .filter(Boolean);

      const submissionData = new FormData();

      submissionData.append("organizationName", formData.name.trim());
      submissionData.append("category", formData.category);
      submissionData.append("city", formData.city);
      submissionData.append("address", formData.address.trim());
      submissionData.append("phone", formData.phone.trim());
      submissionData.append("email", formData.email.trim());
      submissionData.append("website", formData.website.trim());
      submissionData.append("description", formData.description.trim());
      submissionData.append("services", JSON.stringify(servicesArray));

      if (photo) {
        submissionData.append("photo", photo);
      }

      const response = await fetch(API_URL, {
        method: "POST",
        body: submissionData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Organization registration error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full rounded-xl border border-[#E8E0D2] bg-[#FFFCF5] px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-[#145C45] focus:ring-2 focus:ring-emerald-100";

  const labelStyle =
    "mb-2 block text-sm font-semibold text-[#174B39]";

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
          <HandHeart size={45} className="mx-auto text-[#E7C77E]" />

          <p className="mt-5 text-sm font-bold uppercase tracking-[3px] text-[#E7C77E]">
            Join Our Community
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Register Your Organization
          </h1>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-emerald-50/80">
            Help people discover your organization and the
            community services you provide across Pakistan.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 h-2 w-full bg-[#A64F37]" />
      </section>

      {/* Registration Form */}
      <section className="mx-auto max-w-4xl px-6 py-16">

        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[3px] text-[#A64F37]">
            Organization Application
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#174B39]">
            Organization Information
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Please provide accurate information about your organization.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-[#E8E0D2] bg-white p-10 text-center">

            <CheckCircle
              size={55}
              className="mx-auto text-[#145C45]"
            />

            <h2 className="mt-6 text-2xl font-bold text-[#174B39]">
              Registration Submitted Successfully!
            </h2>

            <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-500">
              Your organization information and photograph have been
              submitted successfully. Your application is now waiting
              for administrator review.
            </p>

            {photoPreview && (
              <img
                src={photoPreview}
                alt="Submitted organization"
                className="mx-auto mt-6 h-40 w-56 rounded-xl object-cover"
              />
            )}

            <div className="mt-7 rounded-xl bg-[#F2EFE5] p-5 text-left">
              <p className="font-bold text-[#174B39]">
                Organization: {formData.name}
              </p>

              <p className="mt-2 text-sm text-slate-600">
                Category: {formData.category}
              </p>

              <p className="mt-1 text-sm text-slate-600">
                City: {formData.city}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-bold text-amber-800">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Application Status: Pending
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                Your organization will appear in the public directory
                only after administrator approval.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="mt-7 rounded-xl bg-[#145C45] px-7 py-3 font-bold text-white hover:bg-[#103D32]"
            >
              Register Another Organization
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-9 rounded-2xl border border-[#E8E0D2] bg-white p-6 shadow-sm md:p-10"
          >

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle size={19} className="mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Basic Information */}
            <div>
              <div className="mb-7 flex items-center gap-3 border-b border-[#E8E0D2] pb-5">
                <div className="rounded-xl bg-[#E8F0E9] p-3 text-[#145C45]">
                  <Building2 size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-[#174B39]">
                    Basic Information
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tell us about your organization.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <div className="md:col-span-2">
                  <label className={labelStyle}>
                    Organization Name *
                  </label>

                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter organization name"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>
                    Service Category *
                  </label>

                  <select
                    required
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">Select category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelStyle}>
                    Operating City *
                  </label>

                  <select
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={inputStyle}
                  >
                    <option value="">Select city</option>

                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className={labelStyle}>
                    Organization Description *
                  </label>

                  <textarea
                    required
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your organization and its mission..."
                    className={inputStyle}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelStyle}>
                    Services Provided *
                  </label>

                  <textarea
                    required
                    name="services"
                    value={formData.services}
                    onChange={handleChange}
                    rows={3}
                    placeholder="List services separated by commas or new lines..."
                    className={inputStyle}
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Separate multiple services using commas or new lines.
                  </p>
                </div>
              </div>
            </div>

            {/* Organization Photo */}
            <div>
              <div className="mb-7 flex items-center gap-3 border-b border-[#E8E0D2] pb-5">
                <div className="rounded-xl bg-[#E8F0E9] p-3 text-[#145C45]">
                  <ImagePlus size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-[#174B39]">
                    Organization Photo
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload your official logo or community-service photograph.
                  </p>
                </div>
              </div>

              <label className={labelStyle}>
                Upload Organization Image
              </label>

              <div className="rounded-xl border-2 border-dashed border-[#D8DFD3] bg-[#FAF8F1] p-6 text-center">

                {photoPreview ? (
                  <div className="relative mx-auto max-w-sm">
                    <img
                      src={photoPreview}
                      alt="Organization photo preview"
                      className="h-52 w-full rounded-xl object-cover"
                    />

                    <button
                      type="button"
                      onClick={removePhoto}
                      aria-label="Remove photo"
                      className="absolute right-2 top-2 rounded-full bg-white p-2 text-red-600 shadow"
                    >
                      <X size={18} />
                    </button>

                    <p className="mt-3 break-all text-sm font-semibold text-[#174B39]">
                      {photo?.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <ImagePlus
                      size={38}
                      className="mx-auto text-[#145C45]"
                    />

                    <p className="mt-3 font-semibold text-[#174B39]">
                      Choose your organization photo
                    </p>

                    <p className="mt-2 text-xs text-slate-500">
                      JPG, PNG or WEBP · Maximum size 5 MB
                    </p>
                  </>
                )}

                <input
                  id="organizationPhoto"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoChange}
                  className="mt-5 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#145C45] file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-[#103D32]"
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Optional. Upload only images your organization has permission to publish.
              </p>
            </div>

            {/* Location */}
            <div>
              <div className="mb-7 flex items-center gap-3 border-b border-[#E8E0D2] pb-5">
                <div className="rounded-xl bg-[#F5EBDD] p-3 text-[#A64F37]">
                  <MapPin size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-[#174B39]">
                    Location Details
                  </h3>
                  <p className="text-xs text-slate-500">
                    Where can people find your organization?
                  </p>
                </div>
              </div>

              <div>
                <label className={labelStyle}>
                  Complete Address *
                </label>

                <textarea
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Building, street, area and postal address"
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="mb-7 flex items-center gap-3 border-b border-[#E8E0D2] pb-5">
                <div className="rounded-xl bg-[#E8F0E9] p-3 text-[#145C45]">
                  <Phone size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-[#174B39]">
                    Contact Information
                  </h3>
                  <p className="text-xs text-slate-500">
                    Provide official contact information.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className={labelStyle}>
                    Phone Number *
                  </label>

                  <input
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>
                    Email Address *
                  </label>

                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="organization@example.com"
                      className={`${inputStyle} pl-10`}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={labelStyle}>
                    Organization Website
                  </label>

                  <div className="relative">
                    <Globe
                      size={17}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://www.example.com"
                      className={`${inputStyle} pl-10`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notice */}
            <div className="rounded-xl border border-[#E8D9B9] bg-[#FAF4E7] p-5">
              <p className="text-sm font-bold text-[#8A542C]">
                Application Review
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Your application and uploaded photograph will be saved
                in our database with Pending status. An administrator
                must review and approve it before it appears publicly
                in the directory.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#145C45] py-4 font-bold text-white transition hover:bg-[#103D32] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={19} />
              {loading ? "Submitting Application..." : "Submit Registration"}
            </button>

            <p className="text-center text-xs text-slate-400">
              * Required fields
            </p>
          </form>
        )}
      </section>
    </div>
  );
};

export default Register;
