import Module from "../models/moduleModel.js";

export const getModules = async (req, res) => {

  try {
    const modules = await Module.find()
    return modules.length === 0 ? res.status(204).json([]) : res.json(modules)

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};