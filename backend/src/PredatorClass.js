const { Entity, Genes } = require('./Entity.js');
const { isColliding, checkLOS, findPredator, findClosest, checkPath, distanceTo } = require('./UtilitiesFunctions.jsx');
const { seek, flee, wander } = require('./movement.js');
class Predator extends Entity {
    constructor(x_pos_,y_pos_,radius_,lifetime_, energy_, { ...gene_obj_ }) {
        super(x_pos_,y_pos_,radius_,lifetime_);
        this.current_speed_ = 0;
        this.m_energy= energy_;
        this.m_genes_obj = { ...gene_obj_ };
        this.m_orientation = Math.random() * 2 * Math.PI; //random initial orientation

    }

    beConsumed(){
        this.m_energy = 0;
    }

    eat(entity_) {
        this.m_energy += entity_.m_energy*.9; //gain a fixed amount of energy
        entity_.beConsumed(); //consume the grazer
        return true;
    }

    reproduce(predators_array_, target_) {

        var g_string = "";
        var temp = "";
        temp = temp.concat(this.m_genes_obj.m_aggro[Math.floor(Math.random * 2)], target_.m_genes_obj.m_aggro[Math.floor(Math.random * 2)]);
        if (temp === "aA") {
            temp = "Aa";
        }
        g_string = g_string.concat(temp, " ");
        temp = "";
        temp = temp.concat(this.m_genes_obj.m_speed[Math.floor(Math.random * 2)], target_.m_genes_obj.m_speed[Math.floor(Math.random * 2)]);
        if (temp === "sS") {
            temp = "Ss";
        }
        g_string = g_string.concat(temp, " ");
        temp = "";

        temp = temp.concat(this.m_genes_obj.m_strength[Math.floor(Math.random * 2)], target_.m_genes_obj.m_strength[Math.floor(Math.random * 2)]);
        if (temp === "fF") {
            temp = "Ff";
        }
        g_string = g_string.concat(temp);
        let gene_copy = {...this.m_genes_obj};
        gene_copy.setGeneString(g_string);
        const offspring = new Predator(this.m_x_pos + Math.random(), this.m_y_pos + Math.random(), this.m_radius, 0, Math.floor(this.energy / 2), gene_copy);
        predators_array_.push(offspring);
    }

    //utility function to move towards another entity 
    moveTo(entity) {
        const angle = Math.atan2(entity.m_y_pos - this.m_y_pos, entity.m_x_pos - this.m_x_pos);
        this.m_x_pos += Math.cos(angle);
        this.m_y_pos += Math.sin(angle);
        this.orientation = angle;
    }

    // wantTwoRepro(){
    //     if(this.energy >= PredatorInfo.m_energy_to_reproduce )
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
    moveSeek(target_, speed_, energy_use_, obstructions) {
        //check distance to tarrget + reach
        //if greater than speed.
        //speed = same
        // else speed = distance to edge

        let steering = seek([this.m_x_pos, this.m_y_pos], [target_.m_x_pos, target_.m_y_pos], speed_)
        let distance_moved = Math.sqrt(steering[0] ** 2 + steering[1] ** 2);
        // (amount 5 DU was moved) * energy used
        // floor or exact? 
        let energy_used = Math.floor(distance_moved / 5) * energy_use_;
        this.m_x_pos += steering[0];
        this.m_y_pos += steering[1];
        this.m_energy -= energy_used;

    }

    moveWander(speed_, energy_use_, obstructions) {

        let steering = wander(this, speed_)
        let distance_moved = Math.sqrt(steering[0] ** 2 + steering[1] ** 2);
        // (amount 5 DU was moved) * energy used
        let energy_used = Math.floor(distance_moved / 5) * energy_use_;
        this.m_x_pos += steering[0];
        this.m_y_pos += steering[1];
        this.m_energy -= energy_used;
    }

    moveFlee(target_x_y_, speed_, energy_use_, obstructions) {
        // check if path is clear
        let steering = flee([this.x, this.y], [target_x_y_[0], target_x_y_[1]], speed_)
        let distance_moved = Math.sqrt(steering[0] ** 2 + steering[1] ** 2);
        // (amount 5 DU was moved) * energy used
        // floor or exact? 
        let energy_used = Math.floor(distance_moved / 5) * energy_use_;
        this.m_x_pos += steering[0];
        this.m_y_pos += steering[1];
        this.m_energy -= energy_used;
    }

}

module.exports = Predator;
