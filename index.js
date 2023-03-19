var express = require('express');
require('dotenv').config();
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", (req, res) => {
  let date = new Date(Date.now());  
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// your first API endpoint... 
app.get("/api/:dateString", (req, res) => {
  const timeStamp = Number(req.params.dateString);  
  let date = isNaN(timeStamp) ? new Date(req.params.dateString) : new Date(timeStamp); 
  if (date instanceof Date && !isNaN(date.getTime())) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } 
  else{
    res.json({ error : "Invalid Date" });
  }
  
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

