
import { Router } from "express";

import {
  createOrganization,
  getOrganizations,
  updateOrganizationStatus,
  getApprovedOrganizations,
  adminCreateOrganization,
  updateOrganization,
  deleteOrganization,
} from "../controllers/organizationController";

import { protectAdmin } from "../middleware/authMiddleware";
import uploadOrganizationPhoto from "../middleware/uploadOrganizationPhoto";

const router = Router();

// Public registration with optional photograph
router.post(
  "/register",
  uploadOrganizationPhoto.single("photo"),
  createOrganization
);

// Public approved organizations
router.get("/approved", getApprovedOrganizations);

// Protected administrator routes
router.get("/", protectAdmin, getOrganizations);

router.post(
  "/",
  protectAdmin,
  uploadOrganizationPhoto.single("photo"),
  adminCreateOrganization
);

router.put(
  "/:id",
  protectAdmin,
  uploadOrganizationPhoto.single("photo"),
  updateOrganization
);

router.delete("/:id", protectAdmin, deleteOrganization);

router.patch(
  "/:id/status",
  protectAdmin,
  updateOrganizationStatus
);

export default router;
