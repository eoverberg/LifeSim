class Global {
    constructor() {
        this.intGrazerCount = 0;
        this.intPredCount = 0;
        this.intPlantCount = 0;
        this.intObsCount = 0;
        this.sizeX = 0;
        this.sizeY = 0;
        this.time = 0.0;
        this.plantList = [];
        this.predList = [];
        this.grazerList = [];
        this.obsList = [];
        this.worldMatrix;
    }

    newPlant() {
        // Create new plant and append to list
        //var tools = require("./entity.js");
        //const x = new tools.plant(constructor calls from parser);
        //this.plantList.push()
        //Above is a possible method of creating a new plant
    }

    newGrazer() {
        // Create new grazer and append to list
        //var tools = require("./entity.js");
        //const x = new tools.grazer(constructor calls from parser);
        //this.plantList.push()
        //Above is a possible method of creating a new plant
    }

    newPredator() {
        // Create new predator and append to list
        //var tools = require("./entity.js");
        //const x = new tools.predator(constructor calls from parser);
        //this.plantList.push()
        //Above is a possible method of creating a new plant
    }

    newObs() {
        // Create new obstacle and append to list
        //var tools = require("./entity.js");
        //const x = new tools.obstacle(constructor calls from parser);
        //this.plantList.push()
        //Above is a possible method of creating a new obstacle
    }

    initializeWorld() {
        // Implement initializeWorld method logic here ((sizeX and sizeY) -1 is bounds)
        this.worldMatrix = Array.from({ length: this.sizeX }, () => 
        new Array(this.sizeY).fill(0));
    }

    setWorld() {
        // Implement setWorld method logic here
        // we can access worldMatrix[num][num] therefore we can set it to 1 to show something inside.
    }
    setSizeX(x){
        this.sizeX = x;
    }    
    setSizeY(y){
        this.sizeX = y;
    }
}