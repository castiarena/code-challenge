
import { expect } from 'chai';
import { Appdex } from '../../src/components';

describe('Appdex test suite', ()=>{

    it('should write the satisfaction of one Appdex', ()=>{
        const appdex = 69;
        expect(new Appdex(appdex).satisfaction())
            .to.be.equal(appdex);
    });
});