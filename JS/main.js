import { Labyrinth } from "./Labyrinth.js";
export const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d',{alpha:false});
const colums = 25;  
const rows = 15;
const blockSize = 32;
canvas.width = colums*blockSize;
canvas.height = rows*blockSize;
const laberinto = new Labyrinth(rows,colums,blockSize,ctx);
let running = true;
let step = 0;
let vel = 1;
loop();

function loop(){
    step++;
    if(step%vel  == 0) (laberinto.path.length>0) ? createLabyrinth('draw') : running = false;
    if(running) requestAnimationFrame(loop);
}
function createLabyrinth(d=''){
    laberinto.pointer.estate = 1;
    laberinto.pointer.choseNeighbor(laberinto);
    if(d === 'draw' && Labyrinth.images) laberinto.drawCells();
}
function createLabyrinthFast(){
    running = false
    while(laberinto.path.length>0){createLabyrinth()}
    Labyrinth.images[Labyrinth.images.length-1].onload = function(){
        laberinto.drawCells();
    }
}
export function btnReset(steps){
    running = true;
    laberinto.cellsArray = laberinto.initLabyrinth(rows,colums);
    steps ? loop() : createLabyrinthFast();
    laberinto.drawCells();
}
export function changeVel(v){
    vel = v;
}