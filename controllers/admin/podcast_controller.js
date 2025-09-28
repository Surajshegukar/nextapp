const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Fetch all podcasts
 */
const getAllPodcasts = async (req, res) => {
  try {
    const magazines = await prisma.podcast.findMany({
      where: { is_deleted: 0 },
      orderBy: { id: "desc" },
    });

    return res.status(200).json({
      success: true,
      message: "Podcasts fetched successfully",
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
 * Add new podcast
 */
const addPodcast = async (req, res) => {
  try {
    const { podcast_name, publish_date, duration, description } = req.body;
    const image = req.file; // assuming you are using multer for file upload

    const existing = await prisma.podcast.findFirst({
      where: { podcast_name, is_deleted: 0 },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Podcast already exists",
        data: {},
      });
    }

    const data = await prisma.podcast.create({
      data: {
        podcast_name,
        publish_date: publish_date ? new Date(publish_date) : null,
        duration: duration,
        image: image ? image.filename : null,
        description
      },
    });

    res.status(201).json({
      success: true,
      message: "Podcast added successfully",
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
 * Get podcast by ID
 */
const getPodcastById = async (req, res) => {
  const { id } = req.params;

  try {
    const podcast = await prisma.podcast.findFirst({
      where: { id: Number(id), is_deleted: 0 },
    });

    if (!podcast) {
      return res.status(404).json({
        success: false,
        message: "Podcast not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Podcast fetched successfully",
      data: podcast,
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
 * Update podcast
 */
const updatePodcast = async (req, res) => {
  const { id } = req.params;
  try {
    const { podcast_name, publish_date, duration,description } = req.body;
    const image = req.file;

    const existing = await prisma.podcast.findFirst({
      where: {
        podcast_name,
        is_deleted: 0,
        NOT: { id: Number(id) },
      },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Podcast already exists",
        data: {},
      });
    }

    const updated = await prisma.podcast.update({
      where: { id: Number(id) },
      data: {
        podcast_name,
        publish_date: publish_date ? new Date(publish_date) : null,
        description,
        duration: duration,
        ...(image && { image: image.filename }),
      },
    });

    res.status(200).json({
      success: true,
      message: "Podcast updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating podcast",
      data: error.message,
    });
  }
};

/**
 * Check uniqueness of podcast name
 */
const uniquePodcast = async (req, res) => {
  const { podcast_name, currentId } = req.query;

  try {
    const existing = await prisma.podcast.findFirst({
      where: {
        podcast_name,
        is_deleted: 0,
        NOT: currentId ? { id: Number(currentId) } : undefined,
      },
    });

    if (existing) {
      return res.status(200).json({
        success: false,
        message: "Podcast already exists",
        isUnique: false,
      });
    }

    res.status(200).json({
      success: true,
      message: "Podcast name is unique",
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

const getAjaxPodcasts = async (req, res) => {
  const draw = parseInt(req.body.draw) || 1;
  const start = parseInt(req.body.start) || 0;
  const length = parseInt(req.body.length) || 10;
  const order = req.body.order || [];
  const searchValue = req.body.search?.value || "";
  const filteredCategory = req.query?.category || "all";

  // Columns for sorting (add or adjust fields as needed)
  const columns = ["podcast_name", "publish_date", "duration"];
  const colIndex = order[0]?.column;
  const dir = order[0]?.dir === "asc" ? "asc" : "desc";
  const sortField = colIndex !== undefined ? columns[colIndex] || "id" : "id";

  // Base where clause
  let whereClause = { is_deleted: 0 };

  if (searchValue) {
    whereClause = {
      ...whereClause,
      podcast_name: { contains: searchValue, mode: "insensitive" },
    };
  }

  if (filteredCategory !== "all") {
    whereClause.category = filteredCategory;
  }

  try {
    const total = await prisma.podcast.count({
      where: { is_deleted: 0 },
    });

    const filtered = await prisma.podcast.count({
      where: whereClause,
    });

    const docs = await prisma.podcast.findMany({
      where: whereClause,
      orderBy: { [sortField]: dir },
      skip: start,
      take: length,
    });

    const data = docs.map((row, i) => [
      i + 1 + start,
      row.id,
      row.status,
      row.podcast_name,
      row.publish_date ? row.publish_date.toISOString().split("T")[0] : "",
      row.duration,
      row.image,
      row.description
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
  getAllPodcasts,
  addPodcast,
  getPodcastById,
  updatePodcast,
  uniquePodcast,
  getAjaxPodcasts

};
