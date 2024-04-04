const { genes, plantInfo, grazerInfo, predatorInfo } = require("./entity.js");
const Obstacle = require("./ObstacleClass.js");
const Grazer = require("./GrazerClass.js");
const Predator = require("./PredatorClass.js");
const Plant = require("./PlantClass.js");
const { findPredator, findClosest, distanceTo } = require("./UtilitiesFunctions.jsx");
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
        this.worldMatrix = [];
        this.gene = new genes();
        this.bufferString = ""; //use printEnts() to add to this string.
        this.plantDeathList = []
        this.predatorDeathList = []
        this.grazerDeathList = []
        this.plantStuff = new plantInfo();
        this.predatorStuff = new predatorInfo();
        this.grazerStuff = new grazerInfo();
    }

    newPlant(x, y, z) {
        let tmpPlant = new Plant(x, y, z, 0);
        this.plantList.push(tmpPlant);
    }

    newGrazer(x, y, energy) {
        let tmpGrazer = new Grazer(x, y, 15, 0, energy);
        this.grazerList.push(tmpGrazer);
    }

    newPredator(x, y, energy, geneString) {
        this.gene.geneotype = geneString;
        let tmpPredator = new Predator(x, y, 15, 0, energy, { ...this.gene });
        this.predList.push(tmpPredator);
    }

    newObs(x, y, z, size) {
        let tmpObs = new Obstacle(x, y, z, 0, size);
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
    set width(x) { this.sizeX = x; };
    set height(y) { this.sizeY = y; };

    // sets constant info of objects
    initializePlantInfo(MAX_SIZE, MAX_SEED_NUMBER, MAX_SEED_CAST_DISTANCE, SEED_VIABILITY, GROWTH_RATE) {
        this.plantStuff = new plantInfo(MAX_SIZE, MAX_SEED_NUMBER, MAX_SEED_CAST_DISTANCE, SEED_VIABILITY, 0, GROWTH_RATE);
    }

    initializeGrazerInfo(G_ENERGY_INPUT, G_ENERGY_OUTPUT, G_ENERGY_TO_REPRODUCE, G_MAINTAIN_SPEED, G_MAX_SPEED) {
        this.grazerStuff = new grazerInfo(G_MAX_SPEED, G_MAINTAIN_SPEED, G_ENERGY_INPUT, G_ENERGY_OUTPUT, G_ENERGY_TO_REPRODUCE);
    }

    intializePredatorInfo(P_MAINTAIN_SPEED, P_ENERGY_OUTPUT, P_ENERGY_TO_REPRODUCE, P_MAX_OFFSPRING, P_GESTATION, P_OFFSPRING_ENERGY) {
        this.predatorStuff = new predatorInfo(P_MAINTAIN_SPEED, P_ENERGY_OUTPUT, P_ENERGY_TO_REPRODUCE, P_MAX_OFFSPRING, P_GESTATION, P_OFFSPRING_ENERGY);
    }

    initializeGenes(MAX_SPEED_HOD, MAX_SPEED_HED, MAX_SPEED_HOR) {
        this.gene = new genes(" ", MAX_SPEED_HOD, MAX_SPEED_HED, MAX_SPEED_HOR);
    }

    // body logic used in for loop, "thisGrazer" is an iteration of predList
    grazerDecisionTree(thisGrazer) {
        let grazerPredSight = 25;
        let grazerFoodSight = 150;
        let grazerSmell = 0;
        let obstructions = this.obsList;
        obstructions = obstructions.concat(this.plantList);
        //inside grazer for loop
        // find predator in sight.
        let targetXY = findPredator(thisGrazer.x, thisGrazer.y, grazerPredSight, this.predList, obstructions);
        if (targetXY[0] !== 0 || targetXY[1] !== 0) { // if there is a predator
            thisGrazer.moveFlee(targetXY, this.grazerStuff.maxSpeed, this.grazerStuff.energyOut, obstructions, this.grazerStuff.maintain_speed);
        }
        else { // no predator, search for food\
            if (thisGrazer.Energy > this.grazerStuff.reproThreshold) { // check energy to reproduce
                thisGrazer.reproduce();
            }
            else { // no predator, no reproduce, find food
                let target = findClosest(thisGrazer.x, thisGrazer.y, this.plantList, this.obsList, grazerFoodSight, grazerSmell);
                if (target) {
                    thisGrazer.moveSeek(target, this.grazerStuff.maxSpeed, this.grazerStuff.energyOut, obstructions);
                    if (distanceTo([thisGrazer.x, thisGrazer.y], [target.x, target.y]) < 5) {
                        if (thisGrazer.eat(target, this.grazerStuff.energyGain)) { this.plantDeathList.push(target); }
                    }
                }
                else {
                    thisGrazer.moveWander(this.grazerStuff.maxSpeed, this.grazerStuff.energyOut, obstructions);
                }
            } // end no reproduce
        } // end no pred
    } // end grazerDecisionTree    

    // body logic used in for loop, "pred" is an iteration of predList
    predatorDecisionTree(pred) {
        let predatorSight = 150;
        let predatorSmell = 25;
        let obstructions = [];
        obstructions = obstructions.concat(this.obsList, this.plantList);
        // inside predator for loop 
        let targets = [];
        let targetXY = [0, 0];
        let target;

        if (pred.energy >= this.predatorStuff.reproThreshold) {  // mating conditions 
            target = findClosest(pred.x, pred.y, this.predList, obstructions, predatorSight, predatorSmell)
            if (target != null) {   // predator in sight
                pred.moveSeek(target, this.predatorStuff.maintainSpeed, this.predatorStuff.energyOut, obstructions);
                if (distanceTo([pred.x, pred.y], [target.x, target.y]) < 5)
                    pred.reproduce(target);
            }
            else {   // no predators in sight, find food
                target = findClosest(pred.x, pred.y, this.grazerList, obstructions, predatorSight, predatorSmell) //no pred in sight
                if (target != null) {
                    pred.moveSeek(target, this.predatorStuff.maintainSpeed, this.predatorStuff.energyOut, obstructions);
                    if (distanceTo([pred.x, pred.y], [target.x, target.y]) < 5) {
                        if (pred.eat(target)) {
                            this.grazerDeathList.push(target);
                        }
                    }
                }
                else {
                    pred.moveWander(this.predatorStuff.maintainSpeed, this.predatorStuff.energyOut, obstructions);
                }
            }
        }
        else { // not mating
            if (pred.aggro === "aa") {
                targetXY = findPredator(pred.x, pred.y, predatorSight, this.predList, obstructions)
                if (targetXY[0] !== 0 || targetXY[1] !== 0) { // predator in sight
                    pred.moveFlee(targetXY, this.predatorStuff.maintainSpeed, this.predatorStuff.energyOut, obstructions)
                }
                else { //no predator in sight   
                    target = findClosest(pred.x, pred.y, this.grazerList, obstructions, predatorSight, predatorSmell) //no pred in sight
                    if (target) {
                        pred.moveSeek(target, this.predatorStuff.maintainSpeed, this.predatorStuff.energyOut, obstructions);
                        if (distanceTo([pred.x, pred.y], [target.x, target.y]) < 5) {
                            if (pred.eat(target)) {
                                this.grazerDeathList.push(target);
                            }
                        }
                    }
                    else {
                        pred.moveWander(this.predatorStuff.maintainSpeed, this.predatorStuff.energyOut, obstructions);
                    }
                } // end no predator
            } // end "aa"
            else if (pred.aggro === "Aa") { // not mating just looking for food
                target = findClosest(pred.x, pred.y, this.grazerList, obstructions, predatorSight, predatorSmell)
                if (target) { // grazer in sight 
                    pred.moveSeek(target, this.predatorStuff.maintainSpeed, this.predatorStuff.energyOut, obstructions);
                    if (distanceTo([pred.x, pred.y], [target.x, target.y]) < 5) {
                        if (pred.eat(target)) {
                            this.grazerDeathList.push(target);
                        }
                    }
                }
                else { // no grazer in sight   
                    target = findClosest(pred.x, pred.y, this.predList, obstructions, predatorSight, predatorSmell) //no pred in sight
                    if (target) {
                        pred.moveSeek(target, this.predatorStuff.maintainSpeed, this.predatorStuff.energyOut, obstructions);
                        if (distanceTo([pred.x, pred.y], [target.x, target.y]) < 5) {
                            if (pred.eat(target)) {
                                this.predatorDeathList.push(target);
                            }
                        }
                    }
                    else {
                        pred.moveWander(this.predatorStuff.maintainSpeed, this.predatorStuff.energyOut, obstructions);
                    }
                } // end no grazer
            } // end "AA"
            else if (pred.aggro === "AA") { //not mating just looking for food
                targets = targets.concat(this.grazerList, this.predList)
                target = findClosest(pred.x, pred.y, targets, obstructions, predatorSight, predatorSmell)
                if (target) {
                    pred.moveSeek(target, this.predatorStuff.maintainSpeed, this.predatorStuff.energyOut, obstructions);
                    if (distanceTo([pred.x, pred.y], [target.x, target.y]) < 5) {
                        if (pred.eat(target)) {
                            if (pred instanceof Predator) {
                                this.predatorDeathList.push(target);
                            }
                            else if (pred instanceof Grazer) {
                                this.predatorDeathList.push(target);
                            }
                        }
                    }
                }
                else {
                    pred.moveWander(this.predatorStuff.maintainSpeed, this.predatorStuff.energyOut, obstructions);
                }
            } // end "AA"
        } // end not mating
    } // end predatorDecisionTree

    // outputs string of all entities' information needed to display.
    printEnts() {
        let returnString = this.sizeX + "," + this.sizeY + "," + this.plantList.length + "," + this.grazerList.length + "," + this.predList.length + "," + this.obsList.length + ",";
        for (let p of this.plantList) {
            returnString += `${p.x},`;
            returnString += `${p.y},`;
            returnString += `${p.z},`;
        }
        for (let g of this.grazerList) {
            returnString += `${g.x},`;
            returnString += `${g.y},`;
        }
        for (let p of this.predList) {
            returnString += `${p.x},`;
            returnString += `${p.y},`;
        }
        for (let o of this.obsList) {
            returnString += `${o.x},`;
            returnString += `${o.y},`;
            returnString += `${o.z},`;
        }

        return returnString;
    }
    plantDecisionTree(plant) {
        //This is a tempory holder for the plant dc  
        if (plant.size !== this.plantStuff.maxSize && plant.lifetime >= 10) {
            plant.size = plant.size + (this.plantStuff.maxSize * 0.01); // grow by 1% max
        }
        if (plant.size === this.plantStuff.maxSize) {
            plant.reproTimer += 1
            if (plant.reproTimer % 3600 === 0) {
                plant.reproduce(this.plantList)
            }
        }
        plant.lifeTime++
    }
    tempDeathCheck() {

        //when things die add to this list with append
        if (this.plantDeathList.length > 0) {
            for (let i = 0; i < this.plantDeathList.length; i++) {
                let x = this.plantDeathList.pop()
                this.plantList = this.plantList[x].splice(x, 1)
            }
        }
        if (this.predatorDeathList.length > 0) {
            for (let i = 0; i < this.predatorDeathList.length; i++) {
                let x = this.predatorDeathList.pop()
                this.predList = this.predList[x].splice(x, 1)
            }
        }
        if (this.grazerDeathList.length > 0) {
            for (let i = 0; i < this.grazerDeathList.length; i++) {
                let x = this.grazerDeathList.pop()
                this.grazerList = this.grazerList[x].splice(x, 1)
            }
        }
    }
    update(callback) {
        let bufferSize = 20;
        if (this.plantList && this.grazerList && this.predList) {
            for (let i = 0; i < bufferSize; i++) {
                for (let plant of this.plantList) {
                    this.plantDecisionTree(plant);
                }
                for (let grazer of this.grazerList) {
                    this.grazerDecisionTree(grazer)
                }
                for (let predator of this.predList) {
                    this.predatorDecisionTree(predator);
                }
                // this.tempDeathCheck();
                this.bufferString += this.printEnts() + "\n";
            }
            
        }
        else {

        }
        callback(this.bufferString);
    }
}



module.exports = Global;
