import { Cell } from "./Cell.js";
export class Labyrinth{
    constructor(rows, cols){
        this.initLabyrinth(rows,cols);
    }
    #initCellsArray(rows,cols){
        let arr = [];
        for(let y = 0; y<rows; y++){
            arr[y] = [];
            for(let x = 0; x<cols; x++){
                arr[y].push(new Cell(x,y));
            }
        }
        return arr;
    }
    #initNeighbors(arr){
        arr.forEach(row => row.forEach(cell => {
            cell.initNeighbors(arr, cell.x, cell.y);
        }))
    }
    initLabyrinth(r,c){
        this.cellsArray = this.#initCellsArray(r,c);
        this.#initNeighbors(this.cellsArray);
    }
}