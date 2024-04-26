const { Entity } = require('./Entity.js');

class Plant extends Entity {
    constructor(generation_, UID_, x_pos_,y_pos_,radius_,lifetime_) {
        super(x_pos_,y_pos_,radius_,lifetime_);
        this.m_repro_timer = 0;
        this.m_dead = false;
        this.m_eat_time = 0;
        this.m_generation = generation_;
        this.m_UID = UID_; 
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

    reproduce(plants_array_, generation_array_, plant_stuff_,world_size_, obstacles_) 
    {
        let viability = plant_stuff_.m_seed_chance;
        let seed_amount = plant_stuff_.m_max_seeds;
        let throw_distance = plant_stuff_.m_max_reproduction_dis;
        let parent_size = plant_stuff_.m_max_size;
        let range = throw_distance - parent_size;
        let seeds = [];
        for (let i = 0; i<seed_amount; i++ )
        {
            let num = Math.random() * range + parent_size;
            let orient = (Math.random() * 2 * Math.PI) - Math.PI;
            let position = [
                Math.cos(orient)*num + this.m_x_pos,
                Math.sin(orient)*num + this.m_y_pos
            ];
            if (position[0] < world_size_[0] && position[1] < world_size_[1] && position[0] > 0 && position[1] > 0) 
            {
                seeds.push(position); 
            }
        }
        let seeds_on_ground = [];
        
    
        if(obstacles_.length > 0)
        {
            for(let seed of seeds)
            {
                let blocked_flag = false
                for (let obs of obstacles_)
                {
                
                    let distance = Math.sqrt((obs.m_x_pos - seed[0]) ** 2 + (obs.m_y_pos - seed[1]) ** 2)
                    if (distance < obs.m_radius)
                    {
                        blocked_flag = true;
                    }
                }
                if (!blocked_flag)
                {
                    seeds_on_ground.push(seed);
                }
            }
        }
        else
        {
           seeds_on_ground = seeds;
        } 
       
        const next_generation = this.m_generation + 1;
        for(let seed of seeds_on_ground)
        {
            let survival_roll = Math.random();
            if (survival_roll < viability)
            {
                if(this.m_generation >= generation_array_.length)
                {
                    generation_array_.push(0);
                }
                
                generation_array_[next_generation-1] = generation_array_[next_generation-1]+1;
                let next_entity = generation_array_[next_generation-1];
                let time = 0;
                let size = .1;
                let offspring = new Plant(next_generation, next_entity, seed[0], seed[1], size, time);
                plants_array_.push(offspring); 
            }
        }
    }
}
module.exports = Plant;