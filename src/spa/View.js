import Compiler from './Compiler';

export default class View extends Compiler{
    constructor( name, template, data) {
        super(template, data);
        this.name = name;
    }

    mountTo(element, callback){
        this._baseElement = element;
        this._wrapper = this.getElementFromTemplate();
        this._wrapper.addEventListener('DOMNodeInserted',
            this.handlerNodeInserted.bind(this,
                { view: this, element: this._wrapper, callback})
        );
        this._baseElement.appendChild(this._wrapper);
    }

    handlerNodeInserted(event){
        event.view._wrapper = event.element.cloneNode(true);
        event.element.parentNode.replaceChild(event.view._wrapper, event.element);
        this.trigger('mounted');
    }

}