const serve = require('./servemap.js');

const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const { read } = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(bodyParser.json())
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
  .then(()=>{return serve.readChunk(coordslist, ip)})
  .then((readchunks) => {
    console.log(`\x1b[2m\x1b[90m| READ | : (${Date.now()-current}ms) Querying chunks (${coordslist[0].x},${coordslist[0].y}) to (${coordslist[coordslist.length-1].x},${coordslist[coordslist.length-1].y}) for user ${ip} \x1b[0m`);
    // console.log(readchunks);
    res.json(readchunks);
  });
  
  
});

// app.post("/drawline", (req, res) => {
//   var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
//   let line = req.body;
//   // console.log(`recieved: ${JSON.stringify(line)}`);
//   let current = Date.now();


//   serve.writeLine(line, ip).then((result) => {
//     console.log(`\x1b[1m\x1b[32m# DRAW # : (${Date.now()-current}ms) Executed draw call for user ${ip}\x1b[0m`);
//     res.end();
//   });
// });

// app.post("/senddraws", (req, res) => {
//   var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
//   let lines = req.body;
//   // console.log(`recieved: ${JSON.stringify(line)}`);
//   let current = Date.now();

//   serve.writeLines(lines, ip).then((result) => {
//     console.log(`\x1b[1m\x1b[32m# DRAW # : (${Date.now()-current}ms) Drew ${lines.length} lines for  user ${ip}\x1b[0m`);
//     res.end();
//   });
// });

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  serve.connection.connect();
});


