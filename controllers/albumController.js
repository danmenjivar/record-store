var Album = require('../models/album');
var Artist = require('../models/artist');
var Genre = require('../models/genre');

var async = require('async');

// HOME PAGE
exports.index = function (req, res) {
    async.parallel(
        {
            album_count: function (callback) {
                Album.countDocuments({}, callback); // Passing empty object '{}' as match condition to find all documents of this collection
            },
            artist_count: function (callback) {
                Artist.countDocuments({}, callback);
            },
            genre_count: function (callback) {
                Genre.countDocuments({}, callback);
            },
        },
        function (err, results) {
            res.render('index', {
                title: 'Biffa Harmonics Record Store Inventory',
                subtitle: 'Est. 2021',
                data: results,
            });
        }
    );
};

// Display list of all albums
exports.album_list = function (req, res, next) {
    Album.find({}, 'title artist')
        .populate('artist')
        .exec(function (err, list_albums) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render('album_list', {
                title: 'Album List',
                album_list: list_albums,
            });
        });
};

// Display detail for a specific album
exports.album_detail = function (req, res, next) {
    async.parallel(
        {
            album: function (callback) {
                Album.findById(req.params.id)
                    .populate('album')
                    .populate('artist')
                    .populate('genre')
                    .exec(callback);
            },
        },
        function (err, results) {
            if (err) {
                return next(err);
            }
            if (results.album == null) {
                // no results
                var err = new Error('Album not found');
                err.status = 404;
                return next(err);
            }
            res.render('album_detail', {
                title: results.album.title,
                album: results.album,
            });
        }
    );
};

// Display Album create form on GET
exports.album_create_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Album create GET');
};

// Handle Album create on POST
exports.album_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Album create POST');
};

// Display Album delete form on GET
exports.album_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Album delete GET');
};

// Handle Album delete on POST
exports.album_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Album delete POST');
};

// Display Album update form on GET
exports.album_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Album update GET');
};

// Display Album update form on POST
exports.album_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Album update POST');
};
