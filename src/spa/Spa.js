import Events from './Events';

export default class Spa extends Events{
    constructor(rootElement, views) {
        super({
            'start': null,
            'updated': null
        });
        this._rootElement = rootElement;
        this.views = views;
        window.addEventListener('load', this.init.bind(this));
    }

    init(){
        this.trigger('start');
    }

    renderViews(views){
        this.views = views;
        views.forEach(view => view.mountTo(this._rootElement));
    }


    bindEvents(eventElements){
        [].forEach.call(eventElements, elem => this.findAndBindEvent(elem))
    }

    findAndBindEvent(elem){
        const eventName = elem.getAttribute('data-event');
        let eventSaved = null;
        this.views.forEach( view => {
            view._events.forEach(event => Object.keys(event).forEach(key => {
                eventSaved = key === eventName+view._id ? event[key]: null;
                if(eventSaved){
                    elem.addEventListener(eventSaved.event, eventSaved.handler, true);
                }
            }));
            view.views.forEach(view => {
                view._events.forEach(event => Object.keys(event).forEach(key => {
                    eventSaved = key === eventName+view._id ? event[key]: null;
                    if(eventSaved && elem.id === view._id){
                        elem.addEventListener(eventSaved.event, eventSaved.handler, true);
                    }
                }));
                view.views.forEach(view => view._events.forEach(event => Object.keys(event).forEach(key => {
                    eventSaved = key === eventName+view._id ? event[key]: null;
                    if(eventSaved  && elem.id === view._id){
                        elem.addEventListener(eventSaved.event, eventSaved.handler, true);
                    }
                })));
            });
        });
    }
}