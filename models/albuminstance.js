var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AlbumInstanceSchema = new Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Sold', 'Loaned', 'Reserved'],
    },
});

// Virtual for artist's URL
AlbumInstanceSchema.virtual('url').get(function () {
    return '/inventory/albuminstance' + this._id;
});

module.exports = mongoose.model('AlbumInstance', AlbumInstanceSchema);
