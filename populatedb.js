#! /usr/bin/env node

console.log(
    'This script populates some test album, albuminstance, artist, and genre entries to the database.'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async');
var Album = require('./models/album');
var Genre = require('./models/genre');
var Artist = require('./models/artist');

var mongoose = require('mongoose');
const artist = require('./models/artist');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var artists = [];
var genres = [];
var albums = [];

function artistCreate(name, cb) {
    var artist = new Artist({ name });

    artist.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Artist: ' + artist);
        artists.push(artist);
        cb(null, artist);
    });
}

function genreCreate(name, description, cb) {
    var genre = new Genre({ name, description });

    genre.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Genre: ' + genre);
        genres.push(genre);
        cb(null, genre);
    });
}

function albumCreate(
    title,
    description,
    genre,
    artist,
    release_date,
    price,
    number_in_stock,
    cb
) {
    albumdetail = {
        title,
        description,
        price,
        number_in_stock,
    };

    if (genre != false) albumdetail.genre = genre;
    if (artist != false) albumdetail.artist = artist;
    if (release_date != false) albumdetail.release_date = release_date;

    var album = new Album(albumdetail);
    album.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Album: ' + album);
        albums.push(album);
        cb(null, album);
    });
}

function createGenreArtists(cb) {
    async.series(
        [
            function (callback) {
                artistCreate('David Bowie', callback);
            },
            function (callback) {
                artistCreate('The Beatles', callback);
            },
            function (callback) {
                artistCreate('The Beach Boys', callback);
            },
            function (callback) {
                artistCreate('Stevie Wonder', callback);
            },
            function (callback) {
                artistCreate('Fleetwood Mac', callback);
            },
            function (callback) {
                artistCreate('Steely Dan', callback);
            },
            function (callback) {
                genreCreate(
                    'Rock',
                    'rock is song-based music with a 4. 4. time signature using a verse–chorus form',
                    callback
                );
            },
            function (callback) {
                genreCreate(
                    'R&B',
                    "R&B, which stands for Rhythm and Blues, is just that — music that is rhythmic and has the soulful achings of the blues. ... That doesn't mean it has lost its soul, but it has morphed into a crossbreed of genres, one that has allowed space for artists considered “hip-hop” to indulge in their singing dreams.",
                    callback
                );
            },
            function (callback) {
                genreCreate(
                    'Yacht Rock',
                    "Yacht rock is music, primarily created between 1976 and '84, that can be characterized as smooth and melodic, and typically combines elements of jazz, rhythm and blues, and rock.",
                    callback
                );
            },
        ],
        cb // optional callbacks
    );
}

function createAlbums(cb) {
    async.parallel(
        [
            function (callback) {
                albumCreate(
                    'The Rise and Fall of Ziggy Stardust',
                    'The Rise and Fall of Ziggy Stardust and the Spiders from Mars is the fifth studio album by David Bowie, which is loosely based on a story of a fictional rock star named Ziggy Stardust.Rhino will be breaking out ‘breaking out’ this albums from the David Bowie ‘Five Years 1969 – 1973’ box as a standalone releases. Available on1LP 180g Audiophile vinyl',
                    [genres[0]],
                    artist[0],
                    '1972-06-16',
                    31.2,
                    3,
                    callback
                );
            },
            function (callback) {
                albumCreate(
                    'Abbey Road',
                    "The Beatles' acclaimed original studio album remasters, released on CD in 2009, make their long-awaited stereo vinyl debut",
                    [genres[0]],
                    artist[1],
                    '1969-09-26',
                    21.84,
                    2,
                    callback
                );
            },
            function (callback) {
                albumCreate(
                    'Pet Sounds',
                    '2008 vinyl LP pressing of The Beach Boys\' masterpiece, originally released in 1966. Capitol. from the album sleeve: "This monophonic microgroove recording is playable on monophonic and stereo phonographs. It cannot become obsolete. It will continue to be a source of outstanding sound reproduction, providing the finest monophonic performance from any phonograph.',
                    [genres[0]],
                    artist[2],
                    '1966-05-16',
                    18.98,
                    4,
                    callback
                );
            },
            function (callback) {
                albumCreate(
                    'Songs in the Key of Life',
                    'The album was viewed as a guided tour through a wide range of musical styles and the life and feelings of the artist. It included recollections of childhood, of first love and lost love. It contained songs about faith and love among all peoples and songs about social justice for the poor and downtrodden.',
                    [genres[1]],
                    artist[3],
                    '1976-09-28',
                    14.9,
                    1,
                    callback
                );
            },
            function (callback) {
                albumCreate(
                    'Rumours',
                    'This Diamond Award Winning, Grammy "Album Of The Year" masterpiece from Fleetwood Mac is available as an Audiophile Deluxe Version pressed on 2-Disc 45 RPM, 180 gram vinyl (pressed At Pallas), as well as a standard 33 1/3 single disc.',
                    [genres[0]],
                    artist[4],
                    '1977-02-04',
                    21.43,
                    2,
                    callback
                );
            },
            function (callback) {
                albumCreate(
                    'Aja',
                    `The song's lyrics center around the interior monologue of a man who runs to the title character to escape the stresses of his life "up on the hill." Fagen claimed that it was inspired by a relative of someone he knew, who had married a Korean woman named Aja.`,
                    [genres[2]],
                    artist[5],
                    '1977-09-23',
                    30.0,
                    2,
                    callback
                );
            },
        ],
        cb // optional callbacks
    );
}

async.series([createGenreArtists, createAlbums], function (err, results) {
    if (err) {
        console.log('FINAL ERR: ' + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
