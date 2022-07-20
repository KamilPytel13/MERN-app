const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-errors');
const Event = require('../models/events-model');
const User = require('../models/user');

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
        const error = new HttpError(
            'Invalid inputs', 
            422);
        return next(error);
    }

    const { title, description, eventDate, eventTime, place, creator} = req.body;

    const createdEvent = new Event({
        title,
        description,
        place,
        eventDate,
        eventTime,
        creator
    });

    let user;

    try {
        user = await User.findById(creator);
    } catch(err) {
        const error = new HttpError(
            'Could not create the event. Try again',
            500
        );
        return next(error);
    }

    if(!user) {
        const error = new HttpError('Could not find a user with a given id', 404);
        return next(error);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdEvent.save({ session: session });
        user.events.push(createdEvent);
        await user.save({ session: session });
        await session.commitTransaction();
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
        event = await Event.findById(eventId).populate('creator');
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
        const session = await mongoose.startSession();
        session.startTransaction();
        await event.remove({ session: session });
        event.creator.events.pull(event);
        await event.creator.save({ session: session });
        session.commitTransaction();
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