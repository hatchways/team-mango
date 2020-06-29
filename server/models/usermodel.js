const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

UserSchema
.virtual('name')
.get(() => {
    let fullname = '';
    if (this.first_name && this.last_name) {
        fullname = this.first_name + ' ' + this.last_name;
    }
    if (!this.first_name || !this.last_name) {
        fullname = '';
    }
    
    return fullname;
});

module.exports = mongoose.model('User', UserSchema);