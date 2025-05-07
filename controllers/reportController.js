const Cost = require("../models/Cost");

exports.getReport = async (req, res) => {
  const { user_id, year, month } = req.query;

  if (!user_id || !year || !month) {
    return res.status(400).json({ error: "Missing user_id, year, or month" });
  }

  try {
    const costs = await Cost.find({
      user_id: user_id,
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

    const report = {
      user_id: user_id,
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
