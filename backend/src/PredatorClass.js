const {entity, genes} =require('./entity.js');
const {isColliding, checkLOS, findPredator, findClosest, checkPath, distanceTo} = require('./UtilitiesFunctions');
const {seek, flee, wander} = require('./movement.js');
class Predator extends entity {
    constructor(xPos, yPos, zPos, lifeTime, energy, {...geneObj}) {
        super(xPos, yPos, zPos, lifeTime);
        this.currentSpeed = 0;
        this.Energy = energy;
        this.orientation = 0.0;
        this.genesObj = {...geneObj};
        this.orientation = Math.random() * 2 * Math.PI; //random initial orientation
        
    }
    get energy(){return this.Energy};
    get geneo(){return this.genesObj}
    get aggro(){return this.genesObj.Aggro};
    get speed(){return this.genesObj.Speed};
    get strength(){return this.genesObj.Strength};

    hunt(grazersArray) {
        //find the closest grazer
        let visibilityRange = 50; //predators can only see grazers in this range
        let closestGrazer = grazersArray.reduce((closest, grazer) => {
            const distance = this.distanceTo(grazer);
            if (distance <= visibilityRange) {
            return (closest === null || distance < this.distanceTo(closest)) ? grazer : closest; //finds closest grazer to predator
            }
            return closest; 
        }, null);

        //move towards the closest grazer 
        if (closestGrazer) {
            this.moveTo(closestGrazer);
            if (this.distanceTo(closestGrazer) < 1) { //assuming a catch occurs within a distance of 1 unit
                this.eat(closestGrazer);
            }
        }
    }

    eat(grazer) {
        this.energy += 50; //gain a fixed amount of energy
        grazer.beConsumed(); //consume the grazer
    }

    reproduce(predatorsArray, target) {

        var gString = "";
        var temp = "";
        temp = temp.concat(this.genes.Aggro[Math.floor(Math.random * 2)], target.genes.Aggro[Math.floor(Math.random * 2)]);
        if (temp === "aA")
        {
            temp = "Aa";
        }
        gString = gString.concat(temp, " ");
        temp = "";
        temp = temp.concat(this.genes.Speed[Math.floor(Math.random * 2)], target.genes.Speed[Math.floor(Math.random * 2)]);
        if (temp === "sS")
        {
            temp = "Ss";
        }
        gString = gString.concat(temp, " ");
        temp = "";

        temp = temp.concat(this.genes.Strength[Math.floor(Math.random * 2)], target.genes.Strength[Math.floor(Math.random * 2)]);
        if (temp === "fF")
        {
            temp = "Ff";
        }
        gString = gString.concat(temp);
        const offspring = new Predator(this.xPos + Math.random(), this.yPos + Math.random(), this.zPos, 0, this.energy / 2,gString);
        predatorsArray.push(offspring);
        
        this.energy -= 50;

    }

    //utility function to move towards another entity 
    moveTo(entity) {
        const angle = Math.atan2(entity.yPos - this.yPos, entity.xPos - this.xPos);
        this.xPos += Math.cos(angle);
        this.yPos += Math.sin(angle);
        this.orientation = angle;
    }

    // wantTwoRepro(){
    //     if(this.energy >= predatorInfo.energyToReproduce)
    //     {
    //         return true;
    //     }
    //     return false;
    // }

    // A Predator will expend a number of EU each time it moves 5 DU.  
    // The amount of energy expended is defined in a simulation data file (<ENERGY_OUTPUT>). 
    // The energy output is the same whether the Predator is looking for food or chasing a Grazer. 
//   Speed - The maximum speeds a Predator can run (see tags below) and the times it can maintain that maximum speed (<MAINTAIN_SPEED>) is defined in the data file.  
//        Speeds are given in DU per minute and times in minutes.  
//        After the maintain speed time is elapsed the Predator will slow at a rate of one DU per 15 seconds of simulation time till it comes to a stop.  
    moveSeek(target, speed, energyUse, obstructions)
    {
        //check distance to tarrget + reach
        //if greater than speed.
        //speed = same
       // else speed = distance to edge
        speed = speed*.75;

        target = checkPath([this.x, this.y], target, obstructions);
        let newCoords = seek([this.x, this.y], target, speed)
        let distanceMoved = Math.sqrt(newCoords[0]**2 + newCoords[1]**2);
        // (amount 5 DU was moved) * energy used
        // floor or exact? 
        let energyUsed = Math.floor(distanceMoved/5)*energyUse;
        this.xPos += newCoords[0];
        this.yPos += newCoords[1];
        this.Energy -= energyUsed;

     }

     moveWander(speed, energyUse, obstructions)
     {
        
        let newCoords = wander(this, speed)
        newCoords = checkPath([this.x, this.y], newCoords, obstructions);
        let distanceMoved = Math.sqrt(newCoords[0]**2 + newCoords[1]**2);
        console.log("distanceMoved:" + distanceMoved);
        // (amount 5 DU was moved) * energy used
        let energyUsed = Math.floor(distanceMoved/5)*energyUse;
        this.xPos += newCoords[0];
        this.yPos += newCoords[1];
        this.Energy -= energyUsed;
     }

    moveFlee(target, speed, energyUse, obstructions)
    {
        // check if path is clear
        target = checkPath([this.x, this.y], target, obstructions);
        let newCoords = flee([this.x, this.y], target, speed)
        let distanceMoved = Math.sqrt(newCoords[0]**2 + newCoords[1]**2);
        // (amount 5 DU was moved) * energy used
        // floor or exact? 
        let energyUsed = Math.floor(distanceMoved/5)*energyUse;
        this.xPos += newCoords[0];
        this.yPos += newCoords[1];
        this.Energy -= energyUsed;
        this.sprintTime++;
    }

}

module.exports = Predator;
