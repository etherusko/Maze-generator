import { Cell } from "./Cell.js";
export class Labyrinth{
    static images = this.#loadImages();
    
    constructor(rows, cols, size, ctx){
        this.rows = rows;
        this.cols = cols;
        this.size = size;
        this.ctx = ctx;
        this.cellsArray = this.initLabyrinth(rows,cols);
    }

    static #loadImages(){
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
    initLabyrinth(rows,cols){
        let array = this.#initCellsArray(rows,cols);
        this.#initNeighbors(array);
        this.pointer = array[0][0];
        this.path = [this.pointer];
        return array;
    }
    #initCellsArray(rows,cols){
        let array = [];
        for(let y = 0; y<rows; y++){
            array[y] = [];
            for(let x = 0; x<cols; x++){
                array[y].push(new Cell(x,y));
            }
        }
        return array;
    }
    #initNeighbors(arr){
        arr.forEach(row => row.forEach(cell => {
            cell.initNeighbors(arr, cell.x, cell.y);
        }))
    }
    drawCells(){
        this.ctx.clearRect(0,0,this.cols*this.size,this.rows*this.size); 
        this.cellsArray.forEach(row =>{row.forEach(cell =>{
            let dir = cell.neighbors.connections;
            let connectionsOn = 0;
            dir.forEach(bool => connectionsOn += bool);
            if(connectionsOn == 4){
                evalCondition(0,3,cell);
            }else if(connectionsOn == 3){
                if(!dir[0]) this.evalCondition(0,2,cell);
                else if(!dir[2]) this.evalCondition(2,2,cell);
                else if(!dir[3]) this.evalCondition(1,2,cell);
                else if(!dir[1]) this.evalCondition(3,2,cell);
            }else if(connectionsOn == 2){
                if(dir[0]*dir[2]) this.evalCondition(0,1,cell);
                else if(dir[2]*dir[1]) this.evalCondition(0,4,cell);
                else if(dir[1]*dir[3]) this.evalCondition(1,1,cell);
                else if(dir[1]*dir[0]) this.evalCondition(1,4,cell);
                else if(dir[3]*dir[0]) this.evalCondition(2,4,cell);
                else if(dir[3]*dir[2]) this.evalCondition(3,4,cell);
            }else if(connectionsOn == 1){
                if(dir[2]) this.evalCondition(0,0,cell);
                else if(dir[1]) this.evalCondition(1,0,cell);
                else if(dir[0]) this.evalCondition(2,0,cell);
                else if(dir[3]) this.evalCondition(3,0,cell);
            }
        })})
            this.ctx.fillStyle = 'rgba(240, 232, 240, 0.521)'
            this.ctx.fillRect(this.pointer.x*this.size,this.pointer.y*this.size,this.size,this.size);
    }
    evalCondition(rotation, imgIndex, cell){
        this.ctx.translate(cell.x*this.size+this.size/2,cell.y*this.size+this.size/2);
        this.ctx.rotate(90*rotation*Math.PI/180);
        this.ctx.drawImage(Labyrinth.images[imgIndex],-this.size/2,-this.size/2);
        this.ctx.resetTransform();
    }
}