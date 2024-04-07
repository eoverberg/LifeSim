
//const fs = require('fs');

class Statistics{
    constructor()
    {
        this.m_simulation_name="default_name";
        this.m_time_played=0;
        this.m_generation_counts=[0,0,0];
        this.m_lifeform_counts=[0,0,0];
        this.m_stats_delimiter = '\n';
    }


    // might just add report as a line, if so create an initializer 
    // and print_report will add instead of replace
     
    print_report(){
        let file_string=this.m_simulation_name + this.m_stats_delimiter;
        file_string.concat(this.m_time_played,this.m_stats_delimiter);
        file_string.concat(this.m_generation_counts[0], this.m_stats_delimiter);
        file_string.concat(this.m_generation_counts[1], this.m_stats_delimiter);
        file_string.concat(this.m_generation_counts[2], this.m_stats_delimiter);
        file_string.concat(this.m_lifeform_counts[0], this.m_stats_delimiter);
        file_string.concat(this.m_lifeform_counts[1], this.m_stats_delimiter);
        file_string.concat(this.m_lifeform_counts[2], this.m_stats_delimiter);
        return file_string;
    }


}


module.exports = Statistics;