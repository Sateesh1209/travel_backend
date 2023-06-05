module.exports = (app) => {
  const Traveller = require(".../controllers/travellers.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Traveller
  router.post("/travellers/", [authenticateRoute], Traveller.create);

  // Retrieve all Traveller
  router.get("/travellers/", Traveller.findAll);

  // Retrieve a single Traveller with travellerId
  router.get("/travellers/:id", Traveller.findOne);

  // Update an Traveller with travellerId
  router.put("/travellers/:id", [authenticateRoute], Traveller.update);

  // Delete an Traveller with travellerId
  router.delete("/travellers/:id", [authenticateRoute], Traveller.delete);

  // Create a new Traveller
  router.delete("/travellers/", [authenticateRoute], Traveller.deleteAll);

  app.use("/travelapi", router);
};
