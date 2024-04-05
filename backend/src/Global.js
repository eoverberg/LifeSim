const { Genes, PlantInfo, GrazerInfo, PredatorInfo } = require("./Entity.js");
const Obstacle = require("./ObstacleClass.js");
const Grazer = require("./GrazerClass.js");
const Predator = require("./PredatorClass.js");
const Plant = require("./PlantClass.js");
const { findPredator, findClosest, distanceTo } = require("./UtilitiesFunctions.jsx");
class Global {
    constructor() {
        this.m_int_grazer_count = 0;
        this.m_int_pred_count = 0;
        this.m_int_plant_count = 0;
        this.m_int_obs_count = 0;
        this.m_world_size_x = 0;
        this.m_world_size_y = 0;
        this.m_world_time = 0.0;
        this.m_plant_list = [];
        this.m_pred_list = [];
        this.m_grazer_list = [];
        this.m_obs_list = [];
        this.m_world_matrix = [];
        this.m_template_gene = new Genes();
        this.m_buffer_string = ""; //use printEnts() to add to this string.
        this.m_plant_death_list = []
        this.m_predator_death_list = []
        this.m_grazer_death_list = []
        this.m_plant_stuff = new PlantInfo();
        this.m_predator_stuff = new PredatorInfo();
        this.m_grazer_stuff = new GrazerInfo();
    }

    newPlant(x_, y_, radius_) {
        let temp_plant = new Plant(x_, y_, radius_, 0);
        this.m_plant_list.push(temp_plant);
    }

    newGrazer(x_, y_, energy_) {
        let temp_grazer = new Grazer(x_, y_, 5, 0, energy_);
        this.m_grazer_list.push(temp_grazer);
    }

    newPredator(x_, y_, energy_, gene_string_) {
        this.m_template_gene.setGeneString(gene_string_);
        let temp_predator = new Predator(x_, y_, 5, 0, energy_, { ...this.m_template_gene });
        this.m_pred_list.push(temp_predator);
    }

    newObs(x_, y_, radius_, height_) {
        let temp_obs = new Obstacle(x_, y_, radius_, 0, height_);
        this.m_obs_list.push(temp_obs);
    }

    initializeWorld() {
        // Implement initializeWorld method logic here ((m_world_size_x and m_world_size_y) -1 is bounds)
        this.m_world_matrix = Array.from({ length: this.m_world_size_x }, () =>
            new Array(this.m_world_size_y).fill(0));
    }

    setWorld() {
        // Implement setWorld method logic here
        // we can access m_world_matrix[num][num] therefore we can set it to 1 to show something inside.
    }

    // sets constant info of objects
    initializePlantInfo(max_size_, max_seed_number_, max_seed_cast_distance_, seed_viability_, growth_rate_) {
        this.m_plant_stuff = new PlantInfo(max_size_, max_seed_number_, max_seed_cast_distance_, seed_viability_, growth_rate_);
    }

    initializeGrazerInfo(g_energy_input_, g_energy_output_, g_energy_to_reproduce_, g_maintain_speed_, g_max_speed_) {
        this.m_grazer_stuff = new GrazerInfo(g_max_speed_, g_maintain_speed_, g_energy_input_, g_energy_output_, g_energy_to_reproduce_);
    }

    intializePredatorInfo(p_maintain_speed_, p_energy_output_, p_energy_to_reproduce_, p_max_offspring_, p_gestation_, p_offspring_energy_) {
        this.m_predator_stuff = new PredatorInfo(p_maintain_speed_, p_energy_output_, p_energy_to_reproduce_, p_max_offspring_, p_gestation_, p_offspring_energy_);
    }

    initializeGenes(max_speed_HOD_, max_speed_HED_, max_speed_HOR_) {
        this.m_template_gene = new Genes(" ", max_speed_HOD_, max_speed_HED_, max_speed_HOR_);
    }

    // body logic used in for loop, "thisGrazer" is an iteration of m_pred_list
    grazerDecisionTree(grazer_) {
        let grazer_pred_sight = 25;
        let grazer_food_sight = 150;
        let grazer_smell = 0;
        let obstructions = this.m_obs_list;
        obstructions = obstructions.concat(this.m_plant_list);
        //inside grazer for loop
        // find predator in sight.
        let target_x_y = findPredator(grazer_.m_x_pos, grazer_.m_y_pos, grazer_pred_sight, this.m_pred_list, obstructions);
        if (target_x_y[0] !== 0 || target_x_y[1] !== 0) 
        { // if there is a predator
            grazer_.moveFlee(target_x_y, this.m_grazer_stuff.m_max_speed, this.m_grazer_stuff.m_energy_out, obstructions, this.m_grazer_stuff.maintain_speed);
        }
        else 
        { // no predator, search for food\
            if (grazer_.m_energy > this.m_grazer_stuff.m_energy_to_reproduce ) 
            { // check energy to reproduce
                grazer_.reproduce();
            }
            else 
            { // no predator, no reproduce, find food
                let target = findClosest(grazer_.m_x_pos, grazer_.m_y_pos, this.m_plant_list, this.m_obs_list, grazer_food_sight, grazer_smell);
                if (target) 
                {
                    grazer_.moveSeek(target, this.m_grazer_stuff.m_max_speed, this.m_grazer_stuff.m_energy_out, obstructions);
                    if (distanceTo([grazer_.m_x_pos, grazer_.m_y_pos], [target.m_x_pos, target.m_y_pos]) < 5) 
                    {
                        if (grazer_.eat(target, this.m_grazer_stuff.m_energy_in)) 
                        { 
                            this.m_plant_death_list.push(target); 
                        }
                    }
                }
                else 
                {
                    grazer_.moveWander(this.m_grazer_stuff.m_max_speed, this.m_grazer_stuff.m_energy_out, obstructions);
                }
            } // end no reproduce
        } // end no pred
    } // end grazerDecisionTree    

    // body logic used in for loop, "pred" is an iteration of m_pred_list
    predatorDecisionTree(pred_) 
    {
        let predator_sight = 150;
        let predator_smell = 25;
        let obstructions = [];
        obstructions = obstructions.concat(this.m_obs_list, this.m_plant_list);
        // inside predator for loop 
        let targets = [];
        let target_x_y = [0, 0];
        let target;

        if (pred_.energy >= this.m_predator_stuff.m_energy_to_reproduce ) 
        {  // mating conditions 
            target = findClosest(pred_.m_x_pos, pred_.m_y_pos, this.m_pred_list, obstructions, predator_sight, predator_smell)
            if (target != null) 
            {   // predator in sight
                pred_.moveSeek(target, this.m_predator_stuff.m_maintain_speed, this.m_predator_stuff.m_energy_out, obstructions);
                if (distanceTo([pred_.m_x_pos, pred_.m_y_pos], [target.m_x_pos, target.m_y_pos]) < 5)
                    {
                        pred_.reproduce(target);
                }
            }
            else 
            {   // no predators in sight, find food
                target = findClosest(pred_.m_x_pos, pred_.m_y_pos, this.m_grazer_list, obstructions, predator_sight, predator_smell) //no pred in sight
                if (target != null) 
                {
                    pred_.moveSeek(target, this.m_predator_stuff.m_maintain_speed, this.m_predator_stuff.m_energy_out, obstructions);
                    if (distanceTo([pred_.m_x_pos, pred_.m_y_pos], [target.m_x_pos, target.m_y_pos]) < 5) 
                    {
                        if (pred_.eat(target)) 
                        {
                            this.m_grazer_death_list.push(target);
                        }
                    }
                }
                else 
                {
                    pred_.moveWander(this.m_predator_stuff.m_maintain_speed, this.m_predator_stuff.m_energy_out, obstructions);
                }
            }
        }
        else { // not mating
            if (pred_.m_aggro === "aa") {
                target_x_y = findPredator(pred_.m_x_pos, pred_.m_y_pos, predator_sight, this.m_pred_list, obstructions)
                if (target_x_y[0] !== 0 || target_x_y[1] !== 0) 
                { // predator in sight
                    pred_.moveFlee(target_x_y, this.m_predator_stuff.m_maintain_speed, this.m_predator_stuff.m_energy_out, obstructions)
                }
                else 
                { //no predator in sight   
                    target = findClosest(pred_.m_x_pos, pred_.m_y_pos, this.m_grazer_list, obstructions, predator_sight, predator_smell) //no pred in sight
                    if (target)
                    {
                        pred_.moveSeek(target, this.m_predator_stuff.m_maintain_speed, this.m_predator_stuff.m_energy_out, obstructions);
                        if (distanceTo([pred_.m_x_pos, pred_.m_y_pos], [target.m_x_pos, target.m_y_pos]) < 5) 
                        {
                            if (pred_.eat(target)) 
                            {
                                this.m_grazer_death_list.push(target);
                            }
                        }
                    }
                    else 
                    {
                        pred_.moveWander(this.m_predator_stuff.m_maintain_speed, this.m_predator_stuff.m_energy_out, obstructions);
                    }
                } // end no predator
            } // end "aa"
            else if (pred_.m_aggro === "Aa") 
            { // not mating just looking for food
                target = findClosest(pred_.m_x_pos, pred_.m_y_pos, this.m_grazer_list, obstructions, predator_sight, predator_smell)
                if (target) 
                { // grazer in sight 
                    pred_.moveSeek(target, this.m_predator_stuff.m_maintain_speed, this.m_predator_stuff.m_energy_out, obstructions);
                    if (distanceTo([pred_.m_x_pos, pred_.m_y_pos], [target.m_x_pos, target.m_y_pos]) < 5) 
                    {
                        if (pred_.eat(target)) 
                        {
                            this.m_grazer_death_list.push(target);
                        }
                    }
                }
                else { // no grazer in sight   
                    target = findClosest(pred_.m_x_pos, pred_.m_y_pos, this.m_pred_list, obstructions, predator_sight, predator_smell) //no pred in sight
                    if (target) 
                    {
                        pred_.moveSeek(target, this.m_predator_stuff.m_maintain_speed, this.m_predator_stuff.m_energy_out, obstructions);
                        if (distanceTo([pred_.m_x_pos, pred_.m_y_pos], [target.m_x_pos, target.m_y_pos]) < 5) 
                        {
                            if (pred_.eat(target)) 
                            {
                                this.m_predator_death_list.push(target);
                            }
                        }
                    }
                    else 
                    {
                        pred_.moveWander(this.m_predator_stuff.m_maintain_speed, this.m_predator_stuff.m_energy_out, obstructions);
                    }
                } // end no grazer
            } // end "AA"
            else if (pred_.m_aggro === "AA") 
            { //not mating just looking for food
                targets = targets.concat(this.m_grazer_list, this.m_pred_list)
                target = findClosest(pred_.m_x_pos, pred_.m_y_pos, targets, obstructions, predator_sight, predator_smell)
                if (target) 
                {
                    pred_.moveSeek(target, this.m_predator_stuff.m_maintain_speed, this.m_predator_stuff.m_energy_out, obstructions);
                    if (distanceTo([pred_.m_x_pos, pred_.m_y_pos], [target.m_x_pos, target.m_y_pos]) < 5) 
                    {
                        if (pred_.eat(target)) 
                        {
                            if (pred_ instanceof Predator) 
                            {
                                this.m_predator_death_list.push(target);
                            }
                            else if (pred_ instanceof Grazer) 
                            {
                                this.m_predator_death_list.push(target);
                            }
                        }
                    }
                }
                else 
                {
                    pred_.moveWander(this.m_predator_stuff.m_maintain_speed, this.m_predator_stuff.m_energy_out, obstructions);
                }
            } // end "AA"
        } // end not mating
    } // end predatorDecisionTree

    // outputs string of all entities' information needed to display.
    printEnts() 
    {
        let return_string = this.m_world_size_x + "," + this.m_world_size_y + "," + this.m_plant_list.length + "," + this.m_grazer_list.length + "," + this.m_pred_list.length + "," + this.m_obs_list.length + ",";
        for (let p of this.m_plant_list) 
        {
            return_string += `${p.m_x_pos},`;
            return_string += `${p.m_y_pos},`;
            return_string += `${p.m_radius},`;
        }
        for (let g of this.m_grazer_list) 
        {
            return_string += `${g.m_x_pos},`;
            return_string += `${g.m_y_pos},`;
        }
        for (let p of this.m_pred_list) 
        {
            return_string += `${p.m_x_pos},`;
            return_string += `${p.m_y_pos},`;
        }
        for (let o of this.m_obs_list) 
        {
            return_string += `${o.m_x_pos},`;
            return_string += `${o.m_y_pos},`;
            return_string += `${o.m_radius},`;
        }

        return return_string;
    }
    plantDecisionTree(plant) 
    {
        //This is a tempory holder for the plant dc  
        if (plant.m_radius !== this.m_plant_stuff.m_max_size && plant.m_lifetime >= 10) 
        {
            plant.m_radius = plant.m_radius + (this.m_plant_stuff.m_max_size * 0.01); // grow by 1% max
        }
        if (plant.m_radius === this.m_plant_stuff.m_max_size) 
        {
            plant.reproTimer += 1
            if (plant.reproTimer % 3600 === 0) 
            {
                plant.reproduce(this.m_plant_list)
            }
        }
        plant.m_lifetime++
    }
    tempDeathCheck() 
    {
        //when things die add to this list with append
        if (this.m_plant_death_list.length > 0) 
        {
            for (let i = 0; i < this.m_plant_death_list.length; i++) 
            {
                let x = this.m_plant_death_list.pop()
                this.m_plant_list = this.m_plant_list[x].splice(x, 1)
            }
        }
        if (this.m_predator_death_list.length > 0) 
        {
            for (let i = 0; i < this.m_predator_death_list.length; i++)
            {
                let x = this.m_predator_death_list.pop()
                this.m_pred_list = this.m_pred_list[x].splice(x, 1)
            }
        }
        if (this.m_grazer_death_list.length > 0) 
        {
            for (let i = 0; i < this.m_grazer_death_list.length; i++) 
            {
                let x = this.m_grazer_death_list.pop()
                this.m_grazer_list = this.m_grazer_list[x].splice(x, 1)
            }
        }
    }
    update(callback) 
    {
        let bufferSize = 20;
        if (this.m_plant_list && this.m_grazer_list && this.m_pred_list) 
        {
            for (let i = 0; i < bufferSize; i++) 
            {
                for (let plant of this.m_plant_list) 
                {
                    this.plantDecisionTree(plant);
                }
                for (let grazer of this.m_grazer_list) 
                {
                    this.grazerDecisionTree(grazer)
                }
                for (let predator of this.m_pred_list) 
                {
                    this.predatorDecisionTree(predator);
                }
                // this.tempDeathCheck();
                this.m_buffer_string += this.printEnts() + "\n";
            }
        }
        else {

        }
        callback(this.m_buffer_string);
    }
}



module.exports = Global;
