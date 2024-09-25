import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model('UserRegistration', UserSchema);

export default User;
