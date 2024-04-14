
const { Entity } = require('./Entity.js');
const { seek, flee, wander, changePosition} = require('./Movement.js');

//import plant
class Grazer extends Entity {
    constructor(generation_, UID_, x_pos_,y_pos_,radius_,lifetime_, energy_) {
        super(x_pos_,y_pos_,radius_,lifetime_); //inherits properties defined in Entity constructor
        this.m_energy = energy_; // energy level of grazer
        this.m_orientation = Math.random() * 2 * Math.PI; //initilizes orientation with random angle
        this.m_sprint_time = 0;
        this.m_eat_time = 0;
        this.m_dead = false;
        this.m_generation = generation_;
        this.m_UID = UID_;
    }

    // Similates grazer eating plant and gaining energy
    /* 
        When food is available the Grazer is able to eat enough to gain a number of EU per minute of simulation time.  
        The number of EUs gained is defined in a simulation data file (<ENERGY_INPUT>).
        After 10 minutes of simulation time the Grazer will have eaten all food with in its’ reach (5 DU) and will have to move.
    */
    // returns true if plant was eated
    eat(plant_, energy_gain_) {
        if (this.m_eat_time % 60 === 0) {
            this.m_energy += energy_gain_
        }
        if (plant_.m_eat_time >= 600) {
            plant_.beConsumed(); // plant is consumd and its size reset
            this.m_eat_time = 0; // assuming one plant per ten minutes
            return true;
        }
        plant_.m_eat_time++;
        this.m_eat_time++;
        return false;
    }

    beConsumed() {
        this.m_energy = 0;
        this.m_dead = true;
    }

    reproduce(grazers_array_, generation_array_) {
        this.m_energy = this.m_energy/2;
        if(this.m_generation >= generation_array_.length)
        {
            generation_array_.push(0);
        }
        const next_generation = this.m_generation + 1;
        generation_array_[next_generation-1] = generation_array_[next_generation-1]+1;
        let next_entity = generation_array_[next_generation-1];
        const offspring = new Grazer(next_generation, next_entity, (this.m_x_pos + 10), (this.m_y_pos + 10), this.m_radius, this.m_lifetime, this.m_energy);
        grazers_array_.push(offspring); //add the new grazer to the grazers array
        
        generation_array_[next_generation-1]= generation_array_[next_generation-1]+1;
        next_entity = generation_array_[next_generation-1];
        const offspring2 = new Grazer(next_generation, next_entity, (this.m_x_pos + 10), (this.m_y_pos + 10), this.m_radius, this.m_lifetime, this.m_energy);
        grazers_array_.push(offspring2); //add the new grazer to the grazers array
    }


    /* 
    A Grazer will expend a number of EU each time it moves 5 DU.  
        The amount of energy expended is defined in a simulation data file (<ENERGY_OUTPUT>). 
        The energy output is the same whether the Grazer is looking for food or fleeing from a Predator. 
    A Grazer can run faster than a Predator 
    but only for a given number of simulation minutes (<MAINTAIN_SPEED>), 
    it will then slow to 75% of its’ maximum speed <MAX_SPEED>.
        */
    moveSeek(target_, speed_, energy_use_, world_size_, obstructions_) {
        //check distance to tarrget + reach
        //if greater than speed.
        //speed = same
        // else speed = distance to edge
        speed_ = (speed_/60) * .75;

        let steering = seek([this.m_x_pos, this.m_y_pos], [target_.m_x_pos, target_.m_y_pos], speed_)
        //console.log("steering " + steering)
        changePosition(this, steering, energy_use_, world_size_, obstructions_, speed_);

    }

    moveWander(speed_, energy_use_, world_size_, obstructions_) {
        speed_ = (speed_/60) * .75;

        let steering = wander(this, speed_)
        changePosition(this, steering, energy_use_, world_size_, obstructions_, speed_);
        // let distance_moved = Math.sqrt(steering[0] ** 2 + steering[1] ** 2);
        // // (amount 5 DU was moved) * energy used
        // let energy_used = Math.floor(distance_moved / 5) * energy_use_;
        // this.m_orientation = Math.atan(steering[1],steering[0]);
        // this.m_x_pos += steering[0];
        // this.m_y_pos += steering[1];
        // this.m_energy -= energy_used;
    }

    moveFlee(target_x_y_, speed_, energy_use_, obstructions_, world_size_, stamina_) {
        //time check for speed
        if (this.m_sprint_time > stamina_) 
        { 
            speed_ = (speed_/60) * .75 
        }
        else
        {
            speed_ = (speed_/60)
        }
        // check if path is clear11
        let steering = flee([this.m_x_pos, this.m_y_pos], [target_x_y_[0], target_x_y_[1]], speed_)
        changePosition(this, steering, energy_use_, world_size_, obstructions_, speed_);
        this.m_sprint_time++;
    }
}

module.exports = Grazer;
