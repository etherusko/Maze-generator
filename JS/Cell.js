export class Cell{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.estate = 0;
        this.neighbors = {
            array : [],
            connections : 
            [
              false,  /*up*/
              false,  /*rigth*/
              false,  /*down*/
              false,  /*left*/
            ]
        }
    }
    initNeighbors(arr=[],x,y){
        if(y+1 < arr.length)    this.neighbors.array.push(arr[y+1][x]);
        if(y-1 >= 0)            this.neighbors.array.push(arr[y-1][x]);
        if(x+1<arr[0].length)   this.neighbors.array.push(arr[y][x+1]);
        if(x-1>=0)              this.neighbors.array.push(arr[y][x-1]);
    }
    choseNeighbor(laberinto){
        let numOfN = this.neighbors.array.length;
        if(numOfN>0){
            let n = Math.floor(Math.random()*numOfN)
            if(this.neighbors.array[n].estate == 0){
                laberinto.pointer = this.neighbors.array[n];
                laberinto.path.push(laberinto.pointer);
                this.neighbors.array.splice(n,1);
                this.addConection(laberinto.pointer);
            }else{
                this.neighbors.array.splice(n,1);
                this.choseNeighbor(laberinto);
            }            
        }else laberinto.pointer = laberinto.path.pop();
    }
    addConection(next){
        let n = (this.x !== next.x) ?  (this.x < next.x) ? 1 : 3
                                    :  (this.y < next.y) ? 0 : 2;
        this.neighbors.connections[n] = true;
        next.neighbors.connections[(n+2)%4] = true;
    }
}