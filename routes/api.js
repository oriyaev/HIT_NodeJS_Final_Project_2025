const express = require("express");
const router = express.Router();

// Import controllers
const aboutController = require("../controllers/aboutController");
const costController = require("../controllers/costController");
const reportController = require("../controllers/reportController");
const userController = require("../controllers/userController");

// Route to add a new cost item
router.post("/add", costController.addCost);

// Route to get a report
router.get("/report", reportController.getReport);

// Route to get user details
router.get("/users/:user_id", userController.getUserDetails);

// Route to get team members
router.get("/about", aboutController.getTeamMembers);

module.exports = router;
