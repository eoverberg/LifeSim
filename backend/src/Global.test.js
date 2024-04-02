
import Global from './Global.js';

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
test('check gene', () => {
    let testGlobe = new Global();
    testGlobe.newPlant(10,10,10);
    testGlobe.newGrazer(30,30,5,50);
    testGlobe.newPredator(50,50,5,50,"aa ss ff");
     let blocked = testGlobe.checkLOS(30,30,20,20,800,testGlobe.obsList);
     expect(blocked).toStrictEqual(true);
   });

test('print ent', () => {
   let testGlobe = new Global();
  testGlobe.newPlant(10,10,10);
  testGlobe.newGrazer(30,30,5,50);
  testGlobe.newPredator(5,25,5,50,"aa ss ff");
  testGlobe.newObs(25,5,5,5);
  let target = testGlobe.printEnts();
  console.log(target);
  expect(target).toStrictEqual([5,25,0]);
});

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

// test('Grazer finds pred', () => {
//   let testGlobe = new Global();
//   testGlobe.newPlant(10,10,10);
//   testGlobe.newGrazer(30,30,5,50);
//   testGlobe.newPredator(40,40,5,50,"aa ss ff");
//   testGlobe.newObs(25,5,5,5);
//   let target = testGlobe.getGrazerTarget(30,30,150);
//   expect(target).toStrictEqual([40,40,0]);
// });

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