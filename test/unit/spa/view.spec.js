
import 'jsdom-global/register';
import chai ,{ expect } from 'chai';
import spies from 'chai-spies';
import View from '../../../src/spa/View';

chai.use(spies);

require('jsdom-global')();

describe('View suite tests', () => {
    it('should mount a view to new element', () =>{
        const view = new View('mock', '<div data-find>{{template}}</div>', {
            template: 'mock'
        });
        view.mountTo(document.body);
        expect(document.body.querySelector('[data-find]').innerHTML)
            .to.be.equal(view.getElementFromTemplate().innerHTML)
    });

    it('should handler node insert', () =>{
        const spy = chai.spy();
        const view = new View('mock', '<div data-find>{{template}}</div>', {
            template: 'mock'
        });
        view.on('mounted', spy);
        view.handlerNodeInserted({
            element: document.body,
            view : new View('baz', '<br>')
        });
        expect(spy).to.be.called.once;
    });
});