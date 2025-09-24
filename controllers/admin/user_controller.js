const { PrismaClient } = require('@prisma/client');
const { hash } = require("bcryptjs");
const prisma = new PrismaClient();

// Get All Users
const getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { is_deleted: "NOT_DELETED" },
      orderBy: { created_on: "desc" },
      select: {
        id: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        email: true,
        username: true,
        status: true,
        department: { select: { department_name: true } },
        designation: { select: { designation_name: true } },
      },
    });

    const data = users.map((user) => ({
      ...user,
      department_name: user.department?.department_name || "Unknown",
      designation_name: user.designation?.designation_name || "Unknown",
    }));

    res.status(200).json({
      success: true,
      message: "Records fetched successfully",
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", data: err });
  }
};

// Add User
const addUser = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    email,
    password,
    username,
    department_id,
    designation_id,
  } = req.body;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ success: false, message: "Email already exists" });

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name,
        middle_name,
        last_name,
        email,
        password: hashedPassword,
        username,
        department_id,
        designation_id,
      },
      include: {
        department: true,
        designation: true,
      },
    });

    res.status(201).json({
      success: true,
      message: "Record added successfully",
      data: {
        user: {
          id: user.id,
          first_name: user.first_name,
          middle_name: user.middle_name,
          last_name: user.last_name,
          email: user.email,
          username: user.username,
          department_name: user.department?.department_name || "Unknown",
          designation_name: user.designation?.designation_name || "Unknown",
        },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", data: err });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { department: true, designation: true },
    });

    if (!user || user.is_deleted === "DELETED") {
      return res.status(404).json({ success: false, message: "Record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: {
        ...user,
        department_name: user.department?.department_name || "Unknown",
        designation_name: user.designation?.designation_name || "Unknown",
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error", data: err });
  }
};

// Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data,
      include: { department: true, designation: true },
    });

    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating record", data: err });
  }
};

// Get Ajax Users (DataTable style)
const getAjaxUser = async (req, res) => {
  try {
    const draw = parseInt(req.body.draw) || 1;
    const start = parseInt(req.body.start) || 0;
    const length = parseInt(req.body.length) || 10;
    const searchValue = req.body.search?.value || "";
    const filteredDepart = req.query?.department_id || "all";
    const filteredName = req.query?.name || "";
    const filteredUsername = req.query?.username || "";

    const where = {
      is_deleted: "NOT_DELETED",
      AND: [],
    };

    if (searchValue) {
      where.AND.push({
        OR: [
          { first_name: { contains: searchValue, mode: "insensitive" } },
          { middle_name: { contains: searchValue, mode: "insensitive" } },
          { last_name: { contains: searchValue, mode: "insensitive" } },
          { username: { contains: searchValue, mode: "insensitive" } },
          { email: { contains: searchValue, mode: "insensitive" } },
          { department: { department_name: { contains: searchValue, mode: "insensitive" } } },
          { designation: { designation_name: { contains: searchValue, mode: "insensitive" } } },
        ],
      });
    }

    if (filteredName) {
      where.AND.push({
        OR: [
          { first_name: { contains: filteredName, mode: "insensitive" } },
          { middle_name: { contains: filteredName, mode: "insensitive" } },
          { last_name: { contains: filteredName, mode: "insensitive" } },
        ],
      });
    }

    if (filteredUsername) {
      where.AND.push({ username: { contains: filteredUsername, mode: "insensitive" } });
    }

    if (filteredDepart !== "all") {
      where.AND.push({ department_id: parseInt(filteredDepart) });
    }

    const total = await prisma.user.count({ where: { is_deleted: "NOT_DELETED" } });
    const filtered = await prisma.user.count({ where });

    const users = await prisma.user.findMany({
      where,
      include: { department: true, designation: true },
      skip: start,
      take: length,
    });

    const data = users.map((user, i) => [
      i + 1 + start,
      user.id,
      user.first_name,
      user.middle_name,
      user.last_name,
      user.designation?.designation_name || "Unknown",
      user.department?.department_name || "Unknown",
      user.email,
      user.username,
      user.status,
    ]);

    res.json({ draw, recordsTotal: total, recordsFiltered: filtered, data });
  } catch (err) {
    console.error("Error in getAjaxUser:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUser,
  addUser,
  getUserById,
  updateUser,
  getAjaxUser,
};