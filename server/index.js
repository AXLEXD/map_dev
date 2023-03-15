const serve = require('./servemap.js');

const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.get("/api", (req, res) => {
  // var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  res.json({ message: "Hello from server!" });
});

app.post("/getchunks", (req, res) => {
  let coordslist = req.body;
  console.log(`recieved: ${JSON.stringify(coordslist)}`);
  // console.log(`recieving request for chunk ${data.x}, ${data.y}`);

  serve.readChunk(coordslist).then((readchunks) => {
    res.json(readchunks);
  });
  
});

app.post("/drawline", (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  console.log(`hello`);
  let line = req.body;
  console.log(`recieved: ${JSON.stringify(line)}`);

  serve.writeLine(line, ip).then((result) => {
    res.json({message:"hello"});
  });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  serve.connection.connect();
});


