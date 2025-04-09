exports.getTeamMembers = (req, res) => {
  const teamMembers = [
    { first_name: "Oriya", last_name: "Even Chen" },
    { first_name: "Maor", last_name: "Levin" },
  ];

  res.status(200).json(teamMembers);
};
