var Genre = require('../models/genre');
var Album = require('../models/album');
var async = require('async');

// Display list of all Genre.
exports.genre_list = function (req, res, next) {
    Genre.find().exec(function (err, list_genres) {
        if (err) {
            return next(err);
        }
        // Successful, so render
        res.render('genre_list', {
            title: 'Genre List',
            genre_list: list_genres,
        });
    });
};

// Display detail page for a specific Genre.
exports.genre_detail = function (req, res, next) {
    async.parallel(
        {
            genre: function (callback) {
                Genre.findById(req.params.id).exec(callback);
            },
            genre_albums: function (callback) {
                Album.find({ genre: req.params.id })
                    .populate('artist')
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                // MongoDB fetch failed
                return next(err);
            }
            if (results.genre == null) {
                // No results
                var err = new Error('Genre not found');
                err.status = 404;
                return next(err);
            }
            // On success, render
            res.render('genre_detail', {
                title: 'Genre Detail',
                genre: results.genre,
                genre_albums: results.genre_albums,
            });
        }
    );
};

// Display Genre create form on GET.
exports.genre_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST.
exports.genre_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Genre delete form on GET.
exports.genre_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
