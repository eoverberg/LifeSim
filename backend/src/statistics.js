
//const fs = require('fs');

class Statistics{
    constructor()
    {
        this.simulation_name="default_name";
        this.time_played=0;
        this.generation_counts=[0,0,0];
        this.lifeform_counts=[0,0,0];
        this.stats_delimiter = '\n';
    }

   
    get name() {return this.simulation_name;};
    set name(inName) {this.simulation_name=inName;};
    get time() {return this.time_played;};
    set time(inTime) {this.time_played=inTime;};
    get generations() {return this.generation_counts;};
    set generations(inGenerations) {this.generations=inGenerations;};
    get counts() {return this.lifeform_counts;};
    set counts(inLifeforms) {this.lifeform_counts=inLifeforms;};

    // might just add report as a line, if so create an initializer 
    // and print_report will add instead of replace
     
    print_report(){
        let file_string=this.simulation_name + this.stats_delimiter;
        file_string.concat(this.time_played,this.stats_delimiter);
        file_string.concat(this.generation_counts[0], this.stats_delimiter);
        file_string.concat(this.generation_counts[1], this.stats_delimiter);
        file_string.concat(this.generation_counts[2], this.stats_delimiter);
        file_string.concat(this.lifeform_counts[0], this.stats_delimiter);
        file_string.concat(this.lifeform_counts[1], this.stats_delimiter);
        file_string.concat(this.lifeform_counts[2], this.stats_delimiter);
        return file_string;
    }


}


module.exports = Statistics;