'use strict';

const express = require('express'); //Step (1)
const path = require('path'); //Step (4)
const morgan = require('morgan'); //Step (5)
const multer = require('multer'); //Step (5)
const bodyParser = require('body-parser'); //Step (6)
const uuid = require('uuid').v4;
const { format } = require('timeago.js');


// ----------- Initializations -------- 
const app = express(); //Step (1)
require('./database'); //Step (16)

// ----------- Settings -------- 
app.set('port', process.env.PORT || 3000); //Step (2)
app.set('views', path.resolve(__dirname, './views')); //Step (4)
app.set('view engine', 'ejs'); //Step (3)


// ----------- Middlewares -------- 
app.use(morgan('dev')); //Step (5)
app.use(bodyParser.urlencoded({extended: false})); //Step (6)
const storage = multer.diskStorage({ 
    //Step (14)
    destination: path.resolve(__dirname, './public/img/uploads'),
    filename: (req, file, cb, filename)  => {
        cb(null, uuid() + path.extname(file.originalname))

    }
});
app.use(multer({
    storage: storage
}).single('image')); //Step (7)

// ----------- Global Variables --------
app.use((req, res, next) => {
    app.locals.format = format,
    next();
});

// ----------- Routes --------
app.use(require('./routes/index.routes')); //Step (8)

// ----------- Static Files -------- 
app.use(express.static(path.resolve(__dirname, './public')));

// ----------- Start the Server -------- 
app.listen(app.get('port'), () => { //Step (2)
    console.log(`Server on port ${app.get('port')}`);
});


