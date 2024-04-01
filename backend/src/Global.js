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
        this.worldMatrix = [];
        this.gene = new genes();

        this.plantDeathList = []
        this.predatorDeathList = []
        this.grazerDeathList = []

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
        let tmpPredator = new predator(x,y,z,0,energy,{...this.gene});
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

    findPredator(sX,sY,distance)
    {
        // distance squared so square root is never needed
        let discheck = (distance)**2;
        let targetX = 0;
        let targetY = 0;
        let sumX = 0;
        let sumY = 0;
        // loop through list of predators, list should never change
        for(let pred of this.predList)
        {
            // (x,y) difference is used a lot in checkLOS
            let xDiff = pred.x-sX;
            let yDiff = pred.y-sY;
            // check if predator is within LOS
            let distance2 = (xDiff)**2 + (yDiff)**2;
            if (distance2 < discheck && distance2 !== 0)
            { 
                // check any obstacle or plant is blocking LOS

                if(this.checkLOS(sX,sY,xDiff,yDiff,distance2,this.obsList))
                {
                    continue; // next predator if blocking
                }
                if (this.checkLOS(sX,sY,xDiff,yDiff,distance2,this.plantList))
                {
                    continue; // next predator if blocking
                }
                sumX += xDiff;
                sumY += yDiff;
                targetX = sumX + sX;
                targetY = sumY + sY;
            }
        }
        return [targetX, targetY, 0];
    }

    // source(x,y)
    // list of possible targets
    // list of possible obstacle blocking LOS
    // distance to check
    // returns closest target (x,y) in entities list
    findClosest(sX, sY, entities, obstructions, distance, smellDistance)
    {
        let targetX = 0;
        let targetY = 0;
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
                // ent is closest then change distance to check and return (x,y) to ent(distance2<smellDistance) || 
                if(!this.checkLOS(sX,sY,xDiff,yDiff,distance2,obstructions)) 
                {
                    discheck = distance2;
                    targetX = ent.x;
                    targetY = ent.y
                }
            }
        }
        return [targetX, targetY, 0];   
    }

    // return [x,y, movementEnum  ]
    // 0 = flee, 1 = pursuem, 2 = wander 
    getGrazerTarget(gX,gY)
    {
        let grazerPredSight = 25;
        let grazerFoodSight = 150;
        let grazerSmell = 0;
        // find predator in sight.
        let target = this.findPredator(gX,gY,grazerPredSight)
        target[2] = 0;
        // if return value goes nowhere find food
        if (target[0]!==0 || target[1]!==0)
        {return target;}
        // no predator to flee, search for food
        target = this.findClosest(gX,gY,this.plantList,this.obsList,grazerFoodSight,grazerSmell)
        if ((target[0]===0) && (target[1]===0))
        {
            target[2] = 2;
            return target;
        }else{
            target[2] = 1;
            return target;
        }
    }    

    // return [x,y, movementEnum  ]
    // 0 = flee, 1 = pursuem, 2 = wander 
    getPredatorTarget(pred){
        console.log(pred.x + ',' + pred.y)
        let predatorSight = 150;
        let predatorSmell = 150;
        let targets = [];
        let obstructions = [];
        let target= [0,0];
        obstructions = obstructions.concat(this.obsList, this.plantList);
        if(!pred.mating && pred.aggro === "aa")
        {
            console.log("start aa")
            targets = targets.concat(this.grazerList);
            target = this.findPredator(pred.x,pred.y,predatorSight);
            if (target[0]!==0 || target[1]!==0)
            {   
                target[2] = 0;
                return target;
            }
        }
        else if(!pred.mating && pred.Aggro === "Aa"){
            targets = targets.concat(this.grazerList);
        }
        else{//if pred is mating. "AA" always targets other predators
              targets = targets.concat(this.predList,this.grazerList);
        }
        target = this.findClosest(pred.x,pred.y,targets,obstructions,predatorSight,predatorSmell)
        if (target[0]!==0&& target[1]!==0)
        {
            target[2] = 1;
            return target;
        }else{
            target[2] = 2;
            return target;
        }
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
    plantDecisionTree()
    {
        //This is a tempory holder for the plant dc 
        if (plant.size != plantInfo.MAX_SIZE && plant.lifetime > 10) 
        {
            plant.grow()
        }
        if (plant.size == plantInfo.MAX_SIZE)
        {
            plant.reprotimer += 1 
            if (plant.reprotimer % 3600 === 0)
            {
                plant.reproduce(this.plantList)
            }
        }
        plant.lifetime++
    }
    tempDeathCheck()
    {

        //when things die add to this list with append
        if (plantDeathList.length > 0)
        {
            for(i = 0; i < plantDeathList.length; i++)
            {
                x = plantDeathList.pop()
                this.plantList = this.plantList[x].splice(x,1)
            }
        }
        if (predatorDeathList.length > 0)
        {
            for(i = 0; i < predatorDeathList.length; i++)
            {
                x = predatorDeathList.pop()
                this.predList = this.predList[x].splice(x,1)
            }
        }
        if (grazerDeathList.length > 0)
        {
            for(i = 0; i < grazerDeathList.length; i++)
            {
                x = grazerDeathList.pop()
                this.grazerList = this.grazerList[x].splice(x,1)
            }
        }
    }
}


module.exports = Global;
