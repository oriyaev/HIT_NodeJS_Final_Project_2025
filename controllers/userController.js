const User = require("../models/User");
const Cost = require("../models/Cost");

exports.getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const totalCost = await Cost.aggregate([
      { $match: { user_id: userId } },
      { $group: { _id: null, total: { $sum: "$sum" } } },
    ]);

    const total = totalCost.length > 0 ? totalCost[0].total : 0;

    res.status(200).json({
      first_name: user.first_name,
      last_name: user.last_name,
      id: user.id,
      total: total,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching user", details: err });
  }
};
