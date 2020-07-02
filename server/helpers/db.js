const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_LOCAL_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

function getConnection() {
    const connection = mongoose.connection;
    return connection;
}

module.exports = {
    User: require('../users/user.model'),
    Question: require('../question/question.model'),
    Interview: require('../interview/interview.model'),
    getConnection
};