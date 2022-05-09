const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-errors');

let DUMMY_EVENTS = [
    {
        id: 'e1',
        title: 'Test Title',
        description: 'Test description of an event',
        place: 'Zakopane',
        postDate: '21/04/22',
        eventDate: '23/05/22',
        postTime: '19:20',
        eventTime: '10:00',
        creator: 'u1'
    },
    {
        id: 'e2',
        title: 'Test Title 2',
        description: 'Test description of an event 2',
        place: 'Krakow',
        postDate: '11/01/22',
        eventDate: '28/06/22',
        postTime: '12:40',
        eventTime: '08:30',
        creator: 'u2'
    }
];

const getAllEvents = (req, res, next) => {
    if(!DUMMY_EVENTS) {
        throw new HttpError('There is no posts to display', 404);
    }

    res.json({DUMMY_EVENTS});
};

const getEventById = (req, res, next) => {
    const eventId = req.params.eid;
    const event = DUMMY_EVENTS.find(e => e.id === eventId);

    if(!event) {
        return next(new HttpError('There is no event with a given Id', 404));
    }

    res.json({event});
}

const createEvent = (req, res, next) => {
    const { title, description, place, postDate, eventDate, postTime, eventTime, creator} = req.body;

    const createdEvent = {
        id: uuidv4(),
        title,
        description,
        place,
        postDate,
        eventDate,
        postTime,
        eventTime,
        creator
    }
    
    DUMMY_EVENTS.push(createdEvent);
    res.status(201).json(createdEvent);
};

const editEvent = (req, res, next) => {
    const { title, description, place, eventDate, eventTime} = req.body;
    const eventId = req.params.eid;

    const updatedEvent = { ...DUMMY_EVENTS.find(e => e.id === eventId) };
    const eventIndex = DUMMY_EVENTS.findIndex(e => e.id === eventId);

    updatedEvent.title = title;
    updatedEvent.description = description;
    updatedEvent.place = place;
    updatedEvent.eventDate = eventDate;
    updatedEvent.eventTime = eventTime;

    DUMMY_EVENTS[eventIndex] = updatedEvent;

    res.status(200).json({ event: updatedEvent });
};

const deleteEvent = (req, res, next) => {
    const eventId = req.params.eid;
    DUMMY_EVENTS = DUMMY_EVENTS.filter(e => e.id !== eventId);

    res.status(200).json({ message: 'Event deleted'} );
};

exports.getAllEvents = getAllEvents;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.editEvent = editEvent;
exports.deleteEvent = deleteEvent;