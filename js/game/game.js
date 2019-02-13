import Map from './map.js';
import Sheep from '../models/sheep.js';
import Hay from '../models/hay.js';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.map = new Map(ctx);
    this.sheep = new Sheep(ctx);
    this.hay = new Hay(ctx);
    this.moveHistory = [[0,0]];

    this.setupGame = this.setupGame.bind(this);
    this.drawAll = this.drawAll.bind(this);
  }
 
  setupGame() {
    this.map.updateObjectLoc(0, 0, this.sheep);
    this.map.updateObjectLoc(2, 0, this.hay);
    this.drawStartingGame();
    console.log(this.map.grid);
  }

  drawStartingGame() {
    this.sheep.drawStartingSheep();
    this.hay.drawHay();
  }

  drawAll(pressedKey) {
    this.map.drawMap();
    this.sheep.drawMovingSheep(pressedKey);
    this.hay.drawHay();
    console.log(this.map.grid);
  }

  mapKey(e) {
    let ctx = this.ctx;
    let sheepLoc = this.map.whereSheep;
    
    const moves = {
      "119": [0, -90], //w
      "97": [-90, 0], //a
      "115": [0, 90], //s
      "100": [90, 0], //d
    };
    
    const pressedKey = e.keyCode;
    if (pressedKey === 119 || pressedKey === 97 || pressedKey === 115 || pressedKey === 100) {

      //updates the map grid sheep location
      if (pressedKey === 119) {
        this.map.updateSheepLoc(0, -1, this.sheep, this.moveHistory);
                
      } else if (pressedKey === 97) {
        this.map.updateSheepLoc(-1, 0, this.sheep, this.moveHistory);
                
      } else if (pressedKey === 115) {
        this.map.updateSheepLoc(0, 1, this.sheep, this.moveHistory);
                
      } else if (pressedKey === 100) {
        this.map.updateSheepLoc(1, 0, this.sheep, this.moveHistory);
                
      }
      
      this.moveHistory.push([this.map.whereSheep[0], this.map.whereSheep[1]]);
      console.log(this.moveHistory);

      this.sheep.moveSheep(
        moves[pressedKey][0],
        moves[pressedKey][1]
      );
    }

    if (this.map.whereSheep[0] === this.map.whereHay[0] && this.map.whereSheep[1] === this.map.whereHay[1]) {
      this.map.updateHayLoc(this.sheep, this.hay);
      this.sheep.increaseLength();
    }
    this.drawAll(pressedKey); //rerender effect
  }

  checkLiving() {
    //checks whether models are alive or dead. If dead, remove from game?
  }

}

export default Game;