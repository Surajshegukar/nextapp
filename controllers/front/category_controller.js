const { Prisma } = require("@prisma/client");

const getAllCategoryOptions = async (req, res) => {
  try {
    const adminList = await Prisma.category.findMany({
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

module.exports = {
    getAllCategoryOptions,
}