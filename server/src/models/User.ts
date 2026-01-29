import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => value.length >= 8,
        message: "Password must be at least 8 characters long",
      },
    },
    role: { type: String, enum:["admin","user"],  default: "user" },
  },
  { timestamps: true },
);

UserSchema.index({ email: 1 }, { unique: true });

// Pre-save password hashing
UserSchema.pre<IUser>("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  }
});

// Instance method to compare password
UserSchema.methods.comparePassword = async function (candidate: string):Promise<boolean> {
  return  bcrypt.compare(candidate, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
