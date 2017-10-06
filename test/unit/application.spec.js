
import { expect } from 'chai';
import { Application, Contributor,
    Appdex, Host, Release} from '../../src/components';

describe('Application test suite', ()=>{
    let application,
        contributors,
        host,
        appdex,
        release;
    beforeEach(()=>{

        contributors = [
            new Contributor('name1'),
            new Contributor('name2'),
            new Contributor('name3')
        ];
        host = new Host('bar-baz.mock.url');
        appdex = 40;
        release = new Release(4);

        application = new Application(
            host,
            appdex,
            release,
            contributors
        );
    });

    it('should instance a new contributor with name', ()=>{

        expect(application)
            .to.be.equal();
    });
});