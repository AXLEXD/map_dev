const serve = require('./servemap.js');
const mapimage = require('./mapimage.js');

const path = require('path');
const express = require("express");
const fs = require('fs');
var cors = require('cors')


const PORT = process.env.PORT || 3001;

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
app.use(express.static(path.resolve(__dirname, '../client/build')));

// app.use(bodyParser.json());
app.use(express.raw());
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
// app.use(bodyParser.urlencoded({ extended: false }))

const corsOptions = {
  origin: 'http://example.com',
}
app.use(cors(corsOptions));



app.get("/test", cors(corsOptions), (req, res) => {
  console.log(req.header('Origin'));
  console.log("connection");
  res.json({message:"hi"});
})

app.post("/getchunks", cors(corsOptions), (req, res) => {
  console.log(req.header('Origin'));
  // doQueryCount();
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  let coordslist = req.body.coords;
  let linelist = req.body.lines;

  let current = Date.now();
  // console.log(req.body);

  serve.writeLines(linelist, ip).then((result)=>{
    
    // console.log(result);
    if (result) console.log(`\x1b[1;32m# DRAW # : (${Date.now()-current}ms) Drew ${linelist.length} lines for  user ${ip}\x1b[0m`);
  })
  .then(()=>{return serve.readChunk(coordslist, ip)})
  .then((readchunks) => {
    // console.log(req.accepts("octet-stream"));
    res.set('Content-Type', 'application/octet-stream');
    // console.log(readchunks);
    res.end(readchunks);
  }).catch((err)=>{
    console.log(err);
  });
});

app.post("/getimage", cors(corsOptions), (req, res) => {
  // doQueryCount();
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  let coordsobj = req.body;

  let current = Date.now();

  mapimage.MakeImage(coordsobj.x1, coordsobj.y1, coordsobj.x2, coordsobj.y2, serve.readChunk).then((stream)=>{
    console.log(`\x1b[1m\x1b[7m$ DPNG $ : (${Date.now()-current}ms) Uploaded PNG image of chunks ${coordsobj.x1},${coordsobj.y1} to ${coordsobj.x2},${coordsobj.y2} for user ${ip}\x1b[0m`)
    let filename = `(${coordsobj.x1},${coordsobj.y1})-(${coordsobj.x2},${coordsobj.y2})_${new Date().toTimeString().split(" ")[0].replace(":","_")}.png`;
    res.set('Content-disposition', `attachment; filename="${filename}"`);
    stream.pipe(res);
  }).catch((err)=>{
    console.log(err);
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


serve.pool.on('error', (err) => {
    console.log("Caught server error: ");
    console.log(err.stack);
});
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

