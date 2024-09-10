import User from "../models/userModel.js";

export const getProfile = async (req, res) => {

  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {

  const { name, email, profilePicture } = req.body;

  try {
    const user = await User.findByIdAndUpdate( req.user.id, { name, email, profilePicture }, { new: true }).select('-password');
    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
