export class Cell{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.estate = 0;
        this.neighbors = [];
    }
    initNeighbors(arr=[],x,y){
        let n = [];
        if(0<y && y<arr.length-1){
            n.push(arr[y+1][x]);
            n.push(arr[y-1][x]);
        }else if(y == 0){
            n.push(arr[y+1][x]);
        }else{
            n.push(arr[y-1][x]);
        }
        if(0<x && x<arr[0].length-1){
            n.push(arr[y][x+1]);
            n.push(arr[y][x-1]);
        }else if(x == 0){
            n.push(arr[y][x+1]);
        }else{
            n.push(arr[y][x-1]);
        }
        return n;
    }
    choseNeighbor(arr,path){
        let numOfN = this.neighbors.length;
        if(numOfN>0){
            let n = Math.floor(Math.random()*numOfN)
            if(this.neighbors[n].estate == 0){
                path.push(this.neighbors[n]);
                this.neighbors[n].estate = 1
                let neighbor = this.neighbors[n];
                
                this.neighbors.splice(n,1);
                return neighbor;
            }else{
                this.neighbors.splice(n,1);
                return path.pop();
            }            
        }else return path.pop();
    }

}