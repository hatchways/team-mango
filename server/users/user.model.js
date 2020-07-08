const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    },
    backgroundCompleted: {
        type: Boolean,
        default: false
    },
    background: {
        language: {
            type: String,
            default: ""
        },
        experience: {
            type: String,
            default: ""
        },
        rating: {
            type: Number,
            default: 2
        }
    },
    interviews: [{ type: Schema.Types.ObjectId, ref: 'Interview' }],
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

UserSchema
.virtual('name')
.get(() => {
    let fullName = '';
    if (this.firstName && this.lastName) {
        fullName = this.firstName + ' ' + this.lastName;
    } else if(!this.lastName && this.firstName) {
        fullName = this.firstName;
    } else {
        fullName = '';
    }
    
    return fullName;
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