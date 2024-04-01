 class entity {
    constructor(xPos,yPos,zPos,lifeTime){
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
        this.lifeTime = lifeTime;   
    }
    // getters for info
    get x() {return this.xPos;};
    set x(pos) {this.xPos = pos};
    get y() {return this.yPos;};
    set y(pos) {this.yPos = pos};
    get z() {return this.zPos;};
    set z(pos) {this.zPos = pos};
    get lifetime() {return this.lifeTime};
    set lifetime(time) {this.lifeTime = time};
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
        if (geneString)
        {
            let gArray = geneString.split(' ');
            this.Speed = gArray[1];
            this.Aggro = gArray[0];
            this.Strength = gArray[2];
        }
    }
    set geneotype(gString) 
    {
        if (gString)
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
    get reproThreshold(){return this.energytoReproduce}
}
 class grazerInfo {
    constructor(maxSpeed, maintain_speed, energyIn,energyOut,energytoReproduce){
        this.maintain_speed = maintain_speed;
        this.maxSpeed = maxSpeed;
        this.energyIn = energyIn;
        this.energyOut = energyOut;
        this.energytoReproduce = energytoReproduce;
    }
    get reproThreshold(){return this.energytoReproduce}
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

module.exports = {entity,genes,plantInfo,grazerInfo,predatorInfo,obstacle};