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
    hash: { 
        type: String, 
        required: true 
    },
    createdDate: { 
        type: Date,
         default: Date.now
    }
});

UserSchema
.virtual('name')
.get(() => {
    let fullname = '';
    if (this.first_name && this.last_name) {
        fullname = this.first_name + ' ' + this.last_name;
    } else if(!this.last_name && this.first_name) {
        fullname = this.first_name;
    } else {
        fullname = '';
    }
    
    return fullname;
});

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});



module.exports = mongoose.model('User', UserSchema);