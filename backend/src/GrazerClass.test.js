const Grazer = require('./GrazerClass');
const Obstacle = require('./ObstacleClass');


// test('seek Test', () => {
//     //   let gene = new Genes("aa ss ff", 0,0,0);
//     //   let pred = new Predator(50,50,5,0,50,{...gene});
//        let graz = new Grazer(40,40,5,0,40);
//       graz.moveSeek([50,50], 7, 5,[]);
//       // 45 degree angle both factors are the same. 
//       // .75 due to not fleeing
//       // add to original positsh
//       let sample = ((7*.75)/Math.sqrt(2)) + 40 
//       //console.log("Close to: " + sample);
//       console.log(graz.m_x_pos + "," + graz.m_y_pos + "," + graz.m_energy);
//       expect(graz.m_energy).toBeCloseTo(35);
//       expect(graz.m_x_pos).toBeCloseTo(sample);
//       expect(graz.m_y_pos).toBeCloseTo(sample);
// });

// test('wander Test', () => {
//        //   let gene = new Genes("aa ss ff", 0,0,0);
//        //   let pred = new Predator(50,50,5,0,50,{...gene});
//     let graz = new Grazer(40,40,5,0,40);
//     graz.moveWander(7, 5,[]);
//          // 45 degree angle both factors are the same. 
//          // .75 due to not fleeing
//          // add to original positsh
//          //let sample = ((7*.75)/Math.sqrt(2)) + 40 
//          //console.log("Close to: " + sample);
//     console.log(graz.m_x_pos + "," + graz.m_y_pos + "," + graz.m_energy);
//     expect(graz.m_energy).toBeCloseTo(35);
//           //expect(graz.m_x_pos).toBeCloseTo(sample);
//          //expect(graz.m_y_pos).toBeCloseTo(sample); 
// });

test('flee Test', () => {
     let graz = new Grazer(40,40,5,0,40);
     graz.moveFlee([50,50], 7, 5,[],[100,100], 40);
     // 45 degree angle both factors are the same. 
     // .75 due to not fleeing
     // add to original positsh
     let sample = 40 - (7/Math.sqrt(2)) 
     //console.log("Close to: " + sample);
     console.log(graz.m_x_pos + "," + graz.m_y_pos + "," + graz.m_energy);
     
     expect(graz.m_x_pos).toBeCloseTo(sample);
     expect(graz.m_y_pos).toBeCloseTo(sample);
     expect(graz.m_sprint_time).toBeCloseTo(1);
     expect(graz.m_energy).toBeCloseTo(35);
});

test('flee Test border test', () => {
     let graz = new Grazer(40,40,5,0,40);
     let obsL = [];
     obsL.push(new Obstacle(35,35,5,0,5))
     graz.moveFlee([50,50], 7, 5, obsL,[100,100], 40);
     // 45 degree angle both factors are the same. 
     // .75 due to not fleeing
     // add to original positsh
     let samplex = 40 + (7/Math.sqrt(2)) 
     let sampley = 40 - (7/Math.sqrt(2)) 
     //console.log("Close to: " + sample);
     console.log(graz.m_x_pos + "," + graz.m_y_pos + "," + graz.m_energy);
     
     expect(graz.m_x_pos).toBeCloseTo(samplex);
     expect(graz.m_y_pos).toBeCloseTo(sampley);
     expect(graz.m_sprint_time).toBeCloseTo(1);
     expect(graz.m_energy).toBeCloseTo(35);
});
// test('flee Test after sprint time', () => {
//      let graz = new Grazer(40,40,5,0,40);
//      graz.m_sprint_time = 41;
//      graz.moveFlee([50,50], 7, 5,[], 40);
//      // 45 degree angle both factors are the same. 
//      // .75 due to not fleeing
//      // add to original positsh
//      let sample = 40 - ((7*0.75)/Math.sqrt(2)) 
//      //console.log("Close to: " + sample);
//      console.log(graz.m_x_pos + "," + graz.m_y_pos + "," + graz.m_energy);
//      expect(graz.m_energy).toBeCloseTo(35);
//      expect(graz.m_x_pos).toBeCloseTo(sample);
//      expect(graz.m_y_pos).toBeCloseTo(sample);
//      expect(graz.m_sprint_time).toBeCloseTo(42);
// });


     //expect(graz.m_energy).toBeCloseTo(35);
     //expect(graz.m_energy).toBeCloseTo(35);

    //   expect(steering[0]).toBeGreaterThanOrEqual(-5);
    //   expect(steering[0]).toBeLessThanOrEqual(0);
    //   expect(steering[1]).toBeGreaterThanOrEqual(-5);
    //   expect(steering[1]).toBeLessThanOrEqual(0);