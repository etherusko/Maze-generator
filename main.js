import { Cell } from "./Cell.js";
import { Labyrinth } from "./Labyrinth.js";
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d',{alpha:false});
const colums = 40;
const rows = 25;
const blockSize = 15;
const cw = colums*blockSize //canvas width
const ch = rows*blockSize //canvas height
canvas.width = cw;
canvas.height = ch;
const laberinto = new Labyrinth(rows,colums);
const labyrinthRows = laberinto.cellsArray;

let path = []
let pointer = new Cell();
pointer = labyrinthRows[0][0];
path.push(pointer);
loop();
//createLabyrinthFast();

function loop(){
    //ctx.clearRect(0,0,cw,ch);
    (path.length>0) ? createLabyrinth('draw') : console.log("laberinto terminado");
    requestAnimationFrame(loop);
}
function createLabyrinth(d=''){
    pointer.estate = 1; 
    pointer = pointer.choseNeighbor(path);
    if(d === 'draw') drawCells();
}
function drawCells(){ //Draw Active Cells
    labyrinthRows.forEach(row =>{row.forEach(cell =>{
        let minMaX = cell.minMax('x');
        let minMaY = cell.minMax('y');
        if(cell.estate == 1){
            ctx.fillStyle = "green"
            ctx.fillRect(5+minMaX[0]*15, 5+minMaY[0]*15,5+(minMaX[1]-minMaX[0])*15,5+(minMaY[1]-minMaY[0])*15);
            ctx.fillStyle = 'orange'
            ctx.fillRect(5+cell.x*15, 5+cell.y*15,5,5);
        }
    })})
}
function createLabyrinthFast(){
    while(path.length>0) createLabyrinth();
    drawCells();
}