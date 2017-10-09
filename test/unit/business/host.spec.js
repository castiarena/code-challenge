
import { expect } from 'chai';
import { Host } from '../../../src/components';

describe('Host test suite', ()=>{
    let name, domain, host;
    beforeEach(()=>{
        name = 'mock-bar';
        domain = 'mock.baz';
        host = new Host( `${name}.${domain}`);
    });

    it('should print the domain of host', ()=>{
        expect(host.url())
            .to.be.equal(`${name}.${domain}`);
    });

    it('should print the domain of host', ()=>{
        expect(host.domain())
            .to.be.equal(domain);
    });

    it('should print the name of that host', ()=>{
        expect(host.name())
            .to.be.equal(name);
    });

});