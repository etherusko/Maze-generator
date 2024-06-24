import { Cell } from "./Cell.js";
import { Labyrinth } from "./Labyrinth.js";
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d',{alpha:false});
const colums = 40;
const rows = 25;
const blockSize = 32;
const cw = colums*blockSize //canvas width
const ch = rows*blockSize //canvas height
canvas.width = cw;
canvas.height = ch;
const laberinto = new Labyrinth(rows,colums);
const labyrinthRows = laberinto.cellsArray;
let imgArray = [];
let sides = new Image();
sides.src = '../Asets/4sides.png' // Reemplaza con la ruta de tu imagen
imgArray.push(sides);

let path = []
//let pointer = new Cell();
let pointer = labyrinthRows[0][0];
path.push(pointer);
loop();

//createLabyrinthFast();

function loop(){
    //ctx.clearRect(0,0,cw,ch);
    (path.length>0) ? createLabyrinth('draw') : console.log("laberinto terminado");
    drawCells();
    requestAnimationFrame(loop);
}
function createLabyrinth(d=''){
    pointer.estate = 1; 
    pointer = pointer.choseNeighbor(path);
    if(d === 'draw') drawCells();
}
function drawCells(){ //Draw Active Cells
    labyrinthRows.forEach(row =>{row.forEach(cell =>{
        if(cell.estate == 1){
            ctx.fillStyle = "green"
            // ctx.fillRect(5+minMaX[0]*15, 5+minMaY[0]*15,5+(minMaX[1]-minMaX[0])*15,5+(minMaY[1]-minMaY[0])*15);
            if(cell.neighbors.connections['up']) ctx.fillRect(11+cell.x*32,11+(cell.y)*32,10,40);
            if(cell.neighbors.connections['down']) ctx.fillRect(11+cell.x*32,11+(cell.y-1)*32,10,40);
            if(cell.neighbors.connections['rigth']) ctx.fillRect(11+(cell.x)*32,11+cell.y*32,40,10);
            if(cell.neighbors.connections['left']) ctx.fillRect(11+(cell.x-1)*32,11+cell.y*32,40,10);
            ctx.fillStyle = 'orange'
            ctx.fillRect(9+cell.x*32,9+cell.y*32,14,14);
            //ctx.fillRect(12+cell.x*32,12+cell.y*32,8,8);
            let sides = 0;
            sides = makeArrayParamDirections(cell);
            if(sides > 0) ctx.drawImage(imgArray[0],cell.x*32,cell.y*32);
        }
    })})
}
function createLabyrinthFast(){
    while(path.length>0){createLabyrinth()}
    drawCells();
    sides.onload = ()=>{
        labyrinthRows.forEach(row => row.forEach(cell =>{
            ctx.drawImage(sides,cell.x*32,cell.y*32);
        }));
    }
}
function makeArrayParamDirections(cell){
    let arr = [];
    let output = cell.neighbors.connections;
    let sides = 0
    let keys = ['up','down','rigth','left']
    keys.forEach(key =>{
        arr.push(output[key]*1); 
        sides+=output[key]*1;
    })
    return sides;
}