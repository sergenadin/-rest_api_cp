// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js"; // Adjust the path based on your project structure
import cors from "cors";
import "dotenv/config.js";

// Set up Express app and enable CORS
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Set the port from environment variable or default to 5000
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// GET: Return all users
app.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

// POST: Add a new user to the database
app.post("/users", async (req, res) => {
	try {
		// Check if required fields are present in the request body
		if (!req.body.username || !req.body.password || !req.body.email) {
			return response.status(400).send({
				message: "Send all required fields",
			});
		}

		// Create a new user with the provided data
		const newUser = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		};

		// Save the new user to the database
		const user = await User.create(newUser);
		res.status(201).send(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

// PUT: Edit a user by ID
app.put("/users/:id", async (req, res) => {
	try {
		// Update the user with the provided data
		const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!updatedUser) {
			return res.status(404).send("User not found");
		}
		res.status(200).json(updatedUser);
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

// DELETE: Remove a user by ID
app.delete("/users/:id", async (req, res) => {
	try {
		// Delete the user with the specified ID
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		if (!deletedUser) {
			return res.status(404).send("User not found");
		}
		res.status(204).send();
	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});

// Start the server and listen on the specified port
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
