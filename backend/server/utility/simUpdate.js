// TEMPORARY SHIT
const fs = require('fs');

function simUpdate(userName, dataFile, toFile){
  console.log("Sim Update Started")
    let data_delimiter = ',';
    let lines =  dataFile.split(data_delimiter);
    let num_plants = parseInt(lines[2]);
    let grazers_start = 6 + 3 * num_plants;
    let num_grazers = parseInt(lines[3]);
    let predators_start = grazers_start + 2 * num_grazers;
    let num_predators = parseInt(lines[4]);
    let obstacles_start = predators_start + 2 * num_predators;
    let num_obstacles = parseInt(lines[5]);

    let fileString  = lines[0].trim() + data_delimiter + 
                        lines[1].trim() + data_delimiter +
                        lines[2].trim() + data_delimiter +
                        lines[3].trim() + data_delimiter +
                        lines[4].trim() + data_delimiter +
                        lines[5].trim() + data_delimiter;

    //draw plants
    for (let i = 0; i < num_plants; i++)
    {
       let x = parseInt(lines[6 + 3*i]).toString(); 
       let y = parseInt(lines[7 +3*i]).toString();
       let diameter = parseFloat(lines[8 +3*i]).toString();
       fileString  = fileString.concat(x, data_delimiter, y, data_delimiter, diameter, data_delimiter);
    }
    //draw grazers
    for (let i = 0; i < num_grazers; i++)
    {
        let x = parseInt(lines[grazers_start+2*i]).toString();
        let y = parseInt(lines[grazers_start+1+2*i]).toString();
        fileString  = fileString.concat(x, data_delimiter, y, data_delimiter);
    }
    //draw predators
    for (let i = 0; i < num_predators; i++)
    {
        let direction = (Math.floor(Math.random() * 5) - 2) * 5 ;
        let x = (parseInt(lines[predators_start+2*i])+direction).toString();
        let y = (parseInt(lines[predators_start+1+2*i])+direction).toString();
        fileString  = fileString.concat(x, data_delimiter, y, data_delimiter);
    }
    //draw obstacles
    for (let i = 0; i < num_obstacles; i++)
    {
      let x = parseInt(lines[obstacles_start+3*i]).toString();
      let y = parseInt(lines[obstacles_start+1+3*i]).toString();
      let diameter = parseFloat(lines[obstacles_start+2+3*i]).toString();
      fileString  = fileString.concat(x, data_delimiter, y, data_delimiter, diameter, data_delimiter);
    }
    let lastString;
    lastString = fileString;
    let endNum = 400;
    for(let j = 0; j < endNum; j++){
      lines = lastString.split(',');
      let newString = "";
      for (let i = 0; i < predators_start; i++){
           newString = newString.concat(lines[i], data_delimiter);
      }
      for (let i = 0; i < num_predators; i++)
      {
        let x_direction = (Math.floor(Math.random() * 5) - 2) * 5 ;
        let y_direction = (Math.floor(Math.random() * 5) - 2) * 5 ;
        let x = (parseInt(lines[predators_start+2*i])+x_direction).toString();
        let y = (parseInt(lines[predators_start+1+2*i])+y_direction).toString();
        newString  = newString.concat(x, data_delimiter, y, data_delimiter);
      }
      for (let i = obstacles_start; i < lines.length - 1; i++){
        newString = newString.concat(lines[i], data_delimiter);
      }
      newString = newString.concat(lines[lines.length - 1]);
      if (j === endNum-1){
        fs.writeFile(`assets/${userName}0.txt`, newString, (err) => {
          if (err) throw err;
          console.log("StartFileUpdated");
        });
      }
      fileString = fileString.concat('\n', newString);
      lastString = newString;
    } 

    //writes whole string to file
    fs.writeFile(`assets/${toFile}.txt`, fileString, (err) => {
        if (err) throw err;
        console.log(`${"SimulationUpdated"}`);
      });
};

module.exports = simUpdate;
    