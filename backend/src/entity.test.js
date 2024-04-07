import {Genes} from './Entity';

test('check gene', () => {
    let gene = new Genes("aa ss ff",0,0,0);
    let char = "aa";
     expect(gene.m_aggro).toStrictEqual(char);
   });