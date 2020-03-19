const express = require('express'),
  bodyParser = require('body-parser');

const detectRoute = require('./routers/detectAPIRoute');

const app = express();

app.use(express.json());
app.use(bodyParser());
app.use(express.static('views'));
app.use('/detectApi', detectRoute);

app.get('/', (req, res) => {
  res.end('/index.html');
});
var port = 3000;
app.listen(port, function() {
  console.log('Detect telephone app running on port 3000 !');
});
