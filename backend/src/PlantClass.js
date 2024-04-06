const { Entity } = require('./Entity.js');

class Plant extends Entity {
    constructor(x_pos_,y_pos_,radius_,lifetime_) {
        super(x_pos_,y_pos_,radius_,lifetime_);
        this.m_repro_timer = 0;
        this.m_dead = false;
        this.m_eat_time = 0;
    }

    //simulates plant growth rate over time 
    // grow(growth_rate_) {
    //     this.m_radius += growth_rate_;
    // }

    beConsumed() 
    {
        this.m_radius = 0; //resets size of plant when plant is consumed
        this.m_dead = true;
    }

    reproduce(plants_array_) 
    {
        let time = 0;
        let size = .1;
        const offspring = new Plant(this.m_x_pos + Math.random(), this.m_y_pos + Math.random(), size, time);
        plants_array_.push(offspring);
    }
}
module.exports = Plant;