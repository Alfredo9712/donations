import mongoose, { Mongoose, Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
