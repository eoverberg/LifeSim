
const {isColliding, checkLOS, findPredator, findClosest, checkPath, distanceTo} = require('./UtilitiesFunctions');
const Global = require('./Global.js');
const { Genes, PlantInfo, GrazerInfo, PredatorInfo } = require("./Entity.js");
const Obstacle = require("./ObstacleClass.js");
const Grazer = require("./GrazerClass.js");
const Predator = require("./PredatorClass.js");
const Plant = require("./PlantClass.js");
//import entities?
//test findpred
//function to 
//crete the global arrays of all entities
//call test
 
// test('check LOS is blocked', () => {
//   let testGlobe = new Global();
//   testGlobe.newPlant(10,10,10);
//   testGlobe.newGrazer(30,30,5,50);
//   testGlobe.newPredator(50,50,5,50,"aa ss ff");
//   testGlobe.newObs(40,40,5,5);
//    let blocked = testGlobe.checkLOS(30,30,20,20,800,testGlobe.obsList);
//    expect(blocked).toStrictEqual(true);
//  });
// test('check gene', () => {
//   let testGlobe = new Global();
//   testGlobe.newPlant(10,10,10);
//   testGlobe.newGrazer(30,30,5,50);
//   testGlobe.newPredator(50,50,50,"aa ss ff");
//   let blocked = checkLOS(30,30,20,20,800,testGlobe.obsList);
//   expect(blocked).toStrictEqual(false);
//   });

// test('print ent', () => {
//   let testGlobe = new Global();
//   testGlobe.newPlant(10,10,10);
//   testGlobe.newGrazer(30,30,5,50);
//   testGlobe.newPredator(5,25,50,"aa ss ff");
//   testGlobe.newObs(25,5,5,5);
//   //testGlobe.grazerDecisionTree(testGlobe.grazerList[0]);
//   expect(testGlobe.grazerList[0].x).toStrictEqual(30);
// });

//   test('Predator within distance but not LOS', () => {
//     let testGlobe = new Global();
//     testGlobe.newPlant(10,10,10);
//     testGlobe.newGrazer(30,30,5,50);
//     testGlobe.newPredator(50,50,5,50,"aa ss ff");
//     testGlobe.newObs(40,40,5,5);
//      let target = testGlobe.findPredator(30,30,150);
//      expect(target).toStrictEqual([0,0,0]);
//    });


// test('closest', () => {
//   let testGlobe = new Global();
//   testGlobe.newPlant(10,10,10);
//   testGlobe.newGrazer(30,30,5,50);
//   testGlobe.newPredator(50,50,5,50,"aa ss ff");
//   testGlobe.newObs(40,40,5,5);
//   let target = testGlobe.findClosest(30, 30, testGlobe.plantList, testGlobe.obsList, 150, 0);
//   expect(target).toStrictEqual([10,10,0]);
// });

// test('Grazer finds plant', () => {
//   let testGlobe = new Global();
//   testGlobe.newPlant(10,10,10);
//   testGlobe.newGrazer(30,30,5,50);
//   testGlobe.newPredator(50,50,5,50,"aa ss ff");
//   testGlobe.newObs(40,40,5,5);
//   let target = testGlobe.getGrazerTarget(30,30,150);
//   expect(target).toStrictEqual([10,10,1]);
// });

// test('Grazer in obstacle', () => {
//   let testGlobe = new Global();
//   //this.m_plant_stuff = new PlantInfo();
//   //this.m_predator_stuff = new PredatorInfo();
//   testGlobe.m_grazer_stuff = new GrazerInfo(20, 3, 5,1, 100);
//   testGlobe.m_world_size_x = 500;
//   testGlobe.m_world_size_y = 500;
//   testGlobe.newPlant(10,10,10);
//   let plant_edge_x = 5*(Math.sqrt(2)) + 9.5; 
//   let plant_edge_y = 5*(Math.sqrt(2)) + 9.5; 
//   testGlobe.newGrazer(plant_edge_x,plant_edge_y,50);
//   testGlobe.newPredator(400,400,50,"aa ss ff");
//   testGlobe.newObs(25,5,5,5);
//   testGlobe.grazerDecisionTree(testGlobe.m_grazer_list[0]);
//   //expect(target).toStrictEqual([40,40,0]);
// });

test('Grazer reproduces', () => {
  let testGlobe = new Global();
  //this.m_plant_stuff = new PlantInfo();
  //this.m_predator_stuff = new PredatorInfo();
  testGlobe.m_grazer_stuff = new GrazerInfo(20, 3, 5,1, 100);
  testGlobe.newGrazer(50,50,50);
  let grazer = testGlobe.m_grazer_list[0];
  grazer.m_energy = 105;
  grazer.reproduce(testGlobe.m_grazer_list, testGlobe.m_grazer_generation)
  expect(testGlobe.m_grazer_list[1].m_generation).toStrictEqual(2);
  expect(testGlobe.m_grazer_list[1].m_UID).toStrictEqual(1);
  //testGlobe.m_world_size_x = 500;
  //testGlobe.m_world_size_y = 500;
  //testGlobe.newPredator(400,400,50,"aa ss ff");
  //testGlobe.newObs(25,5,5,5);
  //testGlobe.grazerDecisionTree(testGlobe.m_grazer_list[0]);
  //expect(target).toStrictEqual([40,40,0]);
});

// test('pred finds grazer', () => {
//   let testGlobe = new Global();
//   testGlobe.newPlant(10,10,10);
//   testGlobe.newGrazer(30,30,5,50);
//   testGlobe.newPredator(40,40,5,50,"aa ss ff");
//   testGlobe.newPredator(50,50,5,50,"AA ss ff");
//   testGlobe.newObs(25,5,5,5);
//   let target = testGlobe.getPredatorTarget(testGlobe.predList[0]);
//   expect(target).toStrictEqual([50,50,0]);
//   let target2 = testGlobe.getPredatorTarget(testGlobe.predList[1]);
//   expect(target2).toStrictEqual([40,40,1]);
// });