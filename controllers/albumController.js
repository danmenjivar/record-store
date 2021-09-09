var Album = require('../models/album');
var async = require('async');

// HOME PAGE
exports.index = function (req, res) {
    res.render('index', {
        title: 'Biffa Harmonics',
        subtitle: 'Local Record Store',
        est: '2021',
    });
};

// Display list of all albums
exports.album_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Album list');
};

// Display detail for a specific album
exports.album_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Album detailL ' + req.params.id);
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
