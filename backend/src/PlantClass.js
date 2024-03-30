import entity from './entity'

class Plant extends entity {
    constructor(xPos,yPos,zPos,lifeTime,growthRate) {
    super(xPos,yPos,zPos, lifeTime);
    this.growthRate = growthRate; //Growth rate for plant
    this.size = 1; //Size of plant
    }

    //simulates plant growth rate over time 
    grow() {
        this.size += this.growthRate;
    }

    beConsumed() {
        this.size = 0; //resets size of plant when plant is consumed
    }

    reproduce(plantsArray) {
        if (this.size >10) { // if plant is large enough for consumption
            const offspring = new Plant(this.xPos + Math.random(), this.yPos + Math.random(), this.zPos, this.lifeTime, this.growthRate);
            plantsArray.push(offspring); // add new plant to plants array
            this.size /= 2; // plant loses size while reproducing
        }
    }
}
module.exports = Plant;