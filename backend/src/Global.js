const {genes,plant,plantInfo,grazer,grazerInfo,predator,predatorInfo,obstacle} = require("./entity.js");

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
        //this.worldMatrix;
    }

    newPlant(x,y,z) {
        // Create new plant and append to list
        //var tools = require("./entity.js");
        //const x = new tools.plant(constructor calls from parser);
        //this.plantList.push()
        //Above is a possible method of creating a new plant
        let tmpPlant = new plant(x,y,z,0);
        this.plantList.push(tmpPlant);

    }

    newGrazer(x,y,z,energy) {
        // Create new grazer and append to list
        //var tools = require("./entity.js");
        //const x = new tools.grazer(constructor calls from parser);
        //this.plantList.push()
        //Above is a possible method of creating a new plant
        let tmpGrazer = new grazer(x,y,z,energy);
        this.grazerList.push(tmpGrazer);
    }

    newPredator(x,y,z,energy,geneString) {
        // Create new predator and append to list
        //var tools = require("./entity.js");
        //const x = new tools.predator(constructor calls from parser);
        //this.plantList.push()
        //Above is a possible method of creating a new plant
        this.gene.geneotype = geneString;
        let tmpPredator = new predator(x,y,z,energy,this.gene);
        this.predList.push(tmpPredator);
    }

    newObs(x,y,z,size) {
        // Create new obstacle and append to list
        //var tools = require("./entity.js");
        //const x = new tools.obstacle(constructor calls from parser);
        //this.plantList.push()
        //Above is a possible method of creating a new obstacle
        let tmpObs = new obstacle(x,y,z,size,0);
        this.obsList.push(tmpObs);
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

    // setters for map height and width.
    set width(x) {this.sizeX = x;};    
    set height(y) {this.sizeY = y;};

    initializePlantInfo(MAX_SIZE, MAX_SEED_NUMBER, MAX_SEED_CAST_DISTANCE, SEED_VIABILITY, GROWTH_RATE){
        this.plantInfo = new plantInfo(MAX_SIZE, MAX_SEED_NUMBER, MAX_SEED_CAST_DISTANCE, SEED_VIABILITY, 0, GROWTH_RATE);
    }

    initializeGrazerInfo(G_ENERGY_INPUT, G_ENERGY_OUTPUT, G_ENERGY_TO_REPRODUCE, G_MAINTAIN_SPEED, G_MAX_SPEED){
        this.grazerInfo = new grazerInfo(G_MAX_SPEED, G_MAINTAIN_SPEED,G_ENERGY_INPUT,G_ENERGY_OUTPUT,G_ENERGY_TO_REPRODUCE);
    }

    intializePredatorInfo( P_MAINTAIN_SPEED, P_ENERGY_OUTPUT, P_ENERGY_TO_REPRODUCE, P_MAX_OFFSPRING, P_GESTATION, P_OFFSPRING_ENERGY){
        this.predatorInfo= new predatorInfo( P_MAINTAIN_SPEED, P_ENERGY_OUTPUT, P_ENERGY_TO_REPRODUCE, P_MAX_OFFSPRING, P_GESTATION, P_OFFSPRING_ENERGY);
    }

    initializeGenes( MAX_SPEED_HOD, MAX_SPEED_HED, MAX_SPEED_HOR){
        this.gene = new genes(" ",MAX_SPEED_HOD, MAX_SPEED_HED, MAX_SPEED_HOR);
    }

    // outputs string of all entities' information needed to display.
    printEnts(){
        let returnString = this.sizeX+","+this.sizeY+","+this.plantList.length+","+this.grazerList.length+","+this.predList.length+","+this.obsList.length+",";
        for(let p of this.plantList){
            returnString += `${p.x},`;
            returnString += `${p.y},`;
            returnString += `${p.z},`;
        }
        for(let g of this.grazerList){
            returnString += `${g.x},`;
            returnString += `${g.y},`;
        }
        for(let p of this.predList){
            returnString += `${p.x},`;
            returnString += `${p.y},`;
        }
        for(let o of this.obsList){
            returnString += `${o.x},`;
            returnString += `${o.y},`;
            returnString += `${o.z},`;
        }

        return returnString;
    }

}


module.exports = Global;
