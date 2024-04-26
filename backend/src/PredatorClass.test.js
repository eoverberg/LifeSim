
import Grazer from './GrazerClass';
import Predator from './PredatorClass';
import {Genes} from './Entity';

// test('check gene return', () => {
//   let gene = new Genes("aa ss ff", 0,0,0);
//   let pred = new Predator(50,50,5,0,50,{...gene});
//   let agression = pred.m_genes_obj.m_aggro;
//   expect(agression).toStrictEqual("aa");
//  });
 
//  test('check seek orientation', () => {
//   let gene = new Genes("aa ss ff", 0,0,0);
//   let pred = new Predator(1, 50,50,5,0,50,{...gene});
//   let graz = new Grazer(40,40,5,0,40);
//   let obsL = [];
//   //obsL.push()
//   let sample = Math.atan2(-(5/Math.sqrt(2)), -(5/Math.sqrt(2)) )
//   pred.moveSeek(graz, 5, 5, obsL);
//   expect(pred.m_orientation).toBeCloseTo(sample);
//  });

//  test('check wander', () => 
//  {
//   let gene = new Genes("aa ss ff", 60,60,60);
//   let pred = new Predator(1, 1, 40, 40,5,0,50,{...gene});
//   //let graz = new Grazer(40,40,5,0,40);
//   let obsL = [];
//   pred.m_orientation =  Math.atan2(1, 1);
//   //obsL.push()
//   //let sample = Math.atan2(-(7/Math.sqrt(2)), -(7/Math.sqrt(2)) )
//   //Math.atan2(y,x)
//   //Math.atan2(1, 1) = .7853981
//   let sample = Math.atan2(1, 1) 
//   pred.moveWander( 5, 5, [100, 100],obsL);
//   expect(pred.m_orientation).toBeGreaterThan(sample-.26);
//   expect(pred.m_orientation).toBeLessThan(sample+.26);
//  });

// test('check y', () => 
//  {
//   //Math.atan2(y,x)
//   //Math.atan2(1, 1) = .7853981
//   let sample = Math.atan2(2, -3) 
//   let y_steer = Math.sin(sample);
//  expect(y_steer).toBeLessThan(-5);

 
//  });

//  test('check x', () => 
//  {
//     let sample = Math.atan2(2, -3) 
//     let x_steer = Math.cos(sample);
//     expect(x_steer).toBeGreaterThan(5);

 
//  });