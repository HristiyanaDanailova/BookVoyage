const jwt = require('jsonwebtoken');
const encryption = require('../util/encryption');
const User = require('../models/User');

const { validationResult } = require('express-validator');

module.exports = {
    // Register a user
    register: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid user data',
                errors
            });
        }
        try {
            const { name, email, password, phoneNumber } = req.body;
            const salt = encryption.generateSalt();
            const hashedPassword = encryption.generateHashedPassword(salt, password);
            const user = await User.create({
                name,
                email,
                phoneNumber,
                description: '',
                address: '',
                profession: '',
                profilePhoto: '',
                salt,
                password: hashedPassword
            });
            res.status(200).json({
                message: 'User created successfully!',
                user
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :(',
            })
        }

    },
    // Login a user
    login: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid user data',
                errors
            });
        }
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (user) {
                if (user.authenticate(password)) {
                    const accessToken = jwt.sign({
                        email: user.email,
                        userId: user._id.toString()
                    }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15m' });
                    const refreshToken = jwt.sign(
                        {
                            email: user.email,
                            userId: user._id.toString()
                        },
                        process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' });

                    res.cookie('accessToken', accessToken, { maxAge: 900000 });
                    res.cookie('refreshToken', refreshToken,
                        {
                            maxAge: 86400000,
                            httpOnly: true, sameSite: 'strict'
                        }
                    );

                    res.status(200).json({
                        message: 'Successfull login!',
                        userInfo: {
                            name: user.name,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            description: user.description,
                            address: user.address,
                            profession: user.profession,
                            profilePhoto: user.profilePhoto
                        }
                    });
                } else {
                    res.status(400).json({
                        message: 'Invalid credentials!'
                    })
                }
            } else {
                res.status(400).json({
                    message: 'Invalid credentials!'
                })
            }

        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :('
            })
        }

    },
    // Update profile photo of a given user
    profilePhoto: async (req, res) => {
        try {
            const { id, profilePhoto } = req.body;
            const userId = req.userId;
            const user = await User.findById(id);
            if (userId === id) {
                user.set({
                    profilePhoto: profilePhoto
                })
                await user.save();
                res.status(200).json({
                    message: 'Profile photo updated successfully!'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :('
            })
        }
    },
    // Update user information
    updateUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Wrong user data',
                errors
            });
        }
        try {
            const { id, name, email, description, address, profession, phoneNumber } = req.body;
            const userId = req.userId;
            const user = await User.findById(id);
            if (userId === id) {
                const userDoc = await User.findOne({ email });
                if (userDoc && userDoc._id.toString() !== user._id.toString()) {
                    return res.status(400).json({
                        message: 'User with this email already exists!'
                    });
                }
                user.set({
                    name,
                    email,
                    description,
                    address,
                    profession,
                    phoneNumber
                })
                await user.save();
                res.status(200).json({
                    message: 'User updated successfully!'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: 'Something wnet wrong! :('
            })

        }
    },
    // Get user information
    profileInfo: async (req, res) => {
        try {
            const userId = req.userId;
            const { name, email, _id, phoneNumber, description, address, profession, profilePhoto } = await User.findById(userId);
            return res.status(200).json({
                message: 'Successfull verification!',
                user: {
                    name,
                    email,
                    phoneNumber,
                    description,
                    address,
                    profession,
                    profilePhoto,
                    _id
                }
            });
        } catch (error) {
            return res.status(200).json({
                message: 'Unuccessfull verification!',
                user: null
            });

        }

    },
    // Logout a user
    logout: (req, res) => {
        try {
            res.clearCookie('accessToken').clearCookie('refreshToken').status(200).json({
                message: 'User logged out successfully!'
            })
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong! :('
            })
        }

    }
}