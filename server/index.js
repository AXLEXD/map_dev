const serve = require('./servemap.js');

const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// app.use(bodyParser.json());
app.use(express.raw());
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
// app.use(bodyParser.urlencoded({ extended: false }))

app.post("/getchunks", (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  let coordslist = req.body.coords;
  let linelist = req.body.lines;

  let current = Date.now();
  // console.log(req.body);

  serve.writeLines(linelist, ip).then((result)=>{
    if (result) console.log(`\x1b[1m\x1b[32m# DRAW # : (${Date.now()-current}ms) Drew ${linelist.length} lines for  user ${ip}\x1b[0m`);
  })
  .then(()=>{return serve.readChunk(coordslist)})
  .then((readchunks) => {
    console.log(`\x1b[2m\x1b[90m| READ | : (${Date.now()-current}ms) Querying chunks (${coordslist[0].x},${coordslist[0].y}) to (${coordslist[coordslist.length-1].x},${coordslist[coordslist.length-1].y}) for user ${ip} \x1b[0m`);
    // console.log(req.accepts("octet-stream"));
    res.set('Content-Type', 'application/octet-stream');
    // console.log(readchunks);
    res.end(readchunks);
  });
  
  
});

app.post("/test", (req, res) => {
  console.log(req.body);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  serve.connection.connect();
});

app.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Recieved error, NOT Exiting...");
  serve.connection.end();
  serve.connection.connect();
});

