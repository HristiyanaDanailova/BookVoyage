module.exports = {
    development: {
        port: process.env.PORT || 4000,
        dbPath: process.env.MONGO_CONNECTION || 'mongodb://127.0.0.1:27017/bookVoyage'
    },
    production: {}
}