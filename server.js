const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require("http");
const authSliders = require('./db/routes/auth-sliders')
const authBanners = require('./db/routes/auth-shop-banners')
const authCatBanners = require('./db/routes/auth-category-banners')
const authFltBanners = require('./db/routes/auth-float-banners')
const connectToDatabase = require('./db/connect-to-database')
const generateConnectionUrl = require("./src/connection-url-generator")
const bodyParser = require('body-parser');

// Server configuration

dotenv.config()
connectToDatabase();
const app = express();
const port = process.env.PORT || 1337;
const connection_string = generateConnectionUrl(60)

// Adding the middlewares

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json()); // Specifying the server to use the json function of the EXPRESS framework
app.use(cors())  // Specifying the server to use the cors module
app.use(helmet()); // Specifying the server to use the helmet module
app.use(morgan("common")); // Specifying the server to use the morgan module
app.use("/api/slider", authSliders)
app.use("/api/banner", authBanners)
app.use("/api/catBanner", authCatBanners)
app.use("/api/fltBanner", authFltBanners)


// app.use('')
const server = http.createServer(app);


server.listen(port, () => {
    console.log("X--- NCT server succesfully running ---X");
    console.log(`X--- NCT server connection key: ${port} ---X`);
});
