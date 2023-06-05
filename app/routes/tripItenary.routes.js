module.exports = (app) => {
  const TripItenary = require("../controllers/tripItenary.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Trip Step for a Trip
  router.post(
    "/trips/:tripId/tripItenary/",
    [authenticateRoute],
    TripItenary.create
  );

  // Retrieve all Trip Iterations
  router.get("/tripItenary/", TripItenary.findAll);

  // Retrieve all Trip Iterations for a Trip
  router.get("/trips/:tripId/tripItenary/", TripItenary.findAllForTrips);

  // Retrieve all Trip Iterations for a Trip and include the travellers
  router.get(
    "/trips/:tripId/tripItenaryWithTravellers/",
    TripItenary.findAllForTripWithtravellers
  );

  // Retrieve a single Trip Itenary with id
  router.get("/trips/:tripId/tripItenary/:id", TripItenary.findOne);

  // Update a Trip Step with id
  router.put(
    "/trips/:tripId/tripItenary/:id",
    [authenticateRoute],
    TripItenary.update
  );

  // Delete a Trip Step with id
  router.delete(
    "/trips/:tripId/tripItenary/:id",
    [authenticateRoute],
    TripItenary.delete
  );

  // Delete all Trip Iterations
  router.delete("/tripItenary/", [authenticateRoute], TripItenary.deleteAll);

  app.use("/travelapi", router);
};
