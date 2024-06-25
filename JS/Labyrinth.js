import { Cell } from "./Cell.js";
export class Labyrinth{
    static imageObject = {
        img1 : {
            src: '../Asets/1sides.png',
            rules: [
                [['down'],['left','up','rigth']],
                [['rigth'],['down','left','up']],
                [['up'],['rigth','down','left']],
                [['left'],['up','rigth','down']],
            ]
        },
        img2 : {
            src: '../Asets/2sides.png',
            rules: [
                [['down','up'],['rigth','left']],
                [['rigth','left'],['down','up']],
                false,
                false
            ]
        }
    }
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
        arr.forEach(row => row.forEach(cell => {
            cell.initNeighbors(arr, cell.x, cell.y);
        }))
    }
}