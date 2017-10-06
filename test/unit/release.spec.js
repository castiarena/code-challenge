import { expect } from 'chai';
import { Release } from '../../src/components';

describe('Release test suite', ()=>{
   it('should create a release and print his version', ()=>{
        const version = 5;
        expect(new Release(version).description())
            .to.be.equal(`version ${version}`);
   });
});