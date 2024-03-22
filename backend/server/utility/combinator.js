const fs = require('fs');
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");

const parser = new XMLParser();
//var xmlJsonObj = JSON;

// Read XML content from a file
let studentData = fs.readFileSync('../assets/LifeSimulation01.xml', 'utf-8', (error, data) => {
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


// Read second XML content from a file
let instructorData = fs.readFileSync('../assets/InstructorFile.xml', 'utf-8', (error, data) => {
    if (error) {
      console.error('Failed to read XML file:', error);
      return;
    }
  })
  
  let instructorJSON = parser.parse(instructorData);
  const result2 = XMLValidator.validate(instructorData, {
      allowBooleanAttributes: true
  });
  console.log(`Instructor Data Loaded: ${result}`) // return true
  
  // Validation Failure
  const xmlData2 = `<LIFE_SIMULATION></LIFE_SIMULATION>`;
  const result12 = XMLValidator.validate( xmlData, {
    unpairedTags: ["extra"]
  });
  console.log(`Instructor Data Valid: ${result1}`)// throws an error
  

// if (instructorJSON.!== -1)
// {
//   studentJSON.= instructorJSON.;
// }

if (instructorJSON.LIFE_SIMULATION.LAND_BOUNDS.WIDTH !== -1)
{
    studentJSON.LIFE_SIMULATION.LAND_BOUNDS.WIDTH = instructorJSON.LIFE_SIMULATION.LAND_BOUNDS.WIDTH;
}
if (instructorJSON.LIFE_SIMULATION.LAND_BOUNDS.HEIGHT !== -1)
{
  studentJSON.LIFE_SIMULATION.LAND_BOUNDS.HEIGHT= instructorJSON.LIFE_SIMULATION.LAND_BOUNDS.HEIGHT;
}
//LIFE_SIMULATION.PLANTS.INITIAL_PLANT_COUNT
if (instructorJSON.LIFE_SIMULATION.PLANTS.GROWTH_RATE !== -1)
{
  studentJSON.LIFE_SIMULATION.PLANTS.GROWTH_RATE= instructorJSON.LIFE_SIMULATION.PLANTS.GROWTH_RATE;
}
if (instructorJSON.LIFE_SIMULATION.PLANTS.MAX_SIZE !== -1)
{
  studentJSON.LIFE_SIMULATION.PLANTS.MAX_SIZE= instructorJSON.LIFE_SIMULATION.PLANTS.MAX_SIZE;
}
if (instructorJSON.LIFE_SIMULATION.PLANTS.MAX_SEED_CAST_DISTANCE!== -1)
{
  studentJSON.LIFE_SIMULATION.PLANTS.MAX_SEED_CAST_DISTANCE= instructorJSON.LIFE_SIMULATION.PLANTS.MAX_SEED_CAST_DISTANCE;
}
if (instructorJSON.LIFE_SIMULATION.PLANTS.MAX_SEED_NUMBER!== -1)
{
  studentJSON.LIFE_SIMULATION.PLANTS.MAX_SEED_NUMBER= instructorJSON.LIFE_SIMULATION.PLANTS.MAX_SEED_NUMBER;
}
if (instructorJSON.LIFE_SIMULATION.PLANTS.SEED_VIABILITY!== -1)
{
  studentJSON.LIFE_SIMULATION.PLANTS.SEED_VIABILITY= instructorJSON.LIFE_SIMULATION.PLANTS.SEED_VIABILITY;
}
//LIFE_SIMULATION.PLANTS.PLANT

//LIFE_SIMULATION.GRAZERS.INITIAL_GRAZER_COUNT
if (instructorJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_INPUT!== -1)
{
  studentJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_INPUT= instructorJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_INPUT;
}
if (instructorJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_OUTPUT!== -1)
{
  studentJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_OUTPUT= instructorJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_OUTPUT;
}
if (instructorJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_TO_REPRODUCE!== -1)
{
  studentJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_TO_REPRODUCE= instructorJSON.LIFE_SIMULATION.GRAZERS.G_ENERGY_TO_REPRODUCE;
}
if (instructorJSON.LIFE_SIMULATION.GRAZERS.G_MAINTAIN_SPEED!== -1)
{
  studentJSON.LIFE_SIMULATION.GRAZERS.G_MAINTAIN_SPEED= instructorJSON.LIFE_SIMULATION.GRAZERS.G_MAINTAIN_SPEED;
}
if (instructorJSON.LIFE_SIMULATION.GRAZERS.G_MAX_SPEED!== -1)
{
  studentJSON.LIFE_SIMULATION.GRAZERS.G_MAX_SPEED= instructorJSON.LIFE_SIMULATION.GRAZERS.G_MAX_SPEED;
}
//LIFE_SIMULATION.GRAZERS.GRAZER

//LIFE_SIMULATION.PREDATORS.INITIAL_PREDATOR_COUNT
if (instructorJSON.LIFE_SIMULATION.PREDATORS.MAX_SPEED_HOD!== -1)
{
  studentJSON.LIFE_SIMULATION.PREDATORS.MAX_SPEED_HOD= instructorJSON.LIFE_SIMULATION.PREDATORS.MAX_SPEED_HOD;
}
if (instructorJSON.LIFE_SIMULATION.PREDATORS.MAX_SPEED_HED!== -1)
{
  studentJSON.LIFE_SIMULATION.PREDATORS.MAX_SPEED_HED= instructorJSON.LIFE_SIMULATION.PREDATORS.MAX_SPEED_HED;
}
if (instructorJSON.LIFE_SIMULATION.PREDATORS.MAX_SPEED_HOR!== -1)
{
  studentJSON.LIFE_SIMULATION.PREDATORS.MAX_SPEED_HOR= instructorJSON.LIFE_SIMULATION.PREDATORS.MAX_SPEED_HOR;
}
if (instructorJSON.LIFE_SIMULATION.PREDATORS.P_MAINTAIN_SPEED!== -1)
{
  studentJSON.LIFE_SIMULATION.PREDATORS.P_MAINTAIN_SPEED= instructorJSON.LIFE_SIMULATION.PREDATORS.P_MAINTAIN_SPEED;
}
if (instructorJSON.LIFE_SIMULATION.PREDATORS.P_ENERGY_OUTPUT!== -1)
{
  studentJSON.LIFE_SIMULATION.PREDATORS.P_ENERGY_OUTPUT= instructorJSON.LIFE_SIMULATION.PREDATORS.P_ENERGY_OUTPUT;
}
if (instructorJSON.LIFE_SIMULATION.PREDATORS.P_ENERGY_TO_REPRODUCE!== -1)
{
  studentJSON.LIFE_SIMULATION.PREDATORS.P_ENERGY_TO_REPRODUCE= instructorJSON.LIFE_SIMULATION.PREDATORS.P_ENERGY_TO_REPRODUCE;
}
if (instructorJSON.LIFE_SIMULATION.PREDATORS.P_MAX_OFFSPRING!== -1)
{
  studentJSON.LIFE_SIMULATION.PREDATORS.P_MAX_OFFSPRING= instructorJSON.LIFE_SIMULATION.PREDATORS.P_MAX_OFFSPRING;
}
if (instructorJSON.LIFE_SIMULATION.PREDATORS.P_GESTATION!== -1)
{
  studentJSON.LIFE_SIMULATION.PREDATORS.P_GESTATION= instructorJSON.LIFE_SIMULATION.PREDATORS.P_GESTATION;
}
if (instructorJSON.LIFE_SIMULATION.PREDATORS.P_OFFSPRING_ENERGY!== -1)
{
  studentJSON.LIFE_SIMULATION.PREDATORS.P_OFFSPRING_ENERGY= instructorJSON.LIFE_SIMULATION.PREDATORS.P_OFFSPRING_ENERGY;
}

// LIFE_SIMULATION.PREDATORS.PREDATOR
// LIFE_SIMULATION.OBSTACLES.INITIAL_OBSTACLE_COUNT
// LIFE_SIMULATION.OBSTACLES.OBSTACLE

const builder = new XMLBuilder();

const output = builder.build(studentJSON);

// fs.writeFile(toFile, `${fileString}`, (err) => {
//   if (err) throw err;
//   console.log(`${"StatusReset"}`);
// });
fs.writeFile("combinedFile.xml", `${output}`, (err) => {
  if (err) throw err;
  console.log(`${"Files Combined"}`);
});