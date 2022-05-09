const express = require('express');
const bodyParser = require('body-parser');

const HttpError = require('./models/http-errors');
const userRoutes = require('./routes/user-routes');
const postsRoutes = require('./routes/posts-routes');
const eventsRoutes = require('./routes/events-routes');

const app = express();

app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/home', postsRoutes);
app.use('/api/events', eventsRoutes);

//error handler for unsupported routes
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
}); 

//error handler
app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || "Something went wrong!"
    });
});

app.listen(5002);