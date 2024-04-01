import {genes} from './entity';

test('check gene', () => {
    let gene = new genes("aa ss ff",0,0,0);
    let char = "aa";
     expect(gene.aggro).toStrictEqual(char);
   });