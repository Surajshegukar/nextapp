const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Fetch all designations
 */
const getAllDesignation = async (req, res) => {
  try {
    const designationList = await prisma.designation.findMany({
      select: { id: true, designation_name: true, status: true },
      where: { is_deleted: "NOT_DELETED" },
      orderBy: { created_on: "desc" },
    });

    return res.status(200).json({
      success: true,
      message: "Records fetched successfully",
      data: designationList,
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
 * Add a new designation
 */
const addDesignation = async (req, res) => {
  const { designation_name } = req.body;

  try {
    const existing = await prisma.designation.findFirst({
      where: { designation_name, is_deleted: "NOT_DELETED" },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Designation already exists",
      });
    }

    const data = await prisma.designation.create({
      data: { designation_name },
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
 * Get designation by ID
 */
const getDesignationById = async (req, res) => {
  const { id } = req.params;

  try {
    const designation = await prisma.designation.findFirst({
      where: {
        id: Number(id),
        is_deleted: "NOT_DELETED",
      },
    });

    if (!designation) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Record fetched successfully",
      data: designation,
    });
  } catch (error) {
    console.error("Error fetching record:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error.message,
    });
  }
};

/**
 * Update a designation
 */
const updateDesignation = async (req, res) => {
  const { id } = req.params;
  const { designation_name } = req.body;

  try {
    const existing = await prisma.designation.findFirst({
      where: {
        designation_name,
        is_deleted: "NOT_DELETED",
        NOT: { id: Number(id) },
      },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Designation already exists",
      });
    }

    const updated = await prisma.designation.update({
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
 * Fetch designations with pagination, search, and sorting
 */
const getAjaxDesignation = async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || "";

  const colIndex = order[0]?.column || 0;
  const dir = order[0]?.dir === "asc" ? "asc" : "desc";
  const columns = ["designation_name", "status"];
  const sortField = columns[colIndex] || "id";

  let whereClause = { is_deleted: "NOT_DELETED" };
  if (searchValue) {
    whereClause.designation_name = { contains: searchValue };
  }

  const total = await prisma.designation.count({
    where: { is_deleted: "NOT_DELETED" },
  });
  const filtered = await prisma.designation.count({ where: whereClause });

  const docs = await prisma.designation.findMany({
    where: whereClause,
    orderBy: { [sortField]: dir },
    skip: start,
    take: length,
  });

  const data = docs.map((row, i) => [
    i + 1 + start,
    row.id,
    row.designation_name,
    row.status,
  ]);

  res.json({
    draw,
    recordsTotal: total,
    recordsFiltered: filtered,
    data,
  });
};

module.exports = {
  addDesignation,
  getAllDesignation,
  getDesignationById,
  updateDesignation,
  getAjaxDesignation,
};
