module.exports = (app) => {
  const TripTravellers = require("../controllers/tripTravellers.controller.js");
  var router = require("express").Router();
  const { authenticateRoute } = require("../authentication/authentication.js");

  // Create a new Trip Traveller for a Trip
  router.post(
    "/trips/:tripId/tripTravellers/",
    [authenticateRoute],
    TripTravellers.create
  );

  // Retrieve all Trip Travellers
  router.get("/tripTravellers/", TripTravellers.findAll);

  // Retrieve all Trip Travellers for a Trip
  router.get(
    "/trips/:tripId/tripTravellers/",
    TripTravellers.findAllForRecipe
  );

  // Retrieve all Trip Travellers for a Trip Step and include the Travellers
  router.get(
    "/trips/:tripId/tripItenary/:tripItenaryId/tripTravellersWithTravellers/",
    TripTravellers.findAllForTripItenaryWithTravellers
  );

  // Retrieve a single Trip Traveller with id
  router.get(
    "/trips/:tripId/tripTravellers/:id",
    TripTravellers.findOne
  );

  // Update a Trip Traveller with id
  router.put(
    "/trips/:tripId/tripTravellers/:id",
    [authenticateRoute],
    TripTravellers.update
  );

  // Delete a Trip Traveller with id
  router.delete(
    "/trips/:tripId/tripTravellers/:id",
    [authenticateRoute],
    TripTravellers.delete
  );

  // Delete all Trip Travellers
  router.delete(
    "/tripTravellers/",
    [authenticateRoute],
    TripTravellers.deleteAll
  );

  app.use("/travelapi", router);
};
