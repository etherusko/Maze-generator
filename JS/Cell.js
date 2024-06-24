export class Cell{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.estate = 0;
        this.neighbors = {
            array : [
                ['up',false],['down',false],['rigth',false],['left',false]
            ],
            connections : {
                'up': false,
                'down': false,
                'rigth': false,
                'left': false
            }
        }
        this.next = '';
    }
    initNeighbors(arr=[],x,y){
        if(y+1 < arr.length)    this.neighbors.array.push(arr[y+1][x]);
        if(y-1 >= 0)            this.neighbors.array.push(arr[y-1][x]);
        if(x+1<arr[0].length)   this.neighbors.array.push(arr[y][x+1]);
        if(x-1>=0)              this.neighbors.array.push(arr[y][x-1]);
    }
    choseNeighbor(path){
        let numOfN = this.neighbors.array.length;
        if(numOfN>0){
            let n = Math.floor(Math.random()*numOfN)
            if(this.neighbors.array[n].estate == 0){
                this.next = this.neighbors.array[n];
                path.push(this.next);
                this.neighbors.array.splice(n,1);
                this.addConection();
                return this.next;
            }else{
                this.neighbors.array.splice(n,1);
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
    addConection(){
        if(this.x-this.next.x != 0){
            (this.x > this.next.x) ? 
            this.neighbors.connections['left'] = true : 
            this.neighbors.connections['rigth'] = true;
        }else{
            (this.y > this.next.y) ? 
            this.neighbors.connections['down'] = true : 
            this.neighbors.connections['up'] = true;
        }
    }
}