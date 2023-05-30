module.exports = (app) => {
  const Recipe = require("../controllers/recipe.controller.js");
  const { authenticateRoute } = require("../authentication/authentication");
  var router = require("express").Router();

  // Create a new Recipe
  router.post("/tripPlan/", [authenticateRoute], Recipe.create);

  // Retrieve all tripPlan for user
  router.get(
    "/tripPlan/user/:userId",
    [authenticateRoute],
    Recipe.findAllForUser
  );

  // Retrieve all published tripPlan
  router.get("/tripPlan/", Recipe.findAllPublished);

  // Retrieve a single Recipe with id
  router.get("/tripPlan/:id", Recipe.findOne);

  // Update a Recipe with id
  router.put("/tripPlan/:id", [authenticateRoute], Recipe.update);

  // Delete a Recipe with id
  router.delete("/tripPlan/:id", [authenticateRoute], Recipe.delete);

  // Delete all tripPlan
  router.delete("/tripPlan/", [authenticateRoute], Recipe.deleteAll);

  app.use("/travelapi", router);
};
