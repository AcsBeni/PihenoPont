const express = require('express');
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

app.use('/uploads', express.static('uploads'));
app.use('/upload', upload);
app.use('/users', users)
app.use('/email', email)
app.use('/bookings' , bookings)
app.use('/accommodations' , accommodations)

app.listen(process.env.PORT, () => {
    
    logger.info(`Server listening on ${process.env.PORT}`);
});

/*
DBHOST=localhost
DBUSER=root
DBPASS=
DBNAME=pihenopont
DEBUG=1
PORT=3000 */
