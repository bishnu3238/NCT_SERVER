// title: CommerceFox MongoDB model
// description: This is the module of the CommerceFox MongoDB
// version: 1.0.0
// date created: Feb 11, 2022
// author: Sarin Jaiswal


//Importing all the required packages

const mongoose = require('mongoose'); // Importing mongoose for connecting to mongoDB
const { Schema } = mongoose; // Importing the schema feature of the mongoose to declare the scheme of the user data storage
const dotenv = require('dotenv');
dotenv.config()

const FacebookRequestsSchema = new Schema({
    _teamName: {
        type: String,
        required: true
    },
    _teamLeader: {
        type: String,
        required: true
    },
    _fbIntegrated: {
        type: Boolean,
        default: false
    },
    _teamId: {
        type: String,
        required: true
    },
    _teamLeaderId: {
        type: String,
        required: true
    }
})

// Converting the FunnelSchema to a model

const FbRequests = mongoose.model('fbRequests', FacebookRequestsSchema); //Compliling the UserSchema to commerceFox registered users model


// Exporting the model to be used by other modules

module.exports = FbRequests; //exporting the model Users

// Instant Chat MongoDB model codebase completed