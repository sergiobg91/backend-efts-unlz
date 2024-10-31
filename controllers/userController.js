import User from "../models/userModel.js";

export const getProfile = async (req, res) => {

  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password');
    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {

  const { name, lastName, role, licence } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findByIdAndUpdate( id, { name, lastName, role, licence }, { new: true }).select('-password');
    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
