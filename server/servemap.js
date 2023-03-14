
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
    
    // connection.query(SQLQuery, (err, rows, fields) => {
    //     if (err) throw err;
    //     console.log(rows);
    //     console.log(rows.changedRows ? `New chunk added at ${x},${y}` : `Chunk already exist at ${x},${y}`);
    // });
    return new Promise(function(resolve, reject) {
        connection.query(SQLQuery2, (err, rows, fields) => {
            if (err) throw err;
            // chunkdata = rows[0] ? rows[0].chunkdata : `0`;
            // if (parseInt(chunkdata) === 0) chunkdata = `0`;
            // console.log(`Coordinates (${x},${y}) have chunkdata of ${chunkdata}`);
            // console.log(rows);
            let result = [];
            rows.forEach(item => {
                if (parseInt(item.chunkdata) !== 0) {
                    let chunkdata = item.chunkdata;
                    let coord = item.coord;
                    result.push({coord: coord, chunkdata: chunkdata});
                }
            }); 
            console.log(`Returning ${JSON.stringify(result)}`);

            resolve(result);
        });
    });
}







module.exports =  {readChunk, connection};