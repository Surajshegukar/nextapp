const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Fetch all departments
 */
const getAllDepartment = async (req, res) => {
  try {
    const adminList = await prisma.department.findMany({
      select: { id: true, department_name: true, status: true },
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
 * Add new department
 */
const addDepartment = async (req, res) => {
  const { department_name } = req.body;

  try {
    const existing = await prisma.department.findFirst({
      where: { department_name, is_deleted: 0 },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Department already exists",
        data: {},
      });
    }

    const data = await prisma.department.create({
      data: { department_name },
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
 * Get department by ID
 */
const getDepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.department.findFirst({
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
 * Update department
 */
const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { department_name } = req.body;

  try {
    const existing = await prisma.department.findFirst({
      where: {
        department_name,
        is_deleted: 0,
        NOT: { id: Number(id) },
      },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Department already exists",
        data: {},
      });
    }

    const updated = await prisma.department.update({
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
const getAjaxDepartment = async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || "";
  const filteredStatus = req.query?.status || "all";

  const columns = ["department_name", "status"];
  const colIndex = order[0]?.column;
  const dir = order[0]?.dir === "asc" ? "asc" : "desc";
  const sortField = colIndex !== undefined ? columns[colIndex] || "id" : "id";

  let whereClause = { is_deleted: 0 };
  if (searchValue) {
    whereClause = {
      ...whereClause,
      department_name: { contains: searchValue },
    };
  }
  if (filteredStatus !== "all") {
    whereClause.status = filteredStatus;
  }

  const total = await prisma.department.count({
    where: { is_deleted: 0 },
  });
  const filtered = await prisma.department.count({ where: whereClause });

  const docs = await prisma.department.findMany({
    where: whereClause,
    orderBy: { [sortField]: dir },
    skip: start,
    take: length,
  });

  const data = docs.map((row, i) => [
    i + 1 + start,
    row.id,
    row.department_name,
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
 * Check uniqueness of department name
 */
const uniqueDepartment = async (req, res) => {
  const { department_name, currentId } = req.query;

  try {
    const existing = await prisma.department.findFirst({
      where: { department_name, is_deleted: 0, NOT: currentId ? { id: Number(currentId) } : undefined },

    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Department already exists",
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
  getAllDepartment,
  addDepartment,
  getDepartmentById,
  updateDepartment,
  getAjaxDepartment,
  uniqueDepartment,
};
