const xmlimporter = require('../server/utility/xmlToClass');
const Global = require('../src/Global');

class Student{
    constructor(name_) {
        this.m_name = name_;
        this.m_sim = new Global(); 
        this.m_sim_started = true;
        this.m_buffers = [];

    }
}

class Manager{
    constructor() {
        this.m_buff = "";
        this.m_roster = this.createRoster(); // list of students
        this.m_instructor_file = this.getInstructorFile();
        this.m_buffers = [];
        this.m_current_index = 0;
        this.m_interval = setInterval(updateLoop, 100);
        this.m_top_five = getTopScores();
    }


getTopScores(){
    //retrieves top scores from file
}

getInstructorFile(){
// read instructor file and save string to manager
// can expand and make this an array for multiple instructors
}


// read the roster in and save to array
// create a student object for each in roster
createRoster(){
// read file
// create new student for each one

    return(0 );
}

changeRoster(){
// for loop. flip through array and save student class to the new position in array
// write to file at end    
}

// how to track student name 
startSim(name_){
    // take in student name parameter
    // check if simulation is already runnin 
    for(let student of roster)
    {
        if (student.m_name === name_)
        {
            if(student.m_sim_started)
            {
                this.endSim(student);
            }
            student.buffers = [];
            student.m_current_index = 0;
            student.m_sim = new Global(); // delete old object?
            student.m_sim_started = true;
            break;
        }
    }
}

updateLoop(){
    for(let student of roster)
    {
        if (student.m_sim_started)
        {
            student.m_buffers.push(student.m_sim.update());
        }
    }
}

update(){
    if (this.m_SimEnded)
    {
        return "0"
    }
    this.buff = "";
    
    return this.buff;

}

instructorFileUpload(){

}

import(file, callback){
    // delete current file
    // create new file
    // 
    xmlimporter(this.simList[0], file, ()=>{callback();});
    
}

getCurrent(){
    this.simList[0].printEnts();

}


endSim(student){
    // time played, generations, total lifeforms, 
    stats = student.m_sim.getStats();
    score = student.m_sim.getScore(stats);
    student.m_buffers = [];
    student.m_sim_started=false;
    student.m_current_index = 0;
    this.scoreUpdate(score);
    
    // get stats
    // make score
    // check the score for the best
    // 

} 


}
module.exports = Manager;
