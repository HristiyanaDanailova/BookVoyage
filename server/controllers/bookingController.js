const Booking = require('../models/Booking');
const Place = require('../models/Place');

const { validationResult } = require('express-validator');

module.exports = {
    // Book a place
    bookPlace: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid booking data',
                errors
            });
        }
        try {
            const { place, checkIn, checkOut, numberOfGuests, name, phoneNumber, price } = req.body;
            const userId = req.userId;
            const placeDoc = await Place.findById(place);
            let booked = [...placeDoc.booked,
            {
                startDate: checkIn,
                endDate: checkOut
            }
            ];
            placeDoc.set('booked', booked);
            await placeDoc.save();

            const booking = await Booking.create({
                place, checkIn, checkOut, numberOfGuests, name, phoneNumber, price, user: userId
            });

            res.status(201).json({
                message: 'Booking created successfully!',
                booking
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :(',
            })
        }
    },
    // Get all bookings of a given user
    getAllBookings: async (req, res) => {
        try {
            const userId = req.userId;
            const bookings = await Booking.find({ user: userId }).populate({
                path: 'place',
                populate: [{ path: 'owner' }]
            }).populate('user');

            res.status(200).json({
                message: 'Bookings fetched successfully!',
                bookings
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :(',
            });
        }
    },
    // Get a booking by id
    getBookingById: async (req, res) => {
        try {
            const bookingId = req.params.id;
            const booking = await Booking.findById(bookingId).populate({
                path: 'place',
                populate: [{ path: 'owner' }]
            }).populate('user');
            res.status(200).json({
                message: 'Booking fetched successfully!',
                booking
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :(',
            });
        }
    }
}