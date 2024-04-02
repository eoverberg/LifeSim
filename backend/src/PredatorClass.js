const {entity, genes} =require('./entity.js');
class Predator extends entity {
    constructor(xPos, yPos, zPos, lifeTime, energy, {...geneObj}) {
        super(xPos, yPos, zPos, lifeTime);
        this.currentSpeed = 0;
        this.energy = energy;
        this.orientation = 0.0;
        this.genesObj = {...geneObj};
        this.orientation = Math.random() * 2 * Math.PI; //random initial orientation
        
    }

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

    //utility function to measure distance to another entity
    distanceTo(entity) {
        return Math.sqrt((entity.xPos - this.xPos) ** 2 + (entity.yPos - this.yPos) ** 2);
    }

    //utility function to move towards another entity 
    moveTo(entity) {
        const angle = Math.atan2(entity.yPos - this.yPos, entity.xPos - this.xPos);
        this.xPos += Math.cos(angle);
        this.yPos += Math.sin(angle);
        this.orientation = angle;
    }

    wantTwoRepro(){
        if(this.energy >= predatorInfo.energyToReproduce)
        {
            return true;
        }
        return false;
    }
}

module.exports = Predator;
