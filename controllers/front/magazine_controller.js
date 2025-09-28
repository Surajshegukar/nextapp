const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Fetch all magazines
 */
const getAllActiveMagazine = async (req, res) => {
  try {
    const magazines = await prisma.magazine.findMany({
      where: { is_deleted: 0, status:1 },
      orderBy: { id: "desc" },
      include: {
        category: {
              select: { id: true, category_name: true }, 
        },
      },
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

module.exports = {
    getAllActiveMagazine
}