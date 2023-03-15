
const common = require('./common.js');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'nodeserver',
  password: 'nodeserver',
  database: 'map_db'
})

const tablename = 'chunks';
const coords_col  = 'coord';
const chunkdata_col  = 'chunkdata';
const userip_col  = 'userip';


// function testsql() {
//     connection.connect();
    
//     let equation = "70/5";
//     connection.query(`SELECT ${equation} AS solution`, (err, rows, fields) => {
//         if (err) throw err;

//         console.log('The solution is: ', rows[0].solution);
//     });

//     
// }
function readChunk(coordslist) {
    // const SQLQuery = `INSERT IGNORE INTO ${tablename} VALUES (\"${x},${y}\", \"${userip}\", \"${`0`.repeat(256)}\")`
    const generalscondition = (() => {let concatenatedString = ''; for (let i = 0; i < coordslist.length; i++) {concatenatedString += `${(i===0) ? `` : ` OR`} ${coords_col} = \"${coordslist[i].x},${coordslist[i].y}\"`;} return concatenatedString;})();
    const SQLQuery2 = `SELECT * FROM ${tablename} WHERE` + generalscondition;
    // const SQLQuery2 =  `SELECT * FROM ${tablename} WHERE ${coords_col} = \"${x},${y}\"`;

    return new Promise(function(resolve, reject) {
        connection.query(SQLQuery2, (err, rows, fields) => {
            if (err) throw err;
            let result = {};
            rows.forEach(item => {
                // if (parseInt(item.chunkdata) !== 0) {
                    let chunkdata = item.chunkdata;
                    let coord = item.coord;
                    chunkindex = coord;
                    result[coord] = {coord: coord, chunkdata: chunkdata};
                // }
            }); 
            console.log(`Returning ${JSON.stringify(result)}`);

            resolve(result);
        });
    });
}



function drawPixel(x,y, color, chunksize, modstring) {
    modstring[x*chunksize+y] = color;
    return modstring;
}



// TODO: not gonna be pulling data from database rn, need to do that later
function writeLine(line, userip) {
    // chunkdatastring = `0`.repeat(256);

    let modchunks = {};

    let pixels = [];

    let findchunk = (x,y)=> {
        x = (x-line.offset.x);
        y = (y-line.offset.y);

        const cell_i = Math.floor((x/line.chunksize));
        const cell_k = x - (cell_i)*line.chunksize;

        const cell_j = Math.floor((y/line.chunksize));
        const cell_l = y - (cell_j)*line.chunksize;

        let chunkindex = `${cell_i},${cell_j}`;
        if (modchunks[chunkindex] === undefined) {
            modchunks[chunkindex] = {x:cell_i,y:cell_j,chunkdata:Array(256).fill(0)};
        }
        pixels.push({i:cell_i,j:cell_j,k:cell_k,l:cell_l});
    }
    

    let addpixel = (pixel) => {
        // x = (x-line.offset.x);
        // y = (y-line.offset.y);

        // const cell_i = Math.floor((x/line.chunksize));
        // const cell_k = x - (cell_i)*line.chunksize;

        // const cell_j = Math.floor((y/line.chunksize));
        // const cell_l = y - (cell_j)*line.chunksize;


        let chunkindex = `${pixel.i},${pixel.j}`;
        console.log(chunkindex);

        let pixelindex = pixel.k*line.chunksize+pixel.l;

        modchunks[chunkindex].chunkdata[pixelindex] = line.blockid.toString();
    }

    common.plotLine(line.p1,line.p2,line.offset, findchunk);

    console.log(modchunks);
    console.log("EKDNEJNDJEJDNJENDKEJDN");
    // (\"${x},${y}\", \"${userip}\", \"${chunkdatastring}\")
    let modchunksvalues = Object.values(modchunks);

    const conditions = (() => {
        let concatenatedString = ''; 
        for (let i = 0; i < modchunksvalues.length; i++) {
            concatenatedString += `${(i===0) ? `` : ` OR`} ${coords_col} = \"${modchunksvalues[i].x},${modchunksvalues[i].y}\"`;
        } return concatenatedString;
    })();
    console.log(conditions);
    const SQLQuery1 = `SELECT * FROM ${tablename} WHERE` + conditions;


    let getChunksQuery = new Promise(function(resolve, reject) {
        connection.query(SQLQuery1, (err, rows, fields) => {
            if (err) throw err;
            console.log(rows);
            rows.forEach(item => {
                let chunkindex = item.coord;
                modchunks[chunkindex].chunkdata = item.chunkdata.split('');
            });

            pixels.forEach(item => {addpixel(item)}); //applies changes for every pixel

            let modchunksvalues = Object.values(modchunks);

            const values = (() => {
                let concatenatedString = '';
                for (let i = 0; i < modchunksvalues.length; i++) {
                    concatenatedString += ` (\"${modchunksvalues[i].x},${modchunksvalues[i].y}\", \"${userip}\", \"${modchunksvalues[i].chunkdata.join('')}\")${(i===modchunksvalues.length-1) ? ";" : ","}`;
                }
                return concatenatedString;
            })();
            const SQLQuery2 = `REPLACE INTO ${tablename} (${coords_col}, ${userip_col}, ${chunkdata_col}) VALUES ` + values;
        

            resolve(SQLQuery2);
        });
    });
    
    
    return getChunksQuery.then((SQLQuery2)=> {
        console.log(SQLQuery2);
        connection.query(SQLQuery2, (err, rows, fields) => {
            if (err) throw err;
            console.log("executed draw call");
            // console.log(`Returning ${JSON.stringify(result)}`);

            // resolve();
        });
    });
}







module.exports =  {readChunk, writeLine, connection};