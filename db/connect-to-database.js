const mongoose = require('mongoose');
const dotenv = require('dotenv');
const generateConnectionUrl = require("../src/connection-url-generator")
dotenv.config()


const mongoURI = "mongodb+srv://admin:maNoS8EHxHHP701M@nct-database-1.m4c8lwa.mongodb.net/?retryWrites=true&w=majority&appName=NCT-Database-1";
const connection_string = generateConnectionUrl(58)


const connectToMongoDB = async () => {
    mongoose
        .connect(mongoURI)
        .then(() => {
            console.log("X--- NCT database connected succesfully ---X")
            console.log(`X--- NCT database connection url: ${connection_string} ---X`)
        })
        .catch(err => console.log(err));
}


// Exporting the function to be used by other modules

module.exports = connectToMongoDB; // exporting the connectToMongoDB function

// Db server codebase completed
