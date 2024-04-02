  
const UtilitiesFunctions = require('./UtilitiesFunctions');
import Predator from './PredatorClass';
import {genes} from './entity';

test('check gene return', () => {
    let gene = new genes("aa ss ff", 0,0,0);
  let pred = new Predator(50,50,5,0,50,{...gene});
  let agression = pred.aggro;
  expect(agression).toStrictEqual("aa");
 });

  test('Predator within distance but not LOS', () => {
    let testGlobe = new Global();
    testGlobe.newPlant(10,10,10);
    testGlobe.newGrazer(30,30,5,50);
    testGlobe.newPredator(50,50,5,50,"aa ss ff");
    testGlobe.newObs(40,40,5,5);
     let target = testGlobe.findPredator(30,30,150);
     expect(target).toStrictEqual([0,0,0]);
   });

test('Predator within distance but not LOS', () => {
    let testGlobe = new Global();
    testGlobe.newPlant(10,10,10);
    testGlobe.newGrazer(30,30,5,50);
    testGlobe.newPredator(50,50,5,50,"aa ss ff");
    testGlobe.newObs(40,40,5,5); 
     let target = testGlobe.findPredator(30,30,150);
     expect(target).toStrictEqual([0,0,0]);
});