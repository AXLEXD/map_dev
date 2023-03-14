import './App.css';
import React, { createRef } from 'react';


const blocks = [
    {
        blockid: 0,
        blockname: '1',
        imagesrc: '#ffffff'
    },
    {
        blockid: 1,
        blockname: '2',
        imagesrc: '#d1e7dc'
    },
    {
        blockid: 2,
        blockname: '3',
        imagesrc: '#c4d4e1'
    },
    {
        blockid: 3,
        blockname: '4',
        imagesrc: '#bcb5d3'
    },
    {
        blockid: 4,
        blockname: '5',
        imagesrc: '#f5dbe2'
    },
    {
        blockid: 5,
        blockname: '6',
        imagesrc: '#eeb6c9'
    },
    {
        blockid: 6,
        blockname: '7',
        imagesrc: '#c49abf'
    },
    {
        blockid: 7,
        blockname: '8',
        imagesrc: '#bada55'
    },
    {
        blockid: 8,
        blockname: '9',
        imagesrc: '#ffd700'
    },
    {
        blockid: 9,
        blockname: '10',
        imagesrc: '#f47b79'
    }
];

function plotLineLow(x0, y0, x1, y1, drawFunc) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let yi = 1;
    if (dy < 0) {
        yi = -1;
        dy = -dy;
    }
    let D = (2 * dy) - dx;
    let y = y0;

    for (let x = x0;x<x1+1;x++) {
        drawFunc(x, y);
        if (D > 0) {
            y = y + yi;
            D = D + (2 * (dy - dx));
        } else {
            D = D + 2*dy;
        }
    }
}
function plotLineHigh(x0, y0, x1, y1, drawFunc) {
    let dx = x1 - x0;
    let dy = y1 - y0;
    let xi = 1;
    if (dx < 0) {
        xi = -1;
        dx = -dx;
    }
    let D = (2 * dx) - dy;
    let x = x0;

    for (let y = y0;y<y1+1;y++) {
        drawFunc(x, y);
        if (D > 0) {
            x = x + xi;
            D = D + (2 * (dx - dy));
        } else {
            D = D + 2*dx;
        }
    }
}

function plotLine(p1, p2, offset, drawFunc) {
    
    let x0 = p1.x+offset.x;
    let y0 = p1.y+offset.y;
    
    let x1 = p2.x+offset.x;
    let y1 = p2.y+offset.y;

    if (x0===x1 && y0===y1) drawFunc(x0,y0);


    if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
        if (x0 > x1) plotLineLow(x1, y1, x0, y0, drawFunc);
        else plotLineLow(x0, y0, x1, y1, drawFunc);
    }
    else {
        if (y0 > y1) plotLineHigh(x1, y1, x0, y0, drawFunc);
        else plotLineHigh(x0, y0, x1, y1, drawFunc);
    }
}


class Vector2D {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    transform(x,y) {
        this.x += x;
        this.y += y;
    }

    setTo(x,y) {
        this.x = x;
        this.y = y;
    }

    isEqualTo(othervector) {
        return (this.x===othervector.x && this.y===othervector.y);
    }

    positive() {
        return (this.x >= 0 && this.y >=0);
    }
}


class Map {
    constructor(w, h) {

        this.canvasdimensions = new Vector2D(w,h); // establishing at start means no resizing canvas element
        this.matrix = null;

        // this.cachedChunks = [];

        this.lastchunkrequesttime = null;
        

    }
    makeMatrix(dimn, start, chunksize, resolveGenerated) {

        let coords = [];

        let grid = Array(dimn.x);
        for (let i=0;i<dimn.x;i++) {
            grid[i] = Array(dimn.y);
            for (let j=0;j<dimn.x;j++) {
                let coordsobj = { x: start.x+i, y: start.y+j };
                coords.push(coordsobj);
    
                //if (!grid[i][j]) grid[i][j] = new Chunk(chunksize, i+startx, j+starty);
            }
        }
        // console.log(coords);
        fetch('/getchunks',{
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(coords)
        })
        .then((res) => res.json())
        .then((express_data) => {
            let chunklist = express_data;
            // console.log(chunklist);

            chunklist.forEach(chunkitem => {
                let coordstring = chunkitem.coord;

                let x = parseInt(coordstring.split(',')[0]);
                let y = parseInt(coordstring.split(',')[1]);
                // console.log(x,y);
                
                if (chunkitem.chunkdata !== '0') {
                    grid[x-start.x][y-start.y] = new Chunk(chunksize, x, y, chunkitem.chunkdata);
                    // console.log(grid[x][y]);
                }
            });

            
            // console.log(`new chunk made ${i},${j}`);
            // console.log(`${i},${j},${dimn.x},${dimn.y}`);
            resolveGenerated(start);
        });
        return grid;
    }

    generateChunks(offset, cellsize, scale, chunksize) {
        let numchunks = new Vector2D(0,0);
        let startpoint = new Vector2D(0,0);

        let map_grid = this;

        return new Promise(function(resolve, reject) {
            // console.log(`${cellsize},${scale},${chunksize}`)

            let chunkpixels = chunksize*cellsize*scale; // number of pixels in chunk width
            
            startpoint.x = Math.floor((-1*offset.x)/chunkpixels);
            startpoint.y = Math.floor((-1*offset.y)/chunkpixels);

            numchunks.x = Math.ceil(map_grid.canvasdimensions.x/chunkpixels)+1; // bit cheaty - should probs optimise
            numchunks.y = Math.ceil(map_grid.canvasdimensions.y/chunkpixels)+1;

            // console.log(`startpoint: (${startpoint.x},${startpoint.y})`);
            // console.log(`dimensions: (${numchunks.x},${numchunks.y})`);
            // if (this.matrix) {
            //     for (let i=0;i<this.matrix.length;i++) {
            //         for (let k=0;k<this.matrix[i].length;k++) {
            //             let current = this.matrix[i][k];

            //             let in_array = false;
            //             this.cachedChunks.forEach((element) => {
            //                 if (element.x===current.x && element.y===current.y) in_array = true;
            //             })
            //             if (current.modified && !in_array) this.cachedChunks.push(current);
            //         }
            //     }
            // }
            map_grid.matrix = map_grid.makeMatrix(numchunks, startpoint, chunksize, resolve);
        });

    }

    getChunkPosOffset(currentcell, chunksize, startpoint) {
        const cell_i = Math.floor((currentcell.x/chunksize))-startpoint.x;
        const cell_k = currentcell.x - (cell_i+startpoint.x)*chunksize;

        const cell_j = Math.floor((currentcell.y/chunksize))-startpoint.y;
        const cell_l = currentcell.y - (cell_j+startpoint.y)*chunksize;


        return {cell_i, cell_j, cell_k, cell_l};
    }
}

class Chunk {
    constructor (chunksize, x, y, chunkcells=[]) {
        //this.matrix = this.makeMatrix(chunksize, chunksize);
        this.x = x;
        this.y = y;
        
        if (chunkcells.length) {
            this.modified_cells = chunkcells;
        } else {
            this.modified_cells = `0`.repeat(chunksize*chunksize);
        }
        
    }

    addCell(x,y, id) {
        this.modified_cells[x*16+y] = id;
        this.modified = true;
    }
    
}


class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            block_selected: 1, 
            update_time: 0,
            tot_update_time: 0,
            num_updates: 1,
            express_data: null
        };

        this.changeBlock = (blockid) => {this.setState({block_selected: blockid})};
        this.getBlockSelected = () => {return this.state.block_selected};

        this.isSelected = (blockid) => {return (blockid===this.state.block_selected)};

        this.changeUpdateTime = (new_time) => {
            this.setState({
                update_time: new_time, 
                tot_update_time: this.state.tot_update_time+new_time, 
                num_updates: this.state.num_updates+1
            });
        }
    }

    componentDidMount() {
        document.body.style.overflow = "hidden"; // stops user from scrolling the page
        this.getData();
    }

    getData() {
        fetch("/api")
        .then((res) => res.json())
        .then((express_data) => this.setState({express_data: express_data.message}));
    }

    render() {
        return (
            <div className='App-wrapper'>
                <MapCanvas changeUpdateTime={this.changeUpdateTime} getBlockSelected={this.getBlockSelected}/>
                <Palette isSelected={this.isSelected} changeBlock={this.changeBlock}/>
                <div className='drawer primary'>
                <div style={{position: `absolute`,right:`0.8vw`}}>
                    ({this.state.update_time}ms, avg: {Math.round(this.state.tot_update_time/this.state.num_updates)}ms, {this.state.num_updates} updates)
                    <br/>{`Here is the express message: ${this.state.express_data}`}
                </div>
                <b>Instructions:</b><br/>This is a pixel art canvas with infinite area. Scroll to zoom in and out, right click to pan around, and use left click to draw on the canvas.
                <br/>Use the palette on the right to select your colour.
                <div style={{color: `#909090`}}>(!!!!) Be aware that there is no saving yet lol, also this is just a prototype so limited colours, no drawing tools etc.</div>
                </div>
            </div>
        )
    }
}

class MapCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.getBlockSelected = props.getBlockSelected;

        this.changeUpdateTime = props.changeUpdateTime;

        this.cellsize = 8;
        this.scale = 2;
        this.chunksize = 16;

        this.map_grid = null;
        this.canvasRef = createRef();
    
        this.mapoffset = new Vector2D(0,0);
        this.celloffset = new Vector2D(0,0);
        this.currentcell = new Vector2D(0,0);
        this.startpoint = new Vector2D(0,0);

        this.cursorcurrent = new Vector2D(0,0);
        this.lmousedown = false;
        this.rmousedown = false;

        this.canvas = null;
    }

    //Called after element's initialisation
    // componentDidUpdate() { this.updateCanvas() }
    componentDidMount() { 
        this.canvas = this.canvasRef.current;

        // this.resizeCanvas(this.canvas);
        const { width, height } = this.canvas.getBoundingClientRect();
        this.map_grid = new Map(width, height);

        this.updateCanvas();
    }

    getCursorPosition(event, canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const pos = new Vector2D(x,y);
        // console.log(`cursor at (${x.toFixed(1)},${y.toFixed(1)})`);
        return pos;
    }

    getCurrentCell() {
        let x = Math.floor((this.cursorcurrent.x-this.mapoffset.x)/(this.cellsize*this.scale));
        let y = Math.floor((this.cursorcurrent.y-this.mapoffset.y)/(this.cellsize*this.scale));
        const pos = new Vector2D(x,y);
        return pos;
    }

    moveMap(start, end) {
        let x = (end.x-start.x);
        let y = (end.y-start.y);
        this.mapoffset.transform(x,y);
        this.celloffset.setTo(Math.round(this.mapoffset.x),Math.round(this.mapoffset.y));
    }

    // maybe should be in the map class
    drawMap (canvas, startpoint) {

        const ctx = canvas.getContext('2d');
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        // ctx.fillStyle = "#fff7d8";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        let cellapparentsize = this.cellsize*this.scale;

        // finding location in terms of iterators of current cell
        let {cell_i, cell_j, cell_k, cell_l} = this.map_grid.getChunkPosOffset(this.currentcell, this.chunksize, startpoint);

        let blockid;
        let x;
        let y;

        let doFill = (i,j,k,l) => {

            x = ((i+startpoint.x)*this.chunksize+k)*(cellapparentsize)+this.mapoffset.x;
            y = ((j+startpoint.y)*this.chunksize+l)*(cellapparentsize)+this.mapoffset.y;

            ctx.fillRect(x, y, cellapparentsize, cellapparentsize);
        }

        // for map
        for (let i=0;i<this.map_grid.matrix.length;i++) {
            for (let j=0;j<this.map_grid.matrix[i].length;j++) {
                // for each chunk
                for (let c=0;c<(this.chunksize*this.chunksize);c++) {
                    let k = Math.floor(c/this.chunksize);
                    let l = c-(k*this.chunksize);

                    if (typeof this.map_grid.matrix[i][j] === 'undefined') continue;
                    blockid = this.map_grid.matrix[i][j].modified_cells[c];

                    if (blockid!==0){
                        ctx.fillStyle = blocks[blockid].imagesrc; // placeholder until get images
                        doFill(i,j,k,l,blockid);
                    }
                }
            }
        }
        ctx.fillStyle = blocks[this.getBlockSelected()].imagesrc+"8f"; // placeholder until get images
        doFill(cell_i,cell_j,cell_k,cell_l);
    }

    updateCanvas() {
        let start = Date.now(); // time testing

        this.resizeCanvas(this.canvas);
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.fillStyle = "#fff7d8";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        
        this.map_grid.generateChunks(this.mapoffset, this.cellsize, this.scale, this.chunksize)
        .then((startpoint)=>{
            this.startpoint = startpoint;
            this.drawMap(this.canvas, startpoint);

            // console.log(this.map_grid.matrix);
            let delta = Date.now()-start;
            this.changeUpdateTime(delta);
        });
        
        // requestAnimationFrame(() => {this.drawMap(this.canvas, startpoint);});
    }

    // stolen code lmao
    resizeCanvas(canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        
        if (canvas.width !== width || canvas.height !== height) {
          const { devicePixelRatio:ratio=1 } = window;
          const context = canvas.getContext('2d');
          canvas.width = width*ratio;
          canvas.height = height*ratio;
          context.scale(ratio, ratio);
          return true;
        }
    
        return false
    }

    drawCellAtMouse(x,y) {
        const currentpos = new Vector2D(x-this.celloffset.x,y-this.celloffset.y);
        let {cell_i, cell_j, cell_k, cell_l} = this.map_grid.getChunkPosOffset(currentpos, this.chunksize, this.startpoint);
        this.map_grid.matrix[cell_i][cell_j].addCell(cell_k, cell_l, this.getBlockSelected());
        // console.log(`cell drawn at chunk ${cell_i},${cell_j}`);
    }

    moveCursor(event) {
        let update = false;
        let newcursorcurrent = this.getCursorPosition(event, this.canvas);
        if (this.rmousedown) {
            this.moveMap(this.cursorcurrent, newcursorcurrent);
            update = true;
        }
        this.cursorcurrent = newcursorcurrent;
        let newcurrentcell = this.getCurrentCell();
        if (!this.currentcell.isEqualTo(newcurrentcell)) {
            if (this.lmousedown) {

                plotLine(this.currentcell, newcurrentcell, this.celloffset, (x,y)=>this.drawCellAtMouse(x,y));
            }
            this.currentcell = newcurrentcell;
            update = true;
        }
        
        return update;
    }

    render() {
        return (
            <div>
            <canvas 
                ref={this.canvasRef} 
                className='map-canvas primary'
                onContextMenu={(e) => {
                    e.preventDefault();
                    // this.rmousedown=true;
                }}
                onMouseDown={(e) => {
                    e.preventDefault();
                    if (e.button === 0) {
                        this.lmousedown=true;
                        plotLine(this.currentcell,this.currentcell,this.celloffset, (x,y)=>this.drawCellAtMouse(x,y));
                        this.updateCanvas();
                    }
                    else if (e.button === 2) {
                        this.rmousedown=true;
                    }
                }}
                onMouseUp={(e) => {
                    this.lmousedown=false;
                    this.rmousedown=false;
                    this.updateCanvas();
                }}
                onMouseMove={(e) => {
                    let update = false;

                    update = this.moveCursor(e);

                    // if (update) this.updateCanvas();
                }}
                onMouseLeave={(e) => {
                    // console.log("left canvas");
                    this.moveCursor(e);
                    this.lmousedown=false;
                    this.rmousedown=false;
                    this.currentcell.setTo(-1,-1);
                    this.updateCanvas();
                }}
                onWheel={(e) => {
                    e.preventDefault();
                    let newscale = this.scale + Math.round(e.deltaY)/100;
                    if (newscale>0.5) this.scale = newscale;
                    else this.scale = 0.5;
                    // console.log(this.scale);
                    // console.log(e.deltaY);
                    this.updateCanvas();
                    // if (this.scale < 1) console.table(this.map_grid.matrix);
                }}
            ></canvas>
            </div>
        )
    }
}

// needs to be fixed up - maybe add useEffect()
class Palette extends React.Component {
    constructor(props) {
        super(props);

        this.changeBlock = props.changeBlock;
    }

    render() {
        return (
            <div className='palette primary'>
                {
                    blocks.map(button => (
                        <div 
                            key={button.blockid} 
                            style={{backgroundColor: `${button.imagesrc}`}} 
                            className={`blockbutton` + (this.props.isSelected(button.blockid) ? "selected" : "")}
                            onClick={() => {this.changeBlock(button.blockid)}}
                            //onClick={() => {console.log(button.blockid)}}
                            ></div>
                    ))
                }
        </div>
        )
    }

}




function App() {
  return (
    <div className='App'>
        <AppWrapper/>
    </div>
  );
}

export default App;
