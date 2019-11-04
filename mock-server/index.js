
let express = require('express');
let { carSearch } = require('./json-generators');
let app = express();

app.get('/api', function (req, res) {
  res.send(carSearch(req));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080');
});

