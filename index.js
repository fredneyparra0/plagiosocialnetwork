const express = require('express'),
      app = express(),
      port = 3000;

app.use(express.static(__dirname + '/public')); 
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use('/', require('./router/router'));

app.listen(port, () => console.log(`server run in port ${port}`));