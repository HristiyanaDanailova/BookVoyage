const express = require('express');
require('dotenv').config();
const app = express();
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
require('./config/database')(config);
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user');
const placeRoutes = require('./routes/place');
const bookingRoutes = require('./routes/booking');
const photoRoutes = require('./routes/photo');


const cors = require('cors')

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use('/user', userRoutes);
app.use('/place', placeRoutes);
app.use('/booking', bookingRoutes);
app.use('/photo', photoRoutes)

app.use((req, res, next) => {
    next();
});

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));