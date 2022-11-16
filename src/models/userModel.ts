import mongoose, { model, Schema } from "mongoose";
import { IUser } from "../../types/IUser";

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  donation: {
    price: String,
  },
});

const User = mongoose.models.User || model<IUser>("User", UserSchema);

export default User;
