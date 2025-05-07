const User = require("../models/User");
const Cost = require("../models/Cost");

exports.getUserDetails = async (req, res) => {
  const { user_id } = req.params; // Use user_id from the route params

  try {
    // Find the user by their user_id
    const user = await User.findOne({ id: user_id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Aggregate the total cost for the user
    const totalCost = await Cost.aggregate([
      { $match: { user_id: user_id } }, // Match the user_id
      { $group: { _id: null, total: { $sum: "$sum" } } }, // Sum up the costs
    ]);

    const total = totalCost.length > 0 ? totalCost[0].total : 0;

    res.status(200).json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      total: total,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching user", details: err.message });
  }
};
