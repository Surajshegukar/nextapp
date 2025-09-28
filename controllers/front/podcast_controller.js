const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllActivePodcasts = async (req, res) => {
  try {
    const magazines = await prisma.podcast.findMany({
      where: { is_deleted: 0,status:1 },
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

module.exports = {
    getAllActivePodcasts

}