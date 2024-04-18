const { Entity, Genes} = require('./Entity.js');
const Grazer = require('./GrazerClass.js');
const { seek, flee, wander, changePosition } = require('./Movement.js');
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
        this.m_ate = false;
        this.m_gestation_timer = 0;
        this.m_mate_genes = [];// aggro, strength, speed
    }

    mate(target_){
        if (this.m_gestation_timer ===0)
        {
            this.m_gestation_timer++;
            this.m_mate_genes = [target_.m_genes_obj.m_aggro, target_.m_genes_obj.m_strength, target_.m_genes_obj.m_speed];
            this.m_ignore_list.push([target_.m_generation,target_.m_UID,0]);
        }
        if (target_.m_gestation_timer ===0)
        {
            target_.m_gestation_timer++;
            target_.m_mate_genes = [this.m_genes_obj.m_aggro, this.m_genes_obj.m_strength, this.m_genes_obj.m_speed];
            target_.m_ignore_list.push([this.m_generation,this.m_UID,0]);
        }

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
            if (this.m_speed <= 0)
            {
                this.m_speed = 0;
            }
            else if ((this.m_sprint_time - maintain_seconds)%15 === 0)
            {// assuming 1 du mean 1 du/minute
                this.m_speed -= .0167;
            }
            if (this.m_sprint_time >= maintain_seconds + 300)
            {
                this.m_speed = this.getSpeed();
            }
        }
    }

    updateTimes(){
        this.m_lifetime++;
        if(this.m_gestation_timer !== 0)
        {
            this.m_gestation_timer++;
        }
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
        let target_strength = "";
        if (entity_ instanceof Predator)
        {
            target_strength = entity_.m_genes_obj.m_strength;
        }
        
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
                entity_.m_ignore_list.push([this.m_generation,this.m_UID, 0]);
            }
        }
    }

    reproduce(predators_array_, generation_array_, max_offspring_, offspring_energy_) {

        const next_generation = this.m_generation + 1;
        let offspring_array = []; 
        if(this.m_generation >= generation_array_.length)
        {
            generation_array_.push(0);
        }

        for(let i = 0; i < max_offspring_; i++)
        {
        var g_string = "";
        var temp = "";
        temp = temp.concat(this.m_genes_obj.m_aggro[Math.floor(Math.random() * 2)], this.m_mate_genes[0][Math.floor(Math.random() * 2)]);
        if (temp === "aA") {
            temp = "Aa";
        }
        g_string = g_string.concat(temp, " ");
        temp = "";
        temp = temp.concat(this.m_genes_obj.m_strength[Math.floor(Math.random() * 2)], this.m_mate_genes[1][Math.floor(Math.random() * 2)]);
        if (temp === "sS") {
            temp = "Ss";
        }
        
        g_string = g_string.concat(temp, " ");
        temp = "";
        temp = temp.concat(this.m_genes_obj.m_speed[Math.floor(Math.random() * 2)], this.m_mate_genes[2][Math.floor(Math.random() * 2)]);
        if (temp === "fF") {
            temp = "Ff";
        }
        
        g_string = g_string.concat(temp);
       
        
            generation_array_[next_generation-1] = generation_array_[next_generation-1]+1;
            let next_entity = generation_array_[next_generation-1];
            let gene_copy = new Genes(g_string, this.m_genes_obj.m_init_max_HOD, this.m_genes_obj.m_init_max_HED, this.m_genes_obj.m_init_max_HOR);
            let offspring = new Predator(next_generation, next_entity, this.m_x_pos, this.m_y_pos, this.m_radius, 0, offspring_energy_, gene_copy);
            predators_array_.push(offspring);
            this.m_ignore_list.push([next_generation,next_entity,0]);
            offspring_array.push(offspring);
        }

        for (let i = 0; i < offspring_array.length; i++)
        {
            for (let j = 0; j < offspring_array.length; j++)
            {
                if (j!==i)
                {
                    offspring_array[i].m_ignore_list.push([offspring_array[j].m_generation, offspring_array[j].m_UID, 0])
                }
            }
        }
        this.m_gestation_timer = 0;
    }

    moveSeek(target_, speed_time_, energy_use_, world_size_, obstructions_) {
        
        let steering = seek([this.m_x_pos, this.m_y_pos], [target_.m_x_pos, target_.m_y_pos], this.m_speed);
        changePosition(this, steering, energy_use_, world_size_, obstructions_, this.m_speed);
        this.updateSpeed(speed_time_);
    

    }

    moveWander(speed_time_, energy_use_, world_size_, obstructions_) {
       
        let steering = wander(this, this.m_speed);
        changePosition(this, steering, energy_use_, world_size_, obstructions_, this.m_speed);
        this.updateSpeed(speed_time_);
    }

    moveFlee(target_x_y_, speed_time_, energy_use_, world_size_, obstructions_) {
        // check if path is clear
        let steering = flee([this.m_x_pos, this.m_y_pos], [target_x_y_[0], target_x_y_[1]], this.m_speed)
        changePosition(this, steering, energy_use_, world_size_, obstructions_, this.m_speed);
        this.updateSpeed(speed_time_);
    }

}

module.exports = Predator;
