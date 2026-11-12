
import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const uploadDirectory = path.resolve(process.cwd(), "uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = `organization-${Date.now()}-${Math.round(
      Math.random() * 1_000_000
    )}${extension}`;

    callback(null, safeName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.mimetype)) {
    return callback(
      new Error("Only JPG, PNG and WEBP images are allowed.")
    );
  }

  callback(null, true);
};

const uploadOrganizationPhoto = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});

export default uploadOrganizationPhoto;
