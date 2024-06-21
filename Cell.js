export class Cell{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.estate = 0;
        this.neighbors = [];
        this.next = '';
    }
    initNeighbors(arr=[],x,y){
        let n = [];
        if(y+1 < arr.length) n.push(arr[y+1][x]);
        if(y-1 >= 0) n.push(arr[y-1][x]);
        if(x+1<arr[0].length) n.push(arr[y][x+1]);
        if(x-1>=0) n.push(arr[y][x-1]);
        this.neighbors = n;
    }
    choseNeighbor(path){
        let numOfN = this.neighbors.length;
        if(numOfN>0){
            let n = Math.floor(Math.random()*numOfN)
            if(this.neighbors[n].estate == 0){
                this.next = this.neighbors[n];
                path.push(this.next);
                this.neighbors.splice(n,1);
                return this.next;
            }else{
                this.neighbors.splice(n,1);
                return this.choseNeighbor(path);
            }            
        }
        return path.pop();
    }
    minMax(i){
        if(i=='x'){
            return [Math.min(this.x,this.next.x),Math.max(this.x,this.next.x)];
        }else{
            return [Math.min(this.y,this.next.y),Math.max(this.y,this.next.y)]
        }
    }
}