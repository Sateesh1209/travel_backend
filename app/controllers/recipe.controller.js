const db = require("../models");
const Recipe = db.recipe;
const RecipeStep = db.recipeStep;
const RecipeIngredient = db.recipeIngredient;
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;
// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (req.body.tripName === undefined) {
    const error = new Error("tripName cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  }else if (req.body.countryName === undefined) {
    const error = new Error("countryName cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  }
   else if (req.body.travelDescription === undefined) {
    const error = new Error("travelDescription cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.isPublished === undefined) {
    const error = new Error("Is Published cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.userId === undefined) {
    const error = new Error("User Id cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.fromDate === undefined) {
    const error = new Error("User Id cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.toDate === undefined) {
    const error = new Error("User Id cannot be empty for recipe!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Recipe
  const trip = {
    name: req.body.tripName,
    countryName: req.body.countryName,
    description: req.body.travelDescription,
    capacity: req.body.capacity ?? 10,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    isPublished: req.body.isPublished ? req.body.isPublished : false,
    userId: req.body.userId,
  };
  
  const travelIterations = req.body.tripIterations
  const tripItenary = []
  travelIterations?.map((item) => {
    tripItenary.push({
      day: item.day,
      location: item.location,
      hotelName: item.hotelName,
      meals: item.meals,
      visitPlaces: item.visitPlaces.join(",")
    })
  })
  
  // Save Recipe in the database
  Recipe.create(trip)
    .then((data) => {
      tripItenary.map(item => item.recipeId= data.id)
      RecipeStep.bulkCreate(tripItenary).then((data) => {
        res.send({status: 'success', msg: 'Trip successfully created'});
      })
      // res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: 'failure',
        message:
          err.message || "Error while creating trip, Please try again.",
      });
    });
};

// Find all Recipes for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Recipe.findAll({
    // where: { userId: userId },
    include: [
      {
        model: RecipeStep,
        as: "recipeStep",
        required: false,
        // include: [
        //   {
        //     model: RecipeIngredient,
        //     as: "recipeIngredient",
        //     required: false,
        //     include: [
        //       {
        //         model: Ingredient,
        //         as: "ingredient",
        //         required: false,
        //       },
        //     ],
        //   },
        // ],
      },
    ],
    order: [
      ["name", "ASC"],
      [RecipeStep, "day", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Recipes for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Recipes for user with id=" + userId,
      });
    });
};

// Find all Published Recipes
exports.findAllPublished = (req, res) => {
  Recipe.findAll({
    where: { isPublished: true },
    include: [
      {
        model: RecipeStep,
        as: "recipeStep",
        required: false,
        // include: [
        //   {
        //     model: RecipeIngredient,
        //     as: "recipeIngredient",
        //     required: false,
        //     include: [
        //       {
        //         model: Ingredient,
        //         as: "ingredient",
        //         required: false,
        //       },
        //     ],
        //   },
        // ],
      },
    ],
    order: [
      ["name", "ASC"],
      [RecipeStep, "day", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Published Recipes.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published Recipes.",
      });
    });
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Recipe.findAll({
    where: { id: id },
    include: [
      {
        model: RecipeStep,
        as: "recipeStep",
        required: false,
        // include: [
        //   {
        //     model: RecipeIngredient,
        //     as: "recipeIngredient",
        //     required: false,
        //     include: [
        //       {
        //         model: Ingredient,
        //         as: "ingredient",
        //         required: false,
        //       },
        //     ],
        //   },
        // ],
      },
    ],
    order: [[RecipeStep, "day", "ASC"]],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Recipe with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Recipe with id=" + id,
      });
    });
};
// Update a Recipe by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const trip = {
    name: req.body.tripName,
    countryName: req.body.countryName,
    description: req.body.travelDescription,
    capacity: req.body.capacity ?? 10,
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    isPublished: req.body.isPublished ? req.body.isPublished : false,
    userId: req.body.userId,
  };
  const travelIterations = req.body.tripIterations
  const tripItenary = []
  travelIterations?.map((item) => {
    tripItenary.push({
      id: item.id,
      day: item.day,
      location: item.location,
      hotelName: item.hotelName,
      meals: item.meals,
      visitPlaces: item.visitPlaces.join(","),
      recipeId: id
    })
  })
  Recipe.update(trip, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        Promise.all(tripItenary.map(
          async (trip) => {
            await RecipeStep.update(trip, {
              where: { id: trip.id },
            })
          }
        )).then((data) => {
            res.send({status: 'success', msg: 'Trip updated successfully'});
          })
        // RecipeStep.bulkCreate(tripItenary, 
        //   {
        //     updateOnDuplicate: ['id'],
        //   }).then((data) => {
        //   res.send({status: 'success', msg: 'Trip updated successfully'});
        // })
        // res.send({
        //   message: "Trip was updated successfully.",
        // });
      } else {
        res.send({
          message: `Cannot update Trip with id=${id}. Maybe Trip was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Recipe with id=" + id,
      });
    });
};
// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Recipe.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
          res.send({status: "success", msg: 'Trip successfully deleted'})
      } else {
        res.send({
          message: `Cannot delete Trip with id=${id}. Maybe Trip was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Recipe with id=" + id,
      });
    });
};
// Delete all Recipes from the database.
exports.deleteAll = (req, res) => {
  Recipe.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Recipes were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all recipes.",
      });
    });
};
