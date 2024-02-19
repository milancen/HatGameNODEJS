const hat = '^';
const hole = 'O';
const fieldCharacter = '.';
const pathCharacter = '*';
const prompt = require('prompt-sync')(); 
const LEVO = -1;
const DESNO = 1;
const GORE = 2;
const DOLE = -2;

class Cell{
    constructor(index){
        this._index = index;
    }

    getIndex(){
        return this._index;
    }
}

class Field {
    constructor(rows, columns){
        this._rows = rows;
        this._columns = columns;
        this._field = [];
        this._characterPosX = 0;
        this._characterPosY = 0;


        this._field = [];
        let possibleCells = [];
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < columns; j++){
                this._field.push(fieldCharacter);
                possibleCells.push(new Cell(i * columns + j));
            }
        }


        this._field[0] = pathCharacter;
        possibleCells.splice(0, 1);


        let index = Math.floor(Math.random() * (possibleCells.length));
        let hatPosition = possibleCells[index].getIndex();
        this._field[hatPosition] = hat;
        possibleCells.splice(index, 1);


        for(let i = 0; i < Math.floor((rows * columns) / 10); i++){
            let index2 = Math.floor(Math.random() * (possibleCells.length));
            let holePosition = possibleCells[index2].getIndex();
            this._field[holePosition] = hole;
            possibleCells.splice(index2, 1);
        }
    }

    move(direction){
        switch(direction){
            case GORE:
                if(this._characterPosX - 1 >= 0){
                    if(this._field[(this._characterPosX - 1) * this._columns + this._characterPosY] == hole){
                        console.log("YOU LOST");
                        process.exit(1);
                    }else if(this._field[(this._characterPosX - 1) * this._columns + this._characterPosY] == hat){
                        console.log("YOU WON");
                        process.exit(1);
                    }
                    this._field[this._characterPosX * this._columns + this._characterPosY] = fieldCharacter;
                    this._characterPosX -= 1;

                }
                break;
            case DOLE:
                if(this._characterPosX + 1 < this._rows){
                    if(this._field[(this._characterPosX + 1) * this._columns + this._characterPosY] == hole){
                        console.log("YOU LOST");
                        process.exit(1);
                    }else if(this._field[(this._characterPosX + 1) * this._columns + this._characterPosY] == hat){
                        console.log("YOU WON");
                        process.exit(1);
                    }
                    this._field[this._characterPosX * this._columns + this._characterPosY] = fieldCharacter;
                    this._characterPosX += 1;
                }
                break;
            case LEVO:
                if(this._characterPosY + LEVO >= 0){
                    if(this._field[(this._characterPosX) * this._columns + this._characterPosY + LEVO] == hole){
                        console.log("YOU LOST");
                        process.exit(1);
                    }else if(this._field[(this._characterPosX) * this._columns + this._characterPosY + LEVO] == hat){
                        console.log("YOU WON");
                        process.exit(1);
                    }
                    this._field[this._characterPosX * this._columns + this._characterPosY] = fieldCharacter;
                    this._characterPosY += LEVO;
                }
                break;
            case DESNO:
                if(this._characterPosY + DESNO < this._columns){
                    if(this._field[(this._characterPosX) * this._columns + this._characterPosY + DESNO] == hole){
                        console.log("YOU LOST");
                        process.exit(1);
                    }else if(this._field[(this._characterPosX) * this._columns + this._characterPosY + DESNO] == hat){
                        console.log("YOU WON");
                        process.exit(1);
                    }
                    this._field[this._characterPosX * this._columns + this._characterPosY] = fieldCharacter;
                    this._characterPosY += DESNO;
                }
                break;
        }
    }


    drawField(){
        console.clear();
        for(let i = 0; i < this._rows; i++){
            for(let j = 0; j < this._columns; j++){
                if(i == this._characterPosX && j == this._characterPosY){
                    process.stdout.write(pathCharacter);
                }else{
                    process.stdout.write(this._field[i * this._columns + j]);
                }
            }
            process.stdout.write('\n');
        }
    }



    playGame(){
        while(true){
            //take input
            this.drawField();
            let input = prompt("");
            console.log(input);
            switch(input.toLowerCase()){
                case 'a':
                    this.move(LEVO);
                    //idi levo
                    break;
                case 'w':
                    this.move(GORE);
                    //gore
                    break;
                case 's':
                    this.move(DOLE);
                    break;
                case 'd':
                    this.move(DESNO);

                    break;
                case 'q':
                    process.exit(1);
                default:
                    console.log("Input a/w/s/d");
                    break;
            }

        }
    }
}


const field = new Field(15, 15);
field.playGame();