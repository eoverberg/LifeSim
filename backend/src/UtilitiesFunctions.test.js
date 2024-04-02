  
const { checkPath } = require('./UtilitiesFunctions');
const Predator = require('./PredatorClass');
const {genes} = require ('./entity');
const Obstacle = require('./ObstacleClass');

test('check gene return', () => {
    let gene = new genes("aa ss ff", 0,0,0);
  let pred = new Predator(50,50,5,0,50,{...gene});
  let agression = pred.aggro;
  expect(agression).toStrictEqual("aa");
 });


//___________________________________________
// checkPath testing
test('checkPath no obstacles', () => 
  {
    let coords = checkPath([40,40],[50,50],[]);
    expect(coords[0]).toBe(50);
    expect(coords[1]).toBe(50);
  }
);

test('checkPath with obstacle on line', () => 
  {
    let obslist = [];
    obslist.push(new Obstacle(10,10,5,0,5));
    obslist.push(new Obstacle(45,45,5,0,5));
    let disx = 45 - (5/Math.sqrt(2));
    let disy = 45 + (5/Math.sqrt(2));
    let coords = checkPath([40,40],[50,50],obslist);
    expect(coords[0]).toBeCloseTo(disx);
    expect(coords[1]).toBeCloseTo(disy);
  }
);

test('checkPath with obstacle above line', () => 
  {
    let obslist = [];
    obslist.push(new Obstacle(10,10,5,0,5));
    obslist.push(new Obstacle(44,46,5,0,5));
    let disx = 44 + (5/Math.sqrt(2));
    let disy = 46 - (5/Math.sqrt(2));
    let coords = checkPath([40,40],[50,50],obslist);
    expect(coords[0]).toBeCloseTo(disx);
    expect(coords[1]).toBeCloseTo(disy);
  }
  );
 
  test('checkPath with obstacle below line', () => 
  {
    let obslist = [];
    obslist.push(new Obstacle(10,10,5,0,5));
    obslist.push(new Obstacle(46,44,5,0,5));
    let disx = 46 - (5/Math.sqrt(2));
    let disy = 44 + (5/Math.sqrt(2));
    let coords = checkPath([40,40],[50,50],obslist);
    expect(coords[0]).toBeCloseTo(disx);
    expect(coords[1]).toBeCloseTo(disy);
  }
);
 
test('checkPath with multiple obstacles touching line', () => 
  {
    let obslist = [];
    obslist.push(new Obstacle(10,10,5,0,5));
    obslist.push(new Obstacle(44,47,5,0,5));
    obslist.push(new Obstacle(46,43,5,0,5));
    let disx = 46 - (5/Math.sqrt(2));
    let disy = 43 + (5/Math.sqrt(2));
    let coords = checkPath([40,40],[50,50],obslist);
    expect(coords[0]).toBeCloseTo(disx);
    expect(coords[1]).toBeCloseTo(disy);
  }
  );
  test('checkPath with multiple obstacles touching line different Order', () => 
  {
    let obslist = [];
    obslist.push(new Obstacle(10,10,5,0,5));
    obslist.push(new Obstacle(46,43,5,0,5));
    obslist.push(new Obstacle(44,47,5,0,5));
   
    let disx = 46 - (5/Math.sqrt(2));
    let disy = 43 + (5/Math.sqrt(2));
    let coords = checkPath([40,40],[50,50],obslist);
    expect(coords[0]).toBeCloseTo(disx);
    expect(coords[1]).toBeCloseTo(disy);
  }
  );
  // checkPath testing
  //___________________________________________