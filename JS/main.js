import { Labyrinth } from "./Labyrinth.js";
export const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d',{alpha:false});
const colums = 25;  
const rows = 15;
const blockSize = 32;
canvas.width = colums*blockSize //canvas width
canvas.height = rows*blockSize //canvas height
const laberinto = new Labyrinth(rows,colums);
let imgArray = loadImages();
let c = 0;
let path = []
let pointer = laberinto.cellsArray[0][0];
path.push(pointer);
loop();
//createLabyrinthFast();

function loop(){
    (path.length>0) ? createLabyrinth('draw') : console.log("laberinto terminado");
    requestAnimationFrame(loop);
}
function createLabyrinth(d=''){
    pointer.estate = 1;
    pointer = pointer.choseNeighbor(path);
    if(d === 'draw') drawCells();
}
function drawCells(){ //Draw Active Cells
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    laberinto.cellsArray.forEach(row =>{row.forEach(cell =>{
        let dir = cell.neighbors.connections;
        let connectionsOn = 0;
        Object.values(dir).forEach(bool => connectionsOn += bool);
        if(connectionsOn == 4){
            evalCondition(0,3,cell);
        }else if(connectionsOn == 3){
            if(!dir['up'])evalCondition(0,2,cell);
            else if(!dir['down']) evalCondition(2,2,cell);
            else if(!dir['left']) evalCondition(1,2,cell);
            else if(!dir['rigth']) evalCondition(3,2,cell);
        }else if(connectionsOn == 2){
            if(dir['up']*dir['down']) evalCondition(0,1,cell);
            else if(dir['down']*dir['rigth']) evalCondition(0,4,cell);
            else if(dir['rigth']*dir['left']) evalCondition(1,1,cell);
            else if(dir['rigth']*dir['up']) evalCondition(1,4,cell);
            else if(dir['left']*dir['up']) evalCondition(2,4,cell);
            else if(dir['left']*dir['down']) evalCondition(3,4,cell);
        }else if(connectionsOn == 1){
            if(dir['down']) evalCondition(0,0,cell);
            else if(dir['rigth']) evalCondition(1,0,cell);
            else if(dir['up']) evalCondition(2,0,cell);
            else if(dir['left']) evalCondition(3,0,cell);
        }
    })})
        ctx.fillStyle = 'rgba(240, 232, 240, 0.521)'
        ctx.fillRect(pointer.x*blockSize,pointer.y*blockSize,blockSize,blockSize);
}
function loadImages(){
    let imgArray = [];
    for(let i=0; i<4; i++){
        let img = new Image();
        img.src = `../Asets/${i+1}sides.png`;
        imgArray.push(img);
    }
    let img = new Image();
    img.src = `../Asets/2sides-a.png`;
    imgArray.push(img);
    return imgArray;
}
function evalCondition(rotation, imgIndex, cell){
    ctx.translate(cell.x*blockSize+blockSize/2,cell.y*blockSize+blockSize/2);
    ctx.rotate(90*rotation*Math.PI/180);
    ctx.drawImage(imgArray[imgIndex],-blockSize/2,-blockSize/2);
    ctx.resetTransform();
}
function createLabyrinthFast(){
    while(path.length>0){createLabyrinth()}
    imgArray[imgArray.length-1].onload = function(){
        drawCells();
    }
}
export function btnReset(){
    laberinto.initLabyrinth(rows,colums);
    path = [];
    pointer = laberinto.cellsArray[0][0];
    path.push(pointer);
    loop();

}
