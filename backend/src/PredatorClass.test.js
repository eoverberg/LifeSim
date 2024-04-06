
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
//   let pred = new Predator(50,50,5,0,50,{...gene});
//   let graz = new Grazer(40,40,5,0,40);
//   let obsL = [];
//   //obsL.push()
//   let sample = Math.atan2(-(5/Math.sqrt(2)), -(5/Math.sqrt(2)) )
//   pred.moveSeek(graz, 5, 5, obsL);
//   expect(pred.m_orientation).toBeCloseTo(sample);
//  });
 test('check wander ', () => {
  let gene = new Genes("aa ss ff", 0,0,0);
  let pred = new Predator(1, 50,50,5,0,50,{...gene});
  //let graz = new Grazer(40,40,5,0,40);
  let obsL = [];
  //obsL.push()
  let sample = Math.atan2(-(5/Math.sqrt(2)), -(5/Math.sqrt(2)) )
  pred.moveWander( 5, 5, [100, 100],obsL);
  expect(pred.m_orientation).toBeCloseTo(sample);
 });