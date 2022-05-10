const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const eventsController = require('../controllers/events-controller');

router.get('/:eid', eventsController.getEventById);

router.get('/', eventsController.getAllEvents);

router.post('/', 
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('place').not().isEmpty(),
        check('postDate').not().isEmpty(),
        check('eventDate').not().isEmpty(),
        check('postTime').matches('^([0-2][0-9]):[0-5][0-9]$'),
        check('eventTime').matches('^([0-2][0-9]):[0-5][0-9]$'),
        check('creator').not().isEmpty()
    ],
    eventsController.createEvent);

router.patch('/:eid', 
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('place').not().isEmpty(), 
        check('eventDate').not().isEmpty(),
        check('eventTime').matches('^([0-2][0-9]):[0-5][0-9]$')
    ], 
    eventsController.editEvent);

router.delete('/:eid', eventsController.deleteEvent);

module.exports = router;