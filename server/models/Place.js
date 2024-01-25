const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    photos: [{ type: String, required: true }],
    description: { type: String, required: true },
    features: [{ type: String }],
    extraInfo: { type: String },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    maxGuests: { type: Number, required: true },
    price: { type: Number, required: true },
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    booked: [{ startDate: { type: Date }, endDate: { type: Date } }]
});

module.exports = mongoose.model('Place', placeSchema);