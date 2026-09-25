import mongoose, { Schema, Document } from "mongoose";

export interface IMember {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email?: string;
  phone?: string;
  role: "admin" | "member";
  joinedAt: Date;
}

export interface IGroup extends Document {
  name: string;
  description?: string;
  currency: string;
  inviteCode: string;
  members: IMember[];
  createdBy?: string;
  createdAt: Date;
}

export function generateInviteCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const MemberSchema = new Schema<IMember>({
  name: { type: String, required: true, trim: true },
  email: { type: String, default: "", lowercase: true, trim: true },
  phone: { type: String, default: "", trim: true },
  role: { type: String, enum: ["admin", "member"], default: "member" },
  joinedAt: { type: Date, default: Date.now },
});

const GroupSchema = new Schema<IGroup>({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  currency: { type: String, default: "INR", uppercase: true, trim: true },
  inviteCode: {
    type: String,
    unique: true,
    sparse: true,
    uppercase: true,
    trim: true,
    index: true,
  },
  members: [MemberSchema],
  createdBy: { type: String, default: "system" },
  createdAt: { type: Date, default: Date.now },
});

// Automatically ensure unique invite code on save
GroupSchema.pre("save", async function (next) {
  if (!this.inviteCode) {
    let unique = false;
    let newCode = "";
    while (!unique) {
      newCode = generateInviteCode();
      const existing = await mongoose.models.Group.findOne({ inviteCode: newCode });
      if (!existing) unique = true;
    }
    this.inviteCode = newCode;
  }
  next();
});

export const Group = mongoose.model<IGroup>("Group", GroupSchema);
