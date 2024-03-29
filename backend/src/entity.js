 class entity {
    constructor(xPos,yPos,zPos,lifeTime){
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
        this.lifeTime = lifeTime;   
    }
    // getters for info
    get x() {return this.xPos;};
    get y() {return this.yPos;};
    get z() {return this.zPos;};
}
 class genes{
    constructor(geneString, initMaxHOD,initMaxHED,initMaxHOR){
        this.geneString = geneString;
        this.initMaxHOD = initMaxHOD; 
        this.initMaxHED = initMaxHED; 
        this.initMaxHOR = initMaxHOR; 
        this.Aggro ="";
        this.Speed ="";
        this.Strength ="";
    }
    set geneotype(gString) 
    {
        if (gString.length>0)
        {
            let gArray = gString.split(' ');
            this.Speed = gArray[1];
            this.Aggro = gArray[0];
            this.Strength = gArray[2];
        }
        this.geneString = gString; 
    } 

    get geneotype(){return this.geneString}
    get speed(){return this.Speed}
    get aggro(){return this.Aggro}
    get strength(){return this.Strength}
}
 class predator extends entity{
    constructor(xPos,yPos,zPos,lifeTime,energy,geneObj){
        super(xPos,yPos,zPos,lifeTime);
        this.currentSpeed = 0;
        this.energy = energy;
        this.orientation = 0.0;
        this.mating = false;
        this.genesObj = geneObj;
    }
    get geneo(){return this.genesObj}
    get aggro(){return this.genesObj.Aggro};
    get speed(){return this.genesObj.Speed};
    get strength(){return this.genesObj.Strength};
}
 class predatorInfo {
    constructor(maintainSpeed, energyIn,energyOut,energytoReproduce,maxOffsprings, gestationTime, offSpringEnergy){
        this.maintainSpeed = maintainSpeed;
        this.energyIn = energyIn;
        this.energyOut = energyOut;
        this.energytoReproduce = energytoReproduce;
        this.maxOffsprings = maxOffsprings;
        this.gestationTime = gestationTime
        this.offSpringEnergy = offSpringEnergy;

    }
}
 class grazer extends entity{
    constructor(xPos,yPos,zPos,lifeTime,energy){
        super(xPos,yPos,zPos,lifeTime);
        this.currentSpeed = 0;
        this.energy = energy;
        this.orientation = 0.0;
    }
}
 class grazerInfo {
    constructor(maxSpeed, maintain_speed, energyIn,energyOut,energytoReproduce){
        this.maintain_speed = maintain_speed;
        this.maxSpeed = maxSpeed;
        this.energyIn = energyIn;
        this.energyOut = energyOut;
        this.energytoReproduce = energytoReproduce;
    }
}
 class plant extends entity{
    // z = height and diameter
}
 class plantInfo {
    constructor(size,seedAmount,reproductionDistance,seedChance,growthPercent,growthRate){
        this.maxSize = size;
        this.maxSeeds = seedAmount;
        this.maxReproductionDis = reproductionDistance;
        this.seedChance = seedChance;
        this.growthPercent = growthPercent;
        this.growthRate = growthRate;
    }
}
class obstacle extends entity{
    constructor(xPos,yPos,zPos,size,lifeTime){
        super(xPos,yPos,zPos,lifeTime);
        this.size = size;// z = height and size = diameter?
    }
}

module.exports = {entity,genes,plant,plantInfo,grazer,grazerInfo,predator,predatorInfo,obstacle};