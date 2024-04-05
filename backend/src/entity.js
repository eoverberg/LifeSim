 class Entity {
    constructor(x_pos_,y_pos_,radius_,lifetime_){
        this.m_x_pos = x_pos_;
        this.m_y_pos = y_pos_;
        this.m_radius = radius_;
        this.m_lifetime = lifetime_;   
    }
}
 class Genes{
    constructor(gene_string_, init_max_HOD_,init_max_HED_,init_max_HOR_){
        this.m_gene_string = gene_string_;
        this.m_init_max_HOD = init_max_HOD_; 
        this.m_init_max_HED = init_max_HED_; 
        this.m_init_max_HOR = init_max_HOR_; 
        this.m_aggro ="";
        this.m_speed ="";
        this.m_strength ="";
        if (gene_string_)
        {
            let g_array = gene_string_.split(' ');
            this.m_speed = g_array[1];
            this.m_aggro = g_array[0];
            this.m_strength = g_array[2];
        }
    }
    setGeneString(g_string_) 
    {
        if (g_string_)
        {
            let g_array = g_string_.split(' ');
            this.m_speed = g_array[1];
            this.m_aggro = g_array[0];
            this.m_strength = g_array[2];
        }
        this.m_gene_string = g_string_; 
    } 
}
 class PredatorInfo {
    constructor(maintain_speed_, energy_out_, energy_to_reproduce_, max_offsprings_, gestation_time_, off_spring_energy_){
        this.m_maintain_speed = maintain_speed_;
        this.m_energy_out = energy_out_;
        this.m_energy_to_reproduce = energy_to_reproduce_;
        this.m_max_offsprings = max_offsprings_;
        this.m_gestation_time = gestation_time_;
        this.m_off_spring_energy = off_spring_energy_;
    }
}
 class GrazerInfo {
    constructor(max_speed_, maintain_speed_, energy_in_,energy_out_,energy_to_reproduce_ ){
        this.m_maintain_speed = maintain_speed_;
        this.m_max_speed = max_speed_;
        this.m_energy_in = energy_in_;
        this.m_energy_out = energy_out_;
        this.m_energy_to_reproduce  = energy_to_reproduce_ ;
    }
}
class PlantInfo {
    constructor(size_,seed_amount_,reproduction_distance_,seed_chance_,growth_rate_){
        this.m_max_size = size_;
        this.m_max_seeds = seed_amount_;
        this.m_max_reproduction_dis = reproduction_distance_;
        this.m_seed_chance = seed_chance_;
        this.m_growth_rate = growth_rate_;
    }
}

module.exports = {Entity,Genes,PlantInfo,GrazerInfo,PredatorInfo};