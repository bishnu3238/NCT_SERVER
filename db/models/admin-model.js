const mongoose = require('mongoose');
const { Schema } = mongoose;
const dotenv = require('dotenv');
dotenv.config()

const changesData = new Schema({
    change: {
        type: String,
        default: ""
    },
})

const sessionData = new Schema({
    startTime: {
        type: String,
        default: ""
    },
    endTime: {
        type: String,
        default: ""
    },
    changesMade: [changesData]
})

const AdminsSchema = new Schema({
    _name: {
        type: String,
        required: true,
        min: 3
    },
    _email: {
        type: String,
        required: true,
        unique: true
    },
    _password: {
        type: String,
        required: true,
        min: 8
    },
    _session: [sessionData]
}, {
    timestamps: true
})

// Converting the UserSchema to a model

const Admins = mongoose.model('admins', AdminsSchema); //Compliling the UserSchema to commerceFox registered users model


// Exporting the model to be used by other modules

module.exports = Admins; //exporting the model Users

// Instant Chat MongoDB model codebase completed