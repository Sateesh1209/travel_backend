module.exports = (app) => {
  const Trip = require("../controllers/trip.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Trip
  router.post("/tripPlan/", [authenticateRoute], Trip.create);

  // Retrieve all tripPlan for user
  router.get(
    "/tripPlan/user/:userId",
    [authenticateRoute],
    Trip.findAllForUser
  );

    // Retrieve all tripPlan for Admin
    router.get(
      "/tripPlan/admin",
      [authenticateRoute],
      Trip.findAllForAdmin
    );

  // Retrieve all published tripPlan
  router.get("/tripPlan/", Trip.findAllPublished);

  //Retrive all registered users for all trips

  router.get("/tripPlan/travellersByTripId/:tripId", Trip.findAllRegisteredUsers)

  // Retrieve a single Trip with id
  router.get("/tripPlan/:id", Trip.findOne);

  // Update a Trip with id
  router.put("/tripPlan/:id", [authenticateRoute], Trip.update);

  // Delete a Trip with id
  router.delete("/tripPlan/:id", [authenticateRoute], Trip.delete);

  // Delete all tripPlan
  router.delete("/tripPlan/", [authenticateRoute], Trip.deleteAll);

  app.use("/travelapi", router);
};
