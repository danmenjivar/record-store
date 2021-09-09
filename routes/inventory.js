var express = require('express');
var router = express.Router();

// Require controller modules.
var album_controller = require('../controllers/albumController');
var artist_controller = require('../controllers/artistController');
var genre_controller = require('../controllers/genreController');

// ALBUM ROUTES //

// GET inventory home page
router.get('/', album_controller.index);

// GET request for creating an Album.
// NOTE: This must come before route that displays Album (uses id).
router.get('/album/create', album_controller.album_create_get);

// POST request for creating an Album.
router.post('/album/create', album_controller.album_create_post);

// GET request for deleting an Album.
router.get('/album/:id/delete', album_controller.album_delete_get);

// POST request for deleting an Album.
router.post('/album/:id/update', album_controller.album_delete_post);

// GET request to update an Album.
router.get('/album/:id/update', album_controller.album_update_get);

// POST request to update an Album.
router.post('/album/:id/update', album_controller.album_update_post);

// GET request for one Album.
router.get('/album/:id', album_controller.album_detail);

// GET request for list of all Album items.
router.get('/albums', album_controller.album_list);

// ARTIST ROUTES //

// GET request for creating Artist.
// NOTE: This must come before route that displays Artist (uses id).
router.get('/artist/create', artist_controller.artist_create_get);

// POST request for creating Artist.
router.post('/artist/create', artist_controller.artist_create_post);

// GET request for delete Artist.
router.get('/artist/:id/delete', artist_controller.artist_delete_get);

// POST request for delete Artist.
router.post('/artist/:id/delete', artist_controller.artist_delete_post);

// GET request for update Artist.
router.get('/artist/:id/update', artist_controller.artist_update_get);

// POST request for update Artist.
router.post('/artist/:id/update', artist_controller.artist_update_post);

// GET request for one Artist.
router.get('/artist/:id', artist_controller.artist_detail);

// GET request for list of all Artists.
router.get('/artists', artist_controller.artist_list);

// GENRE ROUTES //

// GET request for creating Genre.
// NOTE: This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

// POST request for creating Genre.
router.post('/genre/create', genre_controller.genre_create_post);

// GET request for delete Genre.
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// POST request for delete Genre.
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// GET request for update Genre.
router.get('/genre/:id/update', genre_controller.genre_update_get);

// POST request for update Genre.
router.post('/genre/:id/update', genre_controller.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);

// GET request for list of all Genres.
router.get('/genres', genre_controller.genre_list);

module.exports = router;
