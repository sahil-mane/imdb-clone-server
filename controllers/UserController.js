const bycrpt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const hashedPassword =
      password.length > 6
        ? await bycrpt.hash(password, 10)
        : res
            .status(400)
            .json({ message: "Password must be at least 8 characters long" });

    const newUser = await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json({
        success: true,
        message: "user created successfully",
        user: newUser,
      });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = username
      ? await User.findOne({ username: username })
      : await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isPasswordValid = await bycrpt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Prepare payload for token
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    // Generate JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "5h",
    });

    // Respond with success and token
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token: token,
      role: user.role,
      userId:user._id
    });
  } catch (error) {
    console.error("Sign-in error:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.user.id;
    const UserExisted = await User.findOne({_id:id})
    if(!UserExisted) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(UserExisted); 
    // if (roles == "User") {
    // }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, signIn, getUserById };
