const Cost = require("../models/Cost");

exports.addCost = async (req, res) => {
  const { description, category, user_id, sum, date } = req.body;

  if (!description || !category || !user_id || !sum) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const createdAt = date ? new Date(date) : new Date();

  try {
    const newCost = new Cost({
      description,
      category,
      user_id,
      sum,
      date: createdAt,
    });

    await newCost.save();
    res.status(201).json(newCost);
  } catch (err) {
    res.status(500).json({ error: "Error saving cost item", details: err });
  }
};
