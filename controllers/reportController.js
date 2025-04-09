const Cost = require("../models/Cost");

exports.getReport = async (req, res) => {
  const { userId, year, month } = req.query;

  if (!userId || !year || !month) {
    return res.status(400).json({ error: "Missing userId, year, or month" });
  }

  try {
    const costs = await Cost.find({
      user_id: userId,
      date: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      },
    });

    const groupedCosts = {
      food: [],
      education: [],
      health: [],
      housing: [],
    };

    costs.forEach((cost) => {
      const day = cost.date.getDate();
      groupedCosts[cost.category].push({
        sum: cost.sum,
        description: cost.description,
        day: day,
      });
    });

    const report = {
      userid: userId,
      year: year,
      month: month,
      costs: [
        { food: groupedCosts.food },
        { education: groupedCosts.education },
        { health: groupedCosts.health },
        { housing: groupedCosts.housing },
      ],
    };

    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: "Error fetching report", details: err });
  }
};
