import { Cell } from "./Cell.js";
import { Labyrinth } from "./Labyrinth.js";
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d',{alpha:false});
const colums = 40;
const rows = 18;
const blockSize = 15;
const cw = colums*blockSize //canvas width
const ch = rows*blockSize //canvas height
canvas.width = cw;
canvas.height = ch;

const laberinto = new Labyrinth(rows,colums);
const labyrinthRows = laberinto.cellsArray;

let path = []
let init = new Cell();
init = labyrinthRows[0][0];
init.estate = 1;
path.push(init);

let count = 0;
loop();

function loop(){
    init.estate = 1; 
    let next = init.choseNeighbor(labyrinthRows,path)

    let minX = Math.min(init.x,next.x);
    let minY = Math.min(init.y,next.y);
    let MaX = Math.max(init.x, next.x);
    let MaY = Math.max(init.y, next.y);
    ctx.fillStyle = "orange"
    ctx.fillRect(5+minX*15, 5+minY*15,5+(MaX-minX)*15,5+(MaY-minY)*15);
    
    init = next;

    drawCells();    
    requestAnimationFrame(loop);
}

function drawCells(){ //Draw Active Cells
    labyrinthRows.forEach((row,y) =>{ row.forEach((cell,x) =>{
        if(cell.estate != 0){
            ctx.fillStyle = "green"
            ctx.fillRect(5+x*15,5+y*15,5,5);
        }
    })})
}