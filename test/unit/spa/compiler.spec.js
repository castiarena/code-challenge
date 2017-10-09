import 'jsdom-global/register';
import { expect } from 'chai';
import { Compiler } from '../../../src/spa';

require('jsdom-global')();

describe('Compiler test suite', () => {

    it('should create element from tag on template',()=>{
        const compiler = new Compiler('<div class="pepe" id="id">baz</div>');
        expect(compiler.getElementFromTemplate().children[0].innerHTML)
            .to.be.equal('baz');
        expect(compiler.getElementFromTemplate().children[0].id)
            .to.be.equal('id');
    });

    it('should create element from tag on template',()=>{
        const info = 'mock';
        const id = 'mockId';
        const compiler = new Compiler(
            '<div class="pepe" id="{{id}}">baz {{info}}</div>',
            { info , id}
        );
        expect(compiler.getElementFromTemplate().children[0].innerHTML)
            .to.be.equal(`baz ${info}`);
        expect(compiler.getElementFromTemplate().children[0].id)
            .to.be.equal(id);
    });

    it('should create element from tag recursive from tag inside tag',()=>{
        const info = 'mock';
        const compiler = new Compiler(
            '<p>' +
                'baz ' +
                '<span mock-attr="213" spa:add:views="{{pepe}}" on:click="click">{{info}}</span>' +
                '{{mock}}' +
            '</p>',
            { info , mock:'da'}
        );
        expect(compiler.getElementFromTemplate().querySelector('[mock-attr]').innerHTML)
            .to.be.equal(info);
    });
});