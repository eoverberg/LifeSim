
import Global from './Global.js';

//import entities?
//test findpred
//function to 
//crete the global arrays of all entities
//call test
 
test('check LOS is blocked', () => {
  let testGlobe = new Global();
  testGlobe.newPlant(10,10,10);
  testGlobe.newGrazer(30,30,5,50);
  testGlobe.newPredator(50,50,5,50,"aassaa");
  testGlobe.newObs(40,40,5,5);
   let blocked = testGlobe.checkLOS(30,30,50,50,800,testGlobe.obsList);
   expect(blocked).toStrictEqual(true);
 });

test('find predator in distance', () => {
   let testGlobe = new Global();
   testGlobe.newPlant(10,10,10);
   testGlobe.newGrazer(30,30,5,50);
   testGlobe.newPredator(5,25,5,50,"aassaa");
   testGlobe.newObs(25,5,5,5);
    let target = testGlobe.findPredator(30,30,150);
    expect(target).toStrictEqual([5,25]);
  });

  test('Predator within distance but not LOS', () => {
    let testGlobe = new Global();
    testGlobe.newPlant(10,10,10);
    testGlobe.newGrazer(30,30,5,50);
    testGlobe.newPredator(50,50,5,50,"aassaa");
    testGlobe.newObs(40,40,5,5);
     let target = testGlobe.findPredator(30,30,150);
     expect(target).toStrictEqual([0,0]);
   });