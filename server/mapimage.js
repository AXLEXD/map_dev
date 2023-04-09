const { createCanvas, loadImage } = require('canvas');
const serve = require('./servemap.js');
const fs = require('fs')


const CHUNKSIZE =  16;
const MAX_CHUNKS = 1000;

function MakeImage(cxstart, cystart, cxend, cyend, readChunk, map_ver) {
    let chunkdimn = {x:(cxend-cxstart),y:(cyend-cystart)};
    let pixeldimn = {x:chunkdimn.x*CHUNKSIZE,y:chunkdimn.y*CHUNKSIZE};
    
    const invalids = [
        chunkdimn.x >= MAX_CHUNKS,
        chunkdimn.y >= MAX_CHUNKS,
    ]
    // console.log(requirements);
    const invalid_input = Boolean(invalids.reduce((partialSum, a) => partialSum + a, 0));
    if (invalid_input) return new Promise(function(resolve, reject) {reject(`\x1b[1;ERROR in MakeImage: invalids:[${invalids}]\x1b[0m`)});

    const canvas = createCanvas(pixeldimn.x, pixeldimn.y);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, pixeldimn.x, pixeldimn.y);

    coords = [];
    for (let i=0;i<chunkdimn.x;i++) {
        for (let j=0;j<chunkdimn.y;j++) {
            let coordsobj = { x: cxstart+i, y: cystart+j };
            coords.push(coordsobj);
        }
    }
    return new Promise(function(resolve, reject) {
        readChunk(coords, null, map_ver).then((result) => {
        let bufferview = new Uint32Array(result.buffer, result.byteOffset, result.byteLength / Uint32Array.BYTES_PER_ELEMENT);
        // console.log(bufferview);
        for (let i=0;i<chunkdimn.x;i++) {
            for (let j=0;j<chunkdimn.y;j++) {
                for (let k=0;k<CHUNKSIZE;k++) {
                    for (let l=0;l<CHUNKSIZE;l++) {
                        let pixelcolor = bufferview[i*(chunkdimn.y)*(CHUNKSIZE*CHUNKSIZE)+j*(CHUNKSIZE*CHUNKSIZE)+k*CHUNKSIZE+l];
                        ctx.fillStyle = "#" + (pixelcolor & 0x00FFFFFF).toString(16).padStart(6, '0');
                        ctx.fillRect(i*CHUNKSIZE+k, j*CHUNKSIZE+l, 1, 1);
                    }
                }
            }
        }
        // const out = fs.createWriteStream(__dirname + '/test.png');
        const stream = canvas.createPNGStream();
        resolve(stream);
        // stream.pipe(out);
        // out.on('finish', () =>  console.log('The PNG file was created.'));
    })});

}




module.exports =  {MakeImage};