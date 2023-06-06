const db = require("../models");
const TripTravellers = db.tripTravellers;
const Travellers = db.travellers;
const Op = db.Sequelize.Op;
// Create and Save a new TripTravellers
exports.create = (req, res) => {
  // Validate request
  if (req.body.userId === undefined) {
    const error = new Error("UserId cannot be empty for trip travellers!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.tripId === undefined) {
    const error = new Error("Trip ID cannot be empty for trip travellers!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.emergencyContact === undefined) {
    const error = new Error(
      "EmergencyContact cannot be empty for trip travellers!"
    );
    error.statusCode = 400;
    throw error;
  }

  // Create a TripTravellers
  const tripTravellers = {
    userId: req.body.userId,
    tripId: req.body.tripId,
    emergencyContact: req.body.emergencyContact,
    totalTravellers: req.body.totalTravellers,
  };
  const tList = req.body.travellersList
  // Save TripTravellers in the database
  TripTravellers.create(tripTravellers)
    .then((data) => {
      tList.map((item) => (item.tripTravellerId  = data.id));
      try{
        Travellers.bulkCreate(tList).then((d) => {
            res.send({ status: "success", msg: "User successfully Joined" });
        })        
      }
      catch(e) {
        res.status(500).send({ status: "Error", msg: "Failed to register" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the TripTravellers.",
      });
    });
};

// Retrieve all TripTravellers from the database.
exports.findAll = (req, res) => {
  const tripTravellersId = req.query.tripTravellersId;
  var condition = tripTravellersId
    ? {
        id: {
          [Op.like]: `%${tripTravellersId}%`,
        },
      }
    : null;

  TripTravellers.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving tripTravellers.",
      });
    });
};

exports.findAllForRecipe = (req, res) => {
  const tripId = req.params.tripId;
  TripTravellers.findAll({
    where: { tripId: tripId },
    include: [
      {
        model: Travellers,
        as: "travellers",
        required: true,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving tripTravellers for a trip.",
      });
    });
};

// Find all TripTravellers for a trip itenary and include the ingredients
exports.findAllForTripItenaryWithTravellers = (req, res) => {
  const tripItenaryId = req.params.tripItenaryId;
  TripTravellers.findAll({
    where: { tripItenaryId: tripItenaryId },
    include: [
      {
        model: Travellers,
        as: "travellers",
        required: true,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving tripTravellers for a trip step.",
      });
    });
};

// Find a single TripTravellers with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  TripTravellers.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving TripTravellers with id=" + id,
      });
    });
};

// Update a TripTravellers by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const tripTravellers = {
    id:id,
    userId: req.body.userId,
    tripId: req.body.tripId,
    emergencyContact: req.body.emergencyContact,
    totalTravellers: req.body.totalTravellers,
  };
  const tList = req.body.travellersList
  const travellers = []
  tList?.map((traveller) => {
    travellers.push({
      tripTravellerId: id,
      travellerNum: traveller.travellerNum,
      firstName: traveller.firstName,
      lastName: traveller.lastName
    })
  })
  TripTravellers.update(tripTravellers, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        try{
          Travellers.destroy({
            where: {tripTravellerId: id}
          }).then((num) => {
            if(num > 0){
              Travellers.bulkCreate(travellers).then((d) => {
                  res.send({ status: "success", msg: "Trip Travellers successfully updated" });
                })
            }
          })
        }
        catch(e) {
          res.status(500).send({ status: "Error", msg: "Failed to update Trip" });
        }
      } else {
        res.send({
          message: `Cannot update TripTravellers with id=${id}. Maybe TripTravellers was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating TripTravellers with id=" + id,
      });
    });
};

// Delete a TripTravellers with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  TripTravellers.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "TripTravellers was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete TripTravellers with id=${id}. Maybe TripTravellers was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Could not delete TripTravellers with id=" + id,
      });
    });
};

// Delete all TripTravellers from the database.
exports.deleteAll = (req, res) => {
  TripTravellers.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({
        message: `${number} TripTravellers were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all tripTravellers.",
      });
    });
};
