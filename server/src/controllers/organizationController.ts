
import { Request, Response } from "express";
import mongoose from "mongoose";
import Organization from "../models/Organization";
import { AuthRequest } from "../middleware/authMiddleware";

type RequestWithPhoto = Request & {
  file?: Express.Multer.File;
};

type AdminRequestWithPhoto = AuthRequest & {
  file?: Express.Multer.File;
};

const getUploadedImageUrl = (
  req: RequestWithPhoto
): string => {
  if (!req.file) return "";

  return `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
};

const parseServices = (services: unknown): string[] => {
  if (Array.isArray(services)) {
    return services.filter(
      (service): service is string => typeof service === "string"
    );
  }

  if (typeof services === "string" && services.trim()) {
    try {
      const parsed = JSON.parse(services);

      if (Array.isArray(parsed)) {
        return parsed.filter(
          (service): service is string => typeof service === "string"
        );
      }
    } catch {
      // Support comma-separated services as well.
    }

    return services
      .split(/[\n,]/)
      .map((service) => service.trim())
      .filter(Boolean);
  }

  return [];
};

// Public: Submit organization registration with optional photo
export const createOrganization = async (
  req: RequestWithPhoto,
  res: Response
) => {
  try {
    const {
      organizationName,
      email,
      phone,
      website,
      category,
      city,
      address,
      description,
      services,
    } = req.body;

    if (
      !organizationName ||
      !email ||
      !phone ||
      !category ||
      !city ||
      !address ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required organization details.",
      });
    }

    const organization = await Organization.create({
      organizationName,
      email,
      phone,
      website: website || "",
      category,
      city,
      address,
      description,
      services: parseServices(services),
      imageUrl: getUploadedImageUrl(req),
      imageSource: "",
      imageCredit: req.file ? "Uploaded by organization" : "",
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Organization registration submitted successfully.",
      organization,
    });
  } catch (error) {
    console.error("Create organization error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit organization registration.",
    });
  }
};

// Admin: Get all organizations
export const getOrganizations = async (
  _req: AuthRequest,
  res: Response
) => {
  try {
    const organizations = await Organization.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: organizations.length,
      organizations,
    });
  } catch (error) {
    console.error("Get organizations error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve organizations.",
    });
  }
};

// Admin: Create organization with optional photo
export const adminCreateOrganization = async (
  req: AdminRequestWithPhoto,
  res: Response
) => {
  try {
    const {
      organizationName,
      email,
      phone,
      website,
      category,
      city,
      address,
      description,
      services,
      status,
    } = req.body;

    if (
      !organizationName ||
      !email ||
      !phone ||
      !category ||
      !city ||
      !address ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required organization details.",
      });
    }

    const allowedStatuses = ["Pending", "Approved", "Rejected"];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid organization status.",
      });
    }

    const organization = await Organization.create({
      organizationName,
      email,
      phone,
      website: website || "",
      category,
      city,
      address,
      description,
      services: parseServices(services),
      imageUrl: getUploadedImageUrl(req),
      imageSource: "",
      imageCredit: req.file ? "Uploaded by administrator" : "",
      status: status || "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Organization created successfully.",
      organization,
    });
  } catch (error) {
    console.error("Admin create organization error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create organization.",
    });
  }
};

// Admin: Update organization details and optional photo
export const updateOrganization = async (
  req: AdminRequestWithPhoto,
  res: Response
) => {
  try {
    const organizationId = req.params.id;

    if (!mongoose.isValidObjectId(organizationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid organization ID.",
      });
    }

    const {
      organizationName,
      email,
      phone,
      website,
      category,
      city,
      address,
      description,
      services,
      status,
    } = req.body;

    const allowedStatuses = ["Pending", "Approved", "Rejected"];

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid organization status.",
      });
    }

    const updates: Record<string, unknown> = {};

    if (organizationName !== undefined) updates.organizationName = organizationName;
    if (email !== undefined) updates.email = email;
    if (phone !== undefined) updates.phone = phone;
    if (website !== undefined) updates.website = website;
    if (category !== undefined) updates.category = category;
    if (city !== undefined) updates.city = city;
    if (address !== undefined) updates.address = address;
    if (description !== undefined) updates.description = description;

    if (services !== undefined) {
      updates.services = parseServices(services);
    }

    if (status !== undefined) {
      updates.status = status;
    }

    if (req.file) {
      updates.imageUrl = getUploadedImageUrl(req);
      updates.imageSource = "";
      updates.imageCredit = "Uploaded by administrator";
    }

    const organization = await Organization.findByIdAndUpdate(
      organizationId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Organization updated successfully.",
      organization,
    });
  } catch (error) {
    console.error("Update organization error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update organization.",
    });
  }
};

// Admin: Delete organization
export const deleteOrganization = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const organizationId = req.params.id;

    if (!mongoose.isValidObjectId(organizationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid organization ID.",
      });
    }

    const organization = await Organization.findByIdAndDelete(
      organizationId
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Organization deleted successfully.",
    });
  } catch (error) {
    console.error("Delete organization error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete organization.",
    });
  }
};

// Admin: Update organization status
export const updateOrganizationStatus = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["Pending", "Approved", "Rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid organization status.",
      });
    }

    const organizationId = req.params.id;

    if (!mongoose.isValidObjectId(organizationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid organization ID.",
      });
    }

    const organization = await Organization.findByIdAndUpdate(
      organizationId,
      { status },
      { new: true, runValidators: true }
    );

    if (!organization) {
      return res.status(404).json({
        success: false,
        message: "Organization not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Organization status updated to ${status}.`,
      organization,
    });
  } catch (error) {
    console.error("Update organization status error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update organization status.",
    });
  }
};

// Public: Get approved organizations
export const getApprovedOrganizations = async (
  _req: Request,
  res: Response
) => {
  try {
    const organizations = await Organization.find({
      status: "Approved",
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: organizations.length,
      organizations,
    });
  } catch (error) {
    console.error("Get approved organizations error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve approved organizations.",
    });
  }
};
