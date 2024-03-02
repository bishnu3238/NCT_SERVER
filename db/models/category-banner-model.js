const mongoose = require('mongoose');
const { Schema } = mongoose;
const dotenv = require('dotenv');
dotenv.config()

const SlidersSchema = new Schema({
    _title: {
        type: String,
        default: ""
    },
    _caption: {
        type: String,
        default: ""
    },
    _slogan: {
        type: String,
        default: ""
    },
    _imageBase64: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
})

// Converting the UserSchema to a model

const CaegoryBanners = mongoose.model('category-banners', SlidersSchema); //Compliling the UserSchema to commerceFox registered users model


// Exporting the model to be used by other modules

module.exports = CaegoryBanners; //exporting the model Users

// Instant Chat MongoDB model codebase completed