import "dotenv/config";
import { setServers } from "node:dns";
import mongoose from "mongoose";
import Organization, { type IOrganization } from "../models/Organization";

// Use public DNS resolvers for MongoDB SRV lookups
setServers(["8.8.8.8", "1.1.1.1"]);

/**
 * Community Connect Pakistan - verified organization seed data.
 *
 * Each record represents a city-specific office/village/branch, not a claim
 * that the organization provides every service at every location.
 * Contact details are included only where published by the organization.
 * Re-running this script updates the matching organizationName + city record
 * instead of creating duplicates. It does not delete existing database data.
 */

type SeedOrganization = Pick<
  IOrganization,
  | "organizationName"
  | "email"
  | "phone"
  | "website"
  | "category"
  | "city"
  | "address"
  | "description"
  | "services"
  | "status"
>;

const organizations: SeedOrganization[] = [
  // SOS Children's Villages Pakistan - official all-cities directory
  {
    organizationName: "SOS Children's Village Lahore",
    email: "lahore@sos.org.pk",
    phone: "+92-42-35943922, +92-42-35943906",
    website: "https://www.sos.org.pk/",
    category: "Child Welfare",
    city: "Lahore",
    address: "Ferozepur Road, Lahore 54600, Pakistan",
    description: "SOS Children's Village Lahore provides family-based care for children without parental care and supports children's education and development through its village and community education facilities.",
    services: ["Family-based child care", "Child protection", "Education", "Community schooling", "Youth development"],
    status: "Approved",
  },
  {
    organizationName: "SOS Children's Village Karachi",
    email: "karachi@sos.org.pk",
    phone: "+92-21-34592202, +92-21-34593035",
    website: "https://www.sos.org.pk/Karachi",
    category: "Child Welfare",
    city: "Karachi",
    address: "153-Deh Mehran, Jinnah Avenue, behind Mukhtarkar's Office, Malir Halt, Karachi",
    description: "SOS Children's Village Karachi provides family-based care and child development support. Its village also reports a medical centre for women and children that provides free treatment to the surrounding community.",
    services: ["Family-based child care", "Child protection", "Medical centre for women and children", "Community healthcare", "Education"],
    status: "Approved",
  },
  {
    organizationName: "SOS Children's Village Peshawar",
    email: "peshawar@sos.org.pk",
    phone: "+92-91-5812776",
    website: "https://www.sos.org.pk/Peshawar",
    category: "Child Welfare",
    city: "Peshawar",
    address: "Plot 5-A-2, Main Boulevard, Phase V, Hayatabad, Peshawar",
    description: "SOS Children's Village Peshawar provides family-based care for children and operates educational facilities including a school and college, alongside youth and community facilities.",
    services: ["Family-based child care", "Child protection", "School education", "College education", "Youth development"],
    status: "Approved",
  },
  {
    organizationName: "SOS Children's Village Islamabad",
    email: "islamabad@sos.org.pk",
    phone: "+92-51-8918220, +92-325-5757822",
    website: "https://www.sos.org.pk/Islamabad",
    category: "Child Welfare",
    city: "Islamabad",
    address: "Near Police Academy, opposite NUST University, H-11, Islamabad",
    description: "SOS Children's Village Islamabad provides family-based care for children and operates community and educational facilities, including a community school and computer learning facilities.",
    services: ["Family-based child care", "Child protection", "Community school", "Computer education", "Youth development"],
    status: "Approved",
  },
  {
    organizationName: "SOS Children's Village Rawalpindi",
    email: "rawalpindi@sos.org.pk",
    phone: "+92-51-4917312, +92-333-5258822",
    website: "https://www.sos.org.pk/AllCities",
    category: "Child Welfare",
    city: "Rawalpindi",
    address: "Opposite High Court, G.T. Road, Rawalpindi",
    description: "SOS Children's Village Rawalpindi provides residential family-based care and support for children and young people.",
    services: ["Family-based child care", "Child protection", "Residential care", "Youth support"],
    status: "Approved",
  },

  // WWF-Pakistan - official offices directory
  {
    organizationName: "WWF-Pakistan Lahore Office",
    email: "info@wwf.org.pk",
    phone: "+92-42-35465972-77, 111-993-725",
    website: "https://www.wwfpak.org/",
    category: "Environment",
    city: "Lahore",
    address: "Inside Ali Institute of Education, Ferozepur Road, Lahore, Punjab",
    description: "WWF-Pakistan works on nature conservation, biodiversity protection, sustainable resource use and environmental awareness. Lahore is its national head office.",
    services: ["Wildlife conservation", "Biodiversity protection", "Environmental education", "Climate and sustainability initiatives", "Community conservation"],
    status: "Approved",
  },
  {
    organizationName: "WWF-Pakistan Karachi Office",
    email: "karachi@wwf.org.pk",
    phone: "+92-21-34544790",
    website: "https://www.wwfpak.org/",
    category: "Environment",
    city: "Karachi",
    address: "Bungalow #11, Block 7/8, K.M.C.H.S., near Al-Tijarah Centre, Shahrah-e-Faisal, Karachi",
    description: "WWF-Pakistan works on nature conservation, biodiversity protection, sustainable resource use and environmental awareness. This is its listed Karachi regional office.",
    services: ["Wildlife conservation", "Marine and coastal conservation", "Environmental education", "Climate and sustainability initiatives", "Community conservation"],
    status: "Approved",
  },
  {
    organizationName: "WWF-Pakistan Islamabad Office",
    email: "islamabad@wwf.org.pk",
    phone: "+92-51-8857771-78, +92-51-8480466",
    website: "https://www.wwfpak.org/",
    category: "Environment",
    city: "Islamabad",
    address: "Ground Floor, Pakistan Academy of Sciences Building, 3 Constitution Avenue, Sector G-5/2, Islamabad",
    description: "WWF-Pakistan works on nature conservation, biodiversity protection, sustainable resource use and environmental awareness. This is its listed Islamabad regional office.",
    services: ["Wildlife conservation", "Biodiversity protection", "Environmental education", "Climate and sustainability initiatives", "Community conservation"],
    status: "Approved",
  },
  {
    organizationName: "WWF-Pakistan Peshawar Office",
    email: "peshawar@wwf.org.pk",
    phone: "+92-91-3066343",
    website: "https://www.wwfpak.org/",
    category: "Environment",
    city: "Peshawar",
    address: "House #72-D, Ataturk Lane, University Town, Peshawar",
    description: "WWF-Pakistan works on nature conservation, biodiversity protection, sustainable resource use and environmental awareness. This is its listed Peshawar regional office.",
    services: ["Wildlife conservation", "Biodiversity protection", "Environmental education", "Climate and sustainability initiatives", "Community conservation"],
    status: "Approved",
  },

  // Islamic Relief Pakistan - official contact page lists these area offices
  {
    organizationName: "Islamic Relief Pakistan Islamabad Office",
    email: "info@irp.org.pk",
    phone: "+92-51-2114212-17",
    website: "https://islamic-relief.org.pk/",
    category: "Humanitarian Aid",
    city: "Islamabad",
    address: "IRM Complex, 7 Sunrise Avenue, Main Park Road, near COMSATS University, Islamabad",
    description: "Islamic Relief Pakistan is a humanitarian organization working with vulnerable communities. Its published work includes emergency response and humanitarian assistance; contact the country office for current local programmes.",
    services: ["Humanitarian assistance", "Emergency response", "Disaster relief", "Community support"],
    status: "Approved",
  },
  {
    organizationName: "Islamic Relief Pakistan Rawalpindi Office",
    email: "info@irp.org.pk",
    phone: "+92-51-5174371",
    website: "https://islamic-relief.org.pk/",
    category: "Humanitarian Aid",
    city: "Rawalpindi",
    address: "House #85, Asghar Mall, opposite National Market, Rawalpindi",
    description: "Islamic Relief Pakistan is a humanitarian organization working with vulnerable communities. This is its listed Rawalpindi area office; contact it to confirm currently available local services.",
    services: ["Humanitarian assistance", "Emergency response", "Disaster relief", "Community support"],
    status: "Approved",
  },
  {
    organizationName: "Islamic Relief Pakistan Peshawar Office",
    email: "info@irp.org.pk",
    phone: "+92-91-5704226-7",
    website: "https://islamic-relief.org.pk/",
    category: "Humanitarian Aid",
    city: "Peshawar",
    address: "Baitul Maal Street No. 2, near Masjid Mukaram Khan, Railway Lane, Pawakay, Peshawar",
    description: "Islamic Relief Pakistan is a humanitarian organization working with vulnerable communities. This is its listed Peshawar area office; contact it to confirm currently available local services.",
    services: ["Humanitarian assistance", "Emergency response", "Disaster relief", "Community support"],
    status: "Approved",
  },
  {
    organizationName: "Islamic Relief Pakistan Karachi Office",
    email: "info@irp.org.pk",
    phone: "+92-21-34401110",
    website: "https://islamic-relief.org.pk/",
    category: "Humanitarian Aid",
    city: "Karachi",
    address: "House #A-307, PIA Housing Society, Block 9, Gulistan-e-Johar, Karachi",
    description: "Islamic Relief Pakistan is a humanitarian organization working with vulnerable communities. This is its listed Karachi area office; contact it to confirm currently available local services.",
    services: ["Humanitarian assistance", "Emergency response", "Disaster relief", "Community support"],
    status: "Approved",
  },

  // Alkhidmat Foundation - official regional/contact pages
  {
    organizationName: "Alkhidmat Foundation Lahore",
    email: "info@alkhidmat.org",
    phone: "+92-42-38020222, 0304-1114222",
    website: "https://alkhidmat.org/",
    category: "Community Welfare",
    city: "Lahore",
    address: "3 KM Khayaban-e-Jinnah, Lahore, Punjab, Pakistan",
    description: "Alkhidmat Foundation is a humanitarian non-profit providing community welfare programmes. Its published programme areas include orphan care, clean water, disaster management, health, education and community services.",
    services: ["Orphan care", "Clean water", "Disaster management", "Health services", "Education", "Community services", "Islamic microfinance"],
    status: "Approved",
  },
  {
    organizationName: "Alkhidmat Foundation Karachi",
    email: "media@alkhidmat.com",
    phone: "+92-21-111503504",
    website: "https://alkhidmat.org/",
    category: "Community Welfare",
    city: "Karachi",
    address: "504 Quaideen Colony, near Islamia College, Karachi",
    description: "Alkhidmat Foundation provides humanitarian and community welfare programmes. Its published programme areas include orphan care, clean water, disaster management, health, education and community services.",
    services: ["Orphan care", "Clean water", "Disaster management", "Health services", "Education", "Community services"],
    status: "Approved",
  },
  {
    organizationName: "Alkhidmat Foundation Rawalpindi",
    email: "info@alkhidmatrwp.org",
    phone: "051-5132001-2, +92-310-5333968",
    website: "https://www.alkhidmatrwp.org/",
    category: "Community Welfare",
    city: "Rawalpindi",
    address: "Property #15-A, Sher Pao Colony, Committee Chowk, Rawalpindi 46000",
    description: "Alkhidmat Foundation Rawalpindi publishes programmes in disaster management, health, education, Bano Qabil skills training, water and sanitation, orphan care, Islamic microfinance and community services.",
    services: ["Disaster management", "Health services", "Education", "Bano Qabil IT training", "Water and sanitation", "Orphan care", "Islamic microfinance", "Community services"],
    status: "Approved",
  },

  // Child protection and other specialist community services
  {
    organizationName: "Sahil - Islamabad Head Office",
    email: "info@sahil.org",
    phone: "+92-51-2260636, +92-51-2856950",
    website: "https://sahil.org/",
    category: "Child Protection",
    city: "Islamabad",
    address: "Office No. 13, First Floor, Al-Babar Center, F-8 Markaz, Islamabad",
    description: "Sahil works on child protection, particularly prevention of child sexual abuse. Its published work includes awareness raising, training, community safeguarding networks, referral support, research, advocacy, free legal aid and counselling.",
    services: ["Child protection awareness", "Community safeguarding", "Training and capacity building", "Child protection referral networks", "Free legal aid", "Counselling", "Research and advocacy"],
    status: "Approved",
  },
  {
    organizationName: "Chhipa Welfare Association Karachi",
    email: "info@chhipa.org",
    phone: "+92-21-111-92-1020, +92-300-3631020, Helpline 1020",
    website: "https://www.chhipa.org/",
    category: "Emergency and Social Welfare",
    city: "Karachi",
    address: "Plot No. ZC-5, Sector 8/A, FTC Bridge, Shahrah-e-Faisal, Karachi 74400, Sindh, Pakistan",
    description: "Chhipa Welfare Association is a Karachi-based welfare organization. Its official contact page publishes its central office details and Chhipa helpline; contact the organization directly for current service availability.",
    services: ["Welfare assistance", "Emergency assistance", "Community support", "Helpline support"],
    status: "Approved",
  },
  {
    organizationName: "Edhi Foundation Karachi",
    email: "info@edhi.org",
    phone: "+92-21-32413232",
    website: "https://www.edhi.org/",
    category: "Emergency and Social Welfare",
    city: "Karachi",
    address: "Sarafa Bazar, Boulton Market, Mithadar, Karachi, Pakistan",
    description: "Edhi Foundation is a nationwide social welfare organization. Its official network information lists ambulance and welfare services and identifies Karachi as its head-office location. Contact the foundation to confirm the appropriate local service point.",
    services: ["Emergency ambulance services", "Welfare assistance", "Shelter and social support", "Community services"],
    status: "Approved",
  },
  {
    organizationName: "Edhi Foundation Islamabad Network",
    email: "info@edhi.org",
    phone: "+92-51-2827844",
    website: "https://www.edhi.org/networks",
    category: "Emergency and Social Welfare",
    city: "Islamabad",
    address: "Near Masjid-e-Shohada, Aabpara, Islamabad",
    description: "Edhi Foundation's official network page lists an Islamabad zonal office. Contact the office to confirm the current availability and location of specific welfare services.",
    services: ["Emergency ambulance services", "Welfare assistance", "Shelter and social support", "Community services"],
    status: "Approved",
  },
];

async function seedOrganizations() {
  const mongoUri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.MONGO_URL;

  if (!mongoUri) {
    throw new Error(
      "MongoDB connection string not found. Check your server/.env variable name (MONGODB_URI, MONGO_URI, or MONGO_URL)."
    );
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB.");

  let inserted = 0;
  let updated = 0;

  for (const item of organizations) {
    const result = await Organization.updateOne(
      { organizationName: item.organizationName, city: item.city },
      { $set: item },
      { upsert: true, runValidators: true }
    );

    if (result.upsertedCount > 0) inserted += 1;
    else if (result.modifiedCount > 0) updated += 1;
  }

  console.log(`Seed complete. New records: ${inserted}. Updated records: ${updated}. Total in this file: ${organizations.length}.`);
  console.log("All imported records have status Approved and should appear on the public approved-organizations endpoint.");

  await mongoose.disconnect();
}

seedOrganizations().catch(async (error) => {
  console.error("Organization seed failed:", error);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
