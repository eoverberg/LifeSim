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
  
  // Converts XML into JSON Data
  let studentJSON = parser.parse(studentData);
  
  // Validates Results
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

  // saves information to the Global object passed in
  global.m_world_size_x = studentJSON.LIFE_SIMULATION.LAND_BOUNDS.WIDTH;
  global.m_world_size_y = studentJSON.LIFE_SIMULATION.LAND_BOUNDS.HEIGHT;

  global.initializePlantInfo(studentJSON.LIFE_SIMULATION.PLANTS.MAX_SIZE, 
    studentJSON.LIFE_SIMULATION.PLANTS.MAX_SEED_NUMBER, 
    studentJSON.LIFE_SIMULATION.PLANTS.MAX_SEED_CAST_DISTANCE, 
    studentJSON.LIFE_SIMULATION.PLANTS.SEED_VIABILITY, 
    studentJSON.LIFE_SIMULATION.PLANTS.GROWTH_RATE
  );
  
  if ( studentJSON.LIFE_SIMULATION.PLANTS.INITIAL_PLANT_COUNT > 1)
  {
    for (let plant of studentJSON.LIFE_SIMULATION.PLANTS.PLANT){
      global.newPlant(plant.X_POS,plant.Y_POS,plant.P_DIAMETER);
    }  
  }
  else if (studentJSON.LIFE_SIMULATION.PLANTS.INITIAL_PLANT_COUNT===1)
  {
    let plant = studentJSON.LIFE_SIMULATION.PLANTS.PLANT;
    global.newPlant(plant.X_POS,plant.Y_POS,plant.P_DIAMETER);
  } 
  
  global.initializeGrazerInfo(
    studentJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_INPUT,
    studentJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_OUTPUT,
    studentJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_TO_REPRODUCE,
    studentJSON.LIFE_SIMULATION.GRAZERS.G_MAINTAIN_SPEED,
    studentJSON.LIFE_SIMULATION.GRAZERS.G_MAX_SPEED
  );
  
  if (studentJSON.LIFE_SIMULATION.GRAZERS.INITIAL_GRAZER_COUNT > 1)
  {
    for (let grazer of studentJSON.LIFE_SIMULATION.GRAZERS.GRAZER){
      global.newGrazer(grazer.X_POS,grazer.Y_POS,grazer.G_ENERGY_LEVEL);
   }   
  }
  else if (studentJSON.LIFE_SIMULATION.GRAZERS.INITIAL_GRAZER_COUNT === 1)
  {
    let grazer = studentJSON.LIFE_SIMULATION.GRAZERS.GRAZER;
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
  if (studentJSON.LIFE_SIMULATION.PREDATORS.INITIAL_PREDATOR_COUNT > 1)
  {
    for (let predator of studentJSON.LIFE_SIMULATION.PREDATORS.PREDATOR)
    {
      global.newPredator(predator.X_POS,predator.Y_POS,predator.P_ENERGY_LEVEL,predator.GENOTYPE);
    }
  }
  else if (studentJSON.LIFE_SIMULATION.PREDATORS.INITIAL_PREDATOR_COUNT === 1)
  {
    let predator = studentJSON.LIFE_SIMULATION.PREDATORS.PREDATOR;
    global.newPredator(predator.X_POS,predator.Y_POS,predator.P_ENERGY_LEVEL,predator.GENOTYPE);
  }
  if (studentJSON.LIFE_SIMULATION.OBSTACLES.INITIAL_OBSTACLE_COUNT > 1)
  {
    for (let obstacle of studentJSON.LIFE_SIMULATION.OBSTACLES.OBSTACLE)
    {
      global.newObs(obstacle.X_POS,obstacle.Y_POS,obstacle.O_DIAMETER,obstacle.O_HEIGHT);
    }
  }
  else if (studentJSON.LIFE_SIMULATION.OBSTACLES.INITIAL_OBSTACLE_COUNT === 1)
  {   
    let obstacle = studentJSON.LIFE_SIMULATION.LIFE_SIMULATION.OBSTACLES.OBSTACLE;
    global.newPredator(obstacle.X_POS,obstacle.Y_POS,obstacle.O_DIAMETER,obstacle.O_HEIGHT);
  }
  

  callback();
}


module.exports = xmlimporter;