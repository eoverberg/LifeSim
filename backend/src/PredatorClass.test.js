
import Predator from './PredatorClass';
import {genes} from './entity';
test('check gene return', () => {
    let gene = new genes("aa ss ff", 0,0,0);
  let pred = new Predator(50,50,5,0,50,{...gene});
  let agression = pred.aggro;
  expect(agression).toStrictEqual("aa");
 });