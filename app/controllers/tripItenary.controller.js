const db = require("../models");
const TripItenary = db.tripItenary;
const TripTravellers = db.tripTravellers;
const Ingredient = db.ingredient;
const Op = db.Sequelize.Op;
// Create and Save a new TripIternary
exports.create = (req, res) => {
  // Validate request
  if (req.body.stepNumber === undefined) {
    const error = new Error("Step number cannot be empty for Trip Iternary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.instruction === undefined) {
    const error = new Error("Description cannot be empty for Trip Iternary!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.tripId === undefined) {
    const error = new Error("Recipe ID cannot be empty for Trip Iternary!");
    error.statusCode = 400;
    throw error;
  }

  // Create a TripIternary
  const tripItenary = {
    day: req.body.day,
    instruction: req.body.instruction,
    tripId: req.body.tripId,
  };
  // Save TripIternary in the database
  TripIternary.create(tripItenary)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the TripIternary.",
      });
    });
};
// Retrieve all TripItenary from the database.
exports.findAll = (req, res) => {
  const tripItenaryId = req.query.tripItenaryId;
  var condition = tripItenaryId
    ? {
        id: {
          [Op.like]: `%${tripItenaryId}%`,
        },
      }
    : null;

    TripItenary.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tripItenary.",
      });
    });
};

// Retrieve all TripItenary for a trip from the database.
exports.findAllForTrips = (req, res) => {
  const tripId = req.params.tripId;

  TripIternary.findAll({
    where: { tripId: tripId },
    order: [["stepNumber", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving tripItenary for a trip.",
      });
    });
};

// Find all TripItenary for a trip and include the ingredients
exports.findAllForTripWithtravellers = (req, res) => {
  const tripId = req.params.tripId;
  TripItenary.findAll({
    where: { tripId: tripId },
    include: [
      {
        model: TripTravellers,
        as: "tripTravellers",
        required: false,
        include: [
          {
            model: Travellers,
            as: "travellers",
            required: false,
          },
        ],
      },
    ],
    order: [["stepNumber", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving TripTravellers for a trip itenary.",
      });
    });
};

// Find a single TripIternary with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  TripItenary.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find TripIternary with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving TripIternary with id=" + id,
      });
    });
};
// Update a TripIternary by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  TripItenary.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "TripIternary was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update TripIternary with id=${id}. Maybe TripIternary was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating TripIternary with id=" + id,
      });
    });
};
// Delete a TripIternary with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  TripItenary.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "TripIternary was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete TripIternary with id=${id}. Maybe TripIternary was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete TripIternary with id=" + id,
      });
    });
};
// Delete all TripItenary from the database.
exports.deleteAll = (req, res) => {
  TripItenary.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} TripItenary were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tripItenary.",
      });
    });
};
