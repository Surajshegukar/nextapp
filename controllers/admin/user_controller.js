const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Fetch all users
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { is_deleted: 0 },
      orderBy: { id: "desc" },
      include: {
    Magazine: {
      include: {
        category: true, // fetch category details as well
      },
    }
  }
    });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: err.message,
    });
  }
};

/**
 * Add new user
 */
const addUser = async (req, res) => {
  try {
    const {
      full_name,
      email,
      password,
      short_description,
      description,
      job,
      city,
    } = req.body;
    const image = req.file; // assuming you are using multer for file upload

    // const existing = await prisma.user.findFirst({
    //   where: { full_name, is_deleted: 0 },
    // });

    // if (existing) {
    //   return res.status(200).json({
    //     success: false,
    //     message: "User already exists",
    //     data: {},
    //   });
    // }

    const data = await prisma.user.create({
      data: {
        full_name,
        email,
        password,
        image: image ? image.filename : null,
        short_description,
        description,
        job,
        city,
      },
    });

    res.status(201).json({
      success: true,
      message: "User added successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

/**
 * Get user by ID
 */
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: { id: Number(id), is_deleted: 0 },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

/**
 * Update user
 */
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      full_name,
      email,
      password,
      short_description,
      description,
      job,
      city,
    } = req.body;
    const image = req.file;

    const existing = await prisma.user.findFirst({
      where: {
        full_name,
        is_deleted: 0,
        NOT: { id: Number(id) },
      },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "User already exists",
        data: {},
      });
    }

    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        full_name,
        email,
        password,
        short_description,
        description,
        job,
        city,
        ...(image && { image: image.filename }),
      },
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      data: error.message,
    });
  }
};

/**
 * Check uniqueness of user name
 */
const uniqueUser = async (req, res) => {
  const { full_name, currentId } = req.query;

  try {
    const existing = await prisma.user.findFirst({
      where: {
        full_name,
        is_deleted: 0,
        NOT: currentId ? { id: Number(currentId) } : undefined,
      },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "User already exists",
        isUnique: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "User name is unique",
      isUnique: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

const getAjaxUsers = async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || "";
  const filteredCategory = req.query?.category_id || "all";

  // Columns for sorting (add or adjust fields as needed)
  const columns = [
    "full_name",
    "image",
    "email",
    "password",
    "short_description",
    "job",
    "city",
  ];
  const colIndex = order[0]?.column;
  const dir = order[0]?.dir === "asc" ? "asc" : "desc";
  const sortField = colIndex !== undefined ? columns[colIndex] || "id" : "id";

  // Base where clause
  let whereClause = { is_deleted: 0 };

  if (searchValue) {
    whereClause = {
      ...whereClause,
      full_name: { contains: searchValue, mode: "insensitive" },
    };
  }

  if (filteredCategory !== "all") {
    whereClause.category_id = filteredCategory;
  }

  try {
    const total = await prisma.user.count({
      where: { is_deleted: 0 },
    });

    const filtered = await prisma.user.count({
      where: whereClause,
    });

    const docs = await prisma.user.findMany({
      where: whereClause,
      orderBy: { [sortField]: dir },
      skip: start,
      take: length,
    });

    const data = docs.map((row, i) => [
      i + 1 + start,
      row.id,
      row.status,
      row.full_name,
      row.email,
      row.password,
      row.job,
      row.city,
      row.image,
      row.short_description,
    ]);

    res.json({
      draw,
      recordsTotal: total,
      recordsFiltered: filtered,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      data: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  getUserById,
  updateUser,
  uniqueUser,
  getAjaxUsers,
};
