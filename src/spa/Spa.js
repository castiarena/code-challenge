import Events from './Events';

export default class Spa extends Events{
    constructor(rootElement, views) {
        super({
            'start': null
        });
        this._rootElement = rootElement;
        this.views = views;
        window.addEventListener('load', e => this.init());
    }

    init(){
        this.trigger('start');
    }

    renderViews(views){
        views.forEach(view => view.mountTo(this._rootElement));
    }
}