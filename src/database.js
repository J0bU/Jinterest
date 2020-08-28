'use strict';

const mongoose = require('mongoose'); // Step (16)

// Step (17)
mongoose.connect('mongodb://localhost/jinteresdb' , {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true

})
.then(db => console.log('DB is connected'))
.catch(error => console.log(error));