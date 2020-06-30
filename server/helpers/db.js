const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_LOCAL_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model')
};