import Events from './Events';
import uuid from 'uuid/v1';

export default class Compiler extends Events{
    /**
     * Compiler create a document fragment with all elements
     * before they are appended to some element.
     *
     * @param template
     * @param data
     */
    constructor(template, data = {}){
        super({
            compiled: null,
            mounted: null,
            updated: null
        });

        this._id = uuid();
        this._events = [];
        this.data = this.filterEvents(data);
        this.template = template;
        this._baseElement = null;
        this.views = [];
    }

    /**
     *  Get element from template, creates a document fragment
     *  from string.
     * @returns HTMLElement {*}
     */
    getElementFromTemplate(){
        const fragment = document.createDocumentFragment();
        const wrapper = document.createElement('div');
        wrapper.innerHTML = this.compileTemplate();
        fragment.appendChild(wrapper);
        fragment.childNodes[0].childNodes[0].id = this._id;
        return fragment.childNodes[0].childNodes[0];
    }

    /**
     * Compile and replace values,
     * short template engine system.
     *
     * @returns {*}
     */
    compileTemplate(){
        let templateCompiled = this.template;
        Object.keys(this.data).forEach( key => {
            const partial = typeof this.data[key] !== 'function' ? this.data[key] : this.data[key]().map(view => {
                this.views.push(view);
                return view.getElementFromTemplate().outerHTML
            }).join('');
            templateCompiled = templateCompiled.replace( new RegExp( `{{${key}}}` , 'g'), partial);
        });
        return templateCompiled;
    }

    filterEvents(data){
        const filterData = {};
        const id = this._id;

        Object.keys(data).forEach( key => {
            if(!key.match(/on(.*)/)){
                filterData[key] = data[key];
                return;
            }
            let objEvent = {};
            objEvent[key+id] = {
                handler: data[key],
                event: /on(.*)/.exec(key)[1].toLowerCase()
            };
            this._events.push(objEvent);
        });
        return filterData;
    }
}