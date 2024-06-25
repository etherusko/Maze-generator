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
let imgArray = loadImages();
let c = 0;
let path = []
let pointer = labyrinthRows[0][0];
path.push(pointer);
loop();
//createLabyrinthFast();
//proof();

function loop(){
    ctx.clearRect(0,0,cw,ch); 
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
        let dir = cell.neighbors.connections;
        let connectionsArray = Object.values(dir);
        let connectionsOn = 0;
        connectionsArray.forEach(bool =>{ if(bool) connectionsOn++;});
        if(connectionsOn == 4){
            ctx.drawImage(imgArray[3],cell.x*blockSize,cell.y*blockSize);
        }else if(connectionsOn == 3){
            if(!dir['up']){
                ctx.drawImage(imgArray[2],cell.x*blockSize,cell.y*blockSize);
            }else
            ctx.translate(cell.x*blockSize+blockSize/2,cell.y*blockSize+blockSize/2)
            if(!dir['down']) ctx.rotate(180*Math.PI/180);
            else if(!dir['left']) ctx.rotate(90*Math.PI/180);
            else if(!dir['rigth']) ctx.rotate(270*Math.PI/180);
            ctx.drawImage(imgArray[2],-blockSize/2,-blockSize/2);
            ctx.resetTransform();
        }else if(connectionsOn == 2){
            if(dir['up']*dir['down']) ctx.drawImage(imgArray[1],cell.x*blockSize,cell.y*blockSize);
            else if(dir['down']*dir['rigth']) ctx.drawImage(imgArray[4],cell.x*blockSize,cell.y*blockSize);
            else{
                ctx.translate(cell.x*blockSize+blockSize/2,cell.y*blockSize+blockSize/2)
                if(dir['rigth']*dir['left']){
                    ctx.rotate(90*Math.PI/180);
                    ctx.drawImage(imgArray[1],-blockSize/2,-blockSize/2);
                }else{
                    if(dir['rigth']*dir['up']) ctx.rotate(90*Math.PI/180);
                    else if(dir['left']*dir['up']) ctx.rotate(180*Math.PI/180);
                    else if(dir['left']*dir['down']) ctx.rotate(270*Math.PI/180);
                    ctx.drawImage(imgArray[4],-blockSize/2,-blockSize/2);
                }
                ctx.resetTransform();
            }
        }else if(connectionsOn == 1){
            if(dir['down'])ctx.drawImage(imgArray[0],cell.x*blockSize,cell.y*blockSize);
            else{
                ctx.translate(cell.x*blockSize+blockSize/2,cell.y*blockSize+blockSize/2)
            if(dir['rigth']) ctx.rotate(90*Math.PI/180);
            else if(dir['up']) ctx.rotate(180*Math.PI/180);
            else if(dir['left']) ctx.rotate(270*Math.PI/180);
            ctx.drawImage(imgArray[0],-blockSize/2,-blockSize/2);
            ctx.resetTransform();
            }
        }
    })})
}
function createLabyrinthFast(){
    while(path.length>0){createLabyrinth()}
    imgArray[imgArray.length-1].onload = function(){
        drawCells();
    }
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
function proof(){
    ctx.clearRect(0,0,cw*2,ch*2)
    let cont = 0;
    labyrinthRows.forEach(row => row.forEach(cell =>{
        ctx.translate(cell.x*blockSize+blockSize/2,cell.y*blockSize+blockSize/2);
        if(cont%2 == 0){
            ctx.rotate(-c*Math.PI/180);
            ctx.fillStyle = "blue";
            ctx.fillRect(-blockSize/2,-blockSize/2,blockSize-5,blockSize-5);
        }else{
            ctx.rotate(c*Math.PI/180);
            ctx.fillStyle = 'red';
            //ctx.fillRect(cell.x*blockSize,cell.y*blockSize,blockSize,blockSize);
            ctx.fillRect(-blockSize/2,-blockSize/2,blockSize-5,blockSize-5);
        }
        ctx.resetTransform();
        console.log(cont);
            cont++
    }))
    ctx.fillStyle = "blue";
    ctx.fillRect(200,200,200,200);
    ctx.fillStyle = "red";
    ctx.translate(510,300);
    ctx.rotate(c * Math.PI / 180);
    //ctx.fillRect(410,200,200,200);
    ctx.fillRect(-100,-100,200,200);
    ctx.resetTransform(); 
    c+=5;
    requestAnimationFrame(proof);
}