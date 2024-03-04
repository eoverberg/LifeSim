class entity {
    constructor(xPos,yPos,zPos,lifeTime){
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
        this.lifeTime = lifeTime;   
    }
}
class genes{
    constructor(geneString, initMaxHOD,initMaxHED,initMaxHOR){
        this.geneString = geneString;
        this.initMaxHOD = initMaxHOD; 
        this.initMaxHED = initMaxHED; 
        this.initMaxHOR = initMaxHOR; 
    }
}
class predator extends entity{
    constructor(xPos,yPos,zPos,lifeTime,energy,geneObj){
        super(xPos,yPos,zPos,lifeTime);
        this.currentSpeed = 0;
        this.energy = energy;
        this.genesObj = geneObj;
    }
}
class predatorInfo {
    constructor(energyIn,energyOut,energytoReproduce,maxOffsprings){
        this.energyIn = energyIn;
        this.energyOut = energyOut;
        this.energytoReproduce = energytoReproduce;
        this.maxOffsprings = maxOffsprings;

    }
}
class grazer extends entity{
    constructor(xPos,yPos,zPos,lifeTime,energy){
        super(xPos,yPos,zPos,lifeTime);
        this.currentSpeed = 0;
        this.energy = energy;
    }
}
class grazerInfo {
    constructor(maxSpeed,energyIn,energyOut,energytoReproduce){
        this.maxSpeed = maxSpeed;
        this.energyIn = energyIn;
        this.energyOut = energyOut;
        this.energytoReproduce = energytoReproduce;
    }
}
class plant extends entity{
    constructor(xPos,yPos,zPos,lifeTime){
        super(xPos,yPos,zPos,lifeTime);
    }
}
class plantInfo {
    constructor(size,seedAmount,reproductionDistance,seedChance,growthPercent,growthRate){
        this.maxSize = size;
        this.maxSeeds = seedAmount
        this.maxReproductionDis = reproductionDistance;
        this.seedChance = seedChance;
        this.growthPercent = growthPercent;
        this.growthRate = growthRate;
    }
}
class obstacle extends entity{
    constructor(xPos,yPos,zPos,lifeTime){
        super(xPos,yPos,zPos,lifeTime);
    }
}