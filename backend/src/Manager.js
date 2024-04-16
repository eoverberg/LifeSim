const xmlimporter = require('../server/utility/xmlToClass');
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
        this.m_log_file_locaton = "";
        this.m_top_score = "";
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

        this.m_roster = [];  // array of Student objects
        this.m_instructor_file = ""; // string of xml content
        this.m_top_scores = ""; // string of top five sim information
        
        // retrieves previous saved files and sets fields
        this.getRoster(); 
        this.getInstructorFile();
        this.getTopScores();

        // starts interval
        this.m_interval = setInterval(this.updateLoop, 100);
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
            fs.readFile("../server/assets/TopScores.txt", 'utf8', (error, students) => 
            {
                this.m_top_scores = "";
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
            fs.readFile("../server/assets/InstructorFile.xml", 'utf8', (error, students) => 
            {
                this.m_top_scores = "";
            });
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


    studentNewSimFile(file, callback){
    // delete current file
    // create new file
    // 
    try {
        fs.rmSync(`assets/${file}.txt`);
     } catch (e) {
     }
        xmlimporter(this.simList[0], file, ()=>{callback();});
    }
// how to track student name 
startSim(name_){
    // take in student name parameter
    // check if simulation is already runnin 
    for(let student of this.m_roster)
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
    for(let student of this.m_roster)
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



getCurrent(){
    this.simList[0].printEnts();
}

endSim(student){
    // time played, generations, total lifeforms, 
    let stats = student.m_sim.getStats();
    let score = student.m_sim.getScore(stats);
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
