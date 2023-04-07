
const common = require('./common.js');

const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 10,
    host: '127.0.0.1',
    user: 'nodeserver',
    password: 'nodeserver',
    database: 'new_db'
});

pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
});
pool.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId);
});

const tablename = 'chunks';
const coords_col  = 'coord';
const chunkdata_col  = 'chunkdata';
const userip_col  = 'userip';


const chunksize = 16;
const cellsize = 8;

const MAX_LINES = 200;
const MAX_READ_CHUNKS = 1000;



function executeQuery(query,callback) {
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          throw err;
        }   
        connection.query(query,function(err,rows){
            connection.release();
            if(!err) {
                callback(null, rows);
            }
        });
        connection.on('error', function(err) {
            connection.release();
            console.log(err);
            return;     
        });
    });
}

function convert(oldconnection) {

    function getColorAsHex(colorchar) {
        console.log(colorchar);
        let finalstring;
        switch (colorchar) {
            case "0":
                finalstring = ["ff","ff","ff"]
                break;
            case "1":
                finalstring = ["d1","e7","dc"]
                break;
            case "2":
                finalstring = ["c4","d4","e1"]
                break;
            case "3":
                finalstring = ["bc","b5","d3"]
                break;
            case "4":
                finalstring = ["f5","db","e2"]
                break;
            case "5":
                finalstring = ["ee","b6","c9"]
                break;
            case "6":
                finalstring = ["c4","9a","bf"]
                break;
            case "7":
                finalstring = ["ba","da","55"]
                break;
            case "8":
                finalstring = ["ff","d7","00"]
                break;
            case "9":
                finalstring = ["f4","7b","79"]
                break;
            case "a":
                finalstring = ["c6","e2","d4"]
                break;
            case "b":
                finalstring = ["b6","d3","c2"]
                break;
            case "c":
                finalstring = ["e0","b1","cb"]
                break;
            case "d":
                finalstring = ["d0","a7","b7"]
                break;
            case "e":
                finalstring = ["f3","d1","d3"]
                break;
            case "f":
                finalstring = ["e9","b8","c8"]
                break;
            
            default:
                throw "fuck";
        }
    
        // return parseInt(finalstring, 16);
        return finalstring.reverse().join('')+"00";
    };
   let currenttime = Date.now();


    const SQLQuery1 = `SELECT * FROM ${tablename}`;

    let initrows =  new Promise(function(resolve, reject) {
        oldconnection.query(SQLQuery1, (err, rows, fields) => {
            if (err) throw err;

            resolve(rows);
        });
    });

    oldconnection.end();
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'nodeserver',
        password: 'nodeserver',
        database: 'new_db'
    });
    connection.connect();


    initrows.then((firstrows)=>{
        const values = (() => {
            let concatenatedString = '';
            for (let i = 0; i < firstrows.length; i++) {
                let newdatastring = "";
                for (let k=0;k<256;k++) {
                    newdatastring += getColorAsHex(firstrows[i].chunkdata[k]);
                }

                concatenatedString += ` (\"${firstrows[i].coord}\", \"${firstrows[i].userip}\", x\'${newdatastring}\')${(i===firstrows.length-1) ? ";" : ","}`;
            }
            return concatenatedString;
        })();
        const SQLQuery2 = `REPLACE INTO ${tablename} (${coords_col}, ${userip_col}, ${chunkdata_col}) VALUES ` + values;
        connection.query(SQLQuery2, (err, rows, fields) => {
            if (err) throw err;

        });
        console.log(`done in ${Date.now()-currenttime}ms`);
    });

}


function readChunk(coordslist, ip) {

    if (coordslist.length >= MAX_READ_CHUNKS) return new Promise(function(resolve, reject) {resolve(new Buffer.alloc(0))});

    let start  = Date.now();
    const generalscondition = (() => {let concatenatedString = ''; for (let i = 0; i < coordslist.length; i++) {concatenatedString += `${(i===0) ? `` : ` OR`} ${coords_col} = \"${mysql.escape(coordslist[i].x)},${mysql.escape(coordslist[i].y)}\"`;} return concatenatedString;})();
    const SQLQuery2 = `SELECT * FROM ${tablename} WHERE` + generalscondition;

    return new Promise(function(resolve, reject) {
        executeQuery(SQLQuery2, (err, rows) => {
            if (err) console.log(err);
            let querytime = Date.now();

            // make buffer
            const chunklength = (chunksize*chunksize);

            let chunkbuffer = new Buffer.alloc(4*chunklength*coordslist.length);
            let chunksview = new Uint32Array(chunkbuffer.buffer);

            let chunkbufferoffset = 0;

            rowdict = {};
            rows.forEach(item=>{
                rowdict[item.coord] = item.chunkdata;
            });

            // console.log(rowdict);
            coordslist.forEach(item=>{
                let coord = `${item.x},${item.y}`;
                let currentrow = rowdict[coord];

                if (typeof currentrow !== 'undefined') {
                    let current32 = new Uint32Array(currentrow.buffer, currentrow.byteOffset, currentrow.byteLength / Uint32Array.BYTES_PER_ELEMENT);
                    // console.log(current32); 
                    for (let i=0;i<chunklength;i++) {
                        chunksview[chunkbufferoffset+i] = (current32[i] | 0xFF000000);
                    }
                } else {
                    for (let i=0;i<chunklength;i++) {
                        chunksview[chunkbufferoffset+i] = (16777215) | 0xFF000000; // white
                    }
                    // console.log("empty chunk", item);
                }
                chunkbufferoffset+=chunklength;
            });

            if (typeof ip !== 'undefined') console.log(`\x1b[2m\x1b[90m| READ | : q:${querytime-start}ms p:${Date.now()-querytime}ms Querying chunks (${coordslist[0].x},${coordslist[0].y}) to (${coordslist[coordslist.length-1].x},${coordslist[coordslist.length-1].y}) for user ${ip} \x1b[0m`);
            resolve(chunkbuffer);
        });
    });
}


function writeLines(lines, userip) {
    
    if (lines.length === 0 || lines.length >= MAX_LINES) return new Promise(function(resolve, reject) {resolve(false)});

    let modchunks = {};

    let pixels = [];

    let findchunk = (x,y, offset,blockid)=> {
        x = (x-offset.x);
        y = (y-offset.y);

        const cell_i = Math.floor((x/chunksize));
        const cell_k = x - (cell_i)*chunksize;

        const cell_j = Math.floor((y/chunksize));
        const cell_l = y - (cell_j)*chunksize;

        let chunkindex = `${cell_i},${cell_j}`;
        if (modchunks[chunkindex] === undefined) {
            let tempbuff = new Buffer.alloc(4*(chunksize*chunksize));
            let tempview = new Uint32Array(tempbuff.buffer, tempbuff.byteOffset, tempbuff.byteLength / Uint32Array.BYTES_PER_ELEMENT).fill(16777215);
            modchunks[chunkindex] = {coord:`${cell_i},${cell_j}`,chunkdata:tempbuff}; // chunkdata is filled after first query
        }
        pixels.push({i:cell_i,j:cell_j,k:cell_k,l:cell_l,blockid:mysql.escape(blockid)});
    }

    let addpixel = (pixel) => {

        let chunkindex = `${pixel.i},${pixel.j}`;
        // console.log(chunkindex);

        let pixelindex = pixel.k*chunksize+pixel.l;

        let currentchunk = modchunks[chunkindex].chunkdata;
        let chunkdataview = new Uint32Array(currentchunk.buffer, currentchunk.byteOffset, currentchunk.byteLength / Uint32Array.BYTES_PER_ELEMENT);

        // console.log(chunkdataview[pixelindex]);
        chunkdataview[pixelindex] = pixel.blockid;
        // console.log(chunkdataview[pixelindex]);
        // console.log(`pixel drawn at (${chunkindex}) (${pixel.k},${pixel.l})`);
    }

    lines.forEach(line=>{
        common.plotLine(line.p1,line.p2,line.offset, (x,y)=>{findchunk(x,y, line.offset, line.blockid)});
    });

    // console.log(modchunks);

    // (\"${x},${y}\", \"${userip}\", \"${chunkdatastring}\")
    let modchunksvalues = Object.values(modchunks);

    const conditions = (() => {
        let concatenatedString = ''; 
        for (let i = 0; i < modchunksvalues.length; i++) {
            concatenatedString += `${(i===0) ? `` : ` OR`} ${coords_col} = \"${mysql.escape(modchunksvalues[i].coord)}\"`;
        } return concatenatedString;
    })();
    const SQLQuery1 = `SELECT * FROM ${tablename} WHERE` + conditions;


    // console.log(SQLQuery1);

    let getChunksQuery = new Promise(function(resolve, reject) {
        executeQuery(SQLQuery1, (err, rows) => {
            if (err) console.log(err);
            // console.log(rows);
            rows.forEach(item => {
                let chunkindex = item.coord;
                modchunks[chunkindex].chunkdata = item.chunkdata;
            });

            pixels.forEach(item => {addpixel(item)}); //applies changes for every pixel

            let modchunksvalues = Object.values(modchunks);

            const values = (() => {
                let concatenatedString = '';
                for (let i = 0; i < modchunksvalues.length; i++) {
                    concatenatedString += ` (\"${mysql.escape(modchunksvalues[i].coord)}\", \"${mysql.escape(userip)}\", x\'${mysql.escape(modchunksvalues[i].chunkdata.toString('hex'))}\')${(i===modchunksvalues.length-1) ? ";" : ","}`;
                }
                return concatenatedString;
            })();
            const SQLQuery2 = `REPLACE INTO ${tablename} (${coords_col}, ${userip_col}, ${chunkdata_col}) VALUES ` + values;

            resolve(SQLQuery2);
        });
    });
    
    
    return getChunksQuery.then((SQLQuery2)=> {
        // console.log(SQLQuery2);
        executeQuery(SQLQuery2, (err, rows) => {
            if (err) console.log(err);
        });
        return true;
    });
}





module.exports =  {readChunk, writeLines, pool};