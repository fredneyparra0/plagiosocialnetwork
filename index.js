const express = require('express'),
mongoose = require('mongoose'),
app = express(),
url = "mongodb://localhost/usersnap",
port = 3000;

app.use(express.static(__dirname + '/public')); 
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    try {
        console.log('connect to database')
    } catch (error) {
        console.log(error)
    }

app.use('/', require('./router/router'));

app.listen(port, () => console.log(`server run in port ${port}`));