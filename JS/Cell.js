export class Cell{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.estate = 0;
        this.neighbors = {
            array : [],
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
    addConection(){
        if(this.x-this.next.x != 0){
            if(this.x > this.next.x){
                this.neighbors.connections['left'] = true;
                 this.next.neighbors.connections['rigth'] = true;
            }
            else{
                this.neighbors.connections['rigth'] = true;
                this.next.neighbors.connections['left'] = true;
            }

        }else{
            if(this.y > this.next.y){
                this.neighbors.connections['down'] = true;
                this.next.neighbors.connections['up'] = true;
            }else{
                this.neighbors.connections['up'] = true;
                this.next.neighbors.connections['down'] = true;
            }
        }
    }
}