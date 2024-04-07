const {seek,flee,wander} = require('./Movement');
const Predator = require('./PredatorClass');
const {Genes} = require ('./Entity');
const Grazer = require('./GrazerClass');

// test('seek Test', () => {
// //   let gene = new Genes("aa ss ff", 0,0,0);
// //   let pred = new Predator(50,50,5,0,50,{...gene});
// //   let graz = new Grazer(40,40,5,0,40);
//   let steering = seek([50,50], [40,40], 5)
//   // 45 degree angle both factors are the same. 
// //   let sample = (5/Math.sqrt(2))
// //   console.log("Close to: " + sample);
// //   console.log(steering);
//   expect(steering[0]).toBeGreaterThanOrEqual(-5);
//   expect(steering[0]).toBeLessThanOrEqual(0);
//   expect(steering[1]).toBeGreaterThanOrEqual(-5);
//   expect(steering[1]).toBeLessThanOrEqual(0);
//  });

// test('seek Test 2', () => {
//    let steering = seek([40,40], [50,50], 5)
//    // 45 degree angle both factors are the same. 
//  // let sample = (5/Math.sqrt(2))
//  //   console.log("Close to: " + sample);
//  //   console.log(steering);
//    expect(steering[0]).toBeGreaterThanOrEqual(0);
//    expect(steering[0]).toBeLessThanOrEqual(5);
//   expect(steering[1]).toBeGreaterThanOrEqual(0);
//    expect(steering[1]).toBeLessThanOrEqual(5);
//  });
    
test('wander Test', () => {
   let graz = new Grazer(1, 40, 40, 5, 0, 40);
   graz.m_orientation = -0.5;
   let steering = wander(graz, 1) 
   //let sample = (5/Math.sqrt(2))
   //console.log("Close to: " + sample);
      
   expect(steering[0]).toBeGreaterThanOrEqual(-5);
   expect(steering[0]).toBeLessThanOrEqual(5);
   expect(steering[1]).toBeGreaterThanOrEqual(-5);
   expect(steering[1]).toBeLessThanOrEqual(5);
  });
      
//   test('flee Test', () => {
//     let steering = flee([40,40], [50,50], 7)
//    // 45 degree angle both factors are the same. 
//  // let sample = (5/Math.sqrt(2))
//  //   console.log("Close to: " + sample);
//  //   console.log(steering);
//  let sample = -((7)/Math.sqrt(2))
//  //console.log("Close to: " + sample);
//  console.log(steering[0] + "," + steering[1]);
//  expect(steering[0]).toBeCloseTo(sample);
//  expect(steering[1]).toBeCloseTo(sample);
//    });

