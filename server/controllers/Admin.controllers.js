import User from "../models/User.js";
import Property from "../models/Property.js";

export const getDashboardStats = async (req, res) => {
  const users = await User.countDocuments();
  const properties = await Property.countDocuments();
  res.json({ users, properties });
};
