
import { expect } from 'chai';
import Contributor  from '../../../src/components/contributor/Contributor';

describe('Contributor test suite', ()=>{

    it('should instance a new contributor with name', ()=>{
        const name = 'username';
        const contributor = new Contributor(name);

        expect(contributor.description())
            .to.be.equal(`${name}`);
    });
});