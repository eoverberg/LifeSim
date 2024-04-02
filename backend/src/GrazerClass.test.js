const Grazer = require('./GrazerClass');


test('seek Test', () => {
    //   let gene = new genes("aa ss ff", 0,0,0);
    //   let pred = new Predator(50,50,5,0,50,{...gene});
       let graz = new Grazer(40,40,5,0,40);
      graz.moveSeek([50,50], 7, 5,[]);
      // 45 degree angle both factors are the same. 
      // .75 due to not fleeing
      // add to original positsh
      let sample = ((7*.75)/Math.sqrt(2)) + 40 
      //console.log("Close to: " + sample);
      console.log(graz.x + "," + graz.y + "," + graz.Energy);
      expect(graz.Energy).toBeCloseTo(35);
      expect(graz.x).toBeCloseTo(sample);
      expect(graz.y).toBeCloseTo(sample);
});

test('wander Test', () => {
       //   let gene = new genes("aa ss ff", 0,0,0);
       //   let pred = new Predator(50,50,5,0,50,{...gene});
    let graz = new Grazer(40,40,5,0,40);
    graz.moveWander(7, 5,[]);
         // 45 degree angle both factors are the same. 
         // .75 due to not fleeing
         // add to original positsh
         //let sample = ((7*.75)/Math.sqrt(2)) + 40 
         //console.log("Close to: " + sample);
    console.log(graz.x + "," + graz.y + "," + graz.Energy);
    expect(graz.Energy).toBeCloseTo(35);
          //expect(graz.x).toBeCloseTo(sample);
         //expect(graz.y).toBeCloseTo(sample); 
});

test('flee Test', () => {
     let graz = new Grazer(40,40,5,0,40);
     graz.moveFlee([50,50], 7, 5,[], 40);
     // 45 degree angle both factors are the same. 
     // .75 due to not fleeing
     // add to original positsh
     let sample = 40 - (7/Math.sqrt(2)) 
     //console.log("Close to: " + sample);
     console.log(graz.x + "," + graz.y + "," + graz.Energy);
     expect(graz.Energy).toBeCloseTo(35);
     expect(graz.x).toBeCloseTo(sample);
     expect(graz.y).toBeCloseTo(sample);
     expect(graz.sprintTime).toBeCloseTo(1);
});

test('flee Test after sprint time', () => {
     let graz = new Grazer(40,40,5,0,40);
     graz.sprintTime = 41;
     graz.moveFlee([50,50], 7, 5,[], 40);
     // 45 degree angle both factors are the same. 
     // .75 due to not fleeing
     // add to original positsh
     let sample = 40 - ((7*0.75)/Math.sqrt(2)) 
     //console.log("Close to: " + sample);
     console.log(graz.x + "," + graz.y + "," + graz.Energy);
     expect(graz.Energy).toBeCloseTo(35);
     expect(graz.x).toBeCloseTo(sample);
     expect(graz.y).toBeCloseTo(sample);
     expect(graz.sprintTime).toBeCloseTo(42);
});


     //expect(graz.Energy).toBeCloseTo(35);

    //   expect(steering[0]).toBeGreaterThanOrEqual(-5);
    //   expect(steering[0]).toBeLessThanOrEqual(0);
    //   expect(steering[1]).toBeGreaterThanOrEqual(-5);
    //   expect(steering[1]).toBeLessThanOrEqual(0);