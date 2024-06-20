import { Cell } from "./Cell.js";
export class Labyrinth{
    constructor(rows, cols){
        this.Rows = rows;
        this.Cols = cols
        this.cellsArray = this.#initCellsArray(cols,rows);
        this.#initNeighbors(this.cellsArray);
    }
    #initCellsArray(cols,rows){
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
        arr.forEach((row,y) => row.forEach((cell,x) => {
            cell.neighbors = cell.initNeighbors(arr,x,y);
        }));
    }
}