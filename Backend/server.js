const express = require('express');
require('dotenv').config();
var cors = require('cors');
const app = express();
const logger = require("./utils/logger")
const users = require("./modules/users")
const upload = require("./modules/upload")
const email = require("./modules/email")
const bookings = require("./modules/bookings")
const accommodations = require("./modules/accommodations")

// Middleware-ek
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/upload', express.static('uploads'));
app.use('/upload', upload);
app.use('/users', users)
app.use('/email', email)
app.use('/bookings' , bookings)
app.use('/accommodations' , accommodations)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server listening on ${PORT}`);
});

/*
DBHOST=localhost
DBUSER=root
DBPASS=
DBNAME=pihenopont
DEBUG=1
PORT=3000 */
