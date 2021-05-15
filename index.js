const express = require('express'),
    mongoose = require('mongoose'),
    app = express(),
    urlMongo = "mongodb://localhost/usersnap",
    port = 3000,
    session = require("express-session");


app.use(session({
    secret: '217879da-2619-499d-be55-626789f5fabe',
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 1000}
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(__dirname + '/public')); 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

mongoose.connect(urlMongo, { useNewUrlParser: true, useUnifiedTopology: true })
    try {
        console.log('connect to database')
    } catch (error) {
        console.log(error)
    }

app.use('/', require('./router/router'));

app.listen(port, () => console.log(`server run in port ${port}`));