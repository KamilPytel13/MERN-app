const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-errors');
const Post = require('../models/posts-model');
const User = require('../models/user');

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
        const error = new HttpError(
            'Invalid inputs', 
            422);
        return next(error);
    }

    const { title, description, creator } = req.body;

    const createdPost = new Post({
        title,
        description,
        creator
    });

    let user;

    try {
        user = await User.findById(creator);
    } catch(err) {
        const error = new HttpError(
            'Could not create the post. Try again',
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
        await createdPost.save({ session: session });
        user.posts.push(createdPost);
        await user.save({ session: session });
        await session.commitTransaction();
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
    
    //backend authorization protection
    if (post.creator.toString() !== req.userData.userId) {
        const error = new HttpError(
            'You are not allowed to perform this operation.',
            401
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
        post = await Post.findById(postId).populate('creator');
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

    //backend auth check to allow deleting places
    if (post.creator.id !== req.userData.userId) {
        const error = new HttpError(
            'You are not allowed to perform this operation.',
            401
        );
        return next(error);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await post.remove({ session: session });
        post.creator.posts.pull(post);
        await post.creator.save({ session: session });
        await session.commitTransaction();
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