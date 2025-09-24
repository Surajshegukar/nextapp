const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Fetch all magazines
 */
const getAllMagazines = async (req, res) => {
  try {
    const magazines = await prisma.magazine.findMany({
      where: { is_deleted: 0 },
      orderBy: { id: "desc" },
    });

    return res.status(200).json({
      success: true,
      message: "Magazines fetched successfully",
      data: magazines,
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
 * Add new magazine
 */
const addMagazine = async (req, res) => {
  try {
    const { magazine_name, category, publish_date, auther, short_description, duration } = req.body;
    const image = req.file; // assuming you are using multer for file upload

    const existing = await prisma.magazine.findFirst({
      where: { magazine_name, is_deleted: 0 },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Magazine already exists",
        data: {},
      });
    }

    const data = await prisma.magazine.create({
      data: {
        magazine_name,
        category,
        publish_date: publish_date ? new Date(publish_date) : null,
        auther,
        short_description,
        duration: Number(duration),
        image: image ? image.filename : null,
      },
    });

    res.status(201).json({
      success: true,
      message: "Magazine added successfully",
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
 * Get magazine by ID
 */
const getMagazineById = async (req, res) => {
  const { id } = req.params;

  try {
    const magazine = await prisma.magazine.findFirst({
      where: { id: Number(id), is_deleted: 0 },
    });

    if (!magazine) {
      return res.status(404).json({
        success: false,
        message: "Magazine not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Magazine fetched successfully",
      data: magazine,
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
 * Update magazine
 */
const updateMagazine = async (req, res) => {
  const { id } = req.params;
  try {
    const { magazine_name, category, publish_date, auther, short_description, duration } = req.body;
    const image = req.file;

    const existing = await prisma.magazine.findFirst({
      where: {
        magazine_name,
        is_deleted: 0,
        NOT: { id: Number(id) },
      },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Magazine already exists",
        data: {},
      });
    }

    const updated = await prisma.magazine.update({
      where: { id: Number(id) },
      data: {
        magazine_name,
        category,
        publish_date: publish_date ? new Date(publish_date) : null,
        auther,
        short_description,
        duration: Number(duration),
        ...(image && { image: image.filename }),
      },
    });

    res.status(200).json({
      success: true,
      message: "Magazine updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating magazine",
      data: error.message,
    });
  }
};

/**
 * Check uniqueness of magazine name
 */
const uniqueMagazine = async (req, res) => {
  const { magazine_name, currentId } = req.query;

  try {
    const existing = await prisma.magazine.findFirst({
      where: {
        magazine_name,
        is_deleted: 0,
        NOT: currentId ? { id: Number(currentId) } : undefined,
      },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Magazine already exists",
        isUnique: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Magazine name is unique",
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

const getAjaxMagazines = async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || "";
  const filteredCategory = req.query?.category || "all";

  // Columns for sorting (add or adjust fields as needed)
  const columns = ["magazine_name", "category", "auther", "publish_date", "duration"];
  const colIndex = order[0]?.column;
  const dir = order[0]?.dir === "asc" ? "asc" : "desc";
  const sortField = colIndex !== undefined ? columns[colIndex] || "id" : "id";

  // Base where clause
  let whereClause = { is_deleted: 0 };

  if (searchValue) {
    whereClause = {
      ...whereClause,
      magazine_name: { contains: searchValue, mode: "insensitive" },
    };
  }

  if (filteredCategory !== "all") {
    whereClause.category = filteredCategory;
  }

  try {
    const total = await prisma.magazine.count({
      where: { is_deleted: 0 },
    });

    const filtered = await prisma.magazine.count({
      where: whereClause,
    });

    const docs = await prisma.magazine.findMany({
      where: whereClause,
      orderBy: { [sortField]: dir },
      skip: start,
      take: length,
    });

    const data = docs.map((row, i) => [
      i + 1 + start,
      row.id,
      row.magazine_name,
      row.category,
      row.auther,
      row.publish_date ? row.publish_date.toISOString().split("T")[0] : "",
      row.duration,
      row.image,
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
      message: "Error fetching magazines",
      data: error.message,
    });
  }
};


module.exports = {
  getAllMagazines,
  addMagazine,
  getMagazineById,
  updateMagazine,
  uniqueMagazine,
  getAjaxMagazines

};
