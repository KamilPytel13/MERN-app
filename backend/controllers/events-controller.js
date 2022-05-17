const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-errors');
const Event = require('../models/events-model');

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

const getAllEvents = async (req, res, next) => {
    let events;

    try {
        events = await Event.find();
    } catch(err) {
        const error = new HttpError(
            'Something went wrong',
            500
        );
        return next(error);
    }

    if(!events) {
        const error = new HttpError(
            'There is no posts to display',
            404);
        return next(error);
    }

    res.json( {events: events.map(event => event.toObject( {getters: true} ))} );
};

const getEventById = async (req, res, next) => {
    const eventId = req.params.eid;
    let event;
    
    try {
        event = await Event.findById(eventId);
    } catch(err) {
        const error = new HttpError(
            'Something went wrong. Could not find an event.',
            500
        );
        return next(error);
    }


    if(!event) {
        const error = new HttpError(
            'There is no event with a given Id', 
            404
        );
        return next(error);
    }

    res.json( {event: event.toObject( {getters: true} )} );
}

const createEvent = async(req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs', 422);
    };

    const { title, description, eventDate, eventTime, place, creator} = req.body;

    const createdEvent = new Event({
        title,
        description,
        place,
        eventDate,
        eventTime,
        creator
    });
    
    //DUMMY_EVENTS.push(createdEvent);
    try {
        await createdEvent.save()
    } catch(err) {
        const error = new HttpError(
            'Could not create a new event. Try again',
            500
        );
        return next(error);
    };

    res.status(201).json(createdEvent);
};

const editEvent = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const error = new HttpError(
            'Invalid inputs', 
            422);
        return next(error);
    }

    const { title, description, place, eventDate, eventTime} = req.body;
    const eventId = req.params.eid;

    let event;

    try {
        event = await Event.findById(eventId);
    } catch(err) {
        const error = new HttpError(
            'Something went wrong. Could not update the event.', 
            500);
        return next(error);
    }

    event.title = title;
    event.description = description;
    event.place = place;
    event.eventDate = eventDate;
    event.eventTime = eventTime;

    try {
        await event.save();
    } catch(err) {
        const error = new HttpError(
            'Something went wrong. Could not update the event.', 
            500);
        return next(error);
    }

    res.status(200).json({ event: event.toObject( {getters: true }) });
};

const deleteEvent = async (req, res, next) => {
    const eventId = req.params.eid;

    let event;

    try {
        event = await Event.findById(eventId);
    } catch(err) {
        const error = new HttpError(
            'Something went wrong. Could not delete the event.', 
            500);
        return next(error);
    }

    if(!event) {
        const error = new HttpError(
            'There is no event to delete with a given Id', 
            404
        );
        return next(error);
    }

    try {
        await event.remove();
    } catch(err) {
        const error = new HttpError(
            'Something went wrong. Could not delete the event.', 
            500);
        return next(error);
    }

    res.status(200).json({ message: 'Event deleted'} );
};

exports.getAllEvents = getAllEvents;
exports.getEventById = getEventById;
exports.createEvent = createEvent;
exports.editEvent = editEvent;
exports.deleteEvent = deleteEvent;