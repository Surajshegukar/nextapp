const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Fetch all categorys
 */
const getAllCategory = async (req, res) => {
  try {
    const adminList = await prisma.category.findMany({
      select: { id: true, category_name: true, status: true },
      where: { is_deleted: 0 },
      orderBy: { id: "desc" },
    });

    return res.status(200).json({
      success: true,
      message: "Records fetched successfully",
      data: adminList,
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
 * Add new category
 */
const addCategory = async (req, res) => {
  const { category_name } = req.body;

  try {
    const existing = await prisma.category.findFirst({
      where: { category_name, is_deleted: 0 },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Category already exists",
        data: {},
      });
    }

    const data = await prisma.category.create({
      data: { category_name },
    });

    res.status(201).json({
      success: true,
      message: "Record added successfully",
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
 * Get category by ID
 */
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.category.findFirst({
      where: {
        id: Number(id),
        is_deleted: 0,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
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
 * Update category
 */
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;

  try {
    const existing = await prisma.category.findFirst({
      where: {
        category_name,
        is_deleted: 0,
        NOT: { id: Number(id) },
      },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Category already exists",
        data: {},
      });
    }

    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data: { ...req.body },
    });

    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating record",
      data: error.message,
    });
  }
};

/**
 * AJAX-style fetch with pagination, search, and sorting
 */
const getAjaxCategory = async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || "";
  const filteredStatus = req.query?.status || "all";

  const columns = ["category_name", "status"];
  const colIndex = order[0]?.column;
  const dir = order[0]?.dir === "asc" ? "asc" : "desc";
  const sortField = colIndex !== undefined ? columns[colIndex] || "id" : "id";

  let whereClause = { is_deleted: 0 };
  if (searchValue) {
    whereClause = {
      ...whereClause,
      category_name: { contains: searchValue },
    };
  }
  if (filteredStatus !== "all") {
    whereClause.status = filteredStatus;
  }

  const total = await prisma.category.count({
    where: { is_deleted: 0 },
  });
  const filtered = await prisma.category.count({ where: whereClause });

  const docs = await prisma.category.findMany({
    where: whereClause,
    orderBy: { [sortField]: dir },
    skip: start,
    take: length,
  });

  const data = docs.map((row, i) => [
    i + 1 + start,
    row.id,
    row.category_name,
    row.status,
  ]);

  res.json({
    draw,
    recordsTotal: total,
    recordsFiltered: filtered,
    data,
  });
};

/**
 * Check uniqueness of category name
 */
const uniqueCategory = async (req, res) => {
  const { category_name, currentId } = req.query;

  try {
    const existing = await prisma.category.findFirst({
      where: { category_name, is_deleted: 0, NOT: currentId ? { id: Number(currentId) } : undefined },

    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Category already exists",
        isUnique: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Record is unique",
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

module.exports = {
  getAllCategory,
  addCategory,
  getCategoryById,
  updateCategory,
  getAjaxCategory,
  uniqueCategory,
};
