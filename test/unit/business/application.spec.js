
import data from '../../../host-app-data.json';
import { expect } from 'chai';
import { Application } from '../../../src/components';

describe('Application test suite', ()=>{

    it('should print data for an application', ()=>{
        expect(new Application(data[0]).print())
            .to.be.equal('68 Small Fresh Pants - Kautzer - Boyer, and Sons');
    });

    it('should instance a new contributor with name', ()=>{
        expect(new Application(data[1]).print())
            .to.be.equal('57 Refined Concrete Shirt - Hudson - Sauer, Group');
    });
});