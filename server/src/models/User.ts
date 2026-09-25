import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {

  fullName: string;
  email: string;
  clerkId?: string;
  preferredName?: string;
  phone?: string;
  isPhoneVerified?: boolean;
  avatar?: string;
  friends: mongoose.Types.ObjectId[];
  linkedAccounts: {
    venmo?: string;
    cashApp?: string;
    paypal?: string;
    upi?: string;
  };

  security: {
    twoFactorEnabled?: boolean;
    passwordLastChangedAt?: Date;
  };

  preferences: {
    currency?: string;
    theme?: string;
    acousticFeedback?: boolean;
    compactDensity?: boolean;
    liveForex?: boolean;
  };
}

const userSchema = new Schema<IUser>(
  {

    clerkId: { type: String, default: "", index: true },
    fullName: { type: String, required: true, trim: true },
    preferredName: { type: String, default: "", trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, default: "", trim: true },
    isPhoneVerified: { type: Boolean, default: false },
    avatar: { type: String, default: "" },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    linkedAccounts: {
      venmo: {
        type: String,
        default: "",
      },
      cashApp: {
        type: String,
        default: "",
      },
      paypal: {
        type: String,
        default: "",
      },
      upi: {
        type: String,
        default: "",
      },
    },

    security: {
      twoFactorEnabled: {
        type: Boolean,
        default: false,
      },
    },

    preferences: {
      currency: {
        type: String,
        default: "INR",
      },
      theme: {
        type: String,
        default: "system",
      },
      acousticFeedback: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
