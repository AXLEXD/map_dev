import './App.css';
import React, { createRef } from 'react';


const CHUNKSIZE = 16;

const blocksold = [
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
  
const blocks = [
    {
        blockid: '0',
        blockname: '1',
        imagesrc: '#ffffff'
    },
    {
        blockid: '1',
        blockname: '2',
        imagesrc: '#d1e7dc'
    },
    {
        blockid: '2',
        blockname: '3',
        imagesrc: '#c4d4e1'
    },
    {
        blockid: '3',
        blockname: '4',
        imagesrc: '#bcb5d3'
    },
    {
        blockid: '4',
        blockname: '5',
        imagesrc: '#f5dbe2'
    },
    {
        blockid: '5',
        blockname: '6',
        imagesrc: '#eeb6c9'
    },
    {
        blockid: '6',
        blockname: '7',
        imagesrc: '#c49abf'
    },
    {
        blockid: '7',
        blockname: '8',
        imagesrc: '#bada55'
    },
    {
        blockid: '8',
        blockname: '9',
        imagesrc: '#ffd700'
    },
    {
        blockid: '9',
        blockname: '10',
        imagesrc: '#f47b79'
    },
    {
        blockid: 'a',
        blockname: '11',
        imagesrc: '#c6e2d4'
    },
    {
        blockid: 'b',
        blockname: '12',
        imagesrc: '#b6d3c2'
    },
    {
        blockid: 'c',
        blockname: '13',
        imagesrc: '#e0b1cb'
    },
    {
        blockid: 'd',
        blockname: '14',
        imagesrc: '#d0a7b7'
    },
    {
        blockid: 'e',
        blockname: '15',
        imagesrc: '#f3d1d3'
    },
    {
        blockid: 'f',
        blockname: '16',
        imagesrc: '#e9b8c8'
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
    notEqualTo(othervector) {
        return (this.x!==othervector.x || this.y!==othervector.y);
    }

    positive() {
        return (this.x >= 0 && this.y >=0);
    }

    multipliedby(number) {
        return new Vector2D(this.x*number,this.y*number);
    }
    transformedby(x,y) {
        return new Vector2D(this.x+x,this.y+y);
    }
}


class Map {
    constructor(w, h) {
        this.canvasdimensions = new Vector2D(w,h); // establishing at start means no resizing canvas element
        this.data = null;
        this.dataview = null;
        this.numchunks = null;
    }

    getValues(offset, scale) {
        let chunkpixels = CHUNKSIZE*scale;

        let numchunks = new Vector2D(0,0);
        let startpoint = new Vector2D(0,0);

        startpoint.x = (offset.x === 0) ? 0 : Math.floor((-1*offset.x)/chunkpixels);
        startpoint.y = (offset.y === 0) ? 0 : Math.floor((-1*offset.y)/chunkpixels);

        numchunks.x = Math.ceil(this.canvasdimensions.x/chunkpixels)+1; // bit cheaty - should probs optimise
        numchunks.y = Math.ceil(this.canvasdimensions.y/chunkpixels)+1;

        return {startpoint, numchunks};
    }

    setMatrix(dimn, start, lines) {

        let coords = [];
        let map_grid = this;

        for (let i=0;i<dimn.x;i++) {
            for (let j=0;j<dimn.y;j++) {
                let coordsobj = { x: start.x+i, y: start.y+j };
                coords.push(coordsobj);    
            }
        }
        return new Promise(function(resolve, reject) {
            fetch('/getchunks',{
                method: 'POST',
                headers: {'Accept': 'application/octet-stream', 'Content-Type': 'application/json'},
                body: JSON.stringify({coords:coords, lines:lines})
            }).then((data)=>{
                return data.arrayBuffer();
            }).then((chunkbuffer) => {
                // console.log([...new Uint8Array(chunkbuffer)].map(x => x.toString(16).padStart(2, '0')));
                map_grid.data = chunkbuffer;
                map_grid.dataview = new Uint32Array(map_grid.data);
                map_grid.numchunks = dimn;
                resolve();
            });
        });
    }

    getChunkPosOffset(currentcell, startpoint) {
        const cell_i = Math.floor((currentcell.x/CHUNKSIZE))-startpoint.x;
        const cell_k = currentcell.x - (cell_i+startpoint.x)*CHUNKSIZE;

        const cell_j = Math.floor((currentcell.y/CHUNKSIZE))-startpoint.y;
        const cell_l = currentcell.y - (cell_j+startpoint.y)*CHUNKSIZE;


        return {cell_i, cell_j, cell_k, cell_l};
    }

    addCell(index,colorhex) {
        this.dataview[index] = colorhex;
        // console.log(data[index], colorhex);
    }
}


class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tool_mode: 0,
            debug_mode: false,
            show_stats: true,
            color_selected: 255*255, 
            update: {
                time: 0,
                tot_time: 0,
                num_updates: 1
            },
            draw: {
                time: 0,
                tot_time: 0,
                num_updates: 1
            },
            cursorx: 0,
            cursory: 0,
            offsetx: 0,
            offsety: 0,
            chunkx: 0,
            chunky: 0,
        };

        this.getColorSelected = () => {return this.state.color_selected};
        this.getDebugMode = () => {return this.state.debug_mode};
        this.getToolMode = () => {return this.state.tool_mode};

        this.changeColor = (blockid) => {
            if (typeof blockid === 'string') {
                let out_num = parseInt(blockid.substring(1), 16);
                console.log(blockid.substring(1));
                console.log(out_num);
                this.setState({color_selected: out_num});
            }
            else if (typeof blockid === 'number') {
                this.setState({color_selected: blockid});
            }
        };
        this.isSelected = (blockid) => {
            if (typeof blockid === 'string') {
                let out_num = parseInt(blockid.substring(1), 16);
                return (out_num===this.state.color_selected);
            }
            else if (typeof blockid === 'number') {
                return (blockid===this.state.color_selected)
            }
        };

        this.changeUpdateTime = (new_time) => {
            this.setState({update:{
                time: new_time, 
                tot_time: this.state.update.tot_time+new_time, 
                num_updates: this.state.update.num_updates+1
            }});
        }
        this.changeDrawTime = (new_time) => {
            this.setState({draw:{
                time: new_time, 
                tot_time: this.state.draw.tot_time+new_time, 
                num_updates: this.state.draw.num_updates+1
            }});
        }
        this.changeCursorLoc = (vector) => {
            this.setState({cursorx: vector.x,cursory: vector.y});
        }
        this.changeOffsetLoc = (vector) => {
            this.setState({offsetx: vector.x,offsety: vector.y});
        }
        this.changeChunkLoc = (x,y) => {
            this.setState({chunkx: x,chunky: y});
        }
    }

    componentDidMount() {
        document.body.style.overflow = "hidden"; // stops user from scrolling the page
    }

    render() {
        return (
            <div className='App-wrapper'>
                <MapCanvas 
                    getToolMode={this.getToolMode}
                    getDebugMode={this.getDebugMode}
                    changeUpdateTime={this.changeUpdateTime}
                    changeDrawTime={this.changeDrawTime}
                    getColorSelected={this.getColorSelected}
                    changeCursorLoc={this.changeCursorLoc}
                    changeOffsetLoc={this.changeOffsetLoc}
                    changeChunkLoc={this.changeChunkLoc}
                />
                <Palette isSelected={this.isSelected} changeColor={this.changeColor}/>
                <div className='drawer primary'>
                {(this.state.show_stats)?(<div style={{position: `absolute`,right:`0.8vw`}}>
                    ({this.state.update.time}ms, avg: {Math.round(this.state.update.tot_time/this.state.update.num_updates)}ms, {this.state.update.num_updates} updates)
                    <br/>({this.state.draw.time}ms, avg: {Math.round(this.state.draw.tot_time/this.state.draw.num_updates)}ms, {this.state.draw.num_updates} draws)
                    <br/>Cursor: ({this.state.cursorx},{this.state.cursory})
                    <br/>Offset: ({this.state.offsetx},{this.state.offsety})
                    <br/>Chunk: ({this.state.chunkx},{this.state.chunky})
                </div>):null}
                <b>Instructions:</b><br/>This is a pixel art canvas with infinite area. Scroll to zoom in and out, right click to pan around, and use left click to draw on the canvas.
                <br/>Use the palette on the right to select your colour.
                <div style={{color: `#909090`}}>(!!!!) Be aware that there is no saving yet lol, also this is just a prototype so limited colours, no drawing tools etc.</div>
                <input type={"checkbox"} onChange={()=>{this.setState({debug_mode:!this.state.debug_mode})}}></input> Debug Mode&ensp;
                <input checked={this.state.show_stats} type={"checkbox"} onChange={()=>{this.setState({show_stats:!this.state.show_stats})}}></input> Stats
                </div>
            </div>
        )
    }
}

class MapCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.getDebugMode = props.getDebugMode;
        this.getColorSelected = props.getColorSelected;
        this.changeUpdateTime = props.changeUpdateTime;
        this.changeDrawTime = props.changeDrawTime;

        this.changeCursorLoc = props.changeCursorLoc;
        this.changeOffsetLoc = props.changeOffsetLoc;
        this.changeChunkLoc = props.changeChunkLoc;

        this.drawLines = [];

        this.scale = 16;
        this.tempscale = this.scale;

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
    componentDidMount() { 
        this.canvas = this.canvasRef.current;

        // this.resizeCanvas(this.canvas);
        const { width, height } = this.canvas.getBoundingClientRect();
        this.map_grid = new Map(width, height);

        setTimeout(this.updateCanvas(), 1000);
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
        let x = Math.floor((this.cursorcurrent.x-this.mapoffset.x*this.scale)/(this.scale));
        let y = Math.floor((this.cursorcurrent.y-this.mapoffset.y*this.scale)/(this.scale));
        const pos = new Vector2D(x,y);
        return pos;
    }

    moveMap(start, end) {
        let x = (end.x-start.x)/this.scale;
        let y = (end.y-start.y)/this.scale;
        this.mapoffset.transform(x,y);
        this.celloffset.setTo(Math.floor(this.mapoffset.x),Math.floor(this.mapoffset.y));
        this.changeOffsetLoc(this.celloffset);
    }

    drawMap (canvas, startpoint) {
        let start =  Date.now();

        this.resizeCanvas(canvas);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // finding location in terms of iterators of current cell
        let {cell_i, cell_j, cell_k, cell_l} = this.map_grid.getChunkPosOffset(this.currentcell, startpoint);

        let blockid;
        let x;
        let y;

        let mapoffset_x = Math.round(this.mapoffset.x);
        let mapoffset_y = Math.round(this.mapoffset.y);
        // let mapoffset_x = this.mapoffset.x;
        // let mapoffset_y = this.mapoffset.y;

        let doFill = (i,j,k,l) => {

            x = (((i+startpoint.x)*CHUNKSIZE+k)+mapoffset_x)*(this.scale);
            y = (((j+startpoint.y)*CHUNKSIZE+l)+mapoffset_y)*(this.scale);
            if (x%1!==0||y%1!==0||this.scale%1!==0) console.log("ALERT:", x, y, this.scale);
            ctx.fillRect(x, y, this.scale, this.scale);
            // console.log(x,y,cellapparentsize);
        }
        if (this.map_grid.data === null) return;
        // for map


        let chunkbufferoffset = 0;
        let data = new Uint32Array(this.map_grid.data);

        if (this.getDebugMode()) ctx.beginPath();
        for (let i=0;i<this.map_grid.numchunks.x;i++) {
            for (let j=0;j<this.map_grid.numchunks.y;j++) {
                // for each chunk
                if (this.getDebugMode()) {
                    x = (((i+startpoint.x)*CHUNKSIZE)+mapoffset_x)*(this.scale);
                    y = (((j+startpoint.y)*CHUNKSIZE)+mapoffset_y)*(this.scale);

                    ctx.fillStyle = "#000000";
                    ctx.lineWidth = 0.01*Math.floor(this.scale);
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, this.canvas.height/2);
                    // ctx.stroke();
                    ctx.moveTo(0, y);
                    ctx.lineTo(this.canvas.width/2, y);
                }
                for (let c=0;c<(CHUNKSIZE*CHUNKSIZE);c++) {
                    let k = Math.floor(c/CHUNKSIZE);
                    let l = c-(k*CHUNKSIZE);

                    // if (typeof this.map_grid.matrix[i][j] === 'undefined') continue;

                    blockid = data[chunkbufferoffset+c];
                    // if (c%100===0) console.log(blockid);

                    if (blockid!==16777215){
                        // ctx.fillStyle = blockid.toString(16);
                        ctx.fillStyle = "#" + (blockid & 0x00FFFFFF).toString(16).padStart(6, '0');
                        // if (c===0) console.log((blockid & 0x00FFFFFF).toString(16).padStart(6, '0'))
                        doFill(i,j,k,l,blockid);
                    }
                }
                chunkbufferoffset += (CHUNKSIZE*CHUNKSIZE);
            }
        }
        if (this.getDebugMode()) ctx.stroke();
        // ctx.fillStyle = "#" + this.getColorSelected() + "8f"; // placeholder until get images
        // console.log(this.getColorSelected());
        // console.log((this.getColorSelected() & 0x00FFFFFF).toString(16).padStart(6, '0'));
        ctx.fillStyle = "#"+(this.getColorSelected() & 0x00FFFFFF).toString(16).padStart(6, '0')+"ff";
        doFill(cell_i,cell_j,cell_k,cell_l);

        this.changeDrawTime(Date.now()-start);
    }

    updateCanvas() {
        let start = Date.now(); // time testing

        let {startpoint, numchunks} = this.map_grid.getValues(this.mapoffset.multipliedby(this.scale), this.scale);
        let linestosend = this.drawLines;
        this.drawLines = [];
        this.map_grid.setMatrix(numchunks, startpoint, linestosend)
        .then(()=>{
            this.drawMap(this.canvas, startpoint);
            this.startpoint = startpoint;
            this.changeUpdateTime(Date.now()-start);
        });

        setTimeout(()=>{this.updateCanvas()}, 1000);
    }

    // stolen code lmao
    resizeCanvas(canvas) {
        const { width, height } = canvas.getBoundingClientRect();
        
        if (canvas.width !== width || canvas.height !== height) {
          const { devicePixelRatio:ratio=1 } = window;
          const context = canvas.getContext('2d');
          canvas.width = Math.floor((1*width*ratio)/this.scale)*this.scale;
          canvas.height = Math.floor((1*height*ratio)/this.scale)*this.scale;
        //   console.log(canvas.width, canvas.height);
          context.scale(ratio, ratio);
          return true;
        }
    
        return false
    }

    drawCellAtMouse(x,y) {
        const currentpos = new Vector2D(x-this.celloffset.x,y-this.celloffset.y);

        let {cell_i, cell_j, cell_k, cell_l} = this.map_grid.getChunkPosOffset(currentpos, this.startpoint);
        let dataindex = cell_i*(this.map_grid.numchunks.y)*(CHUNKSIZE*CHUNKSIZE)+cell_j*(CHUNKSIZE*CHUNKSIZE)+cell_k*CHUNKSIZE+cell_l;
        if (dataindex < this.map_grid.data.byteLength/4) this.map_grid.addCell(dataindex, this.getColorSelected());
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
        // Drawing line and updating stats
        if (!this.currentcell.isEqualTo(newcurrentcell)) {
            if (this.lmousedown) this.drawLine(this.currentcell,newcurrentcell);
            this.currentcell = newcurrentcell;
            let {cell_i, cell_j, cell_k, cell_l} = this.map_grid.getChunkPosOffset(this.currentcell, this.startpoint);
            this.changeCursorLoc(this.currentcell);
            this.changeChunkLoc(cell_i+this.startpoint.x,cell_j+this.startpoint.y);
            update = true;
        }
        return update;
    }

    drawLine(p1,p2) {
        plotLine(p1, p2, this.celloffset, (x,y)=>this.drawCellAtMouse(x,y));
        this.drawLines.push({p1:p1,p2:p2,offset:this.celloffset,blockid:this.getColorSelected()});
    }

    render() {
        return (
            <div>
            <canvas 
                ref={this.canvasRef} 
                className='map-canvas primary'
                onContextMenu={(e) => {
                    e.preventDefault();
                }}
                onMouseDown={(e) => {
                    e.preventDefault();
                    if (e.button === 0) {
                        this.lmousedown=true;
                        this.drawLine(this.currentcell,this.currentcell);
                        this.drawMap(this.canvas, this.startpoint);
                    }
                    else if (e.button === 2) {
                        this.rmousedown=true;
                    }
                }}
                onMouseUp={(e) => {
                    this.lmousedown=false;
                    this.rmousedown=false;
                    this.drawMap(this.canvas, this.startpoint);
                }}
                onMouseMove={(e) => {
                    if (this.moveCursor(e)) this.drawMap(this.canvas, this.startpoint);
                }}
                onMouseLeave={(e) => {
                    this.moveCursor(e);
                    this.lmousedown=false;
                    this.rmousedown=false;
                    this.drawMap(this.canvas, this.startpoint);
                }}
                onWheel={(e) => {
                    e.preventDefault();
                    let newscale = this.tempscale - Math.round(e.deltaY)/1000;
                    console.log(this.scale, this.tempscale);
                    if (newscale>5) this.tempscale = newscale;
                    else this.tempscale = 5;
                    this.scale = Math.round(this.tempscale);
                    
                    this.drawMap(this.canvas, this.startpoint);
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

        this.changeColor = props.changeColor;

        this.handleChange = (e) => {
            this.changeColor(e.target.value);
        }
    }

    render() {
        return (
            <div className='palette primary'>
                {
                    blocks.map(button => (
                        <div 
                            key={button.blockid} 
                            style={{backgroundColor: `${button.imagesrc}`}} 
                            className={`blockbutton` + (this.props.isSelected(button.imagesrc) ? "selected" : "")}
                            onClick={() => {this.changeColor(button.imagesrc)}}
                            //onClick={() => {console.log(button.blockid)}}
                            ></div>
                    ))
                }
                <input type={"color"} onChange={this.handleChange}></input>
                {/* <input type={"submit"} value={"Apply"}></input> */}
        </div>
        )
    }

}




function App() {
  return (
    <AppWrapper/>
  );
}

export default App;
