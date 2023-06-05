const db = require("../models");
const Travellers = db.travellers;
const Op = db.Sequelize.Op;

// Create and Save a new Travellers
exports.create = (req, res) => {
  // Validate request
  if (req.body.name === undefined) {
    const error = new Error("Name cannot be empty for travellers!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.unit === undefined) {
    const error = new Error("Unit cannot be empty for travellers!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.pricePerUnit === undefined) {
    const error = new Error("Price per unit cannot be empty for travellers!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Travellers
  const ingredient = {
    name: req.body.name,
    unit: req.body.unit,
    pricePerUnit: req.body.pricePerUnit,
  };
  // Save Travellers in the database
  Travellers.create(ingredient)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Travellers.",
      });
    });
};

// Retrieve all Ingredients from the database.
exports.findAll = (req, res) => {
  const ingredientId = req.query.ingredientId;
  var condition = ingredientId
    ? {
        id: {
          [Op.like]: `%${ingredientId}%`,
        },
      }
    : null;

  Travellers.findAll({ where: condition, order: [["name", "ASC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ingredients.",
      });
    });
};

// Find a single Travellers with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Travellers.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Travellers with id=" + id,
      });
    });
};

// Update a Travellers by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Travellers.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Travellers was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Travellers with id=${id}. Maybe Travellers was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Travellers with id=" + id,
      });
    });
};

// Delete a Travellers with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Travellers.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Travellers was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Travellers with id=${id}. Maybe Travellers was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Travellers with id=" + id,
      });
    });
};

// Delete all Ingredients from the database.
exports.deleteAll = (req, res) => {
  Travellers.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Ingredients were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ingredients.",
      });
    });
};
