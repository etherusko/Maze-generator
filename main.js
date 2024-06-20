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
    //ctx.clearRect(0,0,cw,ch);
    drawCells();    
    init.estate = 1; 
    let next = init.choseNeighbor(path);
    if(Cell.paint){
        init.next = next;
        ctx.fillStyle = "orange"
        ctx.fillRect(5+init.x*15,5+init.y*15,5,5);
    }
   // drawCells()
    init = next;
    requestAnimationFrame(loop);
}

function drawCells(){ //Draw Active Cells
    labyrinthRows.forEach((row,y) =>{ row.forEach((cell,x) =>{
        let minX = Math.min(cell.x,cell.next.x);
        let minY = Math.min(cell.y,cell.next.y);
        let MaX = Math.max(cell.x, cell.next.x);
        let MaY = Math.max(cell.y, cell.next.y);
        if(cell.estate == 1){
            ctx.fillStyle = "green"
            ctx.fillRect(5+minX*15, 5+minY*15,5+(MaX-minX)*15,5+(MaY-minY)*15);
        }
    })})
}