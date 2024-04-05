
import Predator from './PredatorClass';
import {Genes} from './Entity';
test('check gene return', () => {
    let gene = new Genes("aa ss ff", 0,0,0);
  let pred = new Predator(50,50,5,0,50,{...gene});
  let agression = pred.m_aggro;
  expect(agression).toStrictEqual("aa");
 });