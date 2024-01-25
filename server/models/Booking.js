const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'Place' },
    user: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    numberOfGuests: { type: Number, required: true },
    price: { type: Number, required: true }
})

module.exports = mongoose.model('Booking', bookingSchema);