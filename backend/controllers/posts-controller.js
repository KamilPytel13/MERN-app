const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-errors');

let DUMMY_POSTS = [
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

const getPostById = (req, res, next) => {
    const postId = req.params.pid;

    const post = DUMMY_POSTS.find(p => p.id === postId);

    if(!post) {
        return next(new HttpError('There is no post with a given Id', 404));
    }

    res.json({post});
};

const createPost = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs', 422);
    }

    const { title, description, date, time, creator, likes } = req.body;

    const createdPost = {
        id: uuidv4(),
        title, 
        description,
        date,
        time,
        creator,
        likes
    };

    DUMMY_POSTS.push(createdPost);
    res.status(201).json(createdPost);
};

const editPost = (req, res, next) => {
    const { title, description } = req.body;
    const postId = req.params.pid;

    const updatedPost = { ...DUMMY_POSTS.find(p => p.id === postId) };
    const postIndex = DUMMY_POSTS.findIndex(p => p.id === postId);

    updatedPost.title = title;
    updatedPost.description = description;

    DUMMY_POSTS[postIndex] = updatedPost;

    res.status(200).json({ post: updatedPost });
};

const deletePost = (req, res, next) => {
    const postId = req.params.pid;
    
    if(!DUMMY_POSTS.find(p => p.id === postId)){
        throw new HttpError('The post with a given id already does not exist', 404);
    }

    DUMMY_POSTS = DUMMY_POSTS.filter(p => p.id !== postId);

    res.status(200).json({ message: 'Post deleted' });
};

exports.getAllPosts = getAllPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.editPost = editPost;
exports.deletePost = deletePost;