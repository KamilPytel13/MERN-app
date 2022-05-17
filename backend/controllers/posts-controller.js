const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-errors');
const Post = require('../models/posts-model');

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

const getAllPosts = async (req, res, next) => {
    let posts;

    try {
        posts = await Post.find();
    } catch(err) {
        const error = new HttpError(
            'Something went wrong.',
            500
        );
        return next(error);
    }

    if(!posts) {
        const error = new HttpError(
            'There is no posts to display',
             404
        );
        return next(error);
    }
    res.json( {posts: posts.map(post => post.toObject( {getters: true }))} );
};

const getPostById = async (req, res, next) => {
    const postId = req.params.pid;

    //const post = DUMMY_POSTS.find(p => p.id === postId);
    let post;

    try {
        post = await Post.findById(postId);
    } catch(err) {
        const error = new HttpError(
            'Something went wrong! Could not find a post.',
            500
        );
        return next(error);
    }
    
    if(!post) {
        const error = new HttpError(
            'There is no post with a given Id', 
            404
        );
        return next(error);
    }

    res.json( {post: post.toObject( {getters: true })} );
};

const createPost = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs', 422);
    }

    const { title, description, creator } = req.body;

    const createdPost = new Post({
        title,
        description,
        creator
    });

    try {
        await createdPost.save()
    } catch(err) {
        const error = new HttpError(
            'Could not save the post. Try again',
            500
        );
        return next(error);
    }

    res.status(201).json(createdPost);
};

const editPost = async (req, res, next) => {
    const { title, description } = req.body;
    const postId = req.params.pid;

    let post;

    try {
        post = await Post.findById(postId);
    } catch(err) {
        const error = new HttpError(
            'Something went wront. Could not edit the post.',
            500
        );
        return next(error);
    }

    post.title = title;
    post.description = description;

    try {
        await post.save();
    } catch(err) {
        const error = new HttpError(
            'Something went wront. Could not edit the post.',
            500
        );
        return next(error);
    }

    res.status(200).json({ post: post.toObject( {getters: true }) });
};

const deletePost = async (req, res, next) => {
    const postId = req.params.pid;
    
    let post;

    try {
        post = await Post.findById(postId);
    } catch(err) {
        const error = new HttpError(
            'Something went wront. Could not delete the post.',
            500
        );
        return next(error);
    }

    if(!post) {
        const error = new HttpError(
            'There is no post to delete with a given Id', 
            404
        );
        return next(error);
    }

    try {
        await post.remove();
    } catch(err) {
        const error = new HttpError(
            'Something went wront. Could not delete the post.',
            500
        );
        return next(error);
    }

    res.status(200).json({ message: 'Post deleted' });
};

exports.getAllPosts = getAllPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.editPost = editPost;
exports.deletePost = deletePost;