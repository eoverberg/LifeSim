  
const { checkPath, checkLOS, findClosest } = require('./UtilitiesFunctions');
const Predator = require('./PredatorClass');
const {Genes} = require ('./Entity');
const Obstacle = require('./ObstacleClass');
const Global = require('./Global.js');
//___________________________________________
// checkPath testing
// test('checkPath no obstacles', () => 
//   {
//     let coords = checkPath([40,40],[50,50],[]);
//     expect(coords[0]).toBe(50);
//     expect(coords[1]).toBe(50);
//   }
// );

// test('checkPath with obstacle on line', () => 
//   {
//     let obslist = [];
//     obslist.push(new Obstacle(10,10,5,0,5));
//     obslist.push(new Obstacle(45,45,5,0,5));
//     let disx = 45 - (5/Math.sqrt(2));
//     let disy = 45 + (5/Math.sqrt(2));
//     let coords = checkPath([40,40],[50,50],obslist);
//     expect(coords[0]).toBeCloseTo(disx);
//     expect(coords[1]).toBeCloseTo(disy);
//   }
// );

// test('checkPath with obstacle above line', () => 
//   {
//     let obslist = [];
//     obslist.push(new Obstacle(10,10,5,0,5));
//     obslist.push(new Obstacle(44,46,5,0,5));
//     let disx = 44 + (5/Math.sqrt(2));
//     let disy = 46 - (5/Math.sqrt(2));
//     let coords = checkPath([40,40],[50,50],obslist);
//     expect(coords[0]).toBeCloseTo(disx);
//     expect(coords[1]).toBeCloseTo(disy);
//   }
//   );
 
//   test('checkPath with obstacle below line', () => 
//   {
//     let obslist = [];
//     obslist.push(new Obstacle(10,10,5,0,5));
//     obslist.push(new Obstacle(46,44,5,0,5));
//     let disx = 46 - (5/Math.sqrt(2));
//     let disy = 44 + (5/Math.sqrt(2));
//     let coords = checkPath([40,40],[50,50],obslist);
//     expect(coords[0]).toBeCloseTo(disx);
//     expect(coords[1]).toBeCloseTo(disy);
//   }
// );
 
// test('checkPath with multiple obstacles touching line', () => 
//   {
//     let obslist = [];
//     obslist.push(new Obstacle(10,10,5,0,5));
//     obslist.push(new Obstacle(44,47,5,0,5));
//     obslist.push(new Obstacle(46,43,5,0,5));
//     let disx = 46 - (5/Math.sqrt(2));
//     let disy = 43 + (5/Math.sqrt(2));
//     let coords = checkPath([40,40],[50,50],obslist);
//     expect(coords[0]).toBeCloseTo(disx);
//     expect(coords[1]).toBeCloseTo(disy);
//   }
//   );
//   test('checkPath with multiple obstacles touching line different Order', () => 
//   {
//     let obslist = [];
//     obslist.push(new Obstacle(10,10,5,0,5));
//     obslist.push(new Obstacle(46,43,5,0,5));
//     obslist.push(new Obstacle(44,47,5,0,5));
   
//     let disx = 46 - (5/Math.sqrt(2));
//     let disy = 43 + (5/Math.sqrt(2));
//     let coords = checkPath([40,40],[50,50],obslist);
//     expect(coords[0]).toBeCloseTo(disx);
//     expect(coords[1]).toBeCloseTo(disy);
//   }
//   );
  // checkPath testing
  //___________________________________________

test('check LOS is blocked', () => 
  {
    let testGlobe = new Global();
    testGlobe.newPlant(10,10,10);
    testGlobe.newGrazer(30,30,50);
    testGlobe.newPredator(50,50,50,"aa ss ff");
    testGlobe.newObs(40,40,5,5);
    let blocked = checkLOS(30,30,20,20,800,testGlobe.m_obs_list);
    expect(blocked).toStrictEqual(true);
  }
);
test('check LOS is not blocked', () => 
  {
    let testGlobe = new Global();
    testGlobe.newPlant(10,10,10);
    testGlobe.newGrazer(30,30,50);
    testGlobe.newPredator(50,50,50,"aa ss ff");
    testGlobe.newObs(60,60,5,5);
    let blocked = checkLOS(30,30,20,20,800,testGlobe.m_obs_list);
    expect(blocked).toStrictEqual(false);
  }
);

test('check find findClosest', () => 
  {
    let testGlobe = new Global();
    testGlobe.newPlant(10,10,10);
    testGlobe.newGrazer(30,30,50);
    testGlobe.newPredator(50,50,50,"aa ss ff");
    testGlobe.newObs(60,60,5,5);
    let pred = findClosest(30,30,testGlobe.m_pred_list,testGlobe.m_obs_list, 100, 0);
    expect(pred).toStrictEqual(testGlobe.m_pred_list[0]);
  }
);
