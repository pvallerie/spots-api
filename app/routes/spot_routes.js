// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for spots
const Spot = require('../models/spot')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { spot: { title: '', text: 'foo' } } -> { spot: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// CREATE
// POST /spots
router.post('/spots', requireToken, (req, res, next) => {
  // set owner of new spot to be current user
  req.body.spot.owner = req.user.id

  Spot.create(req.body.spot)
    // respond to succesful `create` with status 201 and JSON of new "spot"
    .then(spot => {
      res.status(201).json({ spot: spot.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// INDEX
// GET /spots
router.get('/spots', requireToken, (req, res, next) => {
  Spot.find({owner: req.user._id})
    .then(examples => {
      // `spots` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return examples.map(example => example.toObject())
    })
    .then(spots => res.status(201).json({ spots: spots }))
    .catch(next)
})

// SHOW
// GET /spots/:id
router.get('/spots/:id', requireToken, (req, res, next) => {
  const spotId = req.params.id
  const userId = req.user._id
  Spot.findOne({_id: spotId, owner: userId})
    .then(handle404)
    .then(spot => res.status(200).json({ spot: spot.toObject() }))
    .catch(next)
})

// // SHOW SEEN
// // GET /spots/seen
// router.get('/spots/:seen', requireToken, removeBlanks, (req, res, next) => {
//   const ifSeen = req.params.seen
//   const userId = req.user._id
//   Spot.find({ owner: userId, seen: ifSeen })
//     .then(handle404)
//     .then(spot => res.status(200).json({ spot: spot.toObject() }))
//     .catch(next)
// })
//
// // SHOW UNSEEN
// // GET /spots/unseen
// router.get('/spots/unseen', requireToken, removeBlanks, (req, res, next) => {
//   const userId = req.user._id
//   Spot.find({ owner: userId, seen: false })
//     .then(handle404)
//     .then(spot => res.status(200).json({ spot: spot.toObject() }))
//     .catch(next)
// })

// DESTROY
// DELETE /spots/:id
router.delete('/spots/:id', requireToken, (req, res, next) => {
  const spotId = req.params.id
  const userId = req.user._id
  Spot.findOne({_id: spotId, owner: userId})
    .then(handle404)
    .then(spot => {
      requireOwnership(req, spot)
      return spot.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// UPDATE
// PATCH /spots/:id
// delete owner key from object before we send it (delete req.body.spot.owner)
router.patch('/spots/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.spot.owner
  const spotId = req.params.id
  const userId = req.user._id
  const data = req.body.spot
  Spot.findOne({_id: spotId, owner: userId})
    .then(handle404)
    .then(spot => {
      requireOwnership(req, spot)
      return spot.updateOne(data)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
