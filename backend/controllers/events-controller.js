const HttpError = require('../models/http-errors');

const DUMMY_EVENTS = [
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
        time: '12:40',
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

exports.getAllEvents = getAllEvents;