const db = require("../models");
const { sendMail } = require("../utilities/email");
const Trip = db.trips;
const TripItenary = db.tripItenary;
const TripEvent = db.events;
const TripTravellers = db.tripTravellers;
const Travellers = db.travellers;
const Op = db.Sequelize.Op;
// Create and Save a new Trip
exports.create = (req, res) => {
  // Validate request
  if (req.body.tripName === undefined) {
    const error = new Error("tripName cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.countryName === undefined) {
    const error = new Error("countryName cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.travelDescription === undefined) {
    const error = new Error("travelDescription cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.isPublished === undefined) {
    const error = new Error("Is Published cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.userId === undefined) {
    const error = new Error("User Id cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.fromDate === undefined) {
    const error = new Error("fromDate Id cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  } else if (req.body.toDate === undefined) {
    const error = new Error("toDate Id cannot be empty for trip!");
    error.statusCode = 400;
    throw error;
  }

  // Create a Trip
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

  const travelIterations = req.body.tripIterations;
  const tripItenary = [];
  let tripEvents = []
  travelIterations?.map((item) => {
    tripItenary.push({
      day: item.day,
      location: item.location,
      hotelName: item.hotelName,
      meals: item.meals,
      visitPlaces: item.visitPlaces.join(","),
    });
    const events = item.events
    events?.map(e => {
      tripEvents.push({
        day: item.day,
        event: e.event,
      });
    })
  });

  // Save Trip in the database
  Trip.create(trip)
    .then((data) => {
      tripItenary.map((item) => (item.tripId = data.id));
      try{
        TripItenary.bulkCreate(tripItenary).then((d) => {
          const events = []
                tripEvents.map((item) => {
                  d?.map((tripItenary) => {
                    if(tripItenary.dataValues.day === item.day){
                      events.push({
                        event: item.event,
                        tripItenaryId: tripItenary.id
                      })
                    }
                  })
                })
          TripEvent.bulkCreate(events).then((data) => {
            res.send({ status: "success", message: "Trip successfully created" });
          })
        })        
      }
      catch(e) {
        res.status(500).send({ status: "Error", message: "Failed to create Trip" });
      }
      // res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: "Failed",
        message: err.message || "Error while creating trip, Please try again.",
      });
    });
};

// Find all Trips for a user
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;
  Trip.findAll({
    // where: { userId: userId },
    include: [
      {
        model: TripItenary,
        as: "tripItenary",
        required: false,
        include: {
          model: TripEvent,
          as: 'events'
        }
      },
      {
        model: TripTravellers,
        as: 'tripTravellers',
        required: false,
        where: {
          userId: userId
        }
      }
    ],
    order: [
      ["name", "ASC"],
      [TripItenary, "day", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          status: 'Failed',
          message: `Cannot find Trips for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 'Failed',
        message:
          err.message || "Error retrieving Trips for user with id=" + userId,
      });
    });
};

// Find all Trips for a user
exports.findAllForAdmin = (req, res) => {
  const userId = req.params.userId;
  Trip.findAll({
    // where: { userId: userId },
    include: [
      {
        model: TripItenary,
        as: "tripItenary",
        required: false,
        include: {
          model: TripEvent,
          as: 'events'
        }
      }
    ],
    order: [
      ["name", "ASC"],
      [TripItenary, "day", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          status: 'Failed',
          message: `Cannot find Trips for user with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 'Failed',
        message:
          err.message || "Error retrieving Trips for user with id=" + userId,
      });
    });
};

// Find all Published Trips
exports.findAllPublished = (req, res) => {
  const today = new Date();
  Trip.findAll({
    where: { isPublished: true, fromDate: {
      [Op.gt]: today
    } },
    include: [
      {
        model: TripItenary,
        as: "tripItenary",
        required: false,
        include: {
          model: TripEvent,
          as: 'events'
        }
      },
    ],
    order: [
      ["name", "ASC"],
      [TripItenary, "day", "ASC"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Published Trips.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Published Trips.",
      });
    });
};

// Find all registered users

exports.findAllRegisteredUsers = (req, res) => {
  const tripId = req.params.tripId;
  Trip.findAll({
    where: { id: tripId },
    include: [{
      model: TripTravellers,
      as: 'tripTravellers',
      required: false,
      include: [{
        model: db.user,
        as: 'user',
        attributes: ['firstName','lastName']
      },{
        model: Travellers,
        as: 'travellers',
        required: false
      }]
    }]
  }).then((data) => {
    res.send(data)
  }).catch((err) => {
    res.status(500).send({
      status: 'Failed',
      message: `Cannot find Registered users.`,
    })
  })
}


// Find a single Trip with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Trip.findAll({
    where: { id: id },
    include: [
      {
        model: TripItenary,
        as: "tripItenary",
        required: false,
        include: {
          model: TripEvent,
          as: 'events'
        }
      },
    ],
    order: [[TripItenary, "day", "ASC"]],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Trip with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Trip with id=" + id,
      });
    });
};
// Update a Trip by the id in the request
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
  const travelIterations = req.body.tripIterations;
  const tripItenary = [];
  let tripEvents = []
  travelIterations?.map((item) => {
    tripItenary.push({
      day: item.day,
      location: item.location,
      hotelName: item.hotelName,
      meals: item.meals,
      visitPlaces: item.visitPlaces.join(","),
      tripId: id,
    });
    const events = item.events
    events?.map(e => {
      tripEvents.push({
        day: item.day,
        event: e.event,
      });
    })
    
  });
  Trip.update(trip, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        try{
          TripItenary.destroy({
            where: {tripId: id}
          }).then((num) => {
            if(num > 0){
              TripItenary.bulkCreate(tripItenary).then((d) => {
                const events = []
                tripEvents.map((item) => {
                  d?.map((tripItenary) => {
                    if(tripItenary.dataValues.day === item.day){
                      events.push({
                        event: item.event,
                        tripItenaryId: tripItenary.id
                      })
                    }
                  })
                })
                TripEvent.bulkCreate(events).then((data) => {
                  TripTravellers.findAll({where : {tripId: id}, include: [{model: db.user,as:'user',attributes: ['email']}]}).then((emails) => {
                    const mailAddresses = []
                    emails?.map((email) => {
                      mailAddresses.push(email?.user?.email) })
                    if(trip.isPublished){
                      sendMail(mailAddresses.join(','), 'Trip Update', 'tripUpdate', '')
                    }else {
                      sendMail(mailAddresses.join(','), 'Trip Cancelled', 'deleteOrUnpublish', '')
                    }
                    res.send({ status: "success", message: "Trip successfully updated" });
                  })
                  
                })
              })  
            }
          })
        }
        catch(e) {
          res.status(500).send({ status: "Error", message: "Failed to update Trip" });
        }
        // Promise.all(tripItenary.map(async (trip) => {
        //   await TripItenary.update(trip, {
        //     where: { id: trip.id },
        //   });
        // })
        // ).then((data) => {
        //   Promise.all(tripEvents.map(async (event) => {
        //     await TripEvent.update(event, {
        //       where: { id: event.id },
        //     });
        //   })
        //   ).then((data) => {
        //     res.send({ status: "success", message: "Trip updated successfully" });
        //   })
        // });
      } else {
        res.send({
          message: `Cannot update Trip with id=${id}. Maybe Trip was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Trip with id=" + id,
      });
    });
};
// Delete a Trip with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  const trip = await Trip.findAll({where: {id: id}, include: [{
    model: TripTravellers,
    as: 'tripTravellers',
    required: false,
    include: {
      model: db.user,
      as: 'user',
      required: false,
      attributes: ['email']
    }
  }]})
  const mailAddresses = []
  trip[0]?.tripTravellers?.map(travellers => {
    mailAddresses.push(travellers.user.email)
  })
  console.log("🚀 ~ file: trip.controller.js:419 ~ exports.delete ~ mailAddresses:", mailAddresses)
  Trip.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        sendMail(mailAddresses.join(','), 'Trip Cancelled', 'deleteOrUnpublish', '')
        res.send({ status: "success", message: "Trip successfully deleted" });
      } else {
        res.send({
          message: `Cannot delete Trip with id=${id}. Maybe Trip was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Trip with id=" + id,
      });
    });
};
// Delete all Trips from the database.
exports.deleteAll = (req, res) => {
  Trip.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} Trips were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all trips.",
      });
    });
};

