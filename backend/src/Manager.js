const CombineXML = require('../server/utility/CombineXML');
const JSONToClass = require('../server/utility/JSONToClass');
const Global = require('../src/Global');
const fs = require('fs');
class Student{
    constructor(name_) {
        this.m_name = name_;
        this.m_sim = new Global(); 
        this.m_sim_started = false;
        this.m_buffers = [];
        this.m_current_index = 0;
        this.m_xml_file_location = "";
        this.m_combined_file_location = "";
        this.m_log_file_locaton = "";
        this.m_top_score = "";
        this.m_xml_data = "";// do I need this?
        this.m_combined_JSON =""; // probably need this
        this.m_combined_XML =""; // probably need this
    }
    getStats(){
        let time_seconds = this.m_sim.m_world_time;
        let plant_gen = this.m_sim.m_plant_generation;
        let grazer_gen = this.m_sim.m_grazer_generation;
        let predator_gen = this.m_sim.m_predator_generation;
        let total_generations = plant_gen.length+grazer_gen.length+predator_gen.length;
        let time_hours = time_seconds/3600;
        let time_days = time_hours/24;
        let score = total_generations+time_days;
        return score;
    }
}

// should be instantiated at server start. 
// persistent between multiple users 
// single instructor file for right now
// multiple instructors mean multiple rosters
// but a single instructor might still have multiple files.
class Manager{
    constructor() {
        // file locations
        this.m_instructor_file_location = "../server/assets/InstructorFile.xml";
        this.m_roster_file_location = "../server/assets/roster.txt";
        // change to a hash map and undo stupid for loops
        this.m_roster = [];  // array of Student objects
        this.m_roster_string = "";
        this.m_instructor_file = ""; // string of xml content
        this.m_top_scores = new Map();
        this.m_top_scores_string = ""; // string of top five sim information
        
        // retrieves previous saved files and sets fields
        this.getRoster(); 
        this.getInstructorFile();
        this.getTopScores();

        // starts interval
        this.startLoop();
        
    }

    findStudent(name_){
        for(let student of this.m_roster)
        {
            if (student.m_name === name_)
            {
                return student;
            }
        }
        return null;
    }
    // possibly save the students as json at a later date
    // fetches string of students
    // sets roster as array of Student object
    getRoster(){
        try 
        {
            fs.readFile("../server/assets/roster.txt", 'utf8', (error, students) => 
            {
                try
                {
                    
                    let string_array = students.split(",");
                    for(let name of string_array)
                    {
                        let duplicate = false;
                        if(this.m_roster.length > 0)
                        {
                            for (let student of this.m_roster)
                            {
                                if (student.m_name === name)
                                {
                                    (duplicate = true)
                                }
                            }
                        }
                        if (!duplicate)
                        {
                            this.m_roster.push(new Student(name));
                        }
                    }
                    this.m_roster_string = students;
                }
                catch(err)
                {
                // figure out error handling, one name, other roster breakers
                }
            });
        } catch (err) 
        {
            // if zero roster or unaccessible file, what to do
        }
    } 

    getTopScores(){
    //retrieves top scores from file
        try 
        {
            fs.readFile("../server/assets/TopScores.txt", 'utf8', (error, scores) => 
            {
                this.m_top_scores_string = scores;
                let top = JSON.parse(scores);
                
               
                this.m_top_scores = top;
            });
        } catch (err) 
        {
            // if zero roster or unaccessible file, what to do
        }
    }

    // read instructor file and save string to manager
    // can expand and make this an array for multiple instructors
    getInstructorFile(){
        try 
        {
           this.m_instructor_file = fs.readFileSync("../server/assets/InstructorFile.xml", 'utf-8', (error, data) => {
            if (error) {
              console.error('Failed to read XML file:', error);
              return;
            }
          })
        } catch (err) 
        {
            // if zero roster or unaccessible file, what to do
        }

    }

    // insturctor add/deletes student
    // sends a string of new roster.
    // manager makes a new roster. 
    // old student objects are kept and new ones are added
    // missing ones are ignored... memory leak? or does js handle it
    
    changeRoster(roster_string_){
    // for loop. flip through array and save student class to the new position in array
    // write to file at end    
        try
        {
            let string_array = roster_string_.split(",");
            let temp_roster = [];
            if(this.m_roster.length === 0)
            {
                for(let name of string_array)
                {
                    temp_roster.push(new Student(name));
                }
            }
            else
            {
                for(let name of string_array)
                {
                    let duplicate = false;
                    for (let student of this.m_roster)
                    {
                        if (student.m_name === name)
                        {
                            duplicate = true;
                            temp_roster.push(student);
                            break;
                        }
                    }
                    if (!duplicate)
                    {
                        temp_roster.push(new Student(name));
                    }
                }
            }
            // throw change in file write try in order to keep from have different rosters?
            this.m_roster = temp_roster;
            try 
            {
                fs.writeFile("../server/assets/roster.txt", roster_string_, (err) => {
                    if (err) throw err;
                });
            } 
            catch (e) 
            {
            }
        }
        catch(err)
        {
            // figure out error handling, one name, other roster breakers
        }
       
    }

    getXMLFileName(name_)
    {
        for(let student of this.m_roster)
        {
            if (student.m_name === name_)
            {
                return student.m_xml_file_location;
            }
        }
    }

    // Parameters
    // name_: name of student
    // file_: the actual file from file express
    // callback: might not be needed.
    // combine with what its combbinator
    // set json to class
    studentNewSimFile(name_, file_, callback_){
        // find current student
        let current_student = this.findStudent(name_); 
        current_student.m_buffers = [];
        current_student.m_current_index = 0;
        if (current_student)
        {
            let [data_JSON, data_XML] = CombineXML(file_.data, this.m_instructor_file);
            JSONToClass(current_student.m_sim, data_JSON);
            current_student.m_combined_XML = data_XML;
            current_student.m_combined_JSON = data_JSON;
            current_student.m_sim_started = true;
        }
        callback_();
    }
    // // how to track student name 
    //     startSim(name_){
    //     // take in student name parameter
        //     // check if simulation is already runnin 
    //         for(let student of this.m_roster)
    //     {
    //         if (student.m_name === name_)
        //         {
    //             if(student.m_sim_started)
    //             {
    //                 this.endSim(student);
    //             }
    //             student.buffers = [];
    //            student.m_current_index = 0;
    //             student.m_sim = new Global(); // delete old object?
    //             student.m_sim_started = true;
    //             break;
    //         }
    //     }
    // }
    
    startLoop(){
        this.m_interval = setInterval(()=>{
            if(this.m_roster.length > 0)
            {
                for(let student of this.m_roster)
                {
                    if (student.m_sim_started)
                    {
                        let buffer = 500;
                        let [buffer_size, buffer_string] = student.m_sim.update(buffer);
                        if(buffer_size > 0)
                        {
                            student.m_buffers.push(buffer_string);
                        }
                        // check if sim ended
                        if(buffer_size !== buffer)
                        {
                            student.m_sim_started = false;
                            this.endSim(student);
                        }   
                    }
                }
            }
        }, 100);
    }
    
    checkBuffers(name_){
        let current_student = this.findStudent(name_);
        if(current_student.m_buffers.length > current_student.m_current_index )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    getBuffer(name_){
        let current_student = this.findStudent(name_); 
        let buffer = current_student.m_buffers[current_student.m_current_index];
        current_student.m_current_index++;
        return buffer;
    }

    instructorFileUpload(){

    }



getCurrent(){
    this.simList[0].printEnts();
}


scoreUpdate(name_, score_){
    let change_flag = false;
    if(this.m_top_scores.length < 5)
    {
        change_flag = true;
        this.m_top_scores.top_scores.push({name: name_, score: Math.round(score_)});
    }
    else
    {
        let list = this.m_top_scores.top_scores;
        let temp_list = [];
        
        let name_to_insert = name_;
        let score_to_insert = Math.round(score_);
        for(let pair of list)
        {
            if(score_to_insert > pair.score)
            {   
                change_flag = true;
                let temp_name = name_to_insert;
                let temp_score = score_to_insert;
                score_to_insert = pair.score;
                name_to_insert = pair.name;
                pair.name = temp_name;
                pair.score = temp_score;
                
                
            }    
            temp_list.push(pair);
        }
        this.m_top_scores.top_scores = temp_list;
        this.m_top_scores_string = JSON.stringify(this.m_top_scores);
        if(change_flag)
        {
            fs.writeFile("../server/assets/TopScores.txt", this.m_top_scores_string, (err) => {
                if (err) throw err;
                console.log(`${this.m_top_scores_string}`);
            });
        }
    }

}

endSim(student){
    // time played, generations, total lifeforms, 
    //let stats = student.m_sim.getStats();
    //let score = student.m_sim.getScore(stats);
    let score = student.getStats();
    student.m_sim_started=false;
    this.scoreUpdate(student.m_name, score);
} 

}

module.exports = Manager;
