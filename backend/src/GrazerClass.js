import entity from './entity'
 
class Grazer extends entity {
    constructor(xPos, yPos, zPos, lifeTime, energy){
        super(xPos, yPos, zPos, lifeTime); //inherits properties defined in entity constructor
        this.energy = energy; // energy level of grazer
    }

    //Similates grazer eating plant and gaining energy
    eat(plant) {
        if (plant.size > 0) {
            this.energy += plant.energyValue; //assuming plants have energy value
            plant.beConsumed(); // plant is consumd and its size reset
        }
    }

    beConsumed() {
        this.energy = 0;
    }

    reproduce(grazersArray) {
        if (this.energy > energyThreshold) {  //checks if  grazer has enough energy to reproduce
            const offspring = new Grazer(this.xPos + Math.random(), this.yPos + Math.random(), this.zPos, this.lifeTime, this.energy / 2);
            grazersArray.push(offspring); //add the new grazer to the grazers array
            this.energy -= energyCost;  //reproduction costs energy
        }
    }
}