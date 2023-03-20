
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


const chunksize = 16;
const cellsize = 8;


// function testsql() {
//     connection.connect();
    
//     let equation = "70/5";
//     connection.query(`SELECT ${equation} AS solution`, (err, rows, fields) => {
//         if (err) throw err;

//         console.log('The solution is: ', rows[0].solution);
//     });

//     
// }
function readChunk(coordslist, ip) {
    const generalscondition = (() => {let concatenatedString = ''; for (let i = 0; i < coordslist.length; i++) {concatenatedString += `${(i===0) ? `` : ` OR`} ${coords_col} = \"${coordslist[i].x},${coordslist[i].y}\"`;} return concatenatedString;})();
    const SQLQuery2 = `SELECT * FROM ${tablename} WHERE` + generalscondition;

    return new Promise(function(resolve, reject) {
        connection.query(SQLQuery2, (err, rows, fields) => {
            if (err) throw err;
            let result = {};
            rows.forEach(item => {
                if (item.chunkdata !== "0".repeat(256)) {
                    let chunkdata = item.chunkdata;
                    let coord = item.coord;
                    chunkindex = coord;
                    result[coord] = {coord: coord, chunkdata: chunkdata};
                }
            }); 
            resolve(result);
        });
    });
}



function drawPixels(pixels, ip) {

    let findchunk = (x,y)=> {
        // offset already applied

        const cell_i = Math.floor((x/chunksize));
        const cell_k = x - (cell_i)*chunksize;

        const cell_j = Math.floor((y/chunksize));
        const cell_l = y - (cell_j)*chunksize;

        let chunkindex = `${cell_i},${cell_j}`;
        if (modchunks[chunkindex] === undefined) {
            modchunks[chunkindex] = {x:cell_i,y:cell_j,chunkdata:Array(256).fill(0)};
        }
        return {i:cell_i,j:cell_j,k:cell_k,l:cell_l};
    }




    pixels.forEach(pixel=>{
        let valuesforpixel = findchunk(pixel.x,pixel.y);

        let pixelindex = pixel.k*chunksize+pixel.l;


        let writetoChunksQuery = new Promise(function(resolve, reject) {

            let coord = `\"${valuesforpixel.i},${valuesforpixel.j}\"`;
            const SQLQuery = `SELECT chunkdata FROM chunks WHERE ${coords_col}=${coord} as to_replace
            REPLACE INTO chunks (${coords_col}, ${userip_col}, ${chunkdata_col}) VALUES (${coord}, ${ip}, STUFF(to_replace, ${pixelindex+1}}, 1, \'${pixel.blockid}\'))
            `;

            connection.query(SQLQuery, (err, rows, fields) => {
                if (err) throw err;
                // console.log(rows);
    
                resolve();
            });
        });
    });
}



function writeLine(line, userip) {
    // chunkdatastring = `0`.repeat(256);

    let modchunks = {};

    let pixels = [];

    let findchunk = (x,y)=> {
        x = (x-line.offset.x);
        y = (y-line.offset.y);

        const cell_i = Math.floor((x/chunksize));
        const cell_k = x - (cell_i)*chunksize;

        const cell_j = Math.floor((y/chunksize));
        const cell_l = y - (cell_j)*chunksize;

        let chunkindex = `${cell_i},${cell_j}`;
        if (modchunks[chunkindex] === undefined) {
            modchunks[chunkindex] = {x:cell_i,y:cell_j,chunkdata:Array(256).fill(0)};
        }
        pixels.push({i:cell_i,j:cell_j,k:cell_k,l:cell_l});
    }

    let addpixel = (pixel) => {

        let chunkindex = `${pixel.i},${pixel.j}`;
        // console.log(chunkindex);

        let pixelindex = pixel.k*chunksize+pixel.l;

        modchunks[chunkindex].chunkdata[pixelindex] = line.blockid.toString();
    }

    common.plotLine(line.p1,line.p2,line.offset, findchunk);

    // console.log(modchunks);

    // (\"${x},${y}\", \"${userip}\", \"${chunkdatastring}\")
    let modchunksvalues = Object.values(modchunks);

    const conditions = (() => {
        let concatenatedString = ''; 
        for (let i = 0; i < modchunksvalues.length; i++) {
            concatenatedString += `${(i===0) ? `` : ` OR`} ${coords_col} = \"${modchunksvalues[i].x},${modchunksvalues[i].y}\"`;
        } return concatenatedString;
    })();
    const SQLQuery1 = `SELECT * FROM ${tablename} WHERE` + conditions;
    console.log(SQLQuery1);


    let getChunksQuery = new Promise(function(resolve, reject) {
        connection.query(SQLQuery1, (err, rows, fields) => {
            if (err) throw err;
            // console.log(rows);
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
        // console.log(SQLQuery2);
        connection.query(SQLQuery2, (err, rows, fields) => {
            if (err) throw err;
            // console.log(`Returning ${JSON.stringify(result)}`);

            // resolve();
        });
    });
}

function writeLines(lines, userip) {
    
    if (lines.length === 0) return new Promise(function(resolve, reject) {resolve(false)});

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
            modchunks[chunkindex] = {x:cell_i,y:cell_j,chunkdata:Array(256).fill("0")};
        }
        pixels.push({i:cell_i,j:cell_j,k:cell_k,l:cell_l,blockid:blockid});
    }

    let addpixel = (pixel) => {

        let chunkindex = `${pixel.i},${pixel.j}`;
        // console.log(chunkindex);

        let pixelindex = pixel.k*chunksize+pixel.l;

        modchunks[chunkindex].chunkdata[pixelindex] = pixel.blockid.toString();
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
            concatenatedString += `${(i===0) ? `` : ` OR`} ${coords_col} = \"${modchunksvalues[i].x},${modchunksvalues[i].y}\"`;
        } return concatenatedString;
    })();
    const SQLQuery1 = `SELECT * FROM ${tablename} WHERE` + conditions;


    // console.log(SQLQuery1);

    let getChunksQuery = new Promise(function(resolve, reject) {
        connection.query(SQLQuery1, (err, rows, fields) => {
            if (err) throw err;
            // console.log(rows);
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
        // console.log(SQLQuery2);
        let result = connection.query(SQLQuery2, (err, rows, fields) => {
            if (err) throw err;
            // console.log(`Returning ${JSON.stringify(result)}`);
        });
        return Boolean(result);
        
    });
}





module.exports =  {readChunk, writeLine, writeLines, connection};