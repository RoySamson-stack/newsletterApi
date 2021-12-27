const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

app.post("/", function (req, res) {
 
  var firstName = req.body.fname
  var lastName = req.body.lname
  var email = req.body.email
  console.log(lastName, firstName, email)
 
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, () => {
  console.log('listening on port 3000');
})

//api key 
//182d4668dbe43e1924b00eb9cf88c0b7-us20

//List id
//2b71ef7727