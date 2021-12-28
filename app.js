const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post("/", function (req, res) {

  const firstName = req.body.fname
  const lastName = req.body.lname
  const email = req.body.email

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us20.api.mailchimp.com/3.0/lists/2b71ef7727?skip_merge_validation=true&skip_duplicate_check=true";

  const options = {
    method: "POST",
    auth: "roysams:182d4668dbe43e1924b00eb9cf88c0b7-us20"
  }

  const request = https.request(url, options, function (response) {
    if (response.statusCode = 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })

  })
  request.write(jsonData);
  request.end();

})

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post("failure", function (req, res) {
  res.redirect("/");
})

app.listen(3000, () => {
  console.log('listening on port 3000');
})

//api key 
//182d4668dbe43e1924b00eb9cf88c0b7-us20

//List id
//2b71ef7727