const { Entity, Genes } = require('./Entity.js');
const {Grazer} = require('./GrazerClass.js');
const { isColliding, checkLOS, findPredator, findClosest, checkPath, distanceTo, changePosition } = require('./UtilitiesFunctions.jsx');
const { seek, flee, wander } = require('./Movement.js');
class Predator extends Entity {
    constructor(generation_, UID_, x_pos_,y_pos_,radius_,lifetime_, energy_, { ...gene_obj_ }) {
        super(x_pos_,y_pos_,radius_,lifetime_);
        this.current_speed_ = 0;
        this.m_energy= energy_;
        this.m_genes_obj = { ...gene_obj_ };
        this.m_orientation = (Math.random() * 2 * Math.PI) - Math.PI; //random initial orientation
        this.m_dead = false;
        this.m_UID = UID_;
        this.m_generation = generation_; 
        this.m_sprint_time = 0;
        this.m_speed = this.getSpeed();
        this.m_ignore_list = [];
    }

    getSpeed()
    {
        let speed = 0;
        if(this.m_genes_obj.m_speed === "FF")
        {
            speed= this.m_genes_obj.m_init_max_HOD
        }
        else if(this.m_genes_obj.m_speed === "Ff")
        {
            speed= this.m_genes_obj.m_init_max_HED
        }
        else if(this.m_genes_obj.m_speed === "ff")
        {
            speed= this.m_genes_obj.m_init_max_HOR
        }
        speed = speed/60;
        
        return (speed);
    }

    updateSpeed(maintain_time_)
    {
        this.m_sprint_time++;
        let maintain_seconds = maintain_time_ * 60;
        if(this.m_sprint_time > maintain_seconds)
        {   // slows at a rate of 1 du per 15 seconds of simulation time. 
            if ((this.m_sprint_time - maintain_seconds)%15 === 0)
            {// assuming 1 du mean 1 du/minute
                this.m_speed -= .0167;
            }
        }
    }

    nan(){
        let check = false;
        if ( isNaN(this.m_x_pos))
        {
            check = true;
            this.m_dead = true;
        }
        return check;
    }

    updateTimes(){
        this.m_lifetime++;
        let temp_list = [];
        for(let pred of this.m_ignore_list)
        {
            pred[2]++;
            if(pred[2]<3600)
            {
                temp_list.push(pred);
            }
        }
        this.m_ignore_list = temp_list;
    }

    beConsumed(){
        this.m_energy = 0;
        this.m_dead = true;
    }

    eat(entity_) {
        let strength = this.m_genes_obj.m_strength;
        let target_strength = entity_.m_genes_obj.m_strength;
        let success_num = Math.random();
        let success_rate = 0.5;
        if (strength === "ss")
        {
            if (entity_ instanceof Grazer|| target_strength === "ss")
            {
                success_rate = .50;
            }
            else if(target_strength === "SS")
            {
                success_rate = .05
            }
            else if(target_strength === "Ss")
            {
                success_rate = .25
            }
        }
        if (strength === "Ss")
        {
            if (entity_ instanceof Grazer|| target_strength === "ss")
            {
                success_rate = .75;
            }
            else if(target_strength === "SS")
            {
                success_rate = .25
            }
            else if(target_strength === "Ss")
            {
                success_rate = .50
            }
        }
        if (strength === "SS")
        {
            if (entity_ instanceof Grazer || target_strength === "ss")
            {
                success_rate = .95;
            }
            else if(target_strength === "SS")
            {
                success_rate = .50
            }
            else if(target_strength === "Ss")
            {
                success_rate = .75
            }
        }
        if (strength !== target_strength)
        { 
            if (success_num < success_rate)
            {
                this.m_energy += entity_.m_energy*.9; 
                entity_.beConsumed(); 
                return true;
            }
        }
        else 
        {
            if (success_num > .50)
            {
                let second_success_num = Math.random();
                if (second_success_num > .50)
                {
                    // the target entity is eaten
                    this.m_energy += entity_.m_energy*.9; 
                    entity_.beConsumed(); 
                    return true;
                }
                else 
                {
                    // this entity is eaten and flag other that it has eaten
                    entity_.m_energy += this.m_energy*.9; 
                    entity_.ate = true;
                    this.beConsumed(); 
                    return true;
                }
            }
            else
            {
                // add each other to ignore list
                this.m_ignore_list.push([entity_.m_generation,entity_.m_UID, 0]);
                entity_.m_ignore_list.push([this.m_generation,entity_.m_UID, 0]);
            }
        }
            // Predators with ss genotype are weakest and will succeed in killing and eating Grazers 50% of the time if they are caught.  
            // If they attack another Predator they will succeed in killing and eating that Predator 5% of the time if its’ strength is SS and 25% of the time if its strength is Ss.  If two Predators with genotype ss fight there is a 50% chance one or the other will kill and eat and 50% chance they will disengage and go their own way.  
            // If one does kill and eat the other there is an even chance as to which will succeed.
        
        //Predators with Ss genotype are moderately strong and will succeed in killing and eating Grazers 75% of the time if they are caught.  
        //If they attack another Predator they will succeed in killing and eating that Predator 25% of the time if its’ strength is SS and 75% of the time if its strength is ss.  
        //If two Predators with genotype Ss fight there is a 50% chance one or the other will kill and eat and 50% chance they will disengage and go their own way.  
        //If one does kill and eat the other there is an even chance as to which will succeed.
       
        // Predators with SS genotype are the strongest and will succeed in killing and eating Grazers 95% of the time if they are caught.  
        // If they attack another Predator they will succeed in killing and eating that Predator 75% of the time if its’ strength is Ss and 95% of the time if its’ strength is ss. 
        // If two Predators with genotype SS fight there is a 50% chance one or the other will kill and eat and 50% chance they will disengage and go their own way.  
        // If one does kill and eat the other there is an even chance as to which will succeed.
    }

    reproduce(predators_array_, target_, generation_array_) {

        if(this.m_generation >= generation_array_.length)
        {
            generation_array_.push(0);
        }
        const next_generation = this.m_generation + 1;
        generation_array_[next_generation-1] = generation_array_[next_generation-1]+1;
        let next_entity = generation_array_[next_generation-1];

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
        const offspring = new Predator(next_generation, next_entity, this.m_x_pos + Math.random(), this.m_y_pos + Math.random(), this.m_radius, 0, Math.floor(this.energy / 2), gene_copy);
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
    moveSeek(target_, speed_time_, energy_use_, world_size_, obstructions_) {
        //check distance to tarrget + reach
        //if greater than speed.
        //speed = same
        // else speed = distance to edge
        
        let steering = seek([this.m_x_pos, this.m_y_pos], [target_.m_x_pos, target_.m_y_pos], this.m_speed);
        changePosition(this, steering, energy_use_, world_size_, obstructions_, this.m_speed);
        this.updateSpeed(speed_time_);
        
    //     let distance_moved = Math.sqrt(steering[0] ** 2 + steering[1] ** 2);
    //     // (amount 5 DU was moved) * energy used
    //     // floor or exact? 
    //     let energy_used = distance_moved / 5 * energy_use_;
    //     //console.log("oreintation1:" + this.m_orientation);
    //     this.m_orientation = Math.atan2(steering[1],steering[0]);
    //     this.m_x_pos += steering[0];
    //     this.m_y_pos += steering[1];
    //    // console.log("oreintation2:" + this.m_orientation);
    //     this.m_energy -= energy_used;

    }

    moveWander(speed_time_, energy_use_, world_size_, obstructions_) {
       
        let steering = wander(this, this.m_speed);
        changePosition(this, steering, energy_use_, world_size_, obstructions_, this.m_speed);
        this.updateSpeed(speed_time_);
        // let distance_moved = Math.sqrt(steering[0] ** 2 + steering[1] ** 2);
        // // (amount 5 DU was moved) * energy used
        // let energy_used = Math.floor(distance_moved / 5) * energy_use_;
        // this.m_x_pos += steering[0];
        // this.m_y_pos += steering[1];
        // this.m_energy -= energy_used;
    }

    moveFlee(target_x_y_, speed_time_, energy_use_, world_size_, obstructions_) {
        // check if path is clear
        let steering = flee([this.x, this.y], [target_x_y_[0], target_x_y_[1]], this.m_speed)
        changePosition(this, steering, energy_use_, world_size_, obstructions_, this.m_speed);
        this.updateSpeed(speed_time_);
    }

}

module.exports = Predator;
