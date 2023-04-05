const serve = require('./servemap.js');
const mapimage = require('./mapimage.js');

const path = require('path');
const express = require("express");
const cors = require("cors");
const fs = require('fs');


const PORT = process.env.PORT || 2999;

const app = express();

let queriescount = 0;
const QUERIES_MAX = 10;

// Workaround to stop ECONNRESET fatal error
function doQueryCount() {
  queriescount++;
  if (queriescount>QUERIES_MAX) {
    console.log(`\x1b[1m\x1b[5m\x1b[33m& RESET & : Max Queries reached, resetting connection\x1b[0m`); 
    queriescount=0;
    // serve.connection.end();
    // serve.connection.connect();
  }
}

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, '../client/build')));

// app.use(bodyParser.json());
app.use(express.raw());
app.use(express.json({limit: '50mb'}));
app.use(cors());
// app.use(express.urlencoded({limit: '50mb'}));
// app.use(bodyParser.urlencoded({ extended: false }))


app.get("/test", (req, res) => {
  console.log("connection");
  res.json({message:"hi"});
})

app.post("/getchunks", (req, res) => {
  // doQueryCount();
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  let coordslist = req.body.coords;
  let linelist = req.body.lines;

  let current = Date.now();
  // console.log(req.body);

  serve.writeLines(linelist, ip).then((result)=>{
    if (result) console.log(`\x1b[1m\x1b[32m# DRAW # : (${Date.now()-current}ms) Drew ${linelist.length} lines for  user ${ip}\x1b[0m`);
  })
  .then(()=>{return serve.readChunk(coordslist, ip)})
  .then((readchunks) => {
    // console.log(req.accepts("octet-stream"));
    res.set('Content-Type', 'application/octet-stream');
    // console.log(readchunks);
    res.end(readchunks);
  });
});

app.post("/getimage", (req, res) => {
  // doQueryCount();
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  let coordsobj = req.body;

  let current = Date.now();

  mapimage.MakeImage(coordsobj.x1, coordsobj.y1, coordsobj.x2, coordsobj.y2, coordsobj.startpoint, serve.readChunk).then((stream)=>{
    console.log(`\x1b[1m\x1b[7m$ DPNG $ : (${Date.now()-current}ms) Uploaded PNG image of chunks ${coordsobj.x1},${coordsobj.y1} to ${coordsobj.x2},${coordsobj.y2} for user ${ip}\x1b[0m`)
    let filename = `(${coordsobj.x1},${coordsobj.y1})-(${coordsobj.x2},${coordsobj.y2})_${new Date().toTimeString().split(" ")[0].replace(":","_")}.png`;
    res.set('Content-disposition', `attachment; filename="${filename}"`);
    stream.pipe(res);
  });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT,() => {
  console.log(`Server listening on ${PORT}`);
  // serve.connection.connect();
});


// serve.connection.on('error', (err) => {
//     console.log("Caught server error: ");
//     console.log(err.stack);
// });
// app.on("error", (err) => {
//   console.log("Caught server error: ");
//   console.log(err.stack);
// });


// app.on('ECONNRESET', function (err) {
//   console.error(err.stack);
//   console.log("Recieved error, NOT Exiting...");
//   serve.connection.end();
//   serve.connection.connect();
// });

