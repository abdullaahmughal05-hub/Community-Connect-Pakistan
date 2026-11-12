import "dotenv/config";
import { setServers } from "node:dns";
import mongoose from "mongoose";
import Organization from "../models/Organization";

// Keep the same DNS workaround that was successful for this project.
setServers(["8.8.8.8", "1.1.1.1"]);

type PhotoRecord = {
  match: string;
  imageUrl: string;
  imageSource: string;
  imageCredit: string;
};

// These are organization-specific documentary photographs, not generated images.
// Prefer official organization galleries where a direct image is publicly exposed.
const organizationPhotos: PhotoRecord[] = [
 {
  match: "edhi",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/18/Edhi_Foundation_Pakistan.jpg",
  imageSource: "https://commons.wikimedia.org/wiki/File:Edhi_Foundation_Pakistan.jpg",
  imageCredit: "Voice of America / Wikimedia Commons",
},
  {
    match: "chhipa",
    imageUrl: "https://www.chhipa.org/wp-content/uploads/gallery/chhipa-ambulance/1.jpg",
    imageSource: "https://www.chhipa.org/services/chhipa-ambulance/",
    imageCredit: "Chhipa Welfare Association official website",
  },
  {
    match: "alkhidmat",
    imageUrl: "https://alkhidmat.org/backend/images/region/blog/ckeditor-images/177503756169ccec7972691.jpeg",
    imageSource: "https://alkhidmat.org/about-us/latest/blog/alkhidmats-rs36884-million-ramadan-relief-reaches-481562-across-kp",
    imageCredit: "Alkhidmat Foundation official website",
  },
  {
    match: "sos children's village",
    imageUrl: "https://www.soschildrensvillages.ca/sites/default/files/two-girls-hugging-pakistan-800x533.jpg",
    imageSource: "https://www.soschildrensvillages.ca/pakistan/sos-childrens-village-rawalpindi",
    imageCredit: "SOS Children's Villages",
  },
  {
    match: "wwf-pakistan",
    imageUrl: "https://stories.bettercotton.org/growing-resilience-a-woman-worker-navigating-climate-challenges-in-pakistan/assets/nXw09XSIrM/dsc_9763-4096x2734.jpg",
    imageSource: "https://stories.bettercotton.org/growing-resilience-a-woman-worker-navigating-climate-challenges-in-pakistan/",
    imageCredit: "Better Cotton Initiative; photograph/story features WWF-Pakistan",
  },
  {
    match: "islamic relief",
    imageUrl: "https://islamicrelief.org.au/wp-content/uploads/2022/09/uydoRP0v_2x.jpeg",
    imageSource: "https://islamicrelief.org.au/islamic-relief-worldwide-ceo-reports-unforgettable-scenes-of-suffering-in-pakistan-floods/",
    imageCredit: "Islamic Relief Australia; photograph identifies Islamic Relief Pakistan",
  },
  {
    match: "sahil",
    imageUrl: "https://sahil.org/wp-content/uploads/2024/08/mhpss-session-with-child.jpeg",
    imageSource: "https://sahil.org/",
    imageCredit: "Sahil official website",
  },
];

async function updateOrganizationPhotos() {
  const mongoUri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    process.env.MONGO_URL;

  if (!mongoUri) {
    throw new Error("MongoDB URI not found. Check server/.env.");
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB.");

  let updated = 0;
  let unmatched = 0;

  const organizations = await Organization.find({}, {
    _id: 1,
    organizationName: 1,
  });

  for (const organization of organizations) {
    const name = organization.organizationName.toLowerCase();
    const photo = organizationPhotos.find((item) => name.includes(item.match));

    if (!photo) {
      unmatched += 1;
      console.log(`No mapped photo: ${organization.organizationName}`);
      continue;
    }

    await Organization.updateOne(
      { _id: organization._id },
      {
        $set: {
          imageUrl: photo.imageUrl,
          imageSource: photo.imageSource,
          imageCredit: photo.imageCredit,
        },
      }
    );

    updated += 1;
    console.log(`Photo assigned: ${organization.organizationName}`);
  }

  console.log(
    `Photo update complete. Updated: ${updated}. No photo mapping: ${unmatched}. Total records: ${organizations.length}.`
  );

  await mongoose.disconnect();
}

updateOrganizationPhotos().catch(async (error) => {
  console.error("Organization photo update failed:", error);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
