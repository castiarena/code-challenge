
import { expect } from 'chai';
import Apdex from '../../../src/components/apdex/Apdex';

describe('Apdex test suite', ()=>{

    it('should write the satisfaction of one Appdex', ()=>{
        const apdex = 69;
        expect(new Apdex(apdex).satisfaction())
            .to.be.equal(apdex);
    });
});