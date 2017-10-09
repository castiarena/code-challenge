
import 'jsdom-global/register';
import chai ,{ expect } from 'chai';
import spies from 'chai-spies';
import Spa from '../../../src/spa/Spa';

chai.use(spies);

require('jsdom-global')();

describe('Spa suite tests', () => {
    it('should mount a view to new element', () =>{
        const spy = chai.spy();
        const spa = new Spa(document.body, '<div data-find>{{template}}</div>');
        spa.on('start', spy);
        spa.init();
        spa.renderViews([{
            mountTo: spy
        }]);
        expect(spy).to.be.called.exactly(2);
    });

    it('should bind events from a element and call findAndBindEvent', () =>{
        const spy = chai.spy();
        const spa = new Spa(document.body, '<div data-find>{{template}}</div>');
        spa.findAndBindEvent = spy;
        spa.bindEvents(['mock', 'baz']);
        expect(spy).to.be.called.exactly(2);
    });

    it('should render new views', () =>{
        const spy = chai.spy();
        const spa = new Spa(document.body, '<div data-event="onMock">{{template}}</div>');
        spa.views = [{
            _events: [{ onMock: { event: 'mock', handler: spy } }],
            views:[]
        }];

        spa.findAndBindEvent(document.body);
        expect(spy).to.be.called.exactly(0);
    });
    it('should render new views', () =>{
        const spy = chai.spy();
        const spa = new Spa(document.body, '<div data-event="onMock">{{template}}</div>');
        spa.views = [{
            _events: [{ onMock: { event: 'mock', handler: spy } }],
            views:[{
                _events: [{ onMock: { event: 'mock', handler: spy } }],
                views:[{
                    _events: [{ onMock: { event: 'mock', handler: spy } }],
                    views:[]
                }]
            }]
        }];

        spa.findAndBindEvent(document.body);
        expect(spy).to.be.called.exactly(0);
    });
});