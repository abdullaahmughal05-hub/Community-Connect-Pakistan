
import mongoose, { Document, Schema } from "mongoose";

export type OrganizationStatus = "Pending" | "Approved" | "Rejected";

export interface IOrganization extends Document {
  organizationName: string;
  email: string;
  phone: string;
  category: string;
  city: string;
  address: string;
  description: string;
  services: string[];
  status: OrganizationStatus;
  createdAt: Date;
  updatedAt: Date;
  website: string;
  
  // Organization photograph fields
  imageUrl: string;
  imageSource: string;
  imageCredit: string;
}

const organizationSchema = new Schema<IOrganization>(
  {
    organizationName: {
      type: String,
      required: [true, "Organization name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    services: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // Centralized organization photographs
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },

    imageSource: {
      type: String,
      trim: true,
      default: "",
    },

    imageCredit: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Organization =
  mongoose.models.Organization ||
  mongoose.model<IOrganization>("Organization", organizationSchema);

export default Organization;
