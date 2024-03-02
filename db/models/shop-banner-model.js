const mongoose = require('mongoose');
const { Schema } = mongoose;
const dotenv = require('dotenv');
dotenv.config()

const BannersSchema = new Schema({
    _title: {
        type: String,
        default: ""
    },
    _caption: {
        type: String,
        default: ""
    },
    _imageBase64: {
        type: String,
        default: ""
    },
    _redirectText: {
        type: String,
        default: "SHOP NOW"
    },
    _redirectUrl: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
})

// Converting the UserSchema to a model

const ShopBanners = mongoose.model('shop-banners', BannersSchema); //Compliling the UserSchema to commerceFox registered users model


// Exporting the model to be used by other modules

module.exports = ShopBanners; //exporting the model Users

// Instant Chat MongoDB model codebase completed