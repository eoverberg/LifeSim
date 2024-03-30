const {genes,plantInfo,grazerInfo,predatorInfo} = require("./entity.js");
const Obstacle = require("./ObstacleClass.js");
const Grazer = require("./GrazerClass.js");
const Predator = require("./PredatorClass.js");
const Plant = require("./PlantClass.js");
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
    }

    newPlant(x,y,z) {
        let tmpPlant = new Plant(x,y,z,0);
        this.plantList.push(tmpPlant);
    }

    newGrazer(x,y,z,energy) {
        let tmpGrazer = new Grazer(x,y,z,energy);
        this.grazerList.push(tmpGrazer);
    }

    newPredator(x,y,z,energy,geneString) {
        this.gene.geneotype = geneString;
        let tmpPredator = new Predator(x,y,z,0,energy,{...this.gene});
        this.predList.push(tmpPredator);
    }

    newObs(x,y,z,size) {
        let tmpObs = new Obstacle(x,y,z,size,0);
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

    // sets constant info of objects
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


    // parameters: 
    //      source (x,y) 
    //      difference in source and target(x,y)
    //      distance betweeen source and target
    //      list of entities that could block LOS
    // returns true if an obstacle is between target and source
    checkLOS(sX,sY,xDiff,yDiff,distance,obstacles)
    {
        // flag if LOS is blocked
        let blocked = false;
        // iterate through obstacles and check if it is blocking LOS
        for(let obstacle of obstacles) 
        {
        // find closest point on line of sight to obstacle     
        let position = ((obstacle.x-sX)*(xDiff)+(obstacle.y-sY)*(yDiff))/distance;
        // if 0 or 1 obstacle is closest to target or source and not blocking los
        if (position < 1 && position > 0)
        {
            // find closest (x,y) on line to obstacle  
            let lineX = sX+(position*(xDiff));
            let lineY = sY+(position*(yDiff));
            // find distance from obstacle to line
            let distoLine =(obstacle.x-lineX)**2+(obstacle.y-lineY)**2;
            // if distance is less than obstacle radius, it is blocking line of sight 
            if (distoLine <= obstacle.z)
            {
                blocked = true;
            }        
        }
        // if any obstacle is blocking LOS, exit for loop
        if(blocked)
            {
                break;
            }
        } // for loop 
        return blocked;
    }

    //returns summation of predators
    findPredator(sX,sY,distance,ent2Find, obstructions)
    {
        // distance squared so square root is never needed
        let discheck = (distance)**2;
        let targetX = 0;
        let targetY = 0;
        let sumX = 0;
        let sumY = 0;
        // loop through list of predators, list should never change
        for(let pred of ent2Find)
        {
            // (x,y) difference is used a lot in checkLOS
            let xDiff = pred.x-sX;
            let yDiff = pred.y-sY;
            // check if predator is within LOS
            let distance2 = (xDiff)**2 + (yDiff)**2;
            if (distance2 < discheck && distance2 !== 0)
            {
                if(this.checkLOS(sX,sY,xDiff,yDiff,distance2,obstructions))
                {
                    continue; // next predator if blocking
                }
                sumX += xDiff;
                sumY += yDiff;
                targetX = sumX + sX;
                targetY = sumY + sY;
            }
        }
        return [targetX, targetY];
    }

    // source(x,y)
    // list of possible targets
    // list of possible obstacle blocking LOS
    // distance to check
    // returns closest entity in entities list
    findClosest(sX, sY, entities, obstructions, distance, smellDistance)
    {
        let target;
        // closest distance to source, starts at LOS
        let discheck = (distance)**2;
        for(let ent of entities)
        {
            let xDiff = ent.x-sX;
            let yDiff = ent.y-sY;
            let distance2 = (xDiff)**2 + (yDiff)**2;
            // check if closest
            
            if (distance2 < discheck && distance2 !== 0)
            {   
                // ent is closest then change distance to check and return (x,y) to ent
                if((distance2<smellDistance) || !this.checkLOS(sX,sY,xDiff,yDiff,distance2,obstructions)) 
                {
                    discheck = distance2;
                    target = ent;
                }
            }
        }
        return target;   
    }

    // body logic used in for loop, "thisGrazer" is an iteration of predList
    grazerDecisionTree(thisGrazer)
    {
        let plantDeathList = [];
        let grazerPredSight = 25;
        let grazerFoodSight = 150;
        let grazerSmell = 0;
        let obstructions = this.obsList;
        obstructions = obstructions.concat(this.plantList);
        //inside grazer for loop
        // find predator in sight.
        let targetXY = this.findPredator(thisGrazer.x,thisGrazer.y,grazerPredSight,this.predList, obstructions);
        if (targetXY[0]!==0 || targetXY[1]!==0)
        { // if there is a predator
            thisGrazer.Flee(targetXY);
        }
        else
        { // no predator, search for food
            if(thisGrazer.energy > this.grazerInfo.reproThreshold)
            { // check energy to reproduce
                thisGrazer.Reproduce();
            }
            else 
            { // no predator, no reproduce, find food
                let target = this.findClosest(thisGrazer.x,thisGrazer.y,this.plantList,this.obsList,grazerFoodSight,grazerSmell);
                if (target)
                {
                    thisGrazer.Seek(target);
                    if (thisGrazer.distance2(target) < 5)
                    {
                        if(thisGrazer.eat(target))
                         {plantDeathList.push(target);}
                    }
                 }
                else
                {
                    thisGrazer.Wander();
                } 
             } // end no reproduce
        } // end no pred
    } // end grazerDecisionTree    

    // body logic used in for loop, "pred" is an iteration of predList
    predatorDecisionTree(pred)
    {
        let predatorDeathList = [];
        let grazerDeathList = [];
        let predatorSight = 150;
        let predatorSmell = 150;
        let obstructions = [];
        obstructions = obstructions.concat(this.obsList, this.plantList);
        // inside predator for loop 
        let targets = [];
        let targetXY= [0,0];
        let target;

        if (pred.energy >= this.predatorInfo.reproThreshold)
        {  // mating conditions 
            target = this.findClosest(pred.x,pred.y,this.predList,obstructions,predatorSight,predatorSmell)
            if (target != null)
            {   // predator in sight
                pred.Seek(target);
                if (pred.distance2(target) < 5)
                    pred.Reproduce(target);
            }
            else
            {   // no predators in sight, find food
                target = this.findClosest(pred.x,pred.y,this.grazerList,obstructions,predatorSight,predatorSmell) //no pred in sight
                if (target != null)
                {
                    pred.Seek(target);
                    if (pred.distance2(target) < 5)
                    {    
                        if(pred.eat(target))
                        {
                            grazerDeathList.push(target);
                        }
                    }
                }
                else 
                {
                    pred.Wander();
                }
            }
        }
        else{ // not mating
            if(pred.aggro === "aa")
            {
                targetXY = this.findPredator(pred.x,pred.y,predatorSight,this.predList, obstructions)
                if (targetXY[0]===0 || targetXY[1]===0)
                { // predator in sight
                    pred.Flee(target)
                }
                else
                { //no predator in sight   
                    target = this.findClosest(pred.x,pred.y,this.grazerList,obstructions,predatorSight,predatorSmell) //no pred in sight
                    if (target){
                        pred.Seek(target);                        
                        if (pred.distance2(target) < 5)
                        {
                            if(pred.eat(target))
                            {
                                grazerDeathList.push(target);
                            }
                        }
                    }
                    else 
                    {
                        pred.Wander();
                    }
                } // end no predator
            } // end "aa"
            else if(pred.aggro === "Aa")
            { // not mating just looking for food
                target = this.findClosest(pred.x,pred.y,this.grazerList,obstructions,predatorSight,predatorSmell)
                if (target)
                { // grazer in sight 
                    pred.Seek(target);
                    if (pred.distance2(target) < 5)
                    { 
                        if(pred.eat(target))
                            {
                                grazerDeathList.push(target);
                            }
                    }
                }
                else 
                { // no grazer in sight   
                    target = this.findClosest(pred.x,pred.y,this.predList,obstructions,predatorSight,predatorSmell) //no pred in sight
                    if (target)
                    {
                        pred.Seek(target);
                        if (pred.distance2(target) < 5)
                        { 
                            if(pred.eat(target))
                            {
                                predatorDeathList.push(target);
                            }
                        }
                    }
                    else 
                    {
                        pred.Wander();
                    }
                } // end no grazer
            } // end "AA"
            else if(pred.aggro === "AA")
            { //not mating just looking for food
                targets = targets.concat(this.grazerList,this.predList)
                target = this.findClosest(pred.x,pred.y,targets,obstructions,predatorSight,predatorSmell)
                if (target)
                {
                    pred.Seek(target);
                    if (pred.distance2(target) < 5)
                       { 
                        if(pred.eat(target))
                        {
                            if (pred instanceof Predator)
                                predatorDeathList.push(target);
                            else if (pred instanceof Grazer)
                                predatorDeathList.push(target);
                        }
                    }
                }
                else 
                {
                    pred.Wander();
                }
            } // end "AA"
        } // end not mating
    } // end predatorDecisionTree

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
