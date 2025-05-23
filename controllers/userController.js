const User = require("../models/User");
const Cost = require("../models/Cost");

exports.getUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ id: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Aggregate the total cost for the user
    const totalCost = await Cost.aggregate([
      { $match: { userid: id } },
      { $group: { _id: null, total: { $sum: "$sum" } } },
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
