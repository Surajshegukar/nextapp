const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ms = require("ms");
const prisma = require("../../config/prisma"); // ✅ Make sure this points to your Prisma client

// Login Route
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.tbl_admins.findUnique({
      where: { email },
    });

    const passwordMatch =
      user && (await bcrypt.compare(password, user.password));

    if (!user || !passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        data: null,
      });
    }

    // Generate access token
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: ms(process.env.ACCESS_TOKEN_DURATION) / 1000 + "s", // Prisma needs seconds for JWT
    });

    // Set cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: ms(process.env.ACCESS_TOKEN_DURATION),
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: err,
    });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await prisma.tbl_admins.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
        data: null,
      });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const newUser = await prisma.tbl_admins.create({
      data: { name, email, password: hashedPassword },
      select: { id: true, name: true, email: true },
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { user: newUser },
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: err,
    });
  }
};

// Fetch session
const fetchSession = async (req, res) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: "No access token provided",
      data: null,
    });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await prisma.tbl_admins.findUnique({
      where: { id: decoded.userId },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Session fetched successfully",
      data: { user },
    });
  } catch (err) {
    console.error("Fetch Session Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: err,
    });
  }
};

// Logout
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
      data: null,
    });
  } catch (err) {
    console.error("Logout Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: err,
    });
  }
};

module.exports = {
  loginUser,
  fetchSession,
  registerUser,
  logoutUser,
};
