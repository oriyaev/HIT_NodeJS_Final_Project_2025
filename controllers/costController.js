const Cost = require("../models/Cost");

// Helper function to validate integer strings
function isValidNumberString(value) {
  return typeof value === "string" && /^\d+$/.test(value);
}

exports.addCost = async (req, res) => {
  try {
    const { description, category, user_id, sum, year, month, day } = req.body;

    // Check for missing essential fields
    if (!description || !category || !user_id || sum === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate sum separately (allowing it to be number or string initially)
    if (!(typeof sum === "number" || isValidNumberString(sum))) {
      return res
        .status(400)
        .json({ error: "Sum must be a valid positive number" });
    }

    // Parse values (whether user sends strings or numbers)
    const parsedSum = Number.parseInt(sum, 10);

    if (parsedSum < 0) {
      return res.status(400).json({ error: "Sum cannot be negative" });
    }

    // Handle date fields
    let parsedYear, parsedMonth, parsedDay;
    if (year !== undefined && month !== undefined && day !== undefined) {
      // Validate that year, month, day are valid integers
      if (
        !isValidNumberString(year) ||
        !isValidNumberString(month) ||
        !isValidNumberString(day)
      ) {
        return res
          .status(400)
          .json({ error: "Year, month, and day must be valid integers" });
      }

      parsedYear = Number.parseInt(year, 10);
      parsedMonth = Number.parseInt(month, 10);
      parsedDay = Number.parseInt(day, 10);

      // Validate ranges
      if (parsedMonth < 1 || parsedMonth > 12) {
        return res
          .status(400)
          .json({ error: "Month must be between 1 and 12" });
      }
      if (parsedDay < 1 || parsedDay > 31) {
        return res.status(400).json({ error: "Day must be between 1 and 31" });
      }
      if (parsedYear < 1900 || parsedYear > 2100) {
        return res
          .status(400)
          .json({ error: "Year must be between 1900 and 2100" });
      }
    } else {
      // No date provided
      const currentDate = new Date();
      parsedYear = currentDate.getFullYear();
      parsedMonth = currentDate.getMonth() + 1;
      parsedDay = currentDate.getDate();
    }

    // Validate category and description
    const allowedCategories = [
      "food",
      "health",
      "housing",
      "sport",
      "education",
    ];
    if (typeof description !== "string" || description.trim() === "") {
      return res
        .status(400)
        .json({ error: "Description must be a non-empty string" });
    }
    if (typeof category !== "string" || !allowedCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category provided" });
    }

    // Create and save the new Cost document
    const newCost = new Cost({
      description: description.trim(),
      category,
      user_id,
      sum: parsedSum,
      year: parsedYear,
      month: parsedMonth,
      day: parsedDay,
    });

    await newCost.save();
    res.status(201).json(newCost);
  } catch (error) {
    console.error("Error while adding cost:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
