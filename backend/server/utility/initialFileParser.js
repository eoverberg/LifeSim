// parses data into string
// saves string to frontend assets folder

const fs = require('fs');

function xmlParser(dataFile, toFile){
    
    let lines =  dataFile.split('\n');
    console.log(lines.length);
    //map width and height
    let width = parseFloat(lines[3]);
    let height = parseFloat(lines[6]);

    //basically treat folder as array
    //finds number of each object 
    //calculates where next object will start 
    //assumes uniform lines for each object
    let num_plants = parseInt(lines[11]);
    //line 29 is where plant objects start
    //each plant object is 11 lines long
    let grazers_start = 29 + 11 * num_plants; 
    let grazers_end = grazers_start + 18;
    let num_grazers = parseInt(lines[grazers_start + 2]);
    let predators_start = grazers_end + 2 + 11 * num_grazers;
    let predators_end = predators_start + 30;
    let num_predators = parseInt(lines[predators_start + 2]);
    let obstacles_start = predators_end + 2 + 14 * num_predators;
    let obstacles_end = obstacles_start + 3;
    let num_obstacles = parseInt(lines[obstacles_start + 2]);

    //start string with known data so front doesn't have to calculant
    let fileString  = lines[3].trim() + "\n" + 
                        lines[6].trim() + "\n" +
                        lines[11].trim() + "\n" +
                        lines[grazers_start + 2].trim() + "\n" +
                        lines[predators_start + 2].trim() + "\n" +
                        lines[obstacles_start + 2].trim() + "\n";
    
    //save each line to file for each object
    //only extracts data needed to display
    for(let i = 0; i < num_plants; i++)
    {
        fileString += lines[30+11*i].trim() + "\n" + lines[33+11*i].trim() + "\n" + lines[36+11*i].trim()+ "\n";
    }
    for(let i = 0; i < num_grazers; i++)
    {
        fileString += lines[grazers_end+3+11*i].trim() + "\n" + lines[grazers_end+6+11*i].trim() + "\n";
    }
    for(let i = 0; i < num_predators; i++)
    {
        fileString += lines[predators_end+3+14*i].trim() + "\n" + lines[predators_end+6+14*i].trim() + "\n";
    }
    for(let i = 0; i < num_obstacles; i++)
    {
        fileString += lines[obstacles_end+3+14*i].trim() + "\n" + lines[obstacles_end+6+14*i].trim() + "\n" + lines[obstacles_end+9+14*i].trim() + "\n";
    }

    //writes whole string to file
    fs.writeFile(toFile, `${fileString}`, (err) => {
        if (err) throw err;
        console.log(`${"StatusReset"}`);
      });
};

module.exports = xmlParser;