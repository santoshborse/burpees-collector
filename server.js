const express = require('express');
const NodeCache = require( "node-cache" );
var https = require('https');
var http = require('http');
const fs = require('fs');
var url = require('url');

const PORT = process.env.PORT || 8443;
const HTTP_PORT = process.env.HTTP_PORT || 8080;

const RUN_CALC_FREQ = process.env.RUN_CALC_FREQ || 20000;


var count = 0;

const Joi = require("joi")
const schema = Joi.object({
  count: Joi.number().integer().min(0).required()
});

const app = express();
app.use(express.json({
  verify : (req, res, buf, encoding) => {
    try {
      JSON.parse(buf);
    } catch(e) {
      res.status(404).send('Invalid JSON');
      throw Error('invalid JSON');
    }
  }
  }));

var options = {
  key: fs.readFileSync('./certificates/key.pem','utf8').toString(),
  cert: fs.readFileSync('./certificates/server.crt','utf8').toString()
};
var httpsServer = https.createServer(options, app)
var httpServer = http.createServer(app)

// const server = app.listen(PORT, function () {
//   var host = server.address().address
//   var port = server.address().port
//   console.log("Example app listening at http://%s:%s", host, port)
//  })
httpsServer.listen(PORT)
httpServer.listen(HTTP_PORT)

console.log("Running on HTTPS PORT: " + PORT);
console.log("Running on HTTP PORT: " + HTTP_PORT);
const report = {
  count: count
}

app.get('/api/v1/count', function(req, res) {
  console.log("=======headers=========");
  console.log(JSON.stringify(req.headers));
  console.log("=======uri=========");
  console.log(url.parse(req.url));
  console.log("=======req.originalUrl=========");
  console.log(req.originalUrl);
  console.log("=========req==============");
  console.log(req.path);
  console.log("=======================");
  console.log(report)
  res.setHeader("Content-Type", "application/json")
  res.status(200).send(report)
})

function isValidMetrics(jsonString) {
}

// Receive the counts
app.post('/api/v1/count', function(req, res) {
  const validationResult = schema.validate(req.body);
  console.log("validationResult")
  console.log(validationResult)
  if ( validationResult.error ) {
    res.status(400).send("Invalid Payload")
    return
  }
  newCount = validationResult.value.count
  report.count = newCount
  console.log("Replacing old count: " + count + " with new count: " + newCount)
  res.sendStatus(201)
})


// setInterval(() => {
//   console.log("Running Calculation")
//   console.log(metricCache.keys())
//   if ( metricCache.keys().length == 0 ) return
//   let podCount = 0
//   const sum = metricCache.keys().reduce((total, nextKey) => {
//     if(!metricCache.get(nextKey)) return 0
//     console.log(metricCache.get(nextKey))
//     podCount ++
//     return total + metricCache.get(nextKey).sessionCount
//   }, 0)
//   console.log("Pod Count: " + podCount)
//   if (podCount == 0) return
//   const avg = sum / podCount;
//   report.podCount = podCount
//   report.avg = avg
//   console.log("Avg: " + avg )
// }, RUN_CALC_FREQ)
