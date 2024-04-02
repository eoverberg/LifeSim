const {entity} =require('./entity.js');
//import plant
class Grazer extends entity {
    constructor(xPos, yPos, zPos, lifeTime, Energy){
        super(xPos, yPos, zPos, lifeTime); //inherits properties defined in entity constructor
        this.Energy = Energy; // energy level of grazer
        this.orientation = Math.random() * 2 * Math.PI; //initilizes orientation with random angle
        this.sprintTime = 0;
        this.eatTime = 0;
    }

    get energy(){return this.Energy};

    // Similates grazer eating plant and gaining energy
    /* 
        When food is available the Grazer is able to eat enough to gain a number of EU per minute of simulation time.  
        The number of EUs gained is defined in a simulation data file (<ENERGY_INPUT>).
        After 10 minutes of simulation time the Grazer will have eaten all food with in its’ reach (5 DU) and will have to move.
    */
    // returns true if plant was eated
    eat(plant, energyGained) {
        if (this.eatTime%60 === 0)
        {
            this.Energy += energyGained
        }
        if (this.eatTime >= 6000) {
            plant.beConsumed(); // plant is consumd and its size reset
            this.eatTime = 0; // assuming one plant per ten minutes
            return true;
        }
        return false;
    }

    beConsumed() {
        this.Energy = 0;
    }

    reproduce(grazersArray) 
    {
            const offspring = new Grazer(this.x + Math.random(), this.y + Math.random(), this.z, this.lifetime, this.Energy / 2);
            grazersArray.push(offspring); //add the new grazer to the grazers array
    }


    /* 
    A Grazer will expend a number of EU each time it moves 5 DU.  
        The amount of energy expended is defined in a simulation data file (<ENERGY_OUTPUT>). 
        The energy output is the same whether the Grazer is looking for food or fleeing from a Predator. 
    A Grazer can run faster than a Predator 
    but only for a given number of simulation minutes (<MAINTAIN_SPEED>), 
    it will then slow to 75% of its’ maximum speed <MAX_SPEED>.
        */
    move()
    {
        
    }
}

module.exports = Grazer;
