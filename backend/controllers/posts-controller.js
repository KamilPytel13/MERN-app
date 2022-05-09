const HttpError = require('../models/http-errors');

const DUMMY_POSTS = [
    {
        id: 'p1',
        title: 'Test Title',
        description: 'Test description of a post',
        date: '21/04/22',
        time: '19:20',
        creator: 'u1',
        likes: 4
    },
    {
        id: 'p2',
        title: 'Test Title 2',
        description: 'Test description of a post 2',
        date: '11/01/22',
        time: '12:40',
        creator: 'u2',
        likes: 0
    }
];

const getAllPosts = (req, res, next) => {
    if(!DUMMY_POSTS) {
        throw new HttpError('There is no posts to display', 404);
    }

    res.json({DUMMY_POSTS});
};

exports.getAllPosts = getAllPosts;