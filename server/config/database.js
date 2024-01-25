const mongoose = require('mongoose');

module.exports = config => {
    mongoose.connect(config.dbPath, {
        useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            console.log(err);
        }
    });
    db.on('error', reason => {
        console.log(reason);
    });
}