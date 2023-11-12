import mongoose from "mongoose";

// Define the user schema
const userSchema = mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
