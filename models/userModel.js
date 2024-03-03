import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userStatus: {
      type: String,
      default: "test_user",
    },
    startTrialDate: {
      type: Date,
      default: Date.now,
    },
    endTrialDate: {
      type: Date,
      default: () => new Date(+new Date() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    },
    subscribed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
