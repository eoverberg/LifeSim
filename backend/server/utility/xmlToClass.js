const fs = require('fs');
const { XMLParser,  XMLValidator} = require("fast-xml-parser");

function xmlimporter(global, xmlLocation, callback){
  console.log("import started");
  const parser = new XMLParser();
  //var xmlJsonObj = JSON;

  // Read XML content from a file
  let studentData = fs.readFileSync(xmlLocation, 'utf-8', (error, data) => {
    if (error) {
      console.error('Failed to read XML file:', error);
      return;
    }
  })
  
  let studentJSON = parser.parse(studentData);
  const result = XMLValidator.validate(studentData, {
      allowBooleanAttributes: true
  });
  console.log(`Student Data Loaded: ${result}`) // return true
  
  // Validation Failure
  const xmlData = `<LIFE_SIMULATION></LIFE_SIMULATION>`;
  const result1 = XMLValidator.validate( xmlData, {
    unpairedTags: ["extra"]
  });
  console.log(`Student Data Valid: ${result1}`)// throws an error

  //console.log(studentJSON)

  
  global.height = studentJSON.LIFE_SIMULATION.LAND_BOUNDS.WIDTH;
  global.width = studentJSON.LIFE_SIMULATION.LAND_BOUNDS.HEIGHT;

  global.initializePlantInfo(studentJSON.LIFE_SIMULATION.PLANTS.MAX_SIZE, 
    studentJSON.LIFE_SIMULATION.PLANTS.MAX_SEED_NUMBER, 
    studentJSON.LIFE_SIMULATION.PLANTS.MAX_SEED_CAST_DISTANCE, 
    studentJSON.LIFE_SIMULATION.PLANTS.SEED_VIABILITY, 
    studentJSON.LIFE_SIMULATION.PLANTS.GROWTH_RATE
  );
  
  for (let plant of studentJSON.LIFE_SIMULATION.PLANTS.PLANT){
    global.newPlant(plant.X_POS,plant.Y_POS,plant.P_DIAMETER);
  }  
  
  global.initializeGrazerInfo(
    studentJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_INPUT,
    studentJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_OUTPUT,
    studentJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_TO_REPRODUCE,
    studentJSON.LIFE_SIMULATION.GRAZERS.G_MAINTAIN_SPEED,
    studentJSON.LIFE_SIMULATION.GRAZERS.G_MAX_SPEED
  );
  
  for (let grazer of studentJSON.LIFE_SIMULATION.GRAZERS.GRAZER){
    global.newGrazer(grazer.X_POS,grazer.Y_POS,grazer.G_ENERGY_LEVEL);
  }   
  
  global.intializePredatorInfo(
    studentJSON.LIFE_SIMULATION.PREDATORS.P_MAINTAIN_SPEED,
    studentJSON.LIFE_SIMULATION.PREDATORS.P_ENERGY_OUTPUT,
    studentJSON.LIFE_SIMULATION.PREDATORS.P_ENERGY_TO_REPRODUCE,
    studentJSON.LIFE_SIMULATION.PREDATORS.P_MAX_OFFSPRING,
    studentJSON.LIFE_SIMULATION.PREDATORS.P_GESTATION,
    studentJSON.LIFE_SIMULATION.PREDATORS.P_OFFSPRING_ENERGY
  );
  
  global.initializeGenes(studentJSON.LIFE_SIMULATION.PREDATORS.MAX_SPEED_HOD,
    studentJSON.LIFE_SIMULATION.PREDATORS.MAX_SPEED_HED,
    studentJSON.LIFE_SIMULATION.PREDATORS.MAX_SPEED_HOR
  );

  for (let predator of studentJSON.LIFE_SIMULATION.PREDATORS.PREDATOR){
    global.newPredator(predator.X_POS,predator.Y_POS,predator.P_ENERGY_LEVEL,predator.GENOTYPE);
  }
  for (let obstacle of studentJSON.LIFE_SIMULATION.OBSTACLES.OBSTACLE){
    global.newObs(obstacle.X_POS,obstacle.Y_POS,obstacle.O_DIAMETER);
  }
  callback();
}


module.exports = xmlimporter;