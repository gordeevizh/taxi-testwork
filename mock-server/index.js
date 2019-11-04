
let express = require('express');
let { carSearch, createOrder } = require('./json-generators');
let app = express();

app.get('/api/cars', function (req, res) {
  res.send(carSearch(req));
});

app.get('/api/create-order', function (req, res) {
  res.send(createOrder());
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080');
});
