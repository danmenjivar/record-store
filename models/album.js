var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
    title: { type: String, required: true, maxLength: 100 },
    description: { type: String },
    genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
    artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
    release_date: { type: Date },
    price: { type: mongoose.Decimal128 },
    number_in_stock: { type: Number, min: 0 },
});

// Virtual for album release year
AlbumSchema.virtual('year').get(function () {
    return DateTime.fromJSDate(this.release_date).toLocaleString(
        DateTime.DATE_MED
    );
});

// Virtual for album's URL
AlbumSchema.virtual('url').get(function () {
    return '/inventory/album' + this._id;
});

module.exports = mongoose.model('Album', AlbumSchema);
