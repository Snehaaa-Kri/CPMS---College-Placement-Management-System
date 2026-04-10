const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const tpoUsers = async (req, res) => {
  try {
    const tpoUsers = await User.find({ role: "tpo_admin" });

    res.json({ tpoUsers });
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

const tpoAddUsers = async (req, res) => {
  try {
    // console.log("Request Body:", req.body);
    
    const email = req.body.email?.trim().toLowerCase();

    // Validate required fields
    if (!email || !req.body.password || !req.body.first_name) {
      return res.status(400).json({ msg: "All fields are required!" });
    }

    //Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User Already Exists!" });
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    // Create new user object
    const newUser = new User({
      first_name: req.body.first_name,
      email: email, // normalized email
      number: req.body.number,
      password: hashPassword,
      role: "tpo_admin"
    });

    await newUser.save();

    return res.status(201).json({ msg: "User Created Successfully!" });

  } catch (error) {
    console.log("Error adding user:", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

const tpoDeleteUsers = async (req, res) => {
  try {
    // Normalize email
    const email = req.body.email?.trim().toLowerCase();
    if (!email) {
      return res.status(400).json({ msg: "Email is required!" });
    }

    // Check if user exists before deleting
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found!" });
    }

    const result = await User.deleteOne({ email });

    if (result.deletedCount > 0) {
      return res.json({ msg: "User Deleted Successfully!" });
    } else {
      return res.status(400).json({ msg: "Error While Deleting User!" });
    }

  } catch (error) {
    console.log("Error deleting user:", error);
    return res.status(500).json({ msg: "Internal Server Error!" });
  }
};

module.exports = {
  tpoUsers,
  tpoAddUsers,
  tpoDeleteUsers
};