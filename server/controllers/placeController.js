const Place = require('../models/Place');
const { validationResult } = require('express-validator');

module.exports = {
    // Create a place
    addPlace: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid place data',
                errors
            });
        }
        try {
            const { name, address, description, photos, features, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
            const userId = req.userId;
            const place = await Place.create({
                owner: userId,
                name,
                address,
                description,
                photos,
                features,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price,
                booked: []
            });
            res.status(201).json({
                message: 'Place created successfully!',
                place
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :('
            });
        }
    },
    // Gets all places of a given user
    getUserPlaces: async (req, res) => {
        try {
            const userId = req.userId;
            const places = await Place.find({ owner: userId });
            res.status(200).json({
                message: 'Places fetched successfully!',
                places
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :('
            });
        }
    },
    // Get a place by a given id
    getPlaceById: async (req, res) => {
        try {
            const { id } = req.params;
            const place = await Place.findById(id).populate('owner');
            res.status(200).json({
                message: 'Place fetched successfully!',
                place
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :('
            });
        }
    },
    // Update a place
    updatePlace: async (req, res) => {
        try {
            const { id, name, address, description, photos, features, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
            const userId = req.userId
            const place = await Place.findById(id);
            if (userId === place.owner.toString()) {
                place.set({
                    name,
                    address,
                    description,
                    photos,
                    features,
                    extraInfo,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price
                })
                await place.save();
                res.status(200).json({
                    message: 'Post updated successfully!'
                })
            } else {
                res.status(401).json({
                    message: 'Unauthorized!'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :('
            })
        }
    },
    // Get all places 
    getAllPlaces: async (req, res) => {
        try {
            const places = await Place.find();
            res.status(200).json({
                message: 'Places fetched successfully!',
                places
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :('
            })
        }
    }
}