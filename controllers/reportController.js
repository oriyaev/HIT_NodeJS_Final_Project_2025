const Cost = require("../models/Cost");
const User = require("../models/User");

exports.getReport = async (req, res) => {
  const { id, year, month } = req.query;

  if (!id || !year || !month) {
    return res.status(400).json({ error: "Missing id, year, or month" });
  }

  try {
    const user = await User.findOne({ id: id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const costs = await Cost.find({
      userid: id,
      year: year,
      month: month,
    });

    // Initialize
    const groupedCosts = {
      food: [],
      education: [],
      health: [],
      housing: [],
      sport: [],
    };

    // Group the costs by category and day
    costs.forEach((cost) => {
      const day = cost.day;
      groupedCosts[cost.category].push({
        sum: cost.sum,
        description: cost.description,
        day: day,
      });
    });

    // Prepare the report
    const report = {
      userid: id,
      year: year,
      month: month,
      costs: [
        { food: groupedCosts.food.length > 0 ? groupedCosts.food : [] },
        {
          education:
            groupedCosts.education.length > 0 ? groupedCosts.education : [],
        },
        { health: groupedCosts.health.length > 0 ? groupedCosts.health : [] },
        {
          housing: groupedCosts.housing.length > 0 ? groupedCosts.housing : [],
        },
        { sport: groupedCosts.sport.length > 0 ? groupedCosts.sport : [] },
      ],
    };

    res.status(200).json(report);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching report", details: err.message });
  }
};
