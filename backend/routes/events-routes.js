const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events-controller');

router.get('/:eid', eventsController.getEventById);

router.get('/', eventsController.getAllEvents);

router.post('/', eventsController.createEvent);

router.patch('/:eid', eventsController.editEvent);

router.delete('/:eid', eventsController.deleteEvent);

module.exports = router;