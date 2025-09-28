const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Helper to get Prisma model dynamically
const getPrismaModel = (modelName) => {
  switch (modelName.toLowerCase()) {
    case "admin":
      return prisma.admin;
    case "department":
      return prisma.department;
    case "category":
      return prisma.category;
    case "article":
      return prisma.article;
    case "magazine":
      return prisma.magazine;
    case "podcast":
      return prisma.podcast;
        case "user":
      return prisma.user;
    default:
      return null;
  }
};

// Soft Delete Item
const deleteItem = async (req, res) => {
  const { model, id } = req.params;

  try {
    const prismaModel = getPrismaModel(model);
    if (!prismaModel)
      return res.status(400).json({
        success: false,
        message: `Invalid model name '${model}'`,
        data: null,
      });

    const item = await prismaModel.findUnique({ where: { id: parseInt(id) } });
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `${model} with ID ${id} not found`,
        data: null,
      });
    }

    await prismaModel.update({
      where: { id: parseInt(id) },
      data: { is_deleted: 1 },
    });

    return res.status(200).json({
      success: true,
      message: `Record deleted successfully`,
      data: null,
    });
  } catch (error) {
    console.error("DeleteItem Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || "Unknown error",
    });
  }
};

// Activate Item
const activateItem = async (req, res) => {
  const { model, id } = req.params;

  try {
    const prismaModel = getPrismaModel(model);
    if (!prismaModel)
      return res.status(400).json({
        success: false,
        message: `Invalid model name '${model}'`,
        data: null,
      });

    const item = await prismaModel.findUnique({ where: { id: parseInt(id) } });
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `${model} with ID ${id} not found`,
        data: null,
      });
    }

    await prismaModel.update({
      where: { id: parseInt(id) },
      data: { status: 1 },
    });

    return res.status(200).json({
      success: true,
      message: `Record activated successfully`,
      data: null,
    });
  } catch (error) {
    console.error("ActivateItem Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || "Unknown error",
    });
  }
};

// Deactivate Item
const deactivateItem = async (req, res) => {
  const { model, id } = req.params;

  try {
    const prismaModel = getPrismaModel(model);
    if (!prismaModel)
      return res.status(400).json({
        success: false,
        message: `Invalid model name '${model}'`,
        data: null,
      });

    const item = await prismaModel.findUnique({ where: { id: parseInt(id) } });
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `${model} with ID ${id} not found`,
        data: null,
      });
    }

    await prismaModel.update({
      where: { id: parseInt(id) },
      data: { status: 0 },
    });

    return res.status(200).json({
      success: true,
      message: `Record deactivated successfully`,
      data: null,
    });
  } catch (error) {
    console.error("DeactivateItem Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message || "Unknown error",
    });
  }
};

module.exports = {
  deleteItem,
  activateItem,
  deactivateItem,
};