import { Cell } from "./Cell.js";
export class Labyrinth{
    constructor(rows, cols){
        this.cellsArray = this.#initCellsArray(rows,cols);
        this.#initNeighbors(this.cellsArray);
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
        arr.forEach((row,y) => row.forEach((cell,x) => {
            cell.initNeighbors(arr,x,y);
        }))
    }
}