import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const oidcUserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true 
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true, 
      trim: true
    },
    password: {
      type: String,
      required: function() {
        return !this.googleId; 
      }
    },
    verifiedEmail: {
      type: Boolean,
      default: false
    },
    profileImage: {
      type: String,
      default: ""
    },
    googleId: {
      type: String,
      sparse: true 
    },
  },
  {
    timestamps: true,
  },
);

oidcUserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else {
    return next();
  }
});

oidcUserSchema.methods.comparePassword = async function (cleanTextPassword) {
 return await bcrypt.compare(cleanTextPassword, this.password);
};
export default mongoose.model("oidcUser", oidcUserSchema);
